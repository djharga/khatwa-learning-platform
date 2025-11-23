const fs = require('fs');
const path = require('path');

// استخراج جميع المسارات من src/app (مع معالجة Route Groups بشكل صحيح)
function extractAppRoutes(appDir, basePath = '') {
  const routes = [];
  
  if (!fs.existsSync(appDir)) {
    return routes;
  }
  
  const items = fs.readdirSync(appDir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(appDir, item.name);
    
    // تخطي node_modules و .next
    if (item.name === 'node_modules' || item.name === '.next' || item.name.startsWith('.')) {
      continue;
    }

    if (item.isDirectory()) {
      // Route Groups: المجلدات التي تبدأ بـ ( لا تظهر في المسار
      if (item.name.startsWith('(') && item.name.endsWith(')')) {
        const groupRoutes = extractAppRoutes(fullPath, basePath);
        routes.push(...groupRoutes);
      }
      // Private Routes: المجلدات التي تبدأ بـ _ لا تظهر في المسار
      else if (item.name.startsWith('_')) {
        // نستمر في البحث داخل _not-found فقط
        if (item.name === '_not-found') {
          const privateRoutes = extractAppRoutes(fullPath, basePath);
          routes.push(...privateRoutes);
        }
      }
      // Dynamic Routes: المجلدات التي تبدأ بـ [
      else if (item.name.startsWith('[') && item.name.endsWith(']')) {
        const paramName = item.name.slice(1, -1);
        const dynamicPath = basePath ? `${basePath}/[${paramName}]` : `/[${paramName}]`;
        const subRoutes = extractAppRoutes(fullPath, dynamicPath);
        routes.push(...subRoutes);
      }
      // Regular directories
      else {
        const routePath = basePath ? `${basePath}/${item.name}` : `/${item.name}`;
        const subRoutes = extractAppRoutes(fullPath, routePath);
        routes.push(...subRoutes);
      }
    } 
    // Page files
    else if (item.name === 'page.tsx' || item.name === 'page.jsx' || item.name === 'page.ts') {
      const routePath = basePath || '/';
      routes.push({
        path: routePath,
        file: fullPath,
        type: 'page',
        hasParams: routePath.includes('[')
      });
    }
    // Layout files (للتوثيق فقط)
    else if (item.name === 'layout.tsx' || item.name === 'layout.jsx' || item.name === 'layout.ts') {
      const routePath = basePath || '/';
      routes.push({
        path: routePath,
        file: fullPath,
        type: 'layout',
        hasParams: routePath.includes('[')
      });
    }
  }

  return routes;
}

// استخراج المسارات من ملف (مع دعم Template Literals)
function extractRoutesFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const routes = [];
  const lines = content.split('\n');
  
  // 1. البحث عن <Link href="..."> أو <Link href={...}>
  const linkPatterns = [
    // <Link href="/path">
    /<Link[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/g,
    // <Link href={"/path"}>
    /<Link[^>]*href\s*=\s*\{["']([^"']+)["']\}[^>]*>/g,
    // <Link href={`/path`}>
    /<Link[^>]*href\s*=\s*\{`([^`]+)`\}[^>]*>/g,
  ];
  
  linkPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const route = match[1].trim();
      if (route && (route.startsWith('/') || route.startsWith('#'))) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        routes.push({
          path: route,
          type: 'Link',
          file: filePath,
          line: lineNum,
          context: lines[lineNum - 1]?.trim() || ''
        });
      }
    }
  });
  
  // 2. البحث عن router.push/replace/prefetch
  const routerPatterns = [
    // router.push("/path")
    /router\.(push|replace|prefetch)\s*\(\s*["']([^"']+)["']/g,
    // router.push(`/path`)
    /router\.(push|replace|prefetch)\s*\(\s*`([^`]+)`/g,
  ];
  
  routerPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const route = match[2].trim();
      if (route && route.startsWith('/')) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        routes.push({
          path: route,
          type: `router.${match[1]}`,
          file: filePath,
          line: lineNum,
          context: lines[lineNum - 1]?.trim() || ''
        });
      }
    }
  });
  
  // 3. البحث عن Template Literals مع متغيرات (مثل `/student/courses/${courseId}`)
  // هذا النمط أكثر تعقيداً - نبحث عن الأنماط الشائعة
  const templateLiteralPattern = /(?:href|router\.(?:push|replace|prefetch))\s*[:=]\s*[`'"](\/[^`'"${}]+(?:\$\{[^}]+\}[^`'"${}]*)*)[`'"]/g;
  let match;
  while ((match = templateLiteralPattern.exec(content)) !== null) {
    const route = match[1].trim();
    if (route && route.startsWith('/')) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      // استبدال ${...} بـ * للتحقق
      const cleanRoute = route.replace(/\$\{[^}]+\}/g, '*');
      routes.push({
        path: route,
        cleanPath: cleanRoute,
        type: 'template-literal',
        file: filePath,
        line: lineNum,
        context: lines[lineNum - 1]?.trim() || '',
        isDynamic: route.includes('${')
      });
    }
  }
  
  // 4. البحث عن href في objects أو constants
  const hrefInObject = /href\s*:\s*["'](\/[^"']+)["']/g;
  while ((match = hrefInObject.exec(content)) !== null) {
    const route = match[1].trim();
    if (route && route.startsWith('/')) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      routes.push({
        path: route,
        type: 'href-property',
        file: filePath,
        line: lineNum,
        context: lines[lineNum - 1]?.trim() || ''
      });
    }
  }
  
  return routes;
}

