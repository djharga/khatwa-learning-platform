'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileCheck,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Grid,
  GraduationCap,
  Heart,
  Laptop,
  List,
  Loader2,
  MapPin,
  MessageCircle,
  MessageSquare,
  Moon,
  MoreVertical,
  PieChart,
  Play,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Share,
  Share2,
  Shield,
  Star,
  Sun,
  Target,
  ThumbsUp,
  TrendingUp,
  Trash2,
  Upload,
  User,
  Users,
  Video,
  Zap,
  Trophy,
  QrCode,
} from 'lucide-react';
import Link from 'next/link';
import { Input, Checkbox, Select, FormField } from './ui';
import StyledButton from './ui/StyledButton';
import { useFormValidation } from '../lib/formHelpers';
import {
  validateEmail,
  validateRequired,
  validatePhone,
} from '../lib/validation';
import BadgeSystem from './BadgeSystem';
import dynamic from 'next/dynamic';
import { CardSkeleton } from './ui/Skeleton';

// Lazy load heavy AI tools component
const StudentAIToolsComponent = dynamic(() => import('./StudentAIToolsComponent'), {
  ssr: false,
  loading: () => <CardSkeleton className="h-96" />,
});
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import ProfileHeader from "./ProfileComponent/ProfileHeader";
import { ProfileInfoTab } from './ProfileComponent/ProfileInfoTab';
import { CoursesTab } from './ProfileComponent/CoursesTab';
import { CertificatesTab } from './ProfileComponent/CertificatesTab';
import { SettingsTab } from './ProfileComponent/SettingsTab';
import { ExamsTab } from './ProfileComponent/ExamsTab';
import { BadgesTab } from './ProfileComponent/BadgesTab';
import { AIToolsTab } from './ProfileComponent/AIToolsTab';
import { FileEditorTab } from './ProfileComponent/FileEditorTab';
import { AnalyticsTab } from './ProfileComponent/AnalyticsTab';
import { ActivityTab } from './ProfileComponent/ActivityTab';

/** Course enrollment with progress tracking and status */
interface Course {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // percentage
  lastActivity: string;
  totalHours: number;
  completedHours: number;
}

/** Earned certificate with completion details */
interface Certificate {
  id: string;
  courseTitle: string;
  type: 'مشاركة' | 'إتمام' | 'امتياز';
  earnedDate: string;
  image: string;
}

/** Scheduled consultation or training session */
interface UpcomingSession {
  id: string;
  courseTitle: string;
  type: 'zoom' | 'telegram';
  date: string;
  time: string;
  link?: string;
}

