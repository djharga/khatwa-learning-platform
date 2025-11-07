import { NextRequest, NextResponse } from 'next/server';
import type { CompanyBranding } from '@/types/user';

/**
 * GET /api/admin/companies/branding
 * الحصول على جميع الشركات مع العروض المخصصة
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: جلب الشركات من قاعدة البيانات

    const companies: CompanyBranding[] = [];

    return NextResponse.json({ companies }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب الشركات' },
      { status: 500 }
    );
  }
}

