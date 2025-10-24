const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * سكريبت ضغط الصور لمنصة خطى التعليمية
 * يقوم بضغط جميع الصور في المشروع مع الحفاظ على الجودة
 */

// مجلدات الصور المراد ضغطها
const imageDirs = [
  'public',
  'src/assets'
];

// أنواع الصور المدعومة
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// إعدادات الضغط لكل نوع
const compressionSettings = {
  jpg: { quality: 70, progressive: true },
  jpeg: { quality: 70, progressive: true },
  png: { quality: 70, compressionLevel: 8 },
  webp: { quality: 75, effort: 6 },
  avif: { quality: 65, effort: 6 }
};

// إعدادات خاصة للصور الكبيرة (أكبر من 500KB)
const largeImageSettings = {
  jpg: { quality: 60, progressive: true },
  jpeg: { quality: 60, progressive: true },
  png: { quality: 60, compressionLevel: 9 },
  webp: { quality: 65, effort: 6 },
  avif: { quality: 55, effort: 6 }
};

/**
 * الحصول على جميع ملفات الصور في مجلد معين
 */
function getImageFiles(dir) {
  const files = [];

  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // تجاهل مجلد node_modules
        if (item !== 'node_modules') {
          scanDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (supportedFormats.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  scanDirectory(dir);
  return files;
}

/**
 * ضغط صورة واحدة
 */
async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase().slice(1);
  const inputSize = fs.statSync(inputPath).size;
  const isLargeImage = inputSize > 500 * 1024; // أكبر من 500KB

  // اختيار إعدادات الضغط المناسبة
  const settings = isLargeImage ? largeImageSettings[ext] : compressionSettings[ext];

  if (!settings) {
    console.log(`⚠️  تم تخطي الصورة: ${inputPath} (نوع غير مدعوم)`);
    return;
  }

  try {
    let pipeline = sharp(inputPath);

    // تطبيق إعدادات الضغط حسب النوع
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        pipeline = pipeline.jpeg(settings);
        break;
      case 'png':
        pipeline = pipeline.png(settings);
        break;
      case 'webp':
        pipeline = pipeline.webp(settings);
        break;
      case 'avif':
        pipeline = pipeline.avif(settings);
        break;
    }

    await pipeline.toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    console.log(`✅ تم ضغط: ${path.relative(process.cwd(), inputPath)}`);
    console.log(`   الحجم الأصلي: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   الحجم الجديد: ${(outputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   التوفير: ${savings}% ${isLargeImage ? '(صورة كبيرة)' : ''}`);

    // استبدال الصورة الأصلية بالمضغوطة
    fs.renameSync(outputPath, inputPath);

  } catch (error) {
    console.error(`❌ خطأ في ضغط الصورة: ${inputPath}`, error.message);
  }
}

/**
 * ضغط جميع الصور في المشروع
 */
async function optimizeAllImages() {
  console.log('🚀 بدء عملية ضغط الصور...\n');

  let totalImages = 0;
  let totalSavings = 0;

  for (const dir of imageDirs) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  المجلد غير موجود: ${dir}`);
      continue;
    }

    console.log(`📁 معالجة مجلد: ${dir}`);
    const images = getImageFiles(dir);

    if (images.length === 0) {
      console.log(`   لا توجد صور في هذا المجلد\n`);
      continue;
    }

    console.log(`   تم العثور على ${images.length} صورة\n`);

    for (const imagePath of images) {
      const tempPath = imagePath + '.temp';
      await optimizeImage(imagePath, tempPath);
      totalImages++;
    }

    console.log('');
  }

  console.log(`🎉 تم الانتهاء من ضغط ${totalImages} صورة!`);
  console.log('💡 نصيحة: تأكد من اختبار الصور بعد الضغط للتأكد من عدم فقدان الجودة');
}

// تشغيل السكريبت
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeAllImages, optimizeImage, getImageFiles };
