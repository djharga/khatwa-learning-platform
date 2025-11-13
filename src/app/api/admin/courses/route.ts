import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/courses
 * الحصول على قائمة الدورات مع الفلاتر
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const type = searchParams.get('type') || 'all';

    // TODO: استدعاء قاعدة البيانات
    // محاكاة مؤقتة
    const mockCourses = [
      {
        id: '1',
        title: 'دورة المراجعة الداخلية المستوى الأول',
        description: 'أساسيات المراجعة الداخلية والمحاسبة',
        image: '/courses/auditing-1.jpg',
        instructor: 'د. أحمد محمد',
        type: 'short',
        status: 'active',
        enrolledStudents: 127,
        completedStudents: 89,
        startDate: '2024-02-01',
        endDate: '2024-02-15',
        createdAt: '2024-01-15',
        lastModified: '2024-01-20',
        storageUsed: 2048,
        totalFiles: 45,
        isLocked: false,
        tags: ['مراجعة داخلية', 'أساسيات', 'محاسبة'],
        modules: []
      },
      {
        id: '2',
        title: 'برنامج المراجعين الداخليين',
        description: 'برنامج شامل للحصول على شهادة الزمالة',
        image: '/courses/fellowship.jpg',
        instructor: 'د. فاطمة علي',
        type: 'long',
        status: 'active',
        enrolledStudents: 89,
        completedStudents: 23,
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        createdAt: '2023-12-01',
        lastModified: '2024-01-20',
        storageUsed: 15360,
        totalFiles: 234,
        isLocked: false,
        tags: ['زمالة', 'متقدم', 'شهادة'],
        modules: []
      }
    ];

    // تطبيق الفلاتر
    let filteredCourses = mockCourses;

    if (search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.status === status);
    }

    if (type !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.type === type);
    }

    return NextResponse.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'فشل جلب الدورات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses
 * إضافة دورة جديدة
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const instructor = formData.get('instructor') as string;
    const type = formData.get('type') as string;
    const startDate = formData.get('startDate') as string | null;
    const endDate = formData.get('endDate') as string | null;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    // التحقق من البيانات المطلوبة
    if (!title || !description || !instructor || !type) {
      return NextResponse.json(
        { error: 'العنوان والوصف والمعلم ونوع الدورة مطلوبون' },
        { status: 400 }
      );
    }

    // TODO: التحقق من وجود الدورة في قاعدة البيانات
    // TODO: إنشاء الدورة في قاعدة البيانات

    // محاكاة - في الحقيقة يجب إنشاء الدورة في قاعدة البيانات
    // TODO: رفع الصورة إلى التخزين السحابي إذا كانت موجودة
    const image = imageUrl || (imageFile ? `/courses/uploaded/${Date.now()}-${imageFile.name}` : '/courses/default.jpg');
    
    const newCourse = {
      id: Date.now().toString(),
      title,
      description,
      instructor,
      type,
      image,
      status: 'review' as const,
      enrolledStudents: 0,
      completedStudents: 0,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      storageUsed: 0,
      totalFiles: 0,
      isLocked: false,
      tags: [],
      modules: []
    };

    return NextResponse.json(
      { success: true, course: newCourse },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إنشاء الدورة' },
      { status: 500 }
    );
  }
}
