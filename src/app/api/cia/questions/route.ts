import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      id: 'cia-1',
      question: 'ما هو الهدف الأساسي للمراجعة الداخلية داخل المؤسسة؟',
      options: ['تعزيز فعالية الضوابط وتحسين العمليات', 'إعداد القوائم المالية المنشورة', 'قيادة قسم المبيعات', 'إدارة الموارد البشرية'],
      correctAnswer: 0,
      explanation: 'المراجعة الداخلية تهدف إلى تقديم قيمة من خلال تقييم وتحسين فعالية عمليات الحوكمة وإدارة المخاطر والرقابة.',
      difficulty: 'سهل',
      category: 'الأساسيات',
      points: 10,
      tags: ['CIA','Basics'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 25,
      successRate: 72,
      aiGenerated: false,
    },
    {
      id: 'cia-2',
      question: 'أيٌ من التالي يُعد إطاراً دولياً متعارفاً عليه للرقابة الداخلية؟',
      options: ['COSO', 'IFRS', 'GAAS', 'PMBOK'],
      correctAnswer: 0,
      explanation: 'إطار COSO يُعد إطاراً مرجعياً شاملاً لتقييم وتصميم أنظمة الرقابة الداخلية.',
      difficulty: 'متوسط',
      category: 'المعايير الدولية',
      points: 15,
      tags: ['CIA','Standards'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 18,
      successRate: 64,
      aiGenerated: false,
    },
    {
      id: 'cia-3',
      question: 'لماذا يُعد تقييم المخاطر خطوة محورية في التخطيط السنوي للمراجعة؟',
      options: ['لتحديد مجالات الأولوية وتخصيص الموارد بكفاءة','لزيادة عدد عمليات المراجعة فقط','لتحقيق الامتثال الضريبي','لاختيار برنامج محاسبي مناسب'],
      correctAnswer: 0,
      explanation: 'يساعد تقييم المخاطر في تحديد المجالات ذات الأثر الأكبر على الأهداف وتوجيه خطط المراجعة لزيادة القيمة.',
      difficulty: 'صعب',
      category: 'إدارة المخاطر',
      points: 20,
      tags: ['CIA','Risk'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 12,
      successRate: 51,
      aiGenerated: false,
    }
  ];

  return NextResponse.json({ questions });
}
