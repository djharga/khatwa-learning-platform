const fs = require('fs');
const path = require('path');

// استخراج جميع المسارات من src/app
function extractAppRoutes(appDir, basePath = '') {
  const routes = [];
  const items = fs.readdirSync(appDir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(appDir, item.name);
    const routePath = basePath ? `${basePath}/${item.name}` : `/${item.name}`;

    if (item.isDirectory()) {
      // تخطي المجلدات الخاصة
      if (item.name.startsWith('_') || item.name.startsWith('(')) {
        // معالجة route groups
        if (item.name.startsWith('(')) {
          const groupRoutes = extractAppRoutes(fullPath, basePath);
          routes.push(...groupRoutes);
        }
        continue;
      }
      const subRoutes = extractAppRoutes(fullPath, routePath);
      routes.push(...subRoutes);
    } else if (item.name === 'page.tsx' || item.name === 'page.jsx') {
      // إزالة [param] من المسارات للتحقق
      const cleanPath = routePath.replace(/\[.*?\]/g, '*');
      routes.push({
        path: routePath,
        cleanPath: cleanPath,
        file: fullPath,
        type: 'page'
      });
    } else if (item.name === 'layout.tsx' || item.name === 'layout.jsx') {
      routes.push({
        path: routePath,
        cleanPath: routePath,
        file: fullPath,
        type: 'layout'
      });
    }
  }

  return routes;
}

