import { NextRequest, NextResponse } from 'next/server';
import type { InvitationLink } from '@/types/user';

/**
 * GET /api/admin/invitations
 * الحصول على جميع روابط الدعوة
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: جلب روابط الدعوة من قاعدة البيانات

    const invitations: InvitationLink[] = [];

    return NextResponse.json({ invitations }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب روابط الدعوة' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/invitations
 * إنشاء رابط دعوة جديد
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, phone } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو رقم الهاتف مطلوب' },
        { status: 400 }
      );
    }

    // TODO: إنشاء رابط دعوة فريد
    // TODO: حفظ في قاعدة البيانات

    const token = Math.random().toString(36).substring(2, 15);
    const invitation: InvitationLink = {
      id: `inv-${Date.now()}`,
      userId,
      email,
      phone,
      link: `${process.env.NEXT_PUBLIC_APP_URL || 'https://audit-sa.com'}/invite/${token}`,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 يوم
      used: false,
      createdBy: 'admin-1', // TODO: من session
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ invitation }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إنشاء رابط الدعوة' },
      { status: 500 }
    );
  }
}