/** Exam performance tracking with strengths and weaknesses */
interface ExamProgress {
  totalExams: number;
  completedExams: number;
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'courses'
    | 'achievements'
    | 'digital-card'
    | 'certificates'
    | 'exams'
    | 'badges'
    | 'settings'
    | 'ai-tools'
    | 'file-editor'
    | 'analytics'
    | 'activity'
  >('profile');
  const [userData, setUserData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+201234567890',
    bio: 'متعلم شغوف بالتطوير والتكنولوجيا.',
    profileImage: '/globe.svg',
    location: 'القاهرة، مصر',
    website: 'https://ahmed-mohamed.com',
    linkedin: 'https://linkedin.com/in/ahmed-mohamed',
    twitter: 'https://twitter.com/ahmed_mohamed',
    joinDate: '2023-01-15',
    lastActive: '2024-10-15 14:30',
  });
  const [settings, setSettings] = useState({
    language: 'ar',
    timezone: 'Africa/Cairo',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
      updates: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showActivity: true,
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      screenReader: false,
      keyboardNavigation: true,
    },
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileType, setFileType] = useState<'word' | 'excel' | null>(null);
  const [excelData, setExcelData] = useState<unknown[][]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    device: 'desktop',
    browser: 'Chrome',
    os: 'Windows',
    screenResolution: '1920x1080',
    connectionType: 'wifi',
    batteryLevel: 85,
  });

  const courses: Course[] = [
    {
      id: '1',
      title: 'مقدمة في البرمجة',
      status: 'completed',
      progress: 100,
      lastActivity: '2023-10-10 14:30',
      totalHours: 20,
      completedHours: 20,
    },
    {
      id: '2',
      title: 'تطوير الويب بـ React',
      status: 'in_progress',
      progress: 75,
      lastActivity: '2023-10-09 16:45',
      totalHours: 30,
      completedHours: 22.5,
    },
    {
      id: '3',
      title: 'قواعد البيانات',
      status: 'not_started',
      progress: 0,
      lastActivity: 'لم يبدأ بعد',
      totalHours: 25,
      completedHours: 0,
    },
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      courseTitle: 'مقدمة في البرمجة',
      type: 'إتمام',
      earnedDate: '2023-10-15',
      image: '/api/placeholder/200/150',
    },
    {
      id: '2',
      courseTitle: 'تطوير الويب بـ React',
      type: 'امتياز',
      earnedDate: '2023-11-20',
      image: '/api/placeholder/200/150',
    },
  ];

  // بيانات التقييمات والاختبارات
  const assessments = [
    {
      id: '1',
      title: 'اختبار أساسيات البرمجة',
      courseName: 'مقدمة في البرمجة',
      score: 85,
      maxScore: 100,
      grade: 'ممتاز',
      date: '2023-10-10',
      duration: '45 دقيقة',
      questionsCount: 20,
      correctAnswers: 17,
      strengths: ['المتغيرات', 'الحلقات', 'الدوال'],
      weaknesses: ['الأخطاء الشائعة'],
      recommendations: ['مراجعة أساسيات البرمجة', 'حل تمارين إضافية'],
    },
    {
      id: '2',
      title: 'اختبار React المتقدم',
      courseName: 'تطوير الويب بـ React',
      score: 92,
      maxScore: 100,
      grade: 'امتياز',
      date: '2023-11-15',
      duration: '60 دقيقة',
      questionsCount: 25,
      correctAnswers: 23,
      strengths: ['Hooks', 'State Management', 'Components'],
      weaknesses: ['Performance Optimization'],
      recommendations: ['دراسة React Performance', 'تطبيق مشاريع عملية'],
    },
  ];

  // المشاريع المنجزة
  const completedProjects = [
    {
      id: '1',
      title: 'تطبيق إدارة المهام',
      courseName: 'تطوير الويب بـ React',
      description: 'تطبيق ويب لإدارة المهام اليومية مع إمكانية إضافة وتعديل وحذف المهام',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
      completionDate: '2023-11-10',
      grade: 'A+',
      githubUrl: 'https://github.com/user/task-manager',
      demoUrl: 'https://task-manager-demo.vercel.app',
      image: '/api/placeholder/400/300',
      features: ['إضافة مهمة', 'تعديل مهمة', 'حذف مهمة', 'فلترة المهام', 'تخزين محلي'],
      challenges: ['إدارة الحالة المعقدة', 'تصميم واجهة مستخدم جذابة'],
      learnings: ['إدارة الحالة في React', 'استخدام TypeScript', 'تصميم متجاوب'],
    },
    {
      id: '2',
      title: 'نظام إدارة المكتبة',
      courseName: 'قواعد البيانات',
      description: 'نظام شامل لإدارة المكتبات مع إمكانية البحث والإعارة وإدارة الكتب',
      technologies: ['Node.js', 'Express', 'MongoDB', 'EJS'],
      completionDate: '2023-12-05',
      grade: 'A',
      githubUrl: 'https://github.com/user/library-system',
      demoUrl: 'https://library-system-demo.herokuapp.com',
      image: '/api/placeholder/400/300',
      features: ['إدارة الكتب', 'نظام الإعارة', 'البحث المتقدم', 'إدارة المستخدمين'],
      challenges: ['تصميم قاعدة البيانات', 'إدارة العلاقات المعقدة'],
      learnings: ['MongoDB', 'Express.js', 'RESTful APIs', 'Authentication'],
    },
  ];

  // التقارير المُنشأة
  const createdReports = [
    {
      id: '1',
      title: 'تقرير تحليل الأداء الشهري',
      type: 'تحليل أداء',
      createdDate: '2023-12-01',
      lastModified: '2023-12-15',
      size: '2.3 MB',
      format: 'PDF',
      status: 'مكتمل',
      description: 'تقرير شامل عن أداء الشركة خلال الشهر الماضي مع تحليل المبيعات والأرباح',
      tags: ['تحليل', 'أداء', 'شهري'],
      collaborators: ['أحمد محمد', 'سارة علي'],
      views: 45,
      downloads: 12,
      comments: 8,
    },
    {
      id: '2',
      title: 'دراسة جدوى مشروع جديد',
      type: 'دراسة جدوى',
      createdDate: '2023-11-20',
      lastModified: '2023-11-25',
      size: '5.7 MB',
      format: 'Word',
      status: 'قيد المراجعة',
      description: 'دراسة شاملة لجدوى إطلاق مشروع تطبيق جوال جديد في السوق المحلي',
      tags: ['جدوى', 'مشروع', 'دراسة'],
      collaborators: ['أحمد محمد', 'محمد حسن', 'فاطمة خالد'],
      views: 23,
      downloads: 5,
      comments: 15,
    },
  ];

  const badges = [
    {
      id: '1',
      title: 'المتعلم المثابر',
      description: 'أكمل 3 دورات متتالية',
      icon: <Award className="w-6 h-6" />,
      earnedDate: '2024-10-10',
      category: 'achievement',
      rarity: 'common',
      progress: 100,
      isEarned: true,
    },
    {
      id: '2',
      title: 'مطور الويب',
      description: 'أكمل دورة تطوير الويب',
      icon: <Laptop className="w-6 h-6" />,
      earnedDate: '2024-10-10',
      category: 'skill',
      rarity: 'rare',
      progress: 100,
      isEarned: true,
    },
    {
      id: '3',
      title: 'المشارك النشط',
      description: 'شارك في 10 مناقشات',
      icon: <MessageCircle className="w-6 h-6" />,
      earnedDate: null,
      category: 'social',
      rarity: 'common',
      progress: 70,
      isEarned: false,
    },
  ];

  const aiInsights = [
    {
      id: '1',
      type: 'learning-path',
      title: 'مسار التعلم المقترح',
      description: 'بناءً على تقدمك، نوصي بدراسة الذكاء الاصطناعي',
      confidence: 0.85,
      actionItems: [
        'إكمال دورة الذكاء الاصطناعي',
        'دراسة Python',
        'مشروع تطبيقي',
      ],
      generatedAt: '2024-10-15T10:30:00Z',
      category: 'recommendation',
    },
    {
      id: '2',
      type: 'performance-analysis',
      title: 'تحليل الأداء',
      description: 'أداؤك ممتاز في البرمجة، لكن تحتاج تحسين في الرياضيات',
      confidence: 0.92,
      actionItems: ['مراجعة أساسيات الرياضيات', 'حل تمارين إضافية'],
      generatedAt: '2024-10-14T15:45:00Z',
      category: 'analysis',
    },
  ];

  const activityLog = [
    {
      id: '1',
      type: 'course-completed',
      title: 'أكملت دورة تطوير تطبيقات الويب',
      description: 'تهانينا! لقد أكملت الدورة بنجاح',
      timestamp: '2024-10-10T14:30:00Z',
      icon: <GraduationCap className="w-5 h-5" />,
      category: 'achievement',
      metadata: { courseId: '2', grade: 'A+' },
    },
    {
      id: '2',
      type: 'badge-earned',
      title: 'حصلت على شارة المطور',
      description: 'مبروك على إنجازك الجديد!',
      timestamp: '2024-10-10T14:35:00Z',
      icon: <Award className="w-5 h-5" />,
      category: 'badge',
      metadata: { badgeId: '2' },
    },
    {
      id: '3',
      type: 'lesson-accessed',
      title: 'دخلت درس المتغيرات والدوال',
      description: 'استمر في التقدم!',
      timestamp: '2024-10-15T09:15:00Z',
      icon: <BookOpen className="w-5 h-5" />,
      category: 'learning',
      metadata: { courseId: '1', lessonId: '5' },
    },
  ];

  const upcomingSessions: UpcomingSession[] = [
    {
      id: '1',
      courseTitle: 'قواعد البيانات',
      type: 'zoom',
      date: '2023-10-25',
      time: '14:00',
      link: 'https://zoom.us/j/example',
    },
    {
      id: '2',
      courseTitle: 'أمان المعلومات',
      type: 'telegram',
      date: '2023-10-26',
      time: '16:30',
      link: 'https://t.me/example',
    },
  ];

  const examProgress: ExamProgress = {
    totalExams: 5,
    completedExams: 3,
    averageScore: 78.5,
    strengths: ['الأساسيات', 'المحاسبة'],
    weaknesses: ['التضخم', 'الاقتصاد الكلي'],
    recommendedDifficulty: 'intermediate',
  };

  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (c) => c.status === 'completed'
  ).length;
  const inProgressCourses = courses.filter(
    (c) => c.status === 'in_progress'
  ).length;
  const totalHours = courses.reduce((sum, c) => sum + c.completedHours, 0);
  const averageProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses
  );

  const handleSaveProfile = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Mock notification - replace with actual notification system
      console.log('Profile saved successfully');
    }, 1000);
  }, []);

  const profileForm = useFormValidation(
    userData,
    {
      name: [validateRequired],
      email: [validateRequired, validateEmail],
      phone: [validatePhone],
    },
    handleSaveProfile
  );

  const handleSaveSettings = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Settings saved successfully');
    }, 1000);
  }, []);

  const handleProfileImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData((prev) => ({
            ...prev,
            profileImage: e.target?.result as string,
          }));
          console.log('Profile image updated successfully');
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleExportData = useCallback(() => {
    const data = {
      userData,
      courses,
      certificates,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [userData, courses, certificates]);

  const handleDeleteAccount = useCallback(() => {
    if (
      window.confirm(
        'هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.'
      )
    ) {
      // TODO: Implement account deletion API call
    }
  }, []);

  const handleGenerateAIInsight = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement AI insight generation API call
    }, 2000);
  }, []);

  // useEffect for device info detection
  useEffect(() => {
    const updateDeviceInfo = () => {
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      const isChrome = userAgent.includes('Chrome');
      const isFirefox = userAgent.includes('Firefox');
      const isSafari =
        userAgent.includes('Safari') && !userAgent.includes('Chrome');
      const isWindows = userAgent.includes('Windows');
      const isMac = userAgent.includes('Mac');
      const isLinux = userAgent.includes('Linux');

      setDeviceInfo((prev) => ({
        ...prev,
        device: isMobile ? 'mobile' : 'desktop',
        browser: isChrome
          ? 'Chrome'
          : isFirefox
            ? 'Firefox'
            : isSafari
              ? 'Safari'
              : 'Other',
        os: isWindows
          ? 'Windows'
          : isMac
            ? 'macOS'
            : isLinux
              ? 'Linux'
              : 'Other',
        screenResolution: `${screen.width}x${screen.height}`,
        connectionType:
          (navigator as any).connection?.effectiveType || 'unknown',
        batteryLevel: (navigator as any).getBattery ? 85 : 100, // Mock battery level
      }));
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  // useEffect for theme management
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  // useEffect for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            if (activeTab === 'profile') {
              handleSaveProfile();
            } else if (activeTab === 'settings') {
              handleSaveSettings();
            }
            break;
          case 'e':
            event.preventDefault();
            setIsEditing(!isEditing);
            break;
          case '1':
            event.preventDefault();
            setActiveTab('profile');
            break;
          case '2':
            event.preventDefault();
            setActiveTab('courses');
            break;
          case '3':
            event.preventDefault();
            setActiveTab('certificates');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, isEditing, handleSaveProfile, handleSaveSettings]);

  // useEffect for auto-save
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (isEditing && profileForm.isValid) {
        // Auto-save logic here
        console.log('Auto-saving profile data...');
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [isEditing, profileForm.isValid, userData]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      if (file.name.endsWith('.docx')) {
        setFileType('word');
        // معالجة ملف Word
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setFileContent(result.value);
      } else if (file.name.endsWith('.xlsx')) {
        setFileType('excel');
        // معالجة ملف Excel
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(data as unknown[][]);
      }
    }
  };

  const handleSaveFile = () => {
    if (fileType === 'word' && fileContent) {
      // تنزيل كـ HTML للبداية
      const blob = new Blob([fileContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-document.html';
      a.click();
      URL.revokeObjectURL(url);
    } else if (fileType === 'excel' && excelData.length > 0) {
      // إنشاء XLSX جديد
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'edited-spreadsheet.xlsx');
    }
  };

  /** Returns localized status label for course status */
  const getStatusLabel = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'in_progress':
        return 'قيد التقدم';
      case 'not_started':
        return 'لم تبدأ';
    }
  };

  /** Returns Tailwind CSS classes for course status color */
  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'not_started':
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <ProfileHeader
          userData={userData}
          totalCourses={totalCourses}
          completedCourses={completedCourses}
          inProgressCourses={inProgressCourses}
          totalHours={totalHours}
          averageProgress={averageProgress}
          onProfileImageUpload={handleProfileImageUpload}
        />

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-900">
            {[
              {
                id: 'profile',
                label: 'الملف الشخصي',
                icon: User,
                color: 'blue',
              },
              {
                id: 'courses',
                label: 'دوراتي',
                icon: BookOpen,
                color: 'green',
              },
              {
                id: 'achievements',
                label: 'الإنجازات',
                icon: Trophy,
                color: 'yellow',
              },
              {
                id: 'digital-card',
                label: 'البطاقة الرقمية',
                icon: Shield,
                color: 'emerald',
              },
              {
                id: 'certificates',
                label: 'الشهادات',
                icon: Award,
                color: 'orange',
              },
              {
                id: 'exams',
                label: 'التقييمات',
                icon: FileCheck,
                color: 'purple',
              },
              { id: 'badges', label: 'الشارات', icon: Star, color: 'orange' },
              {
                id: 'settings',
                label: 'الإعدادات',
                icon: Settings,
                color: 'gray',
              },
              {
                id: 'ai-tools',
                label: 'أدوات الذكاء الاصطناعي',
                icon: Brain,
                color: 'indigo',
              },
              {
                id: 'file-editor',
                label: 'محرر الملفات',
                icon: FileText,
                color: 'teal',
              },
              {
                id: 'analytics',
                label: 'التحليلات',
                icon: BarChart3,
                color: 'pink',
              },
              { id: 'activity', label: 'النشاط', icon: Activity, color: 'red' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={
                  activeTab === tab.id
                    ? `flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-${tab.color}-500 text-white shadow-lg`
                    : 'flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileInfoTab
                    userData={userData}
                    setUserData={setUserData}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleSaveProfile={handleSaveProfile}
                    isLoading={isLoading}
                    handleExportData={handleExportData}
                  />
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CoursesTab
                    courses={courses}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    getStatusLabel={getStatusLabel}
                    getStatusColor={getStatusColor}
                  />
                </motion.div>
              )}

              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CertificatesTab certificates={certificates} />
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SettingsTab
                    settings={settings}
                    setSettings={setSettings}
                    handleSaveSettings={handleSaveSettings}
                    isLoading={isLoading}
                    handleExportData={handleExportData}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                </motion.div>
              )}

              {activeTab === 'exams' && (
                <motion.div
                  key="exams"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExamsTab examProgress={examProgress} />
                </motion.div>
              )}

              {activeTab === 'badges' && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BadgesTab badges={badges} />
                </motion.div>
              )}

              {activeTab === 'ai-tools' && (
                <motion.div
                  key="ai-tools"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AIToolsTab
                    aiInsights={aiInsights}
                    handleGenerateAIInsight={handleGenerateAIInsight}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}

              {activeTab === 'file-editor' && (
                <motion.div
                  key="file-editor"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FileEditorTab
                    uploadedFile={uploadedFile}
                    fileContent={fileContent}
                    fileType={fileType}
                    excelData={excelData}
                    handleFileUpload={handleFileUpload}
                    handleSaveFile={handleSaveFile}
                  />
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnalyticsTab
                    deviceInfo={deviceInfo}
                    totalCourses={totalCourses}
                    completedCourses={completedCourses}
                    totalHours={totalHours}
                    averageProgress={averageProgress}
                  />
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-8">
                    {/* التقييمات والاختبارات */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-purple-600" />
                        التقييمات والاختبارات
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {assessments.map((assessment) => (
                          <motion.div
                            key={assessment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-gray-900 dark:text-white">{assessment.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                assessment.grade === 'امتياز' ? 'bg-green-100 text-green-800' :
                                assessment.grade === 'ممتاز' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {assessment.grade}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{assessment.courseName}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">النتيجة:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {assessment.score}/{assessment.maxScore}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500">التاريخ:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">{assessment.date}</div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-sm text-gray-500 mb-2">نقاط القوة:</div>
                              <div className="flex flex-wrap gap-1">
                                {assessment.strengths.map((strength, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {strength}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* المشاريع المنجزة */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-600" />
                        المشاريع المنجزة
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {completedProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-gray-900 dark:text-white">{project.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                project.grade === 'A+' ? 'bg-green-100 text-green-800' :
                                project.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {project.grade}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                            <div className="mb-4">
                              <div className="text-sm text-gray-500 mb-2">التقنيات المستخدمة:</div>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                   className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                                  <ExternalLink className="w-4 h-4" />
                                  GitHub
                                </a>
                              )}
                              {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                   className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                  <Eye className="w-4 h-4" />
                                  Demo
                                </a>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* التقارير المُنشأة */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-orange-600" />
                        التقارير المُنشأة
                      </h3>
                      <div className="space-y-4">
                        {createdReports.map((report) => (
                          <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{report.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{report.description}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                report.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <span className="text-gray-500">النوع:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">{report.type}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">الحجم:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">{report.size}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">التنسيق:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">{report.format}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">الإنشاء:</span>
                                <div className="font-semibold text-gray-900 dark:text-white">{report.createdDate}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <span>👁️ {report.views}</span>
                                <span>⬇️ {report.downloads}</span>
                                <span>💬 {report.comments}</span>
                              </div>
                              <div className="flex gap-2">
                                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                  عرض
                                </button>
                                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                                  تحميل
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'digital-card' && (
                <motion.div
                  key="digital-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-8">
                    {/* مقدمة البطاقة الرقمية */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-700">
                      <div className="text-center mb-8">
                        <Shield className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          بطاقة الأعمال الرقمية المهنية
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                          بطاقة أعمال رقمية احترافية تجمع كافة إنجازاتك واعتماداتك المهنية في رابط واحد قابل للمشاركة
                        </p>
                      </div>

                      {/* معاينة البطاقة */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                        <div className="flex items-center gap-6 mb-6">
                          <img
                            src={userData.profileImage}
                            alt={userData.name}
                            className="w-20 h-20 rounded-full border-4 border-emerald-500"
                          />
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h3>
                            <p className="text-emerald-600 font-medium">محاسب ومراجع داخلي معتمد</p>
                            <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">{certificates.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">شهادات</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{completedProjects.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">مشاريع</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{assessments.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">تقييمات</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{createdReports.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">تقارير</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">المراجعة الداخلية</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">المحاسبة المالية</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">إدارة المخاطر</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">الامتثال</span>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
                          </p>
                          <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                              <Share2 className="w-4 h-4" />
                              مشاركة البطاقة
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <Download className="w-4 h-4" />
                              تحميل PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* إعدادات البطاقة */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Settings className="w-8 h-8 text-emerald-600" />
                        إعدادات البطاقة الرقمية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              عنوان البطاقة
                            </label>
                            <input
                              type="text"
                              defaultValue="محاسب ومراجع داخلي معتمد"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              المهارات الرئيسية (مفصولة بفواصل)
                            </label>
                            <textarea
                              defaultValue="المراجعة الداخلية, المحاسبة المالية, إدارة المخاطر, الامتثال"
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              لون البطاقة
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                              <option value="emerald">زمردي</option>
                              <option value="blue">أزرق</option>
                              <option value="purple">بنفسجي</option>
                              <option value="orange">برتقالي</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              إعدادات الخصوصية
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="ml-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">عرض الشهادات</span>
                              </label>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="ml-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">عرض المشاريع</span>
                              </label>
                              <label className="flex items-center">
                                <input type="checkbox" defaultChecked className="ml-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">عرض التقييمات</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                          <Save className="w-5 h-5" />
                          حفظ التغييرات
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Eye className="w-5 h-5" />
                          معاينة البطاقة
                        </button>
                      </div>
                    </div>

                    {/* روابط المشاركة */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Share2 className="w-8 h-8 text-emerald-600" />
                        روابط المشاركة
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">رابط البطاقة العام</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">https://khatwa.edu/card/ahmed-mohamed</p>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Copy className="w-4 h-4" />
                            نسخ
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">رابط PDF قابل للتحميل</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">https://khatwa.edu/card/ahmed-mohamed.pdf</p>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Download className="w-4 h-4" />
                            تحميل
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">رمز QR</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">للمشاركة عبر الهاتف المحمول</p>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <QrCode className="w-4 h-4" />
                            عرض
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityTab activityLog={activityLog} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { motion } from 'framer-motion';

export default ProfileComponent;