// استخراج المسارات من ملف
function extractRoutesFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const routes = [];
  
  // البحث عن <Link href="...">
  const linkRegex = /<Link[^>]+href\s*=\s*{?['"`]([^'"`]+)['"`]}?/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    routes.push({
      path: match[1],
      type: 'Link',
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  // البحث عن router.push('...') أو router.push("...")
  const pushRegex = /router\.(push|replace|prefetch)\s*\(\s*['"`]([^'"`]+)['"`]/g;
  while ((match = pushRegex.exec(content)) !== null) {
    routes.push({
      path: match[2],
      type: `router.${match[1]}`,
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  // البحث عن href في template strings
  const templateRegex = /href\s*[:=]\s*[`'"](\/[^`'"]+)[`'"]/g;
  while ((match = templateRegex.exec(content)) !== null) {
    routes.push({
      path: match[1],
      type: 'href',
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  // البحث عن المسارات الديناميكية
  const dynamicRegex = /['"`](\/[^'"`]*\[[^\]]+\][^'"`]*)['"`]/g;
  while ((match = dynamicRegex.exec(content)) !== null) {
    routes.push({
      path: match[1],
      type: 'dynamic',
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return routes;
}

// البحث عن جميع الملفات التي تحتوي على روابط
function findLinkFiles(srcDir) {
  const files = [];
  
  function searchDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        if (!item.name.includes('node_modules') && !item.name.includes('.next')) {
          searchDir(fullPath);
        }
      } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.jsx') || item.name.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('Link') || content.includes('router.') || content.includes('useRouter')) {
          files.push(fullPath);
        }
      }
    }
  }
  
  searchDir(srcDir);
  return files;
}

// التحقق من وجود مسار
function routeExists(route, appRoutes) {
  // تنظيف المسار
  let cleanRoute = route.split('?')[0].split('#')[0]; // إزالة query params و hash
  cleanRoute = cleanRoute.replace(/\/$/, ''); // إزالة trailing slash
  
  if (cleanRoute === '') cleanRoute = '/';
  
  // البحث عن تطابق مباشر
  for (const appRoute of appRoutes) {
    if (appRoute.path === cleanRoute) {
      return true;
    }
  }
  
  // البحث عن تطابق مع dynamic routes
  for (const appRoute of appRoutes) {
    const pattern = appRoute.path.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(cleanRoute)) {
      return true;
    }
  }
  
  return false;
}

// الدالة الرئيسية
function analyzeRoutes() {
  const srcDir = path.join(__dirname, '..', 'src');
  const appDir = path.join(srcDir, 'app');
  
  console.log('🔍 Analyzing routes...\n');
  
  // استخراج جميع المسارات من app
  console.log('1. Extracting routes from src/app...');
  const appRoutes = extractAppRoutes(appDir);
  console.log(`   Found ${appRoutes.length} routes in app directory\n`);
  
  // البحث عن جميع الملفات التي تحتوي على روابط
  console.log('2. Finding files with links...');
  const linkFiles = findLinkFiles(srcDir);
  console.log(`   Found ${linkFiles.length} files with links\n`);
  
  // استخراج جميع المسارات المستخدمة
  console.log('3. Extracting used routes...');
  const usedRoutes = [];
  for (const file of linkFiles) {
    try {
      const routes = extractRoutesFromFile(file);
      usedRoutes.push(...routes);
    } catch (error) {
      console.error(`   Error reading ${file}:`, error.message);
    }
  }
  console.log(`   Found ${usedRoutes.length} route usages\n`);
  
  // تحليل المسارات
  console.log('4. Analyzing routes...');
  const uniqueRoutes = [...new Set(usedRoutes.map(r => r.path))];
  const brokenRoutes = [];
  const validRoutes = [];
  const externalRoutes = [];
  
  for (const route of uniqueRoutes) {
    // تخطي الروابط الخارجية
    if (route.startsWith('http://') || route.startsWith('https://') || route.startsWith('mailto:') || route.startsWith('tel:')) {
      externalRoutes.push(route);
      continue;
    }
    
    // تخطي الروابط الخاصة
    if (route.startsWith('#') || route === '' || route === '/') {
      validRoutes.push(route);
      continue;
    }
    
    // تنظيف المسار الديناميكي للتحقق
    const cleanPath = route.replace(/\[.*?\]/g, '*');
    const exists = routeExists(route, appRoutes);
    
    if (!exists) {
      // محاولة البحث بدون parameters
      const routeWithoutParams = route.split('?')[0];
      const existsWithoutParams = routeExists(routeWithoutParams, appRoutes);
      
      if (!existsWithoutParams) {
        brokenRoutes.push({
          path: route,
          cleanPath: cleanPath,
          usages: usedRoutes.filter(r => r.path === route)
        });
      } else {
        validRoutes.push(route);
      }
    } else {
      validRoutes.push(route);
    }
  }
  
  // البحث عن المسارات غير المستخدمة
  console.log('5. Finding unused routes...');
  const unusedRoutes = [];
  for (const appRoute of appRoutes) {
    if (appRoute.type === 'page') {
      const isUsed = usedRoutes.some(ur => {
        const cleanUsed = ur.path.replace(/\[.*?\]/g, '*');
        const cleanApp = appRoute.path.replace(/\[.*?\]/g, '*');
        return cleanUsed === cleanApp || ur.path.startsWith(appRoute.path.split('[')[0]);
      });
      
      if (!isUsed && !appRoute.path.includes('_not-found')) {
        unusedRoutes.push(appRoute);
      }
    }
  }
  
  // إنشاء التقرير
  const report = {
    summary: {
      totalAppRoutes: appRoutes.length,
      totalUsedRoutes: uniqueRoutes.length,
      brokenRoutes: brokenRoutes.length,
      unusedRoutes: unusedRoutes.length,
      externalRoutes: externalRoutes.length,
      validRoutes: validRoutes.length
    },
    brokenRoutes: brokenRoutes.map(br => ({
      path: br.path,
      cleanPath: br.cleanPath,
      usages: br.usages.map(u => ({
        file: path.relative(process.cwd(), u.file),
        type: u.type,
        line: u.line
      }))
    })),
    unusedRoutes: unusedRoutes.map(ur => ({
      path: ur.path,
      file: path.relative(process.cwd(), ur.file)
    })),
    allAppRoutes: appRoutes.map(ar => ({
      path: ar.path,
      file: path.relative(process.cwd(), ar.file),
      type: ar.type
    })),
    allUsedRoutes: uniqueRoutes.map(route => {
      const usages = usedRoutes.filter(r => r.path === route);
      return {
        path: route,
        count: usages.length,
        files: [...new Set(usages.map(u => path.relative(process.cwd(), u.file)))]
      };
    })
  };
  
  // حفظ التقرير
  fs.writeFileSync(
    path.join(__dirname, '..', 'ROUTES_ANALYSIS.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n✅ Analysis complete!');
  console.log("   📄 Report saved to ROUTES_ANALYSIS.json\n");
  
  // طباعة الملخص
  console.log('📊 Summary:');
  console.log(`   Total app routes: ${report.summary.totalAppRoutes}`);
  console.log(`   Total used routes: ${report.summary.totalUsedRoutes}`);
  console.log(`   ✅ Valid routes: ${report.summary.validRoutes}`);
  console.log(`   ❌ Broken routes: ${report.summary.brokenRoutes}`);
  console.log(`   ⚠️  Unused routes: ${report.summary.unusedRoutes}`);
  console.log(`   🔗 External routes: ${report.summary.externalRoutes}`);
  
  if (brokenRoutes.length > 0) {
    console.log('\n❌ Broken Routes:');
    brokenRoutes.forEach(br => {
      console.log(`   - ${br.path}`);
      br.usages.forEach(u => {
        console.log(`     → ${path.relative(process.cwd(), u.file)}:${u.line} (${u.type})`);
      });
    });
  }
  
  if (unusedRoutes.length > 0) {
    console.log('\n⚠️  Unused Routes:');
    unusedRoutes.forEach(ur => {
      console.log(`   - ${ur.path} (${path.relative(process.cwd(), ur.file)})`);
    });
  }
  
  return report;
}

// تشغيل التحليل
if (require.main === module) {
  analyzeRoutes();
}

module.exports = { analyzeRoutes };

