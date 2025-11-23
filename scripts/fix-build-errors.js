
/**
 * سكريبت إصلاح أخطاء البناء التلقائي
 * يصلح جميع أخطاء الاستيراد والمسارات تلقائياً
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// الأخطاء الشائعة والحلول
const FIXES = [
  {
    name: 'ProgressRing Import Fix',
    description: 'إصلاح استيراد ProgressRing',
    fix: () => {
      // إنشاء ملف ProgressRing في ui/ يعيد التصدير من CourseCard
      const progressRingPath = path.join(SRC_DIR, 'components', 'ui', 'ProgressRing.tsx');
      const sourcePath = path.join(SRC_DIR, 'components', 'CourseCard', 'ProgressRing.tsx');
      
      if (!fs.existsSync(progressRingPath) && fs.existsSync(sourcePath)) {
        // التحقق من نوع التصدير في الملف الأصلي
        const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
        const isDefaultExport = sourceContent.includes('export default');
        
        let content;
        if (isDefaultExport) {
          content = `// Re-export ProgressRing from CourseCard (default export)
export { default as ProgressRing } from '@/components/CourseCard/ProgressRing';
export type { ProgressRingProps } from '@/components/CourseCard/ProgressRing';
`;
        } else {
          content = `// Re-export ProgressRing from CourseCard
export { ProgressRing } from '@/components/CourseCard/ProgressRing';
export type { ProgressRingProps } from '@/components/CourseCard/ProgressRing';
`;
        }
        
        fs.writeFileSync(progressRingPath, content, 'utf-8');
        console.log('✅ تم إنشاء ProgressRing.tsx في ui/');
      } else if (fs.existsSync(progressRingPath)) {
        // تحديث الملف الموجود
        const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
        const isDefaultExport = sourceContent.includes('export default');
        const currentContent = fs.readFileSync(progressRingPath, 'utf-8');
        
        if (isDefaultExport && !currentContent.includes('default as ProgressRing')) {
          const content = `// Re-export ProgressRing from CourseCard (default export)
export { default as ProgressRing } from '@/components/CourseCard/ProgressRing';
export type { ProgressRingProps } from '@/components/CourseCard/ProgressRing';
`;
          fs.writeFileSync(progressRingPath, content, 'utf-8');
          console.log('✅ تم تحديث ProgressRing.tsx في ui/');
        }
      }
    }
  },
  {
    name: 'Fix Missing Exports in ui/index.ts',
    description: 'إصلاح التصديرات المفقودة في ui/index.ts',
    fix: () => {
      const indexPath = path.join(SRC_DIR, 'components', 'ui', 'index.ts');
      if (!fs.existsSync(indexPath)) return;

      let content = fs.readFileSync(indexPath, 'utf-8');
      let modified = false;

      // إصلاح ProgressRing export
      if (content.includes("export { ProgressRing } from './ProgressRing';")) {
        // التحقق من وجود الملف
        const progressRingPath = path.join(SRC_DIR, 'components', 'ui', 'ProgressRing.tsx');
        if (!fs.existsSync(progressRingPath)) {
          // استبدال بالمسار الصحيح
          content = content.replace(
            "export { ProgressRing } from './ProgressRing';",
            "export { ProgressRing } from '@/components/CourseCard/ProgressRing';"
          );
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(indexPath, content, 'utf-8');
        console.log('✅ تم إصلاح ui/index.ts');
      }
    }
  },
  {
    name: 'Fix Import Paths',
    description: 'إصلاح مسارات الاستيراد الخاطئة',
    fix: () => {
      const filesToFix = [
        'src/components/dashboard/AcademicDashboardEnhanced.tsx',
        'src/components/dashboard/AcademicDashboard.tsx',
      ];

      filesToFix.forEach(filePath => {
        const fullPath = path.join(PROJECT_ROOT, filePath);
        if (!fs.existsSync(fullPath)) return;

        let content = fs.readFileSync(fullPath, 'utf-8');
        let modified = false;

        // إصلاح استيراد ProgressRing
        if (content.includes("@/components/ui/ProgressRing")) {
          const progressRingPath = path.join(SRC_DIR, 'components', 'ui', 'ProgressRing.tsx');
          if (fs.existsSync(progressRingPath)) {
            // الملف موجود، لا حاجة للتغيير
          } else {
            // استبدال بالمسار الصحيح
            content = content.replace(
              /@\/components\/ui\/ProgressRing/g,
              '@/components/CourseCard/ProgressRing'
            );
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`✅ تم إصلاح ${filePath}`);
        }
      });
    }
  },
  {
    name: 'Check All Import Paths',
    description: 'فحص وإصلاح جميع مسارات الاستيراد',
    fix: () => {
      const extensions = ['.ts', '.tsx', '.js', '.jsx'];
      const files = [];

      // جمع جميع الملفات
      function collectFiles(dir) {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            // تخطي node_modules و .next
            if (!item.startsWith('.') && item !== 'node_modules') {
              collectFiles(fullPath);
            }
          } else if (extensions.some(ext => item.endsWith(ext))) {
            files.push(fullPath);
          }
        });
      }

      collectFiles(SRC_DIR);

      let fixedCount = 0;
      files.forEach(filePath => {
        try {
          let content = fs.readFileSync(filePath, 'utf-8');
          let modified = false;

          // إصلاح مسارات ProgressRing
          if (content.includes('ProgressRing')) {
            const progressRingUIPath = path.join(SRC_DIR, 'components', 'ui', 'ProgressRing.tsx');
            const progressRingCardPath = path.join(SRC_DIR, 'components', 'CourseCard', 'ProgressRing.tsx');
            
            // إذا كان يحاول استيراد من ui/ProgressRing لكن الملف غير موجود
            if (content.includes("@/components/ui/ProgressRing") && !fs.existsSync(progressRingUIPath)) {
              if (fs.existsSync(progressRingCardPath)) {
                content = content.replace(
                  /@\/components\/ui\/ProgressRing/g,
                  '@/components/CourseCard/ProgressRing'
                );
                modified = true;
              }
            }
          }

          if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            fixedCount++;
          }
        } catch (error) {
          // تجاهل الأخطاء في الملفات التي لا يمكن قراءتها
        }
      });

      if (fixedCount > 0) {
        console.log(`✅ تم إصلاح ${fixedCount} ملف`);
      }
    }
  },
  {
    name: 'Create Missing MotionWrapper Export',
    description: 'إنشاء تصدير MotionWrapper إذا كان مفقوداً',
    fix: () => {
      const motionWrapperPath = path.join(SRC_DIR, 'components', 'ui', 'motion', 'MotionWrapper.tsx');
      const indexPath = path.join(SRC_DIR, 'components', 'ui', 'index.ts');
      
      if (fs.existsSync(motionWrapperPath) && fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf-8');
        
        // التحقق من وجود تصدير MotionWrapper
        if (!content.includes("from './motion/MotionWrapper'") && 
            !content.includes("from './motion'")) {
          // إضافة التصدير
          const exportLine = "export { MotionWrapper } from './motion/MotionWrapper';\n";
          content = exportLine + content;
          fs.writeFileSync(indexPath, content, 'utf-8');
          console.log('✅ تم إضافة تصدير MotionWrapper');
        }
      }
    }
  },
  {
    name: 'Fix TypeScript Type Exports',
    description: 'إصلاح تصديرات الأنواع',
    fix: () => {
      const files = [
        path.join(SRC_DIR, 'components', 'ui', 'index.ts'),
      ];

      files.forEach(filePath => {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;

        // إصلاح التصديرات المكررة أو الخاطئة
        const duplicatePattern = /export\s+{\s*MotionWrapper[^}]*}\s+from\s+['"]\.\/motion['"];?\s*\n\s*export\s+{\s*MotionWrapper[^}]*}\s+from\s+['"]\.\/motion\/MotionWrapper['"];?/g;
        if (duplicatePattern.test(content)) {
          content = content.replace(
            /export\s+{\s*MotionWrapper[^}]*}\s+from\s+['"]\.\/motion['"];?\s*\n\s*/g,
            ''
          );
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log('✅ تم إصلاح التصديرات المكررة');
        }
      });
    }
  },
  {
    name: 'Fix Input.tsx motion.input Type Error',
    description: 'إصلاح خطأ الأنواع في Input.tsx',
    fix: () => {
      const inputPath = path.join(SRC_DIR, 'components', 'ui', 'Input.tsx');
      if (!fs.existsSync(inputPath)) return;

      let content = fs.readFileSync(inputPath, 'utf-8');
      let modified = false;

      // إصلاح motion.input - استبداله بـ input عادي مع motion wrapper
      if (content.includes('<motion.input')) {
        // استخراج جميع props من motion.input
        const motionInputMatch = content.match(/<motion\.input([\s\S]*?)\/>/);
        if (motionInputMatch) {
          const props = motionInputMatch[1];
          
          // إزالة whileFocus من props لأنه يسبب المشكلة
          const propsWithoutWhileFocus = props.replace(/whileFocus=\{[\s\S]*?\}/g, '');
          
          // استبدال motion.input بـ input عادي
          content = content.replace(
            /<motion\.input([\s\S]*?)\/>/,
            `<input${propsWithoutWhileFocus} />`
          );
          
          // إضافة motion wrapper حول input إذا لزم الأمر
          // لكن في هذه الحالة سنستخدم input عادي مع CSS transitions
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(inputPath, content, 'utf-8');
        console.log('✅ تم إصلاح Input.tsx');
      }
    }
  },
  {
    name: 'Fix ProgressRing size prop type errors',
    description: 'إصلاح أخطاء نوع size في ProgressRing',
    fix: () => {
      const extensions = ['.ts', '.tsx'];
      const files = [];

      function collectFiles(dir) {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            if (!item.startsWith('.') && item !== 'node_modules') {
              collectFiles(fullPath);
            }
          } else if (extensions.some(ext => item.endsWith(ext))) {
            files.push(fullPath);
          }
        });
      }

      collectFiles(SRC_DIR);

      let fixedCount = 0;
      files.forEach(filePath => {
        try {
          let content = fs.readFileSync(filePath, 'utf-8');
          let modified = false;

          // إصلاح size="lg" أو size="md" أو size="sm" في ProgressRing
          // size يجب أن يكون number وليس string
          if (content.includes('ProgressRing') && content.includes('size=')) {
            // استبدال size="lg" بـ size={64}
            content = content.replace(
              /<ProgressRing([^>]*?)size=["']lg["']([^>]*?)>/g,
              '<ProgressRing$1size={64}$2>'
            );
            
            // استبدال size="md" بـ size={48}
            content = content.replace(
              /<ProgressRing([^>]*?)size=["']md["']([^>]*?)>/g,
              '<ProgressRing$1size={48}$2>'
            );
            
            // استبدال size="sm" بـ size={32}
            content = content.replace(
              /<ProgressRing([^>]*?)size=["']sm["']([^>]*?)>/g,
              '<ProgressRing$1size={32}$2>'
            );

            if (content !== fs.readFileSync(filePath, 'utf-8')) {
              modified = true;
            }
          }

          if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            fixedCount++;
          }
        } catch (error) {
          // تجاهل الأخطاء
        }
      });

      if (fixedCount > 0) {
        console.log(`✅ تم إصلاح ${fixedCount} ملف (ProgressRing size)`);
      }
    }
  }
];

// تنفيذ جميع الإصلاحات
console.log('🔧 بدء إصلاح أخطاء البناء...\n');

FIXES.forEach((fix, index) => {
  try {
    console.log(`[${index + 1}/${FIXES.length}] ${fix.name}...`);
    fix.fix();
  } catch (error) {
    console.error(`❌ خطأ في ${fix.name}:`, error.message);
  }
});

console.log('\n✅ تم الانتهاء من جميع الإصلاحات!');
console.log('\n💡 جرب البناء مرة أخرى: npm run build\n');

