import { NextRequest, NextResponse } from 'next/server';
import type { PageVisibility, PageVisibilityUpdate } from '@/types/admin';

/**
 * GET /api/admin/settings/visibility
 * الحصول على جميع الصفحات وإعدادات الرؤية
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: جلب الصفحات من قاعدة البيانات

    // بيانات وهمية
    const pages: PageVisibility[] = [
      {
        id: '1',
        pagePath: '/courses',
        pageName: 'صفحة الدورات',
        isVisible: true,
        visibleToRoles: ['student', 'company', 'admin'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin-1',
      },
      {
        id: '2',
        pagePath: '/admin',
        pageName: 'لوحة الإدارة',
        isVisible: true,
        visibleToRoles: ['admin'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin-1',
      },
    ];

    return NextResponse.json({ pages }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب الصفحات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/settings/visibility
 * إضافة صفحة جديدة
 */
export async function POST(request: NextRequest) {
  try {
    const body: PageVisibilityUpdate = await request.json();
    const { pagePath, pageName, isVisible, visibleToRoles } = body;

    if (!pagePath || !pageName) {
      return NextResponse.json(
        { error: 'مسار الصفحة واسم الصفحة مطلوبان' },
        { status: 400 }
      );
    }

    // TODO: إنشاء الصفحة في قاعدة البيانات

    const page: PageVisibility = {
      id: `page-${Date.now()}`,
      pagePath,
      pageName,
      isVisible: isVisible ?? true,
      visibleToRoles: visibleToRoles || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin-1', // TODO: من session
    };

    return NextResponse.json({ page }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إضافة الصفحة' },
      { status: 500 }
    );
  }
}

