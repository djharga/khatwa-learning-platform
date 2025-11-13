import { NextRequest, NextResponse } from 'next/server';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  type: 'fellowship' | 'diploma' | 'certificate' | 'workshop';
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  totalHours: number;
  maxParticipants: number;
  enrolledParticipants: number;
  completedParticipants: number;
  instructor: string;
  price: number;
  prerequisites: string[];
  objectives: string[];
  createdAt: string;
  lastModified: string;
}

/**
 * GET /api/admin/programs
 * الحصول على قائمة البرامج التدريبية
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // TODO: جلب من قاعدة البيانات
    // حالياً نعيد بيانات محاكاة واقعية
    
    const allPrograms: TrainingProgram[] = [
      {
        id: '1',
        title: 'المراجعين الداخليين',
        description: 'برنامج زمالة شامل للحصول على شهادة معتمدة في المراجعة الداخلية',
        type: 'fellowship',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        totalHours: 120,
        maxParticipants: 50,
        enrolledParticipants: 45,
        completedParticipants: 0,
        instructor: 'د. أحمد محمد',
        price: 15000,
        prerequisites: ['شهادة جامعية', 'خبرة 3 سنوات'],
        objectives: ['إتقان المراجعة الداخلية', 'الحصول على الشهادة المعتمدة'],
        createdAt: '2023-12-01',
        lastModified: '2024-01-15',
      },
      {
        id: '2',
        title: 'دبلوم المحاسبة الإدارية',
        description: 'دبلوم متقدم في المحاسبة الإدارية والتحليل المالي',
        type: 'diploma',
        status: 'active',
        startDate: '2024-02-01',
        endDate: '2024-05-31',
        totalHours: 80,
        maxParticipants: 30,
        enrolledParticipants: 28,
        completedParticipants: 0,
        instructor: 'د. سارة أحمد',
        price: 8000,
        prerequisites: ['أساسيات المحاسبة'],
        objectives: ['فهم المحاسبة الإدارية', 'تحليل البيانات المالية'],
        createdAt: '2023-12-15',
        lastModified: '2024-01-20',
      },
      {
        id: '3',
        title: 'ورشة عمل التحليل المالي',
        description: 'ورشة مكثفة لمدة يومين في التحليل المالي',
        type: 'workshop',
        status: 'completed',
        startDate: '2023-12-10',
        endDate: '2023-12-11',
        totalHours: 16,
        maxParticipants: 25,
        enrolledParticipants: 25,
        completedParticipants: 23,
        instructor: 'د. خالد عمر',
        price: 2000,
        prerequisites: [],
        objectives: ['تعلم أساسيات التحليل المالي'],
        createdAt: '2023-11-01',
        lastModified: '2023-12-15',
      },
    ];

    // تطبيق الفلاتر
    let filtered = allPrograms;
    if (status && status !== 'all') {
      filtered = filtered.filter(p => p.status === status);
    }
    if (type && type !== 'all') {
      filtered = filtered.filter(p => p.type === type);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // التنقيح
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { success: false, error: 'فشل جلب البرامج' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/programs
 * إنشاء برنامج تدريبي جديد
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // التحقق من البيانات المطلوبة
    if (!body.title || !body.description || !body.type) {
      return NextResponse.json(
        { success: false, error: 'العنوان والوصف والنوع مطلوبون' },
        { status: 400 }
      );
    }

    // TODO: حفظ في قاعدة البيانات
    const newProgram: TrainingProgram = {
      id: `program-${Date.now()}`,
      title: body.title,
      description: body.description,
      type: body.type,
      status: body.status || 'planning',
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      totalHours: body.totalHours || 0,
      maxParticipants: body.maxParticipants || 0,
      enrolledParticipants: 0,
      completedParticipants: 0,
      instructor: body.instructor || '',
      price: body.price || 0,
      prerequisites: body.prerequisites || [],
      objectives: body.objectives || [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newProgram,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating program:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'فشل إنشاء البرنامج' },
      { status: 500 }
    );
  }
}
