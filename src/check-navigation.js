try {
    const fs = require('fs');
    const path = require('path');
    
    console.log('✅ فحص نظام الملاحة...\n');
    
    const pagesDir = 'src/app';
    
    function scanDirectory(dir, baseRoute = '') {
      const pages = [];
      try {
        const items = fs.readdirSync(dir);
  
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
  
          if (stat.isDirectory()) {
            const routeSegment = item === 'page.tsx' ? '' : item;
            const newRoute = baseRoute + (routeSegment ? `/${routeSegment}` : '');
  
            if (item === '[id]' || item === '[slug]') {
              return;
            }
  
            if (item !== 'api' && item !== 'assets') {
              pages.push(...scanDirectory(fullPath, newRoute));   
            }
          } else if (item === 'page.tsx') {
            pages.push({
              route: baseRoute || '/',
              path: fullPath,
              exists: true
            });
          }
        });
      } catch (error) {
        console.log('❌ خطأ في قراءة المجلد:', error.message);       
      }
      return pages;
    }
  
    const existingPages = scanDirectory(pagesDir);
  
    console.log('📄 الصفحات الموجودة:');
    console.log('═'.repeat(50));
    existingPages.forEach(page => {
      console.log(`  ✓ ${page.route} -> ${page.path}`);
    });
  
    console.log(`\n📊 إجمالي الصفحات الموجودة: ${existingPages.length}`);
  
    console.log('\n📁 المجلدات الرئيسية:');
    console.log('═'.repeat(50));
    const mainDirs = ['src/app', 'src/components', 'src/lib', 'src/styles'];
    mainDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const stats = fs.statSync(dir);
        console.log(`  ✓ ${dir} (${stats.isDirectory() ? 'مجلد' : 'ملف'})`);
      } else {
        console.log(`  ✗ ${dir} (مفقود)`);
      }
    });
  
  } catch (error) {
    console.log('❌ خطأ في الفحص:', error.message);
  }
  