// البحث عن جميع الملفات التي تحتوي على روابط
function findLinkFiles(srcDir) {
  const files = [];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        if (!item.name.includes('node_modules') && 
            !item.name.includes('.next') && 
            !item.name.startsWith('.') &&
            item.name !== 'dist' &&
            item.name !== 'build') {
          searchDir(fullPath);
        }
      } else if (item.name.endsWith('.tsx') || 
                 item.name.endsWith('.ts') || 
                 item.name.endsWith('.jsx') || 
                 item.name.endsWith('.js')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (content.includes('Link') || 
              content.includes('router.') || 
              content.includes('useRouter') ||
              content.includes('href')) {
            files.push(fullPath);
          }
        } catch (error) {
          // تخطي الملفات التي لا يمكن قراءتها
        }
      }
    }
  }
  
  searchDir(srcDir);
  return files;
}

// تنظيف المسار للتحقق
function cleanRoute(route) {
  if (!route) return '';
  // إزالة query params و hash
  let cleaned = route.split('?')[0].split('#')[0];
  // إزالة trailing slash (إلا إذا كان المسار الجذر)
  cleaned = cleaned.replace(/\/$/, '') || '/';
  return cleaned;
}

// التحقق من وجود مسار في app routes
function routeExists(route, appRoutes) {
  const cleaned = cleanRoute(route);
  
  if (cleaned === '/' || cleaned === '') {
    return appRoutes.some(r => r.path === '/');
  }
  
  // 1. البحث عن تطابق مباشر
  if (appRoutes.some(r => r.path === cleaned)) {
    return true;
  }
  
  // 2. البحث عن تطابق مع dynamic routes
  for (const appRoute of appRoutes) {
    if (!appRoute.hasParams) continue;
    
    // تحويل المسار إلى regex pattern
    // [courseId] -> ([^/]+)
    // [courseId]/lesson/[lessonId] -> ([^/]+)/lesson/([^/]+)
    const pattern = appRoute.path
      .replace(/\[([^\]]+)\]/g, '([^/]+)')
      .replace(/\//g, '\\/');
    
    try {
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(cleaned)) {
        return true;
      }
    } catch (error) {
      // تخطي الأنماط غير الصالحة
    }
  }
  
  // 3. للـ template literals مع ${...}، نحاول مطابقة البنية
  if (route.includes('${')) {
    const basePath = route.split('${')[0].replace(/\/$/, '');
    const matchingRoute = appRoutes.find(r => {
      const routeBase = r.path.split('[')[0].replace(/\/$/, '');
      return routeBase === basePath && r.hasParams;
    });
    if (matchingRoute) {
      return true;
    }
  }
  
  return false;
}

// تحويل template literal إلى pattern للتحقق
function templateToPattern(template) {
  return template.replace(/\$\{[^}]+\}/g, '[^/]+');
}

