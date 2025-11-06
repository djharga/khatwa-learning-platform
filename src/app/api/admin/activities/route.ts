import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/activities
 * الحصول على الأنشطة الأخيرة في لوحة الإدارة
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // TODO: استدعاء قاعدة البيانات للحصول على الأنشطة الفعلية
    // محاكاة مؤقتة
    const activities = [
      {
        id: '1',
        type: 'user_registered',
        title: 'مستخدم جديد',
        description: 'سارة أحمد قامت بالتسجيل',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        icon: 'user-plus',
        color: 'blue'
      },
      {
        id: '2',
        type: 'course_enrolled',
        title: 'اشتراك في دورة',
        description: 'أحمد محمد اشترك في دورة المراجعة الداخلية',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        icon: 'book-open',
        color: 'green'
      },
      {
        id: '3',
        type: 'course_created',
        title: 'دورة جديدة',
        description: 'تم إنشاء دورة الإدارة المالية المتقدمة',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        icon: 'plus-circle',
        color: 'purple'
      },
      {
        id: '4',
        type: 'payment_received',
        title: 'دفعة مالية',
        description: 'تم استلام 5000 ريال من شركة الرياض للمحاسبة',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        icon: 'dollar-sign',
        color: 'green'
      },
      {
        id: '5',
        type: 'content_uploaded',
        title: 'رفع محتوى',
        description: 'تم رفع ملف جديد في دورة المراجعة الداخلية',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
        icon: 'upload',
        color: 'orange'
      }
    ].slice(0, limit);

    return NextResponse.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'فشل جلب الأنشطة' },
      { status: 500 }
    );
  }
}

