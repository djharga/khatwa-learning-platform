'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Save,
  Award,
  Star,
  Calendar,
  Edit2,
  Camera,
  CheckCircle2,
  Activity,
  Settings,
  Play,
} from 'lucide-react';
import StyledButton from '@/components/ui/StyledButton';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';
import { Skeleton } from '@/components/ui/Skeleton';

export default function StudentProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formattedDate, setFormattedDate] = useState<string>('يناير 2023');

  const [profile, setProfile] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+20 123 456 7890',
    bio: 'مهتم بالمحاسبة والمراجعة الداخلية مع خبرة أكثر من 5 سنوات في مجال التدقيق',
    location: 'القاهرة، مصر',
    website: 'https://example.com',
    linkedin: 'https://linkedin.com/in/ahmed',
    experience: '5 سنوات في المحاسبة والمراجعة',
    education: 'بكالوريوس محاسبة - جامعة القاهرة',
    certifications: ['CIA Part 1', 'CPA', 'IFRS Certified'],
    skills: ['المحاسبة', 'المراجعة الداخلية', 'تحليل المخاطر', 'الامتثال', 'IFRS', 'المحاسبة الضريبية'],
  });

  const [stats] = useState({
    completedCourses: 12,
    totalCourses: 16,
    certificates: 8,
    hoursLearned: 156,
    averageScore: 92,
    joinedDate: '2023-01-15',
  });
  
  // Fix hydration error - format date only on client
  useEffect(() => {
    try {
      const date = new Date(stats.joinedDate);
      const formatted = date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setFormattedDate(formatted);
    } catch (error) {
      // Fallback if date parsing fails
      setFormattedDate('يناير 2023');
    }
  }, [stats.joinedDate]);

  const handleSaveProfile = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const completionPercentage = (stats.completedCourses / stats.totalCourses) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-6 sm:p-8 lg:p-12 shadow-lg"
          >
            <div className="absolute top-0 end-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative group cursor-pointer flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold border-4 border-white shadow-2xl">
                      {profile.name.charAt(0)}
                    </div>
                    {editMode && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </motion.div>
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 break-words"
                    >
                      {profile.name}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base sm:text-lg text-indigo-100 mb-2 break-all"
                    >
                      {profile.email}
                    </motion.p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="break-words">{profile.location}</span>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>عضو منذ {formattedDate}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                  className="group hidden md:flex items-center gap-2 px-6 py-3 min-h-[44px] bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-200 ease-out border-2 border-white/40 hover:border-white/60 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                  aria-label={editMode ? 'حفظ التغييرات' : 'تعديل الملف الشخصي'}
                  type="button"
                >
                  {editMode ? (
                    <>
                      <Save className="w-5 h-5" aria-hidden="true" />
                      <span className="font-semibold">حفظ</span>
                    </>
                  ) : saved ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-300" aria-hidden="true" />
                      <span className="font-semibold">تم الحفظ</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5" aria-hidden="true" />
                      <span className="font-semibold">تعديل</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-white/30 transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stats.completedCourses}</div>
                  <div className="text-xs sm:text-sm text-blue-100">دورة مكتملة</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-white/30 transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stats.certificates}</div>
                  <div className="text-xs sm:text-sm text-blue-100">شهادة</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-white/30 transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stats.hoursLearned}</div>
                  <div className="text-xs sm:text-sm text-blue-100">ساعة تعلم</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-white/30 transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stats.averageScore}%</div>
                  <div className="text-xs sm:text-sm text-blue-100">متوسط الدرجات</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Modern Tabs Navigation */}
          <div className="mb-6 sm:mb-8 w-full">
            <ModernTabs
              tabs={[
                { id: 'overview', label: 'نظرة عامة', icon: User, count: undefined },
                { id: 'personal', label: 'المعلومات الشخصية', icon: User, count: undefined },
                { id: 'professional', label: 'المهنية', icon: Briefcase, count: undefined },
                { id: 'achievements', label: 'الإنجازات', icon: Award, count: stats.certificates },
                { id: 'certificates', label: 'الشهادات', icon: Award, count: stats.certificates },
                { id: 'activity', label: 'الأنشطة', icon: Activity, count: undefined },
                { id: 'settings', label: 'الإعدادات', icon: Settings, count: undefined },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="default"
              size="md"
              fullWidth={true}
            />
          </div>

          {/* Tab Content */}
          <ModernTabContent value="overview" activeValue={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* About */}
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-xl text-neutral-900 dark:text-white">نبذة عني</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Star className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                    المهارات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        className="px-3 py-1.5 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 text-warning-700 dark:text-warning-400 rounded-lg text-sm font-bold"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Award className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                    الشهادات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {profile.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 rounded-xl transition-all duration-200 ease-out cursor-pointer"
                      >
                        <div className="p-2 bg-warning-500 dark:bg-warning-600 rounded-lg">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-xl text-neutral-900 dark:text-white">الروابط</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 min-h-[44px] hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="الموقع الإلكتروني"
                    >
                      <Globe className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ease-out" aria-hidden="true" />
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">الموقع الإلكتروني</span>
                    </a>
                    <a 
                      href={profile.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 min-h-[44px] hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ease-out" aria-hidden="true" />
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Main Content - Overview Tab */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.completedCourses}</div>
                  <div className="text-xs sm:text-sm text-blue-100">دورة مكتملة</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-gradient-to-br from-success-600 to-success-700 text-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.certificates}</div>
                  <div className="text-xs sm:text-sm text-green-100">شهادة</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-gradient-to-br from-secondary-innovate-600 to-secondary-innovate-700 text-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.hoursLearned}</div>
                  <div className="text-xs sm:text-sm text-purple-100">ساعة تعلم</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="bg-gradient-to-br from-warning-600 to-warning-700 text-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stats.averageScore}%</div>
                  <div className="text-xs sm:text-sm text-orange-100">متوسط الدرجات</div>
                </motion.div>
              </div>

              {/* Recent Activity Preview */}
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    النشاط الأخير
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { action: 'أكملت دورة', course: 'أساسيات المراجعة الداخلية', date: 'منذ يومين', icon: CheckCircle2, color: 'text-success-600 dark:text-success-400' },
                      { action: 'حصلت على شهادة', course: 'CIA Part 1', date: 'منذ أسبوع', icon: Award, color: 'text-warning-600 dark:text-warning-400' },
                      { action: 'بدأت دورة جديدة', course: 'تحليل المخاطر', date: 'منذ أسبوعين', icon: Play, color: 'text-primary-600 dark:text-primary-400' },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 ease-out"
                      >
                        <activity.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activity.color}`} aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">{activity.action}</p>
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">{activity.course}</p>
                        </div>
                        <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{activity.date}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    href="/student/profile?tab=activity"
                    onClick={() => setActiveTab('activity')}
                    className="block mt-4 text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg py-2"
                    aria-label="عرض جميع الأنشطة"
                  >
                    عرض جميع الأنشطة →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          </ModernTabContent>

          {/* Personal Information Tab */}
          <ModernTabContent value="personal" activeValue={activeTab}>
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                        <User className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      </div>
                      المعلومات الشخصية
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      تحديث معلوماتك الشخصية الأساسية
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                        <User className="w-4 h-4" aria-hidden="true" />
                        الاسم الكامل
                      </Label>
                      {editMode ? (
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="h-11 sm:h-12 text-base sm:text-lg min-h-[44px]"
                          aria-label="الاسم الكامل"
                        />
                      ) : (
                        <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                          {profile.name}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        البريد الإلكتروني
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <Mail className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="البريد الإلكتروني"
                          />
                        </div>
                      ) : (
                        <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                          {profile.email}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
                      className="space-y-2"
                    >
                      <Label htmlFor="phone" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        رقم الهاتف
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <Phone className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="رقم الهاتف"
                          />
                        </div>
                      ) : (
                        <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                          {profile.phone}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
                      className="space-y-2"
                    >
                      <Label htmlFor="location" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        الموقع
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="الموقع"
                          />
                        </div>
                      ) : (
                        <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                          {profile.location}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
                    className="space-y-2"
                  >
                    <Label htmlFor="bio" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">نبذة شخصية</Label>
                    {editMode ? (
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full p-3 sm:p-4 min-h-[120px] border-2 border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base sm:text-lg resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                        placeholder="اكتب نبذة قصيرة عن نفسك..."
                        aria-label="نبذة شخصية"
                      />
                    ) : (
                      <div className="w-full p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-base sm:text-lg min-h-[100px] text-neutral-900 dark:text-white">
                        {profile.bio}
                      </div>
                    )}
                  </motion.div>

                {editMode && (
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-6 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="إلغاء التعديل"
                      type="button"
                    >
                      إلغاء
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      className="px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-base sm:text-lg shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="حفظ التغييرات"
                      type="button"
                    >
                      {saved ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 inline ms-2" aria-hidden="true" />
                          تم الحفظ
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 inline ms-2" aria-hidden="true" />
                          حفظ التغييرات
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
                </CardContent>
              </Card>
          </ModernTabContent>

          {/* Professional Information Tab */}
          <ModernTabContent value="professional" activeValue={activeTab}>
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="bg-gradient-to-r from-success-600 via-success-700 to-success-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      </div>
                      المعلومات المهنية
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      معلوماتك المهنية والتعليمية
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                    className="space-y-2"
                  >
                    <Label htmlFor="experience" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                      <Briefcase className="w-4 h-4" aria-hidden="true" />
                      الخبرة
                    </Label>
                    {editMode ? (
                      <Input
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                        className="h-11 sm:h-12 text-base sm:text-lg min-h-[44px]"
                        aria-label="الخبرة"
                      />
                    ) : (
                      <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                        {profile.experience}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
                    className="space-y-2"
                  >
                    <Label htmlFor="education" className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                      <GraduationCap className="w-4 h-4" aria-hidden="true" />
                      التعليم
                    </Label>
                    {editMode ? (
                      <Input
                        id="education"
                        value={profile.education}
                        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                        className="h-11 sm:h-12 text-base sm:text-lg min-h-[44px]"
                        aria-label="التعليم"
                      />
                    ) : (
                      <div className="h-11 sm:h-12 min-h-[44px] px-4 flex items-center text-base sm:text-lg font-semibold bg-neutral-50 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                        {profile.education}
                      </div>
                    )}
                  </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
                  className="space-y-2"
                >
                  <Label className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Star className="w-4 h-4 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                    المهارات
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        className="px-3 py-1.5 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 text-warning-700 dark:text-warning-400 rounded-lg text-sm font-bold"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
                  className="space-y-2"
                >
                  <Label className="text-sm sm:text-base font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Award className="w-4 h-4 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                    الشهادات المهنية
                  </Label>
                  <div className="space-y-2 sm:space-y-3">
                    {profile.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 rounded-xl transition-all duration-200 ease-out cursor-pointer"
                      >
                        <div className="p-2 bg-warning-500 dark:bg-warning-600 rounded-lg">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              {editMode && (
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="إلغاء التعديل"
                    type="button"
                  >
                    إلغاء
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white rounded-lg font-medium text-base sm:text-lg shadow-md shadow-success-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="حفظ التغييرات"
                    type="button"
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 inline ms-2" aria-hidden="true" />
                        تم الحفظ
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 inline ms-2" aria-hidden="true" />
                        حفظ التغييرات
                      </>
                    )}
                  </motion.button>
                </div>
              )}
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="achievements" activeValue={activeTab}>
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neutral-900 dark:text-white">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                  الإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { title: 'متعلم نشط', description: 'أكملت 5 دورات في شهر', icon: Star, color: 'from-primary-600 to-primary-700' },
                    { title: 'خبير المراجعة', description: 'حصلت على شهادة CIA Part 1', icon: Award, color: 'from-secondary-innovate-600 to-secondary-innovate-700' },
                    { title: 'متسابق سريع', description: 'أكملت دورة في أقل من أسبوع', icon: Activity, color: 'from-success-600 to-success-700' },
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${achievement.color} text-white shadow-md hover:shadow-lg transition-all duration-200 ease-out`}
                    >
                      <achievement.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4" aria-hidden="true" />
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{achievement.title}</h3>
                      <p className="text-sm sm:text-base text-white/90">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="certificates" activeValue={activeTab}>
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neutral-900 dark:text-white">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                  الشهادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 rounded-xl hover:shadow-lg transition-all duration-200 ease-out"
                    >
                      <div className="p-3 sm:p-4 bg-warning-500 dark:bg-warning-600 rounded-xl">
                        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">{cert}</h3>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">شهادة معتمدة من منصة خطى</p>
                      </div>
                      <button className="px-4 py-2 min-h-[44px] border-2 border-warning-500 dark:border-warning-600 text-warning-700 dark:text-warning-400 hover:bg-warning-50 dark:hover:bg-warning-900/30 rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning-500 focus-visible:ring-offset-2" aria-label={`عرض شهادة ${cert}`}>
                        عرض
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="activity" activeValue={activeTab}>
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neutral-900 dark:text-white">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  الأنشطة الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { action: 'أكملت دورة', course: 'أساسيات المراجعة الداخلية', date: 'منذ يومين', icon: CheckCircle2, color: 'text-success-600 dark:text-success-400' },
                    { action: 'حصلت على شهادة', course: 'CIA Part 1', date: 'منذ أسبوع', icon: Award, color: 'text-warning-600 dark:text-warning-400' },
                    { action: 'بدأت دورة جديدة', course: 'تحليل المخاطر', date: 'منذ أسبوعين', icon: Play, color: 'text-primary-600 dark:text-primary-400' },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 ease-out"
                    >
                      <activity.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activity.color}`} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">{activity.action}</p>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">{activity.course}</p>
                      </div>
                      <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{activity.date}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="settings" activeValue={activeTab}>
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="bg-gradient-to-r from-neutral-600 via-neutral-700 to-neutral-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    </div>
                    إعدادات الملف الشخصي
                  </CardTitle>
                  <CardDescription className="text-gray-100">
                    إدارة إعداداتك وتفضيلاتك الشخصية
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-neutral-50 dark:bg-neutral-800 rounded-xl transition-all duration-200 ease-out hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">الإشعارات</p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">تلقي إشعارات حول التقدم والإنجازات</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 h-5 w-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer" aria-label="تفعيل الإشعارات" />
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-neutral-50 dark:bg-neutral-800 rounded-xl transition-all duration-200 ease-out hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">الخصوصية</p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">إظهار ملفك الشخصي للآخرين</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer" aria-label="تفعيل الخصوصية" />
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-neutral-50 dark:bg-neutral-800 rounded-xl transition-all duration-200 ease-out hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">المشاركة</p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">السماح بمشاركة إنجازاتك</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer" aria-label="تفعيل المشاركة" />
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button className="w-full px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="حفظ الإعدادات">
                    حفظ الإعدادات
                  </button>
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

        </motion.div>
      </div>
    </div>
  );
}
