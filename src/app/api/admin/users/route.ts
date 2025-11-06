import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/users
 * الحصول على قائمة المستخدمين مع الفلاتر
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const userType = searchParams.get('userType') || 'all';
    const status = searchParams.get('status') || 'all';

    // TODO: استدعاء قاعدة البيانات
    // محاكاة مؤقتة - في الحقيقة يجب جلب البيانات من قاعدة البيانات
    const mockUsers = [
      {
        id: '1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        userType: 'student',
        status: 'active',
        storageUsed: 1200,
        storageLimit: 5120,
        coursesEnrolled: 3,
        coursesCompleted: 2,
        joinDate: '2024-01-15',
        lastLogin: '2024-01-20',
        customUrl: 'ahmed.audit-sa.com',
        whatsappLink: 'https://wa.me/966501234567',
        isPremium: false
      },
      {
        id: '2',
        name: 'شركة الرياض للمحاسبة',
        email: 'info@riyadh-accounting.com',
        phone: '+966112345678',
        userType: 'company',
        companyName: 'شركة الرياض للمحاسبة',
        status: 'active',
        storageUsed: 8500,
        storageLimit: 20480,
        coursesEnrolled: 8,
        coursesCompleted: 5,
        joinDate: '2024-01-10',
        lastLogin: '2024-01-19',
        customUrl: 'riyadh-accounting.audit-sa.com',
        whatsappLink: 'https://wa.me/966112345678',
        isPremium: true,
        companyLogo: '/logos/riyadh-accounting.png'
      },
      {
        id: '3',
        name: 'سارة أحمد',
        email: 'sara@example.com',
        phone: '+966507654321',
        userType: 'admin',
        status: 'active',
        storageUsed: 2560,
        storageLimit: 10240,
        coursesEnrolled: 15,
        coursesCompleted: 12,
        joinDate: '2023-12-01',
        lastLogin: '2024-01-20',
        isPremium: true
      }
    ];

    // تطبيق الفلاتر
    let filteredUsers = mockUsers;

    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
      );
    }

    if (userType !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.userType === userType);
    }

    if (status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    return NextResponse.json({
      success: true,
      users: filteredUsers,
      total: filteredUsers.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'فشل جلب المستخدمين' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/users
 * إضافة مستخدم جديد
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, userType, companyName, storageLimit } = body;

    // التحقق من البيانات المطلوبة
    if (!name || !email || !phone || !userType) {
      return NextResponse.json(
        { error: 'الاسم والبريد الإلكتروني والهاتف ونوع المستخدم مطلوبون' },
        { status: 400 }
      );
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      );
    }

    // TODO: التحقق من وجود المستخدم في قاعدة البيانات
    // TODO: إنشاء المستخدم في قاعدة البيانات

    // محاكاة - في الحقيقة يجب إنشاء المستخدم في قاعدة البيانات
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      userType,
      companyName: companyName || undefined,
      status: 'active',
      storageUsed: 0,
      storageLimit: storageLimit || (userType === 'company' ? 20480 : 5120),
      coursesEnrolled: 0,
      coursesCompleted: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      isPremium: false,
      customUrl: `${name.toLowerCase().replace(/\s+/g, '-')}.audit-sa.com`,
      whatsappLink: `https://wa.me/${phone.replace(/\D/g, '')}`
    };

    return NextResponse.json(
      { success: true, user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إنشاء المستخدم' },
      { status: 500 }
    );
  }
}
