import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/stats
 * الحصول على إحصائيات لوحة الإدارة
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // TODO: استدعاء قاعدة البيانات للحصول على الإحصائيات الفعلية
    // محاكاة مؤقتة - البنية المطابقة لـ AdminStats interface
    const stats = {
      users: {
        total: 2547,
        active: 1892,
        newThisMonth: 156,
        newLastMonth: 142,
        premium: 234,
        growth: '12.5',
        trend: 'up' as const
      },
      programs: {
        total: 12,
        active: 8,
        completed: 3,
        upcoming: 1,
        totalParticipants: 3456,
        newParticipants: 234,
        completionRate: 78
      },
      courses: {
        total: 45,
        published: 38,
        draft: 7,
        totalEnrollments: 5678,
        activeEnrollments: 3456,
        completionRate: 75
      },
      revenue: {
        total: 245000,
        thisMonth: 45000,
        lastMonth: 42000,
        growth: '7.1',
        trend: 'up' as const,
        transactions: 156,
        averageTransaction: 288
      },
      content: {
        totalFiles: 2340,
        totalSize: 125.5,
        videos: 456,
        documents: 1234,
        images: 650,
        storageUsed: 62,
        storageLimit: 200
      },
      system: {
        uptime: 99.8,
        responseTime: 120,
        activeSessions: 234,
        serverLoad: 45,
        cpuUsage: 42,
        memoryUsage: 58,
        diskUsage: 62
      },
      engagement: {
        dailyActiveUsers: 892,
        weeklyActiveUsers: 2156,
        monthlyActiveUsers: 2547,
        averageSessionDuration: 45,
        pageViews: 45678,
        bounceRate: 12.5
      },
      period: period,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'فشل جلب الإحصائيات' },
      { status: 500 }
    );
  }
}

