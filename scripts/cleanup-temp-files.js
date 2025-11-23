
/**
 * حذف ملفات node الزائدة والتقارير الجديدة المؤقتة
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');

// ملفات node الزائدة
const NODE_TEMP_FILES = [
  'debug.log',
  '*.log',
  '.next',
  'node_modules/.cache',
];

// التقارير الجديدة المؤقتة (يمكن إعادة إنشائها)
const TEMP_REPORTS = [
  // تقارير المراحل
  'PHASE1_RESULTS.md',
  'PHASE2_RESULTS.md',
  'PHASE3_RESULTS.md',
  'PHASE1_SUMMARY.md',
  'DOCUMENTATION_CLEANUP_SUMMARY.md',
  
  // ملفات JSON للتحليل
  'PHASE1_ANALYSIS.json',
  'PHASE2_DELETION_RESULTS.json',
  'PHASE3_RESOLUTION_RESULTS.json',
  'DOCUMENTATION_CLEANUP_RESULTS.json',
  
  // السكريبتات المؤقتة
  'scripts/phase1-deep-analysis.js',
  'scripts/phase2-delete-unused.js',
  'scripts/phase3-resolve-conflicts.js',
  'scripts/verify-suspicious-components.js',
  'scripts/cleanup-documentation.js',
  'scripts/cleanup-temp-files.js', // هذا السكريبت نفسه
];

// ملفات مهمة يجب الاحتفاظ بها
const KEEP_FILES = [
  'COMPONENTS_STYLES_CLEANUP_REPORT.md',
  'COMPONENTS_STYLES_ANALYSIS.json',
  'CLEANUP_QUICK_REFERENCE.md',
  'README.md',
];

function deleteFile(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  
  if (!fs.existsSync(fullPath)) {
    return { success: false, reason: 'not_found' };
  }

  try {
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
    console.log(`✅ تم حذف: ${filePath}`);
    return { success: true, file: filePath };
  } catch (error) {
    console.error(`❌ خطأ في حذف ${filePath}:`, error.message);
    return { success: false, reason: error.message };
  }
}

function main() {
  console.log('🧹 تنظيف ملفات node الزائدة والتقارير المؤقتة...\n');
  console.log('='.repeat(60));
  console.log('⚠️  تحذير: سيتم حذف الملفات المؤقتة!\n');

  const results = {
    timestamp: new Date().toISOString(),
    deleted: [],
    failed: [],
    skipped: [],
  };

  // حذف ملفات node الزائدة
  console.log('📋 حذف ملفات node الزائدة:\n');
  for (const file of NODE_TEMP_FILES) {
    // Skip wildcards for now, handle specific files
    if (file === '*.log' || file.includes('*')) {
      // Find all .log files
      try {
        const files = fs.readdirSync(PROJECT_ROOT);
        const logFiles = files.filter(f => f.endsWith('.log') && f !== 'package-lock.json');
        for (const logFile of logFiles) {
          const result = deleteFile(logFile);
          if (result.success) {
            results.deleted.push(logFile);
          } else if (result.reason === 'not_found') {
            results.skipped.push(logFile);
          } else {
            results.failed.push({ file: logFile, reason: result.reason });
          }
        }
      } catch (e) {
        // Skip
      }
      continue;
    }
    
    const result = deleteFile(file);
    if (result.success) {
      results.deleted.push(file);
    } else if (result.reason === 'not_found') {
      results.skipped.push(file);
    } else {
      results.failed.push({ file, reason: result.reason });
    }
  }

  // حذف التقارير المؤقتة
  console.log('\n📋 حذف التقارير المؤقتة:\n');
  for (const file of TEMP_REPORTS) {
    // Skip this script until the end
    if (file === 'scripts/cleanup-temp-files.js') {
      continue;
    }
    
    const result = deleteFile(file);
    if (result.success) {
      results.deleted.push(file);
    } else if (result.reason === 'not_found') {
      results.skipped.push(file);
    } else {
      results.failed.push({ file, reason: result.reason });
    }
  }

  // حذف هذا السكريبت في النهاية
  console.log('\n📋 حذف سكريبت التنظيف:\n');
  const selfResult = deleteFile('scripts/cleanup-temp-files.js');
  if (selfResult.success) {
    results.deleted.push('scripts/cleanup-temp-files.js');
  }

  // حفظ النتائج (قبل حذف السكريبت)
  const reportPath = path.join(PROJECT_ROOT, 'TEMP_FILES_CLEANUP_RESULTS.json');
  try {
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  } catch (e) {
    // Skip if can't write
  }

  // ملخص
  console.log('\n' + '='.repeat(60));
  console.log('📊 ملخص التنظيف:\n');
  console.log(`✅ تم الحذف: ${results.deleted.length} ملف`);
  console.log(`⚠️  تم التخطي: ${results.skipped.length} ملف (غير موجود)`);
  console.log(`❌ فشل الحذف: ${results.failed.length} ملف`);
  console.log('='.repeat(60));
  console.log('\n📋 الملفات المحفوظة (مهمة):');
  KEEP_FILES.forEach(f => {
    const exists = fs.existsSync(path.join(PROJECT_ROOT, f));
    console.log(`   ${exists ? '✅' : '⚠️ '} ${f}`);
  });
  console.log('');

  return results;
}

if (require.main === module) {
  main();
}

module.exports = { main };

