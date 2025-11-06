import { NextRequest, NextResponse } from 'next/server';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dueDate: string;
  assignedTo?: string;
  category: 'system' | 'content' | 'user' | 'financial' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /api/admin/tasks
 * الحصول على قائمة المهام
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');

    // TODO: جلب البيانات الحقيقية من قاعدة البيانات
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'مراجعة محتوى دورة المراجعة الداخلية',
        description: 'تحقق من جودة المحتوى وتحديث المعلومات',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'content',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'task-2',
        title: 'إنشاء نسخة احتياطية للنظام',
        description: 'نسخ احتياطي كامل لجميع البيانات',
        priority: 'urgent',
        status: 'pending',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'system',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'task-3',
        title: 'مراجعة طلبات التسجيل الجديدة',
        description: 'التحقق من 15 طلب تسجيل جديد',
        priority: 'medium',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'user',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'task-4',
        title: 'تحديث أسعار البرامج',
        description: 'تحديث أسعار البرامج التدريبية للربع القادم',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'financial',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'task-5',
        title: 'صيانة الخادم',
        description: 'صيانة دورية للخادم وتحسين الأداء',
        priority: 'high',
        status: 'completed',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'maintenance',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    let filtered = tasks;
    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }
    if (priority) {
      filtered = filtered.filter(t => t.priority === priority);
    }
    if (category) {
      filtered = filtered.filter(t => t.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'فشل جلب المهام' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tasks
 * إنشاء مهمة جديدة
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: حفظ في قاعدة البيانات
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: body.title,
      description: body.description,
      priority: body.priority || 'medium',
      status: 'pending',
      dueDate: body.dueDate,
      category: body.category || 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'فشل إنشاء المهمة' },
      { status: 500 }
    );
  }
}