// الدالة الرئيسية
function analyzeRoutes() {
  const srcDir = path.join(__dirname, '..', 'src');
  const appDir = path.join(srcDir, 'app');
  
  console.log('🔍 Analyzing routes...\n');
  
  // استخراج جميع المسارات من app
  console.log('1. Extracting routes from src/app...');
  const appRoutes = extractAppRoutes(appDir);
  const pageRoutes = appRoutes.filter(r => r.type === 'page');
  console.log(`   Found ${appRoutes.length} total routes (${pageRoutes.length} pages)\n`);
  
  // البحث عن جميع الملفات التي تحتوي على روابط
  console.log('2. Finding files with links...');
  const linkFiles = findLinkFiles(srcDir);
  console.log(`   Found ${linkFiles.length} files with links\n`);
  
  // استخراج جميع المسارات المستخدمة
  console.log('3. Extracting used routes...');
  const usedRoutes = [];
  const fileErrors = [];
  
  for (const file of linkFiles) {
    try {
      const routes = extractRoutesFromFile(file);
      usedRoutes.push(...routes);
    } catch (error) {
      fileErrors.push({ file, error: error.message });
    }
  }
  
  if (fileErrors.length > 0) {
    console.log(`   ⚠️  ${fileErrors.length} files had errors (skipped)\n`);
  }
  
  console.log(`   Found ${usedRoutes.length} route usages\n`);
  
  // تحليل المسارات
  console.log('4. Analyzing routes...');
  
  // تجميع المسارات الفريدة مع معلومات الاستخدام
  const routeMap = new Map();
  
  for (const route of usedRoutes) {
    const key = route.path || route.cleanPath || '';
    if (!key) continue;
    
    if (!routeMap.has(key)) {
      routeMap.set(key, {
        path: route.path,
        cleanPath: route.cleanPath || route.path,
        isDynamic: route.isDynamic || key.includes('${'),
        usages: []
      });
    }
    
    routeMap.get(key).usages.push({
      file: path.relative(process.cwd(), route.file),
      type: route.type,
      line: route.line,
      context: route.context
    });
  }
  
  const uniqueRoutes = Array.from(routeMap.values());
  
  // تصنيف المسارات
  const brokenRoutes = [];
  const validRoutes = [];
  const externalRoutes = [];
  const dynamicRoutes = [];
  const specialRoutes = [];
  
  for (const route of uniqueRoutes) {
    const pathToCheck = route.cleanPath || route.path;
    
    // تخطي الروابط الخارجية
    if (pathToCheck.startsWith('http://') || 
        pathToCheck.startsWith('https://') || 
        pathToCheck.startsWith('mailto:') || 
        pathToCheck.startsWith('tel:') ||
        pathToCheck.startsWith('//')) {
      externalRoutes.push(route);
      continue;
    }
    
    // تخطي الروابط الخاصة (anchors)
    if (pathToCheck.startsWith('#') || pathToCheck === '') {
      specialRoutes.push(route);
      continue;
    }
    
    // المسار الجذر
    if (pathToCheck === '/' || pathToCheck === '') {
      if (appRoutes.some(r => r.path === '/')) {
        validRoutes.push(route);
      } else {
        brokenRoutes.push(route);
      }
      continue;
    }
    
    // التحقق من وجود المسار
    const exists = routeExists(pathToCheck, appRoutes);
    
    if (exists) {
      validRoutes.push(route);
    } else if (route.isDynamic || pathToCheck.includes('${')) {
      // للمسارات الديناميكية، نتحقق من وجود قاعدة المسار
      const basePath = pathToCheck.split('${')[0].split('*')[0].replace(/\/$/, '');
      const baseExists = appRoutes.some(r => {
        const routeBase = r.path.split('[')[0].replace(/\/$/, '');
        return routeBase === basePath || r.path.startsWith(basePath);
      });
      
      if (baseExists) {
        dynamicRoutes.push(route);
        validRoutes.push(route); // نعتبرها صحيحة لأنها ديناميكية
      } else {
        brokenRoutes.push(route);
      }
    } else {
      brokenRoutes.push(route);
    }
  }
  
  // البحث عن المسارات غير المستخدمة
  console.log('5. Finding unused routes...');
  const unusedRoutes = [];
  
  for (const appRoute of pageRoutes) {
    // تخطي صفحات خاصة
    if (appRoute.path.includes('_not-found') || 
        appRoute.path.includes('_error') ||
        appRoute.path.includes('layout')) {
      continue;
    }
    
    // التحقق من الاستخدام
    const isUsed = uniqueRoutes.some(usedRoute => {
      const usedPath = usedRoute.cleanPath || usedRoute.path;
      
      // تطابق مباشر
      if (usedPath === appRoute.path) {
        return true;
      }
      
      // تطابق مع dynamic routes
      if (appRoute.hasParams) {
        const pattern = appRoute.path
          .replace(/\[([^\]]+)\]/g, '([^/]+)')
          .replace(/\//g, '\\/');
        try {
          const regex = new RegExp(`^${pattern}$`);
          if (regex.test(cleanRoute(usedPath))) {
            return true;
          }
        } catch (error) {
          // تخطي
        }
      }
      
      // تطابق قاعدة المسار للـ template literals
      if (usedPath.includes('${')) {
        const basePath = usedPath.split('${')[0].replace(/\/$/, '');
        const routeBase = appRoute.path.split('[')[0].replace(/\/$/, '');
        if (basePath === routeBase) {
          return true;
        }
      }
      
      return false;
    });
    
    if (!isUsed) {
      unusedRoutes.push(appRoute);
    }
  }
  
  // إنشاء التقرير
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalAppRoutes: appRoutes.length,
      totalPageRoutes: pageRoutes.length,
      totalUsedRoutes: uniqueRoutes.length,
      validRoutes: validRoutes.length,
      brokenRoutes: brokenRoutes.length,
      unusedRoutes: unusedRoutes.length,
      externalRoutes: externalRoutes.length,
      dynamicRoutes: dynamicRoutes.length,
      specialRoutes: specialRoutes.length
    },
    brokenRoutes: brokenRoutes.map(br => ({
      path: br.path,
      cleanPath: br.cleanPath,
      isDynamic: br.isDynamic,
      usages: br.usages,
      issue: 'Route not found in app directory'
    })),
    unusedRoutes: unusedRoutes.map(ur => ({
      path: ur.path,
      file: path.relative(process.cwd(), ur.file),
      hasParams: ur.hasParams,
      issue: 'Route exists but not referenced in code'
    })),
    validRoutes: validRoutes.length,
    dynamicRoutes: dynamicRoutes.map(dr => ({
      path: dr.path,
      cleanPath: dr.cleanPath,
      usages: dr.usages.length
    })),
    allAppRoutes: pageRoutes.map(ar => ({
      path: ar.path,
      file: path.relative(process.cwd(), ar.file),
      hasParams: ar.hasParams
    })),
    allUsedRoutes: uniqueRoutes.map(route => ({
      path: route.path,
      cleanPath: route.cleanPath,
      isDynamic: route.isDynamic,
      usageCount: route.usages.length,
      files: [...new Set(route.usages.map(u => u.file))]
    }))
  };
  
  // حفظ التقرير
  const reportPath = path.join(__dirname, '..', 'ROUTES_ANALYSIS.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('\n✅ Analysis complete!');
  console.log("   📄 Report saved to ROUTES_ANALYSIS.json\n");
  
  // طباعة الملخص
  console.log('📊 Summary:');
  console.log(`   Total app routes: ${report.summary.totalAppRoutes} (${report.summary.totalPageRoutes} pages)`);
  console.log(`   Total used routes: ${report.summary.totalUsedRoutes}`);
  console.log(`   ✅ Valid routes: ${report.summary.validRoutes}`);
  console.log(`   🔄 Dynamic routes: ${report.summary.dynamicRoutes}`);
  console.log(`   ❌ Broken routes: ${report.summary.brokenRoutes}`);
  console.log(`   ⚠️  Unused routes: ${report.summary.unusedRoutes}`);
  console.log(`   🔗 External routes: ${report.summary.externalRoutes}`);
  console.log(`   # Special routes: ${report.summary.specialRoutes}`);
  
  if (brokenRoutes.length > 0) {
    console.log('\n❌ Broken Routes (first 20):');
    brokenRoutes.slice(0, 20).forEach(br => {
      console.log(`   - ${br.path || br.cleanPath}`);
      br.usages.slice(0, 2).forEach(u => {
        console.log(`     → ${u.file}:${u.line} (${u.type})`);
      });
      if (br.usages.length > 2) {
        console.log(`     ... and ${br.usages.length - 2} more`);
      }
    });
    if (brokenRoutes.length > 20) {
      console.log(`   ... and ${brokenRoutes.length - 20} more broken routes`);
    }
  }
  
  if (unusedRoutes.length > 0) {
    console.log('\n⚠️  Unused Routes (first 20):');
    unusedRoutes.slice(0, 20).forEach(ur => {
      console.log(`   - ${ur.path} (${path.relative(process.cwd(), ur.file)})`);
    });
    if (unusedRoutes.length > 20) {
      console.log(`   ... and ${unusedRoutes.length - 20} more unused routes`);
    }
  }
  
  return report;
}

// تشغيل التحليل
if (require.main === module) {
  analyzeRoutes();
}

module.exports = { analyzeRoutes };

