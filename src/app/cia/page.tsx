'use client';

import { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Headphones,
  FileSpreadsheet,
  TrendingUp,
  Target,
  Lock,
  Menu,
  X,
  ExternalLink,
  Clock,
  Crown,
  Shield,
  Globe,
  Zap,
  Users,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { buttonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';
import PageBackground from '@/components/ui/PageBackground';

// أنواع الملفات
type FileType = 'video' | 'podcast' | 'excel' | 'word' | 'pdf';

interface File {
  id: string;
  name: string;
  type: FileType;
  size: string;
  duration?: string;
  description?: string;
  isProtected: boolean;
  url: string;
  progress?: number; // نسبة الإنجاز
}

interface FileGroup {
  id: string;
  title: string;
  description?: string;
  files: File[];
  progress?: number;
}

interface Curriculum {
  id: string;
  title: string;
  description?: string;
  fileGroups: FileGroup[];
  progress?: number;
  lessonsCount?: number;
  hoursCount?: number;
  difficulty?: 'مبتدئ' | 'متوسط' | 'متقدم';
  estimatedTime?: string;
}

interface Level {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  curriculum: Curriculum[];
  fileGroups: FileGroup[];
  questionBankCount: number;
  progress: number; // نسبة الإنجاز الإجمالية
  avgScore?: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  category: string;
  points: number;
  tags: string[];
  courseId?: string;
  axisId?: string;
  images?: string[];
  charts?: string[];
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  successRate: number;
  aiGenerated?: boolean;
  isActive: boolean;
}

export default function CIAFellowshipPage() {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [expandedCurriculum, setExpandedCurriculum] = useState<string | null>(null);
  const [expandedFileGroup, setExpandedFileGroup] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // مسار التعلم التفاعلي
  const learningPath = [
    {
      icon: BookOpen,
      title: 'المستوى الأول',
      description: 'الأساسيات والمفاهيم الأولية',
      progress: 100,
      color: 'from-blue-500 to-cyan-500',
      duration: '8 أسابيع',
      lessons: 12
    },
    {
      icon: Target,
      title: 'المستوى الثاني',
      description: 'الممارسات المهنية المتقدمة',
      progress: 75,
      color: 'from-purple-500 to-pink-500',
      duration: '10 أسابيع',
      lessons: 15
    },
    {
      icon: Award,
      title: 'المستوى الثالث',
      description: 'المعرفة التجارية والتحليلية',
      progress: 50,
      color: 'from-emerald-500 to-teal-500',
      duration: '12 أسابيع',
      lessons: 18
    },
  ];

  // الفوائد المهنية
  const benefits = [
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة دولياً من IIA',
      details: 'معترف بها في 190+ دولة'
    },
    {
      icon: TrendingUp,
      text: 'تطوير المهارات المهنية',
      details: 'مهارات مطلوبة في سوق العمل'
    },
    {
      icon: Users,
      text: 'فرص وظيفية أفضل',
      details: 'زيادة في الراتب بنسبة 30%'
    },
    {
      icon: CheckCircle2,
      text: 'بنك أسئلة شامل مع حلول تفصيلية',
      details: 'أكثر من 2000 سؤال مع تفاصيل'
    },
  ];

  // الموارد التعليمية
  const resources = [
    {
      icon: Video,
      text: 'فيديوهات تعليمية',
      count: '50+ ساعة',
      format: 'HD 1080p'
    },
    {
      icon: Headphones,
      text: 'بودكاست صوتي',
      count: '20+ حلقة',
      format: 'صوت عالي الجودة'
    },
    {
      icon: FileText,
      text: 'ملفات Word و PDF',
      count: '100+ ملف',
      format: 'قابلة للطباعة'
    },
    {
      icon: FileSpreadsheet,
      text: 'جداول Excel تفاعلية',
      count: '30+ نموذج',
      format: 'متوافقة مع Office 365'
    },
  ];

  // بيانات المستويات الثلاثة مع المنهج ومجموعة الملفات مباشرة
  const levelsData: Level[] = [
    {
      id: 1,
      title: 'الجزء الأول',
      description: 'الأساسيات والمفاهيم الأولية لشهادة CIA',
      progress: 65,
      questionBankCount: 450,
      avgScore: 72,
      curriculum: [
        {
          id: 'curriculum-1-1',
          title: 'مقدمة شهادة CIA',
          description: 'نظرة عامة على شهادة CIA ومتطلبات الحصول عليها',
          progress: 70,
          lessonsCount: 8,
          hoursCount: 12,
          difficulty: 'مبتدئ',
          estimatedTime: '2-3 أسابيع',
          fileGroups: [
            {
              id: 'filegroup-1-1',
              title: 'مقدمة عن شهادة CIA',
              description: 'تعريف بشهادة CIA وفوائد الحصول عليها',
              progress: 80,
              files: [
                {
                  id: 'f1',
                  name: 'مقدمة عن شهادة CIA.mp4',
                  type: 'video',
                  size: '125 MB',
                  duration: '45 دقيقة',
                  description: 'شرح مفصل عن شهادة CIA ومتطلباتها',
                  isProtected: false,
                  url: '/videos/cia-intro.mp4',
                  progress: 100,
                },
                {
                  id: 'f2',
                  name: 'دليل شهادة CIA الأساسي.docx',
                  type: 'word',
                  size: '2.5 MB',
                  description: 'دليل شامل عن شهادة CIA',
                  isProtected: false,
                  url: '/files/cia-guide.docx',
                  progress: 80,
                },
                {
                  id: 'f3',
                  name: 'حوار مع حاصل على CIA.mp3',
                  type: 'podcast',
                  size: '48 MB',
                  duration: '62 دقيقة',
                  description: 'حوار مع أحد الحاصلين على شهادة CIA',
                  isProtected: false,
                  url: '/podcasts/cia-expert.mp3',
                  progress: 60,
                },
              ],
            },
            {
              id: 'filegroup-1-2',
              title: 'متطلبات وشروط التقديم',
              description: 'الشروط والمتطلبات للتقديم على شهادة CIA',
              progress: 0,
              files: [
                {
                  id: 'f4',
                  name: 'متطلبات CIA.xlsx',
                  type: 'excel',
                  size: '1.8 MB',
                  description: 'جداول المتطلبات والشروط',
                  isProtected: true,
                  url: '/files/cia-requirements.xlsx',
                  progress: 0,
                },
                {
                  id: 'f5',
                  name: 'دليل التقديم.mp4',
                  type: 'video',
                  size: '98 MB',
                  duration: '38 دقيقة',
                  description: 'شرح خطوات التقديم على الامتحان',
                  isProtected: true,
                  url: '/videos/cia-application.mp4',
                  progress: 0,
                },
              ],
            },
          ],
        },
        {
          id: 'curriculum-1-2',
          title: 'أساسيات المراجعة الداخلية - Part 1',
          description: 'الإعداد الشامل للامتحان الأول من شهادة CIA مع التركيز على الأساسيات',
          progress: 60,
          lessonsCount: 15,
          hoursCount: 25,
          difficulty: 'متوسط',
          estimatedTime: '4-6 أسابيع',
          fileGroups: [
            {
              id: 'filegroup-1-3',
              title: 'مقدمة المراجعة الداخلية',
              description: 'المفاهيم الأساسية والأنواع الرئيسية للمراجعة الداخلية',
              progress: 65,
              files: [
                {
                  id: 'f6',
                  name: 'مقدمة المراجعة الداخلية.mp4',
                  type: 'video',
                  size: '98 MB',
                  duration: '42 دقيقة',
                  description: 'شرح شامل للمفاهيم الأساسية للمراجعة الداخلية',
                  isProtected: false,
                  url: '/videos/internal-audit-intro.mp4',
                  progress: 80,
                },
                {
                  id: 'f7',
                  name: 'دليل المراجعة الداخلية الأساسي.pdf',
                  type: 'pdf',
                  size: '3.5 MB',
                  description: 'دليل شامل يغطي جميع أساسيات المراجعة الداخلية',
                  isProtected: false,
                  url: '/files/internal-audit-basics.pdf',
                  progress: 100,
                },
              ],
            },
            {
              id: 'filegroup-1-4',
              title: 'إدارة المخاطر والرقابة الداخلية',
              description: 'فهم المخاطر وكيفية إدارتها والرقابة الداخلية',
              progress: 55,
              files: [
                {
                  id: 'f8',
                  name: 'إدارة المخاطر في المراجعة.mp4',
                  type: 'video',
                  size: '112 MB',
                  duration: '52 دقيقة',
                  description: 'شرح شامل لإدارة المخاطر في المراجعة الداخلية',
                  isProtected: false,
                  url: '/videos/risk-management.mp4',
                  progress: 50,
                },
                {
                  id: 'f9',
                  name: 'نظام الرقابة الداخلية.pdf',
                  type: 'pdf',
                  size: '2.8 MB',
                  description: 'دليل شامل لأنظمة الرقابة الداخلية',
                  isProtected: false,
                  url: '/files/internal-control-system.pdf',
                  progress: 70,
                },
              ],
            },
            {
              id: 'filegroup-1-5',
              title: 'محتوى الامتحان الأول',
              description: 'المواضيع والأسئلة المتوقعة في Part 1',
              progress: 75,
              files: [
                {
                  id: 'f10',
                  name: 'دليل الامتحان الأول الشامل.mp4',
                  type: 'video',
                  size: '125 MB',
                  duration: '58 دقيقة',
                  description: 'شرح شامل ومفصل لمحتوى الامتحان الأول',
                  isProtected: false,
                  url: '/videos/cia-part1-complete.mp4',
                  progress: 50,
                },
                {
                  id: 'f11',
                  name: 'أسئلة نموذجية - Part 1.xlsx',
                  type: 'excel',
                  size: '2.1 MB',
                  description: 'مجموعة شاملة من الأسئلة النموذجية للامتحان الأول',
                  isProtected: false,
                  url: '/files/cia-part1-questions.xlsx',
                  progress: 100,
                },
                {
                  id: 'f12',
                  name: 'ملخص سريع - Part 1.pdf',
                  type: 'pdf',
                  size: '1.2 MB',
                  description: 'ملخص سريع لجميع مواضيع الامتحان الأول',
                  isProtected: false,
                  url: '/files/cia-part1-summary.pdf',
                  progress: 90,
                },
              ],
            },
            {
              id: 'filegroup-1-6',
              title: 'تمارين عملية ودراسات حالة',
              description: 'تمارين عملية ودراسات حالة لتطبيق المعرفة',
              progress: 40,
              files: [
                {
                  id: 'f13',
                  name: 'دراسات حالة عملية.xlsx',
                  type: 'excel',
                  size: '3.5 MB',
                  description: 'مجموعة من دراسات الحالة العملية',
                  isProtected: true,
                  url: '/files/case-studies-part1.xlsx',
                  progress: 30,
                },
                {
                  id: 'f14',
                  name: 'تمارين تفاعلية - Part 1.mp4',
                  type: 'video',
                  size: '88 MB',
                  duration: '35 دقيقة',
                  description: 'تمارين تفاعلية مع حلول مفصلة',
                  isProtected: true,
                  url: '/videos/interactive-exercises-part1.mp4',
                  progress: 25,
                },
              ],
            },
          ],
        },
      ],
      fileGroups: [
        {
          id: 'filegroup-1-1',
          title: 'مقدمة عن شهادة CIA',
          description: 'تعريف بشهادة CIA وفوائد الحصول عليها',
          progress: 80,
          files: [
            {
              id: 'f1',
              name: 'مقدمة عن شهادة CIA.mp4',
              type: 'video',
              size: '125 MB',
              duration: '45 دقيقة',
              description: 'شرح مفصل عن شهادة CIA ومتطلباتها',
              isProtected: false,
              url: '/videos/cia-intro.mp4',
              progress: 100,
            },
            {
              id: 'f2',
              name: 'دليل شهادة CIA الأساسي.docx',
              type: 'word',
              size: '2.5 MB',
              description: 'دليل شامل عن شهادة CIA',
              isProtected: false,
              url: '/files/cia-guide.docx',
              progress: 80,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'الجزء الثاني',
      description: 'الإعداد للامتحان الثاني من شهادة CIA',
      progress: 40,
      questionBankCount: 380,
      avgScore: 68,
      curriculum: [
        {
          id: 'curriculum-2-1',
          title: 'ممارسات المراجعة الداخلية - Part 2',
          description: 'الإعداد المتقدم للامتحان الثاني مع التركيز على الممارسات العملية',
          progress: 45,
          lessonsCount: 18,
          hoursCount: 30,
          difficulty: 'متقدم',
          estimatedTime: '6-8 أسابيع',
          fileGroups: [
            {
              id: 'filegroup-2-1',
              title: 'تخطيط المراجعة',
              description: 'استراتيجيات وأساليب تخطيط المراجعة الداخلية',
              progress: 50,
              files: [
                {
                  id: 'f15',
                  name: 'تخطيط المراجعة الداخلية.mp4',
                  type: 'video',
                  size: '135 MB',
                  duration: '62 دقيقة',
                  description: 'شرح شامل لاستراتيجيات تخطيط المراجعة',
                  isProtected: true,
                  url: '/videos/audit-planning.mp4',
                  progress: 40,
                },
                {
                  id: 'f16',
                  name: 'نماذج تخطيط المراجعة.docx',
                  type: 'word',
                  size: '2.3 MB',
                  description: 'نماذج عملية لتخطيط المراجعة',
                  isProtected: true,
                  url: '/files/audit-planning-templates.docx',
                  progress: 35,
                },
              ],
            },
            {
              id: 'filegroup-2-2',
              title: 'تنفيذ المراجعة',
              description: 'أساليب وتقنيات تنفيذ المراجعة الداخلية',
              progress: 30,
              files: [
                {
                  id: 'f17',
                  name: 'تنفيذ المراجعة الداخلية.mp4',
                  type: 'video',
                  size: '142 MB',
                  duration: '65 دقيقة',
                  description: 'شرح تفصيلي لأساليب تنفيذ المراجعة',
                  isProtected: true,
                  url: '/videos/audit-execution.mp4',
                  progress: 20,
                },
                {
                  id: 'f18',
                  name: 'أدوات المراجعة المتقدمة.pdf',
                  type: 'pdf',
                  size: '4.2 MB',
                  description: 'دليل شامل لأدوات وتقنيات المراجعة المتقدمة',
                  isProtected: true,
                  url: '/files/advanced-audit-tools.pdf',
                  progress: 15,
                },
              ],
            },
            {
              id: 'filegroup-2-3',
              title: 'محتوى الامتحان الثاني',
              description: 'المواضيع والأسئلة المتوقعة في Part 2',
              progress: 0,
              files: [
                {
                  id: 'f19',
                  name: 'دليل الامتحان الثاني الشامل.mp4',
                  type: 'video',
                  size: '155 MB',
                  duration: '68 دقيقة',
                  description: 'شرح شامل ومفصل لمحتوى الامتحان الثاني',
                  isProtected: true,
                  url: '/videos/cia-part2-complete.mp4',
                  progress: 0,
                },
                {
                  id: 'f20',
                  name: 'أسئلة نموذجية - Part 2.xlsx',
                  type: 'excel',
                  size: '3.8 MB',
                  description: 'مجموعة شاملة من الأسئلة النموذجية للامتحان الثاني',
                  isProtected: true,
                  url: '/files/cia-part2-questions.xlsx',
                  progress: 0,
                },
                {
                  id: 'f21',
                  name: 'ملخص سريع - Part 2.pdf',
                  type: 'pdf',
                  size: '1.8 MB',
                  description: 'ملخص سريع لجميع مواضيع الامتحان الثاني',
                  isProtected: true,
                  url: '/files/cia-part2-summary.pdf',
                  progress: 0,
                },
              ],
            },
            {
              id: 'filegroup-2-4',
              title: 'إعداد التقارير والتوصيات',
              description: 'كيفية إعداد تقارير المراجعة والتوصيات الفعالة',
              progress: 25,
              files: [
                {
                  id: 'f22',
                  name: 'إعداد تقارير المراجعة.mp4',
                  type: 'video',
                  size: '118 MB',
                  duration: '55 دقيقة',
                  description: 'شرح شامل لكيفية إعداد تقارير المراجعة',
                  isProtected: true,
                  url: '/videos/audit-reporting.mp4',
                  progress: 20,
                },
                {
                  id: 'f23',
                  name: 'نماذج تقارير المراجعة.docx',
                  type: 'word',
                  size: '2.9 MB',
                  description: 'نماذج جاهزة لتقارير المراجعة',
                  isProtected: true,
                  url: '/files/audit-report-templates.docx',
                  progress: 15,
                },
              ],
            },
          ],
        },
      ],
      fileGroups: [
        {
          id: 'filegroup-2-1',
          title: 'محتوى الامتحان الثاني',
          description: 'المواضيع والأسئلة المتوقعة في Part 2',
          progress: 0,
          files: [
            {
              id: 'f8',
              name: 'دليل الامتحان الثاني.mp4',
              type: 'video',
              size: '145 MB',
              duration: '58 دقيقة',
              description: 'شرح شامل لمحتوى الامتحان الثاني',
              isProtected: true,
              url: '/videos/cia-part2.mp4',
              progress: 0,
            },
            {
              id: 'f9',
              name: 'أسئلة نموذجية - Part 2.xlsx',
              type: 'excel',
              size: '3.2 MB',
              description: 'مجموعة أسئلة نموذجية للامتحان الثاني',
              isProtected: true,
              url: '/files/cia-part2-questions.xlsx',
              progress: 0,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'الجزء الثالث',
      description: 'الإعداد للامتحان الثالث والأخير من شهادة CIA',
      progress: 15,
      questionBankCount: 320,
      avgScore: 0,
      curriculum: [
        {
          id: 'curriculum-3-1',
          title: 'المعرفة التجارية للمراجعة - Part 3',
          description: 'الإعداد الشامل للامتحان الثالث مع التركيز على المعرفة التجارية',
          progress: 20,
          lessonsCount: 20,
          hoursCount: 35,
          difficulty: 'متقدم',
          estimatedTime: '8-10 أسابيع',
          fileGroups: [
            {
              id: 'filegroup-3-1',
              title: 'الحوكمة وإدارة المخاطر',
              description: 'مفاهيم الحوكمة وإدارة المخاطر في المراجعة الداخلية',
              progress: 30,
              files: [
                {
                  id: 'f24',
                  name: 'الحوكمة وإدارة المخاطر.mp4',
                  type: 'video',
                  size: '148 MB',
                  duration: '70 دقيقة',
                  description: 'شرح شامل للحوكمة وإدارة المخاطر',
                  isProtected: true,
                  url: '/videos/governance-risk.mp4',
                  progress: 25,
                },
                {
                  id: 'f25',
                  name: 'دليل الحوكمة الشامل.pdf',
                  type: 'pdf',
                  size: '5.2 MB',
                  description: 'دليل شامل لمفاهيم الحوكمة',
                  isProtected: true,
                  url: '/files/governance-guide.pdf',
                  progress: 20,
                },
              ],
            },
            {
              id: 'filegroup-3-2',
              title: 'التقنيات الحديثة في المراجعة',
              description: 'استخدام التقنيات الحديثة والذكاء الاصطناعي في المراجعة',
              progress: 15,
              files: [
                {
                  id: 'f26',
                  name: 'الذكاء الاصطناعي في المراجعة.mp4',
                  type: 'video',
                  size: '132 MB',
                  duration: '60 دقيقة',
                  description: 'كيفية استخدام الذكاء الاصطناعي في المراجعة',
                  isProtected: true,
                  url: '/videos/ai-in-audit.mp4',
                  progress: 10,
                },
                {
                  id: 'f27',
                  name: 'أدوات التحليل الحديثة.pdf',
                  type: 'pdf',
                  size: '3.8 MB',
                  description: 'دليل لأدوات التحليل الحديثة في المراجعة',
                  isProtected: true,
                  url: '/files/modern-analysis-tools.pdf',
                  progress: 5,
                },
              ],
            },
            {
              id: 'filegroup-3-3',
              title: 'محتوى الامتحان الثالث',
              description: 'المواضيع والأسئلة المتوقعة في Part 3',
              progress: 0,
              files: [
                {
                  id: 'f28',
                  name: 'دليل الامتحان الثالث الشامل.pdf',
                  type: 'pdf',
                  size: '5.5 MB',
                  description: 'دليل شامل ومفصل لمحتوى الامتحان الثالث',
                  isProtected: true,
                  url: '/files/cia-part3-complete-guide.pdf',
                  progress: 0,
                },
                {
                  id: 'f29',
                  name: 'استراتيجيات النجاح في Part 3.mp4',
                  type: 'video',
                  size: '142 MB',
                  duration: '55 دقيقة',
                  description: 'نصائح واستراتيجيات متقدمة للنجاح في الامتحان الأخير',
                  isProtected: true,
                  url: '/videos/cia-part3-strategies.mp4',
                  progress: 0,
                },
                {
                  id: 'f30',
                  name: 'أسئلة نموذجية - Part 3.xlsx',
                  type: 'excel',
                  size: '4.5 MB',
                  description: 'مجموعة شاملة من الأسئلة النموذجية للامتحان الثالث',
                  isProtected: true,
                  url: '/files/cia-part3-questions.xlsx',
                  progress: 0,
                },
                {
                  id: 'f31',
                  name: 'ملخص سريع - Part 3.pdf',
                  type: 'pdf',
                  size: '2.1 MB',
                  description: 'ملخص سريع لجميع مواضيع الامتحان الثالث',
                  isProtected: true,
                  url: '/files/cia-part3-summary.pdf',
                  progress: 0,
                },
              ],
            },
            {
              id: 'filegroup-3-4',
              title: 'دراسات حالة متقدمة',
              description: 'دراسات حالة متقدمة لتطبيق المعرفة في سيناريوهات واقعية',
              progress: 10,
              files: [
                {
                  id: 'f32',
                  name: 'دراسات حالة متقدمة - Part 3.xlsx',
                  type: 'excel',
                  size: '4.8 MB',
                  description: 'مجموعة من دراسات الحالة المتقدمة',
                  isProtected: true,
                  url: '/files/advanced-case-studies-part3.xlsx',
                  progress: 5,
                },
                {
                  id: 'f33',
                  name: 'تحليل دراسات حالة.mp4',
                  type: 'video',
                  size: '125 MB',
                  duration: '58 دقيقة',
                  description: 'تحليل تفصيلي لدراسات حالة واقعية',
                  isProtected: true,
                  url: '/videos/case-analysis-part3.mp4',
                  progress: 0,
                },
              ],
            },
          ],
        },
      ],
      fileGroups: [
        {
          id: 'filegroup-3-1',
          title: 'محتوى الامتحان الثالث',
          description: 'المواضيع والأسئلة المتوقعة في Part 3',
          progress: 0,
          files: [
            {
              id: 'f10',
              name: 'دليل الامتحان الثالث.pdf',
              type: 'pdf',
              size: '4.1 MB',
              description: 'دليل شامل لمحتوى الامتحان الثالث',
              isProtected: true,
              url: '/files/cia-part3-guide.pdf',
              progress: 0,
            },
            {
              id: 'f11',
              name: 'استراتيجيات النجاح في Part 3.mp4',
              type: 'video',
              size: '132 MB',
              duration: '48 دقيقة',
              description: 'نصائح واستراتيجيات للنجاح في الامتحان الأخير',
              isProtected: true,
              url: '/videos/cia-part3-strategies.mp4',
              progress: 0,
            },
          ],
        },
      ],
    },
  ];

  // استخدام البيانات مباشرة
  const levels = levelsData;
  const currentLevel = levels.find(l => l.id === selectedLevel)!;
  const currentCurriculum = currentLevel?.curriculum || [];
  const currentFileGroups = currentLevel?.fileGroups || [];

  // جلب بيانات الأسئلة من API
  useEffect(() => {
    let mounted = true;
    async function loadQuestions() {
      setLoading(true);
      try {
        // محاكاة جلب الأسئلة
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (mounted) {
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    loadQuestions();
    return () => { mounted = false; };
  }, []);

  const toggleCurriculum = (curriculumId: string) => {
    setExpandedCurriculum(expandedCurriculum === curriculumId ? null : curriculumId);
  };

  const toggleFileGroup = (fileGroupId: string) => {
    setExpandedFileGroup(expandedFileGroup === fileGroupId ? null : fileGroupId);
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'video':
        return Video;
      case 'podcast':
        return Headphones;
      case 'excel':
        return FileSpreadsheet;
      case 'word':
        return FileText;
      case 'pdf':
        return FileText;
      default:
        return FileText;
    }
  };

  const getFileTypeLabel = (type: FileType) => {
    switch (type) {
      case 'video':
        return 'فيديو';
      case 'podcast':
        return 'بودكاست';
      case 'excel':
        return 'Excel';
      case 'word':
        return 'Word';
      case 'pdf':
        return 'PDF';
      default:
        return 'ملف';
    }
  };

  return (
    <PageBackground variant="cia">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-neutral-700/50 shadow-sm">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">زمالة CIA</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#introduction" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg">
                مقدمة
              </a>
              <a href="#curriculum" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg">
                المنهج
              </a>
              <a href="#files" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg">
                الملفات
              </a>
              <a href="#question-bank" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg">
                بنك الأسئلة
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-200 dark:border-neutral-700">
              <div className="flex flex-col gap-1">
                <a href="#introduction" className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  مقدمة
                </a>
                <a href="#curriculum" className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  المنهج
                </a>
                <a href="#files" className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  الملفات
                </a>
                <a href="#question-bank" className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  بنك الأسئلة
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl px-8 py-8">
        {/* Enhanced Header Section with Hero Image */}
        <section id="introduction" className="mb-16">
          {/* Hero Section with Background Image */}
          <motion.div
            className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white overflow-hidden rounded-3xl mx-4 lg:mx-8 shadow-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/cia.png"
                alt="شهادة CIA"
                fill
                priority
                quality={90}
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
              {/* Overlay with reduced opacity */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 via-blue-900/45 to-purple-900/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto max-w-7xl px-8 py-20 lg:py-28">
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center justify-center gap-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl backdrop-blur-md">
                    <Crown className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h1 
                      className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 drop-shadow-2xl"
                      style={{ 
                        textShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      زمالة المدقق الداخلي المعتمد
                      <span className="block text-2xl lg:text-3xl text-blue-100 font-normal mt-2 drop-shadow-lg">
                        Certified Internal Auditor (CIA)
                      </span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-50 drop-shadow-md">
                      <Globe className="w-4 h-4" />
                      <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
                    </div>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-xl lg:text-2xl text-blue-50 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
                  style={{ 
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية
                </motion.p>
              </div>
            </div>

            {/* Bottom Gradient Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-50 to-transparent"></div>
          </motion.div>

          {/* What is CIA Enhanced */}
          <motion.div
            className="bg-gradient-to-r from-indigo-50/80 via-blue-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:via-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-16 border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-right">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center justify-center lg:justify-start gap-3">
                  <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  ما هي شهادة CIA؟
                </h2>
                <div className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <p>
                    شهادة المدقق الداخلي المعتمد (Certified Internal Auditor) هي الاعتماد المهني الأعلى في مجال المراجعة الداخلية على مستوى العالم. تُمنح من قبل معهد المراجعين الداخليين (IIA) وتُعتبر المعيار الذهبي للمهنيين في هذا المجال.
                  </p>
                  <p className="font-medium">
                    أكثر من 200,000 محترف حول العالم يحملون هذه الشهادة، مما يجعل حامليها مطلوبين بشدة في جميع أنحاء العالم.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div className="text-center p-3 bg-white/70 dark:bg-neutral-800/70 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">190+</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">دولة معترف بها</div>
                    </div>
                    <div className="text-center p-3 bg-white/70 dark:bg-neutral-800/70 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">مستويات احترافية</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/assets/certifed.jpg"
                    alt="شهادة Certified Internal Auditor"
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://www.theiia.org/en/certifications/certified-internal-auditor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span>زيارة موقع IIA الرسمي</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Interactive Learning Path */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-12 text-center">
              مسار التعلم التفاعلي
            </h3>
            <div className="relative">
              {/* Progress Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 h-full z-0 hidden lg:block opacity-30"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {learningPath.map((level, index) => {
                  const Icon = level.icon;
                  return (
                    <motion.div
                      key={level.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                      className="relative flex flex-col items-center h-full"
                    >
                      {/* Level Number Badge */}
                      <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-neutral-800 border-4 border-white dark:border-neutral-800 shadow-lg flex items-center justify-center hidden lg:flex">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center`}>
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                      </div>

                      {/* Card */}
                      <div className="w-full bg-white dark:bg-neutral-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 h-full flex flex-col">
                        {/* Icon */}
                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${level.color} mb-6 mx-auto`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h4 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-3 text-center">
                          {level.title}
                        </h4>

                        {/* Description */}
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center leading-relaxed text-sm lg:text-base flex-1">
                          {level.description}
                        </p>

                        {/* Stats */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm">المدة:</span>
                            <span className="font-semibold text-neutral-900 dark:text-white text-sm">{level.duration}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm">الدروس:</span>
                            <span className="font-semibold text-neutral-900 dark:text-white text-sm">{level.lessons}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                            <span>التقدم</span>
                            <span className="font-bold">{level.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                            <motion.div 
                              className={`bg-gradient-to-r ${level.color} h-2.5 rounded-full shadow-sm`} 
                              initial={{ width: 0 }}
                              animate={{ width: `${level.progress}%` }}
                              transition={{ duration: 1.5, delay: 0.7 + index * 0.2 }}
                            />
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                          <Clock className="w-3.5 h-3.5" />
                          <span>متوقع الإكمال: {level.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Enhanced Benefits and Resources */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Benefits */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center justify-center gap-3">
                <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                الفوائد المهنية للحصول على CIA
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="group flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {benefit.text}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {benefit.details}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-emerald-200/50 dark:border-emerald-800/50 shadow-xl overflow-visible"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                الموارد التعليمية المتاحة
              </h3>
              <div className="space-y-6">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="group flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {resource.text}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">{resource.count}</span> - {resource.format}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Level Selection */}
        <section className="mb-12">
          <div className="flex justify-center">
            <div className="bg-gray-50 rounded-xl p-2 inline-flex gap-2 border border-gray-200">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-base transition-all ${
                    selectedLevel === level.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {level.title}
                  {typeof level.avgScore === "number" && level.avgScore > 0 && (
                    <span className="mr-2 text-sm">
                      {level.avgScore}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content View */}
        <div className="space-y-12">
          {/* Level Content Header */}
          <section id="curriculum">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                المنهج التعليمي - {currentLevel.title}
              </h2>
              <p className="text-lg text-gray-600">
                {currentLevel.description}
              </p>
            </div>

            {/* Curriculum */}
            {currentCurriculum.length > 0 && (
              <div className="grid gap-6">
                {currentCurriculum.map((curriculum) => (
                  <div
                    key={curriculum.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleCurriculum(curriculum.id)}
                      className="w-full text-right"
                    >
                      <div className={`p-6 transition-colors ${
                        expandedCurriculum === curriculum.id ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {expandedCurriculum === curriculum.id ? (
                              <ChevronDown className="w-5 h-5 text-blue-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{curriculum.title}</h3>
                                {curriculum.description && (
                                  <p className="text-sm text-gray-600 mb-3">{curriculum.description}</p>
                                )}
                              </div>
                              {curriculum.progress !== undefined && (
                                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                  {curriculum.progress}%
                                </span>
                              )}
                            </div>
                            
                            {/* Curriculum Stats */}
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                              {curriculum.lessonsCount && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <BookOpen className="w-4 h-4 text-blue-600" />
                                  <span>{curriculum.lessonsCount} درس</span>
                                </div>
                              )}
                              {curriculum.hoursCount && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <span>{curriculum.hoursCount} ساعة</span>
                                </div>
                              )}
                              {curriculum.difficulty && (
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    curriculum.difficulty === 'مبتدئ' ? 'bg-green-100 text-green-700' :
                                    curriculum.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {curriculum.difficulty}
                                  </span>
                                </div>
                              )}
                              {curriculum.estimatedTime && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>⏱️ {curriculum.estimatedTime}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                    {expandedCurriculum === curriculum.id && (
                      <div className="p-6 border-t border-gray-200">
                        <div className="space-y-6">
                          {curriculum.fileGroups.map((fileGroup) => (
                            <div key={fileGroup.id} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{fileGroup.title}</h4>
                              {fileGroup.description && (
                                <p className="text-sm text-gray-600 mb-4">{fileGroup.description}</p>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fileGroup.files.map((file) => {
                                  const FileIcon = getFileIcon(file.type);
                                  return (
                                    <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                      <FileIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{file.size}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Files Section */}
          <section id="files" className="mt-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                مجموعة الملفات
              </h2>
            </div>

            {currentFileGroups.length > 0 && (
              <div className="grid gap-6">
                {currentFileGroups.map((fileGroup) => (
                  <div
                    key={fileGroup.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFileGroup(fileGroup.id)}
                      className="w-full text-right"
                      aria-label={`${expandedFileGroup === fileGroup.id ? 'إغلاق' : 'فتح'} مجموعة الملفات ${fileGroup.title}`}
                      aria-expanded={expandedFileGroup === fileGroup.id}
                      aria-controls={`file-group-${fileGroup.id}`}
                      role="button"
                    >
                      <div className={`p-6 transition-colors ${
                        expandedFileGroup === fileGroup.id ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {expandedFileGroup === fileGroup.id ? (
                              <ChevronDown className="w-5 h-5 text-blue-600" aria-hidden="true" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-500">{fileGroup.files.length} ملف</span>
                              <h3 className="text-xl font-semibold text-gray-900">{fileGroup.title}</h3>
                            </div>
                            {fileGroup.description && (
                              <p className="text-sm text-gray-600">{fileGroup.description}</p>
                            )}
                            {fileGroup.progress !== undefined && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-600">إنجاز المجموعة</span>
                                  <span className="font-semibold text-blue-600">{fileGroup.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${fileGroup.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                    {expandedFileGroup === fileGroup.id && (
                      <div className="p-6 border-t border-gray-200" id={`file-group-${fileGroup.id}`} role="region" aria-label={`ملفات ${fileGroup.title}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {fileGroup.files.map((file) => {
                            const FileIcon = getFileIcon(file.type);
                            return (
                              <div
                                key={file.id}
                                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                              >
                                <FileIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-gray-500">{file.size}</p>
                                    {file.duration && (
                                      <p className="text-xs text-gray-500">• {file.duration}</p>
                                    )}
                                  </div>
                                  {file.description && (
                                    <p className="text-xs text-gray-600 mt-1">{file.description}</p>
                                  )}
                                </div>
                                {file.isProtected && <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Question Bank Section */}
          <section id="question-bank" className="mt-12 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">بنك الأسئلة - {currentLevel.title}</h2>
              </div>
              <button
                className={cn(
                  buttonVariants({ variant: "primary", size: "md", interactive: true }),
                  "flex items-center gap-2"
                )}
                aria-label={`ابدأ التدريب على بنك الأسئلة - ${currentLevel.title}`}
                role="button"
              >
                <BookOpen className="w-5 h-5" aria-hidden="true" />
                <span>ابدأ التدريب</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </PageBackground>
  );
}
