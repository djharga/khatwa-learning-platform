'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  User,
  Settings,
  BookOpen,
  Clock,
  Users,
  Star,
  Calendar,
  Globe,
  Bell,
  Save,
  Camera,
  AlertCircle,
  FileText,
  CheckCircle,
  Play,
  Brain,
  Award,
  TrendingUp,
  FileCheck,
  Video,
  MessageCircle,
  XCircle,
  File,
  Download,
  Edit,
  Trash2,
  Share,
  Eye,
  EyeOff,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share2,
  MapPin,
  Loader2,
  Grid3X3,
  ExternalLink,
  Copy,
  RefreshCw,
  Upload,
  Image,
  Video as VideoIcon,
  Music,
  Archive,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Sun,
  Moon,
  Palette,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';
import Link from 'next/link';
import { Input, Button, Checkbox, Select, FormField } from './ui';
import { useFormValidation } from '../lib/formHelpers';
import {
  validateEmail,
  validateRequired,
  validatePhone,
} from '../lib/validation';
import StudentAIToolsComponent from './StudentAIToolsComponent';
import BadgeSystem from './BadgeSystem';
// import { readFile } from 'fs';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import Handsontable from 'handsontable';
import { toEnglishDigits } from '../lib/numberUtils';
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
  const [wordEditor, setWordEditor] = useState<unknown>(null);
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

  const badges = [
    {
      id: '1',
      title: 'المتعلم المثابر',
      description: 'أكمل 3 دورات متتالية',
      icon: '🏆',
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
      icon: '💻',
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
      icon: '💬',
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
      icon: '🎓',
      category: 'achievement',
      metadata: { courseId: '2', grade: 'A+' },
    },
    {
      id: '2',
      type: 'badge-earned',
      title: 'حصلت على شارة المطور',
      description: 'مبروك على إنجازك الجديد!',
      timestamp: '2024-10-10T14:35:00Z',
      icon: '🏆',
      category: 'badge',
      metadata: { badgeId: '2' },
    },
    {
      id: '3',
      type: 'lesson-accessed',
      title: 'دخلت درس المتغيرات والدوال',
      description: 'استمر في التقدم!',
      timestamp: '2024-10-15T09:15:00Z',
      icon: '📚',
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

    console.log('Data exported successfully');
  }, [userData, courses, certificates]);

  const handleDeleteAccount = useCallback(() => {
    if (
      window.confirm(
        'هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.'
      )
    ) {
      console.log('Account deletion requested');
    }
  }, []);

  const handleGenerateAIInsight = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('AI insight generated');
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
                id: 'certificates',
                label: 'الشهادات',
                icon: Award,
                color: 'yellow',
              },
              {
                id: 'exams',
                label: 'الاختبارات',
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