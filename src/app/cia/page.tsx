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
      details: 'شهادة معترف بها عالمياً'
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
              <span className="text-xl font-bold text-gray-900 dark:text-white">CIA</span>
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
          {/* Hero Section with Background Image - Enhanced: clearer background, smoother purple gradient */}
          <motion.div
            className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white overflow-hidden rounded-3xl mx-4 lg:mx-8 shadow-2xl mb-16 border-2 border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image - Enhanced clarity, reduced blur */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/cia.png"
                alt="شهادة CIA"
                fill
                priority
                quality={95}
                className="object-cover opacity-95 brightness-105 contrast-105"
                style={{ objectPosition: 'center' }}
              />
              {/* Enhanced Overlay - smoother purple gradient, less dark */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/50 via-purple-800/45 to-indigo-800/50"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15"></div>
              
              {/* Reduced Decorative Light Effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl" />
            </div>

            {/* Content - Enhanced: 3% larger title, increased spacing, improved badge */}
            <div className="relative z-10 container mx-auto max-w-7xl px-8 py-24 lg:py-32">
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center justify-center gap-4 mb-8 p-5 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 shadow-2xl hover:bg-white/25 transition-all duration-300"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-white/35 to-white/20 rounded-2xl backdrop-blur-md shadow-lg"
                  >
                    <Crown className="w-9 h-9 text-white drop-shadow-2xl" strokeWidth={2.5} />
                  </motion.div>
                  <div>
                    <h1 
                      className="text-3xl lg:text-4xl xl:text-[3.6rem] font-bold text-white mb-4 drop-shadow-2xl"
                      style={{ 
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      المدقق الداخلي المعتمد
                      <span className="block text-xl lg:text-2xl text-blue-50 font-normal mt-3 drop-shadow-lg">
                        Certified Internal Auditor (CIA)
                      </span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-50 drop-shadow-md mt-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Globe className="w-4 h-4" />
                      </motion.div>
                      <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
                    </div>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-xl lg:text-2xl text-blue-50 max-w-4xl mx-auto leading-loose drop-shadow-lg bg-white/8 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/15 mt-6"
                  style={{ 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية
                </motion.p>
              </div>
            </div>

            {/* Enhanced Bottom Gradient Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-50 via-white/80 dark:via-neutral-50/80 to-transparent"></div>
            
            {/* Top Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* بنك الأسئلة - زر مباشرة تحت الهيرو */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center -mt-8 mb-12 relative z-20"
          >
            <motion.a
              href="#question-bank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <Target className="w-6 h-6 relative z-10" />
              <span className="relative z-10">بنك الأسئلة</span>
            </motion.a>
          </motion.div>

          {/* What is CIA Enhanced */}
          <motion.div
            className="bg-gradient-to-br from-indigo-50/90 via-blue-50/90 to-purple-50/90 dark:from-indigo-950/40 dark:via-blue-950/40 dark:to-purple-950/40 backdrop-blur-md rounded-3xl p-8 lg:p-12 mb-16 border-2 border-indigo-200/60 dark:border-indigo-800/60 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-center lg:text-right space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center justify-center lg:justify-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg">
                      <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 dark:from-indigo-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      ما هي شهادة CIA؟
                    </span>
                  </h2>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100/50 dark:border-indigo-900/50 shadow-md">
                    <p className="text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                      شهادة المدقق الداخلي المعتمد <span className="font-bold text-indigo-600 dark:text-indigo-400">(Certified Internal Auditor)</span> هي الاعتماد المهني الأعلى في مجال المراجعة الداخلية على مستوى العالم. تُمنح من قبل <span className="font-semibold text-blue-600 dark:text-blue-400">معهد المراجعين الداخليين (IIA)</span> وتُعتبر <span className="font-bold text-purple-600 dark:text-purple-400">المعيار الذهبي</span> للمهنيين في هذا المجال.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-6 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-lg lg:text-xl text-neutral-800 dark:text-neutral-200 font-bold">
                        أكثر من <span className="text-2xl text-blue-600 dark:text-blue-400">200,000</span> محترف حول العالم
                      </p>
                    </div>
                    <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                      يحملون هذه الشهادة، مما يجعل حامليها <span className="font-bold text-indigo-600 dark:text-indigo-400">مطلوبين بشدة</span> في جميع أنحاء العالم.
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative w-full max-w-md mx-auto"
              >
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10" />
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <Image
                    src="/assets/certifed.jpg"
                    alt="شهادة Certified Internal Auditor"
                    width={500}
                    height={375}
                    priority
                    quality={95}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: 'center' }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 z-10">
                  <Award className="w-4 h-4" />
                  <span>معتمدة عالمياً</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 text-center relative z-10"
            >
              <motion.a
                href="https://www.theiia.org/en/certifications/certified-internal-auditor/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-indigo-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Globe className="w-5 h-5 relative z-10" />
                <span className="relative z-10">زيارة موقع IIA الرسمي</span>
                <ExternalLink className="w-5 h-5 relative z-10" />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* ثلاث بطاقات - الجزء الأول/الثاني/الثالث - Enhanced: improved spacing, unified height */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                id: 1,
                title: 'الجزء الأول',
                subtitle: 'أساسيات المراجعة الداخلية',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950/40 dark:via-gray-900 dark:to-cyan-950/40',
                borderColor: 'border-blue-300 dark:border-blue-700',
                shadowColor: 'shadow-blue-200/50 dark:shadow-blue-900/30',
                items: [
                  { type: 'المادة العلمية', icon: FileText, count: 24 },
                  { type: 'بودكاست', icon: Headphones, count: 12 },
                  { type: 'فيديو', icon: Video, count: 18 },
                  { type: 'ملخصات', icon: FileSpreadsheet, count: 8 },
                ],
              },
              {
                id: 2,
                title: 'الجزء الثاني',
                subtitle: 'ممارسة المراجعة الداخلية',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/40 dark:via-gray-900 dark:to-pink-950/40',
                borderColor: 'border-purple-300 dark:border-purple-700',
                shadowColor: 'shadow-purple-200/50 dark:shadow-purple-900/30',
                items: [
                  { type: 'المادة العلمية', icon: FileText, count: 28 },
                  { type: 'بودكاست', icon: Headphones, count: 15 },
                  { type: 'فيديو', icon: Video, count: 22 },
                  { type: 'ملخصات', icon: FileSpreadsheet, count: 10 },
                ],
              },
              {
                id: 3,
                title: 'الجزء الثالث',
                subtitle: 'معرفة الأعمال للمراجعين',
                color: 'from-emerald-500 to-teal-500',
                bgColor: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-gray-900 dark:to-teal-950/40',
                borderColor: 'border-emerald-300 dark:border-emerald-700',
                shadowColor: 'shadow-emerald-200/50 dark:shadow-emerald-900/30',
                items: [
                  { type: 'المادة العلمية', icon: FileText, count: 32 },
                  { type: 'بودكاست', icon: Headphones, count: 18 },
                  { type: 'فيديو', icon: Video, count: 25 },
                  { type: 'ملخصات', icon: FileSpreadsheet, count: 12 },
                ],
              },
            ].map((part) => (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: part.id * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -2, 
                  scale: 1.01,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
                  borderLeftColor: part.id === 1 ? 'rgba(59, 130, 246, 0.9)' : part.id === 2 ? 'rgba(168, 85, 247, 0.9)' : 'rgba(16, 185, 129, 0.9)'
                }}
                className={`${part.bgColor} ${part.borderColor} border-2 rounded-3xl p-8 hover:shadow-xl ${part.shadowColor} transition-all duration-300 relative overflow-hidden group h-full flex flex-col`}
                style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeftWidth: '4px',
                  borderLeftColor: part.id === 1 ? 'rgba(59, 130, 246, 0.6)' : part.id === 2 ? 'rgba(168, 85, 247, 0.6)' : 'rgba(16, 185, 129, 0.6)'
                }}
              >
                {/* Background Pattern - Reduced brightness, more consistent */}
                <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 bg-gradient-to-br ${part.color}`} />
                
                {/* Header - Enhanced: larger title, better spacing, improved icon */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 bg-gradient-to-br ${part.color} rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Award className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className={`px-3.5 py-1.5 bg-gradient-to-r ${part.color} rounded-full shadow-sm border border-white/20`}>
                      <span className="text-white text-[11px] font-bold">Part {part.id}</span>
                    </div>
                  </div>
                  <h3 className={`text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r ${part.color} bg-clip-text text-transparent`} style={{ lineHeight: '1.3' }}>
                    {part.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    {part.subtitle}
                  </p>
                </div>

                {/* Items - Enhanced: larger icons, better spacing, improved text, increased line-height */}
                <div className="relative z-10 space-y-4 flex-1">
                  {part.items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: part.id * 0.15 + index * 0.1, duration: 0.4 }}
                        whileHover={{ x: 2, scale: 1.01 }}
                        className="group/item flex items-center justify-between gap-4 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                      >
                        {/* Hover Effect Background - Subtle highlight */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${part.color} opacity-0 group-hover/item:opacity-[0.03] transition-opacity duration-300`} />
                        
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`p-3 bg-gradient-to-br ${part.color} rounded-xl shadow-md group-hover/item:scale-105 transition-all duration-300 flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-gray-900 dark:text-white text-base block mb-2" style={{ lineHeight: '1.5' }}>
                              {item.type}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[80px]`}>
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${part.color} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ delay: part.id * 0.15 + index * 0.1 + 0.3, duration: 0.6 }}
                                />
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                                {item.count} ملف
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: part.id * 0.15 + index * 0.1 + 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronRight className={`w-5 h-5 text-gray-400 group-hover/item:text-transparent group-hover/item:bg-gradient-to-r ${part.color} group-hover/item:bg-clip-text transition-all duration-300`} strokeWidth={2} />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer Badge - Enhanced spacing */}
                <div className="relative z-10 mt-6 pt-5 border-t border-gray-200/60 dark:border-gray-700/60">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`p-1.5 bg-gradient-to-r ${part.color} rounded-full`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {part.items.reduce((acc, item) => acc + item.count, 0)} ملف متاح
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageBackground>
  );
}
