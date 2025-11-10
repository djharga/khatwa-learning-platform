const fs = require('fs');
const path = require('path');

/**
 * سكريبت إصلاح الروابط المعطلة
 * يحل المشاكل الشائعة في الروابط والمسارات
 */

const fixes = [
  {
    name: 'إصلاح روابط الاشتراك',
    description: 'تحديث جميع استخدامات /subscription إلى /subscribe',
    pattern: /\/subscription/g,
    replacement: '/subscribe',
    files: [
      'src/app/courses/ai-audit/page.tsx',
      'src/app/courses/cia-preparation/page.tsx',
      'src/app/courses/compliance/page.tsx',
      'src/app/courses/digital-audit/page.tsx',
      'src/app/courses/financial-projects/page.tsx',
      'src/app/courses/risk-analysis/page.tsx',
    ]
  },
  {
    name: 'إصلاح رابط sitemap',
    description: 'تحديث /sitemap إلى /sitemap.xml أو إزالة الرابط',
    pattern: /href:\s*['"]\/sitemap['"]/g,
    replacement: "href: '/sitemap.xml'",
    files: [
      'src/components/layout/FooterComponent.tsx',
    ]
  }
];

function applyFix(fix) {
  console.log(`\n🔧 تطبيق: ${fix.name}`);
  console.log(`   ${fix.description}`);
  
  let totalFixed = 0;
  
  for (const filePath of fix.files) {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`   ⚠️  الملف غير موجود: ${filePath}`);
      continue;
    }
    
    try {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const originalContent = content;
      
      // تطبيق الإصلاح
      content = content.replace(fix.pattern, fix.replacement);
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        const matches = (originalContent.match(fix.pattern) || []).length;
        totalFixed += matches;
        console.log(`   ✅ تم إصلاح ${matches} رابط في ${filePath}`);
      } else {
        console.log(`   ℹ️  لم يتم العثور على مطابقات في ${filePath}`);
      }
    } catch (error) {
      console.error(`   ❌ خطأ في معالجة ${filePath}:`, error.message);
    }
  }
  
  console.log(`   📊 إجمالي الروابط المُصلحة: ${totalFixed}`);
  return totalFixed;
}

function createUnauthorizedPage() {
  console.log('\n📄 إنشاء صفحة /unauthorized');
  
  const unauthorizedDir = path.join(process.cwd(), 'src/app/unauthorized');
  const unauthorizedFile = path.join(unauthorizedDir, 'page.tsx');
  
  if (fs.existsSync(unauthorizedFile)) {
    console.log('   ℹ️  الصفحة موجودة بالفعل');
    return;
  }
  
  // إنشاء المجلد إذا لم يكن موجوداً
  if (!fs.existsSync(unauthorizedDir)) {
    fs.mkdirSync(unauthorizedDir, { recursive: true });
  }
  
  const pageContent = `'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Unauthorized page - displayed when user doesn't have permission to access a resource
 */
export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            غير مصرح بالوصول
          </h1>
          
          <p className="text-gray-600 mb-8">
            عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة.
            يرجى التأكد من تسجيل الدخول بحساب لديه الصلاحيات المطلوبة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              تسجيل الدخول
            </Link>
            
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              العودة للخلف
            </button>
            
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

  try {
    fs.writeFileSync(unauthorizedFile, pageContent, 'utf-8');
    console.log('   ✅ تم إنشاء صفحة /unauthorized بنجاح');
  } catch (error) {
    console.error('   ❌ خطأ في إنشاء الصفحة:', error.message);
  }
}

function main() {
  console.log('🚀 بدء إصلاح الروابط المعطلة...\n');
  console.log('⚠️  تحذير: سيتم تعديل الملفات التالية:');
  fixes.forEach(fix => {
    console.log(`   - ${fix.name}: ${fix.files.length} ملف`);
  });
  console.log('\n📝 ملاحظة: يرجى التأكد من عمل backup قبل المتابعة');
  
  let totalFixed = 0;
  
  // تطبيق الإصلاحات
  for (const fix of fixes) {
    totalFixed += applyFix(fix);
  }
  
  // إنشاء صفحة unauthorized
  createUnauthorizedPage();
  
  console.log('\n✅ تم الانتهاء من الإصلاحات!');
  console.log(`📊 إجمالي الروابط المُصلحة: ${totalFixed}`);
  console.log('\n📋 الخطوات التالية:');
  console.log('   1. راجع التغييرات في الملفات المعدلة');
  console.log('   2. اختبر الروابط بعد التحديث');
  console.log('   3. قم بعمل commit للتغييرات');
  console.log('   4. راجع التقرير الكامل في ROUTES_ANALYSIS_REPORT.md');
}

if (require.main === module) {
  main();
}

module.exports = { applyFix, createUnauthorizedPage };

