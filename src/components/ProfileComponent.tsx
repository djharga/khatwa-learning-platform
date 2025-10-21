/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent.tsx
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
import { ProfileHeader, ProfileInfoTab, CoursesTab, CertificatesTab, SettingsTab, ExamsTab, BadgesTab, AIToolsTab, FileEditorTab, AnalyticsTab, ActivityTab } from './ProfileComponent';

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

export default ProfileComponent;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/ProfileHeader.tsx
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Play, Clock, TrendingUp, MapPin, Calendar, Camera } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface ProfileHeaderProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    profileImage: string;
    location: string;
    website: string;
    linkedin: string;
    twitter: string;
    joinDate: string;
    lastActive: string;
  };
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  averageProgress: number;
  onProfileImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Profile header with avatar, user info, and quick statistics cards */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, totalCourses, completedCourses, inProgressCourses, totalHours, averageProgress, onProfileImageUpload }) => {
  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              onClick={() =>
                document.getElementById('profile-image-upload')?.click()
              }
            >
              <Camera className="w-4 h-4" />
            </motion.button>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onProfileImageUpload}
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {userData.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-4"
        >
          {userData.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{userData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>
              انضم في {new Date(userData.joinDate).toLocaleDateString('ar')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>آخر نشاط: {userData.lastActive}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center transition-all duration-300"
        >
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
            <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            {toEnglishDigits(totalCourses)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
            إجمالي الدورات
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center"
        >
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {toEnglishDigits(completedCourses)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            دورات مكتملة
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center"
        >
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            {toEnglishDigits(inProgressCourses)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            دورات نشطة
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center"
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {toEnglishDigits(totalHours)}h
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            ساعات مكتملة
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center"
        >
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {toEnglishDigits(averageProgress)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            متوسط التقدم
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProfileHeader;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/ProfileInfoTab.tsx
import { motion } from 'framer-motion';
import { Edit, Download, Save, Loader2 } from 'lucide-react';

interface ProfileInfoTabProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    profileImage: string;
    location: string;
    website: string;
    linkedin: string;
    twitter: string;
    joinDate: string;
    lastActive: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<typeof userData>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveProfile: () => void;
  isLoading: boolean;
  handleExportData: () => void;
}

/** Editable profile information tab with personal details and social links */
const ProfileInfoTab: React.FC<ProfileInfoTabProps> = ({ userData, setUserData, isEditing, setIsEditing, handleSaveProfile, isLoading, handleExportData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الملف الشخصي
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'إلغاء التعديل' : 'تعديل'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportData}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>تصدير البيانات</span>
          </motion.button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الاسم الكامل
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الموقع
            </label>
            <input
              type="text"
              value={userData.location}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الموقع الإلكتروني
            </label>
            <input
              type="url"
              value={userData.website}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  website: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نبذة شخصية
            </label>
            <textarea
              value={userData.bio}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          روابط التواصل الاجتماعي
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={userData.linkedin}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  linkedin: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Twitter
            </label>
            <input
              type="url"
              value={userData.twitter}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  twitter: e.target.value,
                }))
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>حفظ التغييرات</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/CoursesTab.tsx
import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface Course {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  lastActivity: string;
  totalHours: number;
  completedHours: number;
}

interface CoursesTabProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  getStatusLabel: (status: Course['status']) => string;
  getStatusColor: (status: Course['status']) => string;
}

/** Courses tab displaying enrolled courses with progress tracking and view mode toggle */
const CoursesTab: React.FC<CoursesTabProps> = ({ courses, viewMode, setViewMode, getStatusLabel, getStatusColor }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          دوراتي
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setViewMode(viewMode === 'grid' ? 'list' : 'grid')
            }
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>
              {viewMode === 'grid' ? 'عرض القائمة' : 'عرض الشبكة'}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}
              >
                {getStatusLabel(course.status)}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>التقدم</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>
                الساعات المكتملة:{' '}
                {toEnglishDigits(course.completedHours)} من{' '}
                {toEnglishDigits(course.totalHours)}
              </div>
              <div>آخر نشاط: {course.lastActivity}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/CertificatesTab.tsx
import { motion } from 'framer-motion';

interface Certificate {
  id: string;
  courseTitle: string;
  type: 'مشاركة' | 'إتمام' | 'امتياز';
  earnedDate: string;
  image: string;
}

interface CertificatesTabProps {
  certificates: Certificate[];
}

/** Certificates tab displaying earned certificates with download functionality */
const CertificatesTab: React.FC<CertificatesTabProps> = ({ certificates }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الشهادات
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {certificate.courseTitle}
              </h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                {certificate.type}
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>تاريخ الحصول: {certificate.earnedDate}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/SettingsTab.tsx
import { motion } from 'framer-motion';
import { Save, Loader2, Download, Trash2 } from 'lucide-react';

interface Settings {
  language: string;
  timezone: string;
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    updates: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    showActivity: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
  };
}

interface SettingsTabProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleSaveSettings: () => void;
  isLoading: boolean;
  handleExportData: () => void;
  handleDeleteAccount: () => void;
}

/** Settings tab for user preferences and account management */
const SettingsTab: React.FC<SettingsTabProps> = ({ settings, setSettings, handleSaveSettings, isLoading, handleExportData, handleDeleteAccount }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الإعدادات
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>حفظ الإعدادات</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            الإعدادات العامة
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اللغة
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المنطقة الزمنية
            </label>
            <select
              value={settings.timezone}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  timezone: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="Africa/Cairo">القاهرة</option>
              <option value="Asia/Riyadh">الرياض</option>
              <option value="Asia/Dubai">دبي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المظهر
            </label>
            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  theme: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="light">فاتح</option>
              <option value="dark">داكن</option>
              <option value="auto">تلقائي</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            الإشعارات
          </h3>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      email: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                الإشعارات عبر البريد الإلكتروني
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      push: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                الإشعارات الفورية
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      sms: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                رسائل SMS
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          إدارة الحساب
        </h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportData}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>تصدير البيانات</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteAccount}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>حذف الحساب</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/ExamsTab.tsx
import { CheckCircle, AlertCircle } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface ExamProgress {
  totalExams: number;
  completedExams: number;
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ExamsTabProps {
  examProgress: ExamProgress;
}

/** Exams tab displaying exam performance with strengths and weaknesses analysis */
const ExamsTab: React.FC<ExamsTabProps> = ({ examProgress }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الاختبارات
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            إحصائيات الاختبارات
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {toEnglishDigits(examProgress.totalExams)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                إجمالي الاختبارات
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {toEnglishDigits(examProgress.completedExams)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                مكتملة
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {toEnglishDigits(
                  examProgress.averageScore.toFixed(1)
                )}
                %
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                متوسط الدرجات
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {examProgress.recommendedDifficulty}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                المستوى المقترح
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-3">نقاط القوة</h4>
            <ul className="space-y-2">
              {examProgress.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-3">نقاط التحسين</h4>
            <ul className="space-y-2">
              {examProgress.weaknesses.map((weakness, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/BadgesTab.tsx
import { motion } from 'framer-motion';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string | null;
  category: string;
  rarity: string;
  progress: number;
  isEarned: boolean;
}

interface BadgesTabProps {
  badges: Badge[];
}

/** Badges tab showing earned and in-progress achievement badges */
const BadgesTab: React.FC<BadgesTabProps> = ({ badges }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          الشارات
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 ${
              badge.isEarned
                ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                : 'border-gray-200 dark:border-gray-700 opacity-60'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h3 className="font-semibold text-lg">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {badge.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التقدم</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    badge.isEarned ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>

              {badge.isEarned ? (
                <div className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                  مكتسبة في {badge.earnedDate || 'غير محدد'}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500">
                  غير مكتسبة بعد
                </div>
              )}

              <div className="text-center text-xs text-gray-500 capitalize">
                {badge.category} • {badge.rarity}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgesTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/AIToolsTab.tsx
import { motion } from 'framer-motion';
import { Brain, Loader2 } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  confidence: number;
  actionItems: string[];
  generatedAt: string;
  category: string;
}

interface AIToolsTabProps {
  aiInsights: AIInsight[];
  handleGenerateAIInsight: () => void;
  isLoading: boolean;
}

/** AI tools tab with learning insights and personalized recommendations */
const AIToolsTab: React.FC<AIToolsTabProps> = ({ aiInsights, handleGenerateAIInsight, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          أدوات الذكاء الاصطناعي
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateAIInsight}
          disabled={isLoading}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          <span>توليد رؤية ذكية</span>
        </motion.button>
      </div>

      <div className="space-y-6">
        {aiInsights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-r-4 border-purple-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {insight.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  الثقة:{' '}
                  {toEnglishDigits(
                    (insight.confidence * 100).toFixed(0)
                  )}
                  %
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(insight.generatedAt).toLocaleDateString(
                    'ar'
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">
                الخطوات المقترحة:
              </h4>
              <ul className="space-y-1">
                {insight.actionItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 capitalize">
                {insight.category}
              </span>
              <span className="text-xs text-gray-500">
                {insight.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIToolsTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/FileEditorTab.tsx
import { motion } from 'framer-motion';
import { Save, FileText } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface FileEditorTabProps {
  uploadedFile: File | null;
  fileContent: string;
  fileType: 'word' | 'excel' | null;
  excelData: unknown[][];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveFile: () => void;
}

/** File editor tab supporting Word and Excel file editing with preview */
const FileEditorTab: React.FC<FileEditorTabProps> = ({ uploadedFile, fileContent, fileType, excelData, handleFileUpload, handleSaveFile }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          محرر الملفات
        </h2>
        {uploadedFile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveFile}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الملف</span>
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اختر ملف للتحرير
            </label>
            <input
              type="file"
              accept=".docx,.xlsx"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {uploadedFile && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  {uploadedFile.name}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                حجم الملف:{' '}
                {toEnglishDigits(
                  (uploadedFile.size / 1024).toFixed(1)
                )}{' '}
                KB
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {fileType === 'word' && fileContent && (
            <div>
              <h3 className="font-semibold mb-2">
                محتوى الملف (HTML)
              </h3>
              <div
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 max-h-96 overflow-y-auto bg-white dark:bg-gray-800"
                dangerouslySetInnerHTML={{ __html: fileContent }}
              />
            </div>
          )}

          {fileType === 'excel' && excelData.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">بيانات Excel</h3>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <tbody>
                    {excelData.slice(0, 10).map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex === 0
                            ? 'bg-gray-100 dark:bg-gray-700'
                            : ''
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 dark:border-gray-600 px-2 py-1"
                          >
                            {String(cell || '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {excelData.length > 10 && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    ... و {toEnglishDigits(excelData.length - 10)}{' '}
                    صفوف إضافية
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileEditorTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/AnalyticsTab.tsx
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface DeviceInfo {
  device: string;
  browser: string;
  os: string;
  screenResolution: string;
  connectionType: string;
  batteryLevel: number;
}

interface AnalyticsTabProps {
  deviceInfo: DeviceInfo;
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  averageProgress: number;
}

/** Analytics tab displaying device information and user activity statistics */
const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ deviceInfo, totalCourses, completedCourses, totalHours, averageProgress }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          التحليلات
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            إحصائيات الجهاز
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                الجهاز:
              </span>
              <span className="font-medium capitalize">
                {deviceInfo.device}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                المتصفح:
              </span>
              <span className="font-medium">
                {deviceInfo.browser}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                نظام التشغيل:
              </span>
              <span className="font-medium">{deviceInfo.os}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                دقة الشاشة:
              </span>
              <span className="font-medium">
                {deviceInfo.screenResolution}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                نوع الاتصال:
              </span>
              <span className="font-medium">
                {deviceInfo.connectionType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                مستوى البطارية:
              </span>
              <span className="font-medium">
                {toEnglishDigits(deviceInfo.batteryLevel)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            نشاط المستخدم
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <div className="font-medium text-green-800 dark:text-green-400">
                  الدورات المكتملة
                </div>
                <div className="text-sm text-green-600 dark:text-green-500">
                  {toEnglishDigits(completedCourses)} من{' '}
                  {toEnglishDigits(totalCourses)}
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <div className="font-medium text-blue-800 dark:text-blue-400">
                  إجمالي الساعات
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-500">
                  {toEnglishDigits(totalHours)} ساعة
                </div>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div>
                <div className="font-medium text-purple-800 dark:text-purple-400">
                  متوسط التقدم
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-500">
                  {toEnglishDigits(averageProgress)}%
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/ActivityTab.tsx
import { motion } from 'framer-motion';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  category: string;
  metadata?: Record<string, any>;
}

interface ActivityTabProps {
  activityLog: Activity[];
}

/** Activity tab showing chronological user activity log */
const ActivityTab: React.FC<ActivityTabProps> = ({ activityLog }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          النشاط
        </h2>
      </div>

      <div className="space-y-4">
        {activityLog.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-r-4 border-blue-500"
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activity.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString(
                      'ar'
                    )}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {activity.category}
                  </div>
                </div>

                {activity.metadata && (
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {Object.entries(activity.metadata).map(
                      ([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;
```

```
/Users/azrael.JUDES-LAPTOP/Desktop/New folder/555/src/components/ProfileComponent/index.ts
export { default as ProfileHeader } from './ProfileHeader';
export { default as ProfileInfoTab } from './ProfileInfoTab';
export { default as CoursesTab } from './CoursesTab';
export { default as CertificatesTab } from './CertificatesTab';
export { default as SettingsTab } from './SettingsTab';
export { default as ExamsTab } from './ExamsTab';
export { default as BadgesTab } from './BadgesTab';
export { default as AIToolsTab } from './AIToolsTab';
export { default as FileEditorTab } from './FileEditorTab';
export { default as AnalyticsTab } from './AnalyticsTab';
export { default as ActivityTab } from './ActivityTab';