import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/stats
 * الحصول على إحصائيات لوحة الإدارة
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: استدعاء قاعدة البيانات للحصول على الإحصائيات الفعلية
    // محاكاة مؤقتة
    const stats = {
      totalUsers: 1247,
      activeUsers: 892,
      newUsersThisMonth: 156,
      totalCourses: 45,
      activeCourses: 38,
      newCoursesThisMonth: 5,
      totalContent: 2340,
      totalStorageUsed: 125.5, // GB
      totalRevenue: 245000, // SAR
      revenueThisMonth: 45000,
      totalPrograms: 12,
      activePrograms: 8,
      totalEnrollments: 3456,
      enrollmentsThisMonth: 234
    };

    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'فشل جلب الإحصائيات' },
      { status: 500 }
    );
  }
}

