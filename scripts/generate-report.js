import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load analysis results
const analysisData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'PROJECT_ANALYSIS.json'), 'utf8'));
const oldAnalysisData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'COMPONENTS_STYLES_ANALYSIS.json'), 'utf8'));
const dependencyAnalysis = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'DEPENDENCY_ANALYSIS.json'), 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

// Get current date
const currentDate = new Date().toLocaleDateString('ar-EG', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

// Filter duplicates (exclude page.tsx and layout.tsx as they are Next.js conventions)
const significantDuplicates = analysisData.duplicates.byName.filter(d => 
  !d.name.includes('page.tsx') && 
  !d.name.includes('layout.tsx') &&
  !d.name.includes('route.ts') &&
  !d.name.includes('error.tsx') &&
  !d.name.includes('loading.tsx')
);

// Generate report
function generateReport() {
  // Ensure packageJson and dependencyAnalysis are available in the function scope
  const depsCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepsCount = Object.keys(packageJson.devDependencies || {}).length;
  
  let report = `# تقرير فحص الملفات - 📅 ${currentDate}

## 📁 الملخص العام:

- **إجمالي الملفات المفحوصة:** ${analysisData.stats.totalFiles} ملف
- **الحجم الإجمالي:** ${(analysisData.stats.totalSize / 1024 / 1024).toFixed(2)} MB
- **الملفات المكررة بالاسم:** ${significantDuplicates.length} مجموعة (${significantDuplicates.reduce((sum, d) => sum + d.count, 0)} ملف)
- **الملفات المكررة بالمحتوى:** ${analysisData.duplicates.byContent.length} مجموعة
- **الملفات القديمة:** ${analysisData.oldFiles.length} ملف (أقدم من 6 أشهر)
- **الملفات غير المستخدمة:** ${analysisData.unusedFiles.length} ملف
- **التعارضات المكتشفة:** ${analysisData.conflicts.naming.length} تعارض في الأسماء
- **Imports المكسورة:** ${analysisData.conflicts.imports.length} import

---

## 🔍 التفاصيل:

### 1. الملفات المكررة بالاسم (باستثناء ملفات Next.js القياسية):

`;

  // Add significant duplicates
  significantDuplicates.forEach((dup, index) => {
    report += `#### ${index + 1}. ${dup.name}\n\n`;
    report += `**عدد الملفات:** ${dup.count}\n\n`;
    report += "| # | المسار | الحجم | آخر تعديل |\n";
    report += "|---|--------|-------|-----------|\n";
    dup.files.forEach((file, idx) => {
      const sizeKB = (file.size / 1024).toFixed(2);
      const date = new Date(file.modified).toLocaleDateString('ar-EG');
      report += `| ${idx + 1} | \`${file.path}\` | ${sizeKB} KB | ${date} |\n`;
    });
    report += "\n";
  });

  // Add duplicates by content
  report += "### 2. الملفات المكررة بالمحتوى (متطابقة تماماً):\n\n";
  if (analysisData.duplicates.byContent.length > 0) {
    analysisData.duplicates.byContent.forEach((dup, index) => {
      report += `#### ${index + 1}. Hash: ${dup.hash.substring(0, 8)}...\n\n`;
      report += `**عدد الملفات:** ${dup.count} | **الحجم الإجمالي:** ${(dup.totalSize / 1024).toFixed(2)} KB\n\n`;
      report += "| # | المسار | الحجم |\n";
      report += "|---|--------|-------|\n";
      dup.files.forEach((file, idx) => {
        const sizeKB = (file.size / 1024).toFixed(2);
        report += `| ${idx + 1} | \`${file.path}\` | ${sizeKB} KB |\n`;
      });
      report += "\n";
    });
  } else {
    report += "✅ لا توجد ملفات مكررة بالمحتوى.\n\n";
  }

  // Add old files (top 20)
  report += "### 3. الملفات القديمة (أقدم 20 ملف - أكثر من 6 أشهر):\n\n";
  const oldFiles = analysisData.oldFiles.slice(0, 20);
  if (oldFiles.length > 0) {
    report += "| # | المسار | العمر (أيام) | آخر تعديل |\n";
    report += "|---|--------|---------------|-----------|\n";
    oldFiles.forEach((file, index) => {
      const date = new Date(file.modified).toLocaleDateString('ar-EG');
      report += `| ${index + 1} | \`${file.path}\` | ${file.ageInDays} | ${date} |\n`;
    });
    report += "\n";
  } else {
    report += "✅ لا توجد ملفات قديمة (أحدث من 6 أشهر).\n\n";
  }

  // Add unused files (top 30)
  report += "### 4. الملفات غير المستخدمة (أول 30 ملف):\n\n";
  const unusedFiles = analysisData.unusedFiles.slice(0, 30);
  if (unusedFiles.length > 0) {
    report += "| # | المسار | الحجم |\n";
    report += "|---|--------|-------|\n";
    unusedFiles.forEach((file, index) => {
      const sizeKB = (file.size / 1024).toFixed(2);
      report += `| ${index + 1} | \`${file.path}\` | ${sizeKB} KB |\n`;
    });
    report += "\n";
    if (analysisData.unusedFiles.length > 30) {
      report += `*ملاحظة: يوجد ${analysisData.unusedFiles.length - 30} ملف غير مستخدم إضافي. راجع ملف PROJECT_ANALYSIS.json للحصول على القائمة الكاملة.*\n\n`;
    }
  } else {
    report += "✅ جميع الملفات مستخدمة.\n\n";
  }

  // Add naming conflicts
  report += "### 5. تعارضات الأسماء:\n\n";
  if (analysisData.conflicts.naming.length > 0) {
    analysisData.conflicts.naming.forEach((conflict, index) => {
      report += `#### ${index + 1}. ${conflict.name}\n\n`;
      report += `**عدد المواقع:** ${conflict.count}\n\n`;
      report += "| # | المسار | النوع |\n";
      report += "|---|--------|-------|\n";
      conflict.exports.forEach((exp, idx) => {
        report += `| ${idx + 1} | \`${exp.path}\` | ${exp.type} |\n`;
      });
      report += "\n";
    });
  } else {
    report += "✅ لا توجد تعارضات في الأسماء.\n\n";
  }

  // Add broken imports
  if (analysisData.conflicts.imports.length > 0) {
    report += "### 6. Imports المكسورة:\n\n";
    report += "| # | الملف | Import |\n";
    report += "|---|-------|--------|\n";
    analysisData.conflicts.imports.slice(0, 20).forEach((imp, index) => {
      report += `| ${index + 1} | \`${imp.file}\` | \`${imp.import}\` |\n`;
    });
    report += "\n";
  }

  // Add recommendations
  report += `---

## 💡 التوصيات:

### الملفات المقترحة للحذف:\n\n`;

  // Files to delete
  const filesToDelete = [
    ...analysisData.duplicates.byContent.flatMap(d => d.files.slice(1).map(f => f.path)), // Keep first, delete rest
    ...unusedFiles.slice(0, 20).map(f => f.path), // Top 20 unused
  ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

  filesToDelete.slice(0, 20).forEach((file, index) => {
    report += `${index + 1}. \`${file}\`\n`;
  });

  report += "\n### الملفات المقترحة للدمج:\n\n";

  // Files to merge
  const filesToMerge = significantDuplicates.filter(d => d.count > 2).slice(0, 10);
  filesToMerge.forEach((dup, index) => {
    report += `${index + 1}. **${dup.name}** - ${dup.count} نسخة في:\n`;
    dup.files.forEach((file) => {
      report += `   - \`${file.path}\`\n`;
    });
    report += "   *اقتراح: دمج في نسخة واحدة مع الاحتفاظ بالنسخة الأحدث*\n\n";
  });

  report += "\n### الملفات المقترحة للتحديث:\n\n";

  // Files to update
  const filesToUpdate = analysisData.oldFiles
    .filter(f => f.ageInDays > 365)
    .slice(0, 10)
    .map(f => f.path);

  if (filesToUpdate.length > 0) {
    filesToUpdate.forEach((file, index) => {
      report += `${index + 1}. \`${file}\` - قديم جداً (أكثر من سنة)\n`;
    });
  } else {
    report += "✅ لا توجد ملفات قديمة جداً تحتاج للتحديث.\n";
  }

  // Add Dependencies Analysis
  report += "\n---\n\n### 7. تحليل Dependencies و Package.json:\n\n";
  report += "#### ✅ الحالة العامة:\n\n";
  report += `- **إجمالي Dependencies:** ${depsCount} حزمة\n`;
  report += `- **إجمالي DevDependencies:** ${devDepsCount} حزمة\n`;
  report += `- **التعارضات في الإصدارات:** ${dependencyAnalysis.conflicts.length} تعارض\n`;
  report += `- **الحزم القديمة:** ${dependencyAnalysis.outdated.length} حزمة\n`;
  report += `- **التكرار:** ${dependencyAnalysis.duplicate.length} حزمة مكررة\n\n`;
  report += "#### 📋 ملاحظات مهمة:\n\n";
  
  if (dependencyAnalysis.outdated.length > 0) {
    dependencyAnalysis.outdated.forEach((pkg, index) => {
      report += `${index + 1}. **${pkg.name}:** الإصدار الحالي (${pkg.current}) قديم - يُنصح بالتحديث إلى ${pkg.recommended}\n`;
    });
  } else {
    report += "1. ✅ جميع الحزم محدثة إلى الإصدارات الموصى بها\n";
  }
  
  if (dependencyAnalysis.conflicts.length > 0) {
    dependencyAnalysis.conflicts.forEach((conflict, index) => {
      report += `${index + 1}. ⚠️ **${conflict.type}:** ${conflict.issue} - ${conflict.packages.join(' و ')}\n`;
    });
  } else {
    report += "2. ✅ لا توجد تعارضات في الإصدارات\n";
  }
  
  if (dependencyAnalysis.duplicate.length > 0) {
    report += `3. ⚠️ **حزم مكررة:** تم العثور على ${dependencyAnalysis.duplicate.length} حزمة موجودة في dependencies و devDependencies:\n`;
    dependencyAnalysis.duplicate.forEach((dup, index) => {
      report += `   - ${dup.name} (${dup.inDependencies} في dependencies, ${dup.inDevDependencies} في devDependencies)\n`;
    });
  } else {
    report += "3. ✅ لا توجد حزم مكررة في dependencies و devDependencies\n";
  }

  report += `\n---

## 📊 إحصائيات إضافية:

- **متوسط حجم الملف:** ${(analysisData.stats.totalSize / analysisData.stats.totalFiles / 1024).toFixed(2)} KB
- **أكبر ملف:** ${Math.max(...analysisData.duplicates.byName.flatMap(d => d.files.map(f => f.size))) / 1024} KB
- **نسبة الملفات المكررة:** ${((significantDuplicates.reduce((sum, d) => sum + d.count, 0) / analysisData.stats.totalFiles) * 100).toFixed(2)}%
- **نسبة الملفات غير المستخدمة:** ${((analysisData.unusedFiles.length / analysisData.stats.totalFiles) * 100).toFixed(2)}%

---

## 📝 ملاحظات:

1. **ملفات Next.js القياسية:** تم استبعاد ملفات \`page.tsx\` و \`layout.tsx\` من تحليل الملفات المكررة لأنها مطلوبة من Next.js.
2. **التحليل التلقائي:** بعض الملفات قد تظهر كغير مستخدمة لكنها قد تُستخدم ديناميكياً أو في runtime.
3. **التوصيات:** راجع الملفات المقترحة للحذف بعناية قبل الحذف الفعلي.

---

**تاريخ التقرير:** ${currentDate}  
**أداة التحليل:** Project Analysis Script  
**الإصدار:** 1.0.0
`;

  return report;
}

// Generate and save report
const report = generateReport();
const reportPath = path.join(__dirname, '..', 'PROJECT_ANALYSIS_REPORT.md');
fs.writeFileSync(reportPath, report, 'utf8');

console.log('✅ تم إنشاء التقرير بنجاح في:', reportPath);
console.log('\n📊 ملخص النتائج:');
console.log(`- الملفات المكررة بالاسم: ${significantDuplicates.length} مجموعة`);
console.log(`- الملفات المكررة بالمحتوى: ${analysisData.duplicates.byContent.length} مجموعة`);
console.log(`- الملفات غير المستخدمة: ${analysisData.unusedFiles.length} ملف`);
console.log(`- تعارضات الأسماء: ${analysisData.conflicts.naming.length} تعارض`);

