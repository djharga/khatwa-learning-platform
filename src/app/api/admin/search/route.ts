import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/search
 * البحث في جميع بيانات لوحة الإدارة
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; // all, users, courses, content

    if (!query) {
      return NextResponse.json({
        success: true,
        results: []
      });
    }

    // TODO: البحث في قاعدة البيانات
    // محاكاة مؤقتة
    const results = [];

    if (type === 'all' || type === 'users') {
      results.push({
        type: 'user',
        id: '1',
        title: 'أحمد محمد',
        description: 'ahmed@example.com',
        url: '/admin/users/1'
      });
    }

    if (type === 'all' || type === 'courses') {
      results.push({
        type: 'course',
        id: '1',
        title: 'دورة المراجعة الداخلية المستوى الأول',
        description: 'أساسيات المراجعة الداخلية والمحاسبة',
        url: '/admin/courses/1'
      });
    }

    if (type === 'all' || type === 'content') {
      results.push({
        type: 'content',
        id: '1',
        title: 'مقدمة في المراجعة الداخلية.pdf',
        description: 'دورة المراجعة الداخلية المستوى الأول',
        url: '/admin/content/1'
      });
    }

    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'فشل البحث' },
      { status: 500 }
    );
  }
}

