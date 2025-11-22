'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import {
  User,
  Bell,
  Lock,
  Globe,
  CreditCard,
  Shield,
  Save,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Moon,
  Sun,
  Monitor,
  Languages,
  Clock,
  Trash2,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [account, setAccount] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+20 123 456 7890',
    bio: 'مهتم بالمحاسبة والمراجعة الداخلية',
    location: 'القاهرة، مصر',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    courseUpdates: true,
    examReminders: true,
    newContent: true,
    achievements: true,
    messages: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    searchable: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'ar',
    theme: 'auto',
    timezone: 'Africa/Cairo',
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  // تعريب مفاتيح الإشعارات وعرضها بشكل منطقي
  const notificationText: Record<string, { label: string; description: string }> = {
    email: { label: 'البريد الإلكتروني', description: 'استلام تنبيهات عبر البريد الإلكتروني' },
    push: { label: 'إشعارات المنصة', description: 'تنبيهات تظهر داخل المنصة أثناء الاستخدام' },
    sms: { label: 'رسائل SMS', description: 'تنبيهات قصيرة تصل إلى هاتفك' },
    courseUpdates: { label: 'تحديثات الدورات', description: 'تنبيه عند إضافة دروس أو تغييرات في الدورات' },
    examReminders: { label: 'تذكيرات الامتحانات', description: 'تذكير بمواعيد الاختبارات والواجبات' },
    newContent: { label: 'محتوى جديد', description: 'تنبيه عند إضافة محتوى أو موارد جديدة' },
    achievements: { label: 'الإنجازات', description: 'تنبيه عند الحصول على شارة أو إنجاز' },
    messages: { label: 'الرسائل', description: 'تنبيه عند وصول رسالة جديدة' },
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabConfig: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'account', label: 'الحساب', icon: User },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'privacy', label: 'الخصوصية', icon: Lock },
    { id: 'preferences', label: 'التفضيلات', icon: Globe },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'billing', label: 'الفواتير', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <MotionWrapper
          animation="fade"
          className="max-w-7xl mx-auto"
        >
          {/* Settings Layout - Academic Design: Sidebar + Content Area */}
          <div className="flex flex-col lg:flex-row gap-6" dir="rtl">
            {/* Sidebar Navigation - Fixed right (RTL), Width: 240px */}
            <MotionWrapper
              animation="fade"
              delay={0.1}
              className="w-full lg:w-[240px] flex-shrink-0"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-[14px] shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 p-4 sticky top-6">
                <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">الإعدادات</h2>
                <nav className="space-y-1">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#5B36E8] text-white shadow-elevation-2'
                            : 'text-[#6B7280] hover:bg-[#F7F8FC] hover:text-[#111827] dark:text-neutral-400 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </MotionWrapper>

            {/* Settings Content Area - White background, Max-width: 800px, Padding: space-8 (32px) */}
            <MotionWrapper
              animation="fade"
              delay={0.2}
              className="flex-1 max-w-[800px]"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-[14px] shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  {/* Tabs List - Hidden in sidebar layout, shown for mobile */}
                  <div className="lg:hidden bg-[#F7F8FC] rounded-[14px] p-2 border border-neutral-200 dark:border-neutral-700">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-transparent h-auto">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div key={tab.id} className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                        <TabsTrigger
                          value={tab.id}
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-600 data-[state=active]:to-primary-700 data-[state=active]:text-white rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-4 transition-all duration-200 ease-out flex flex-col items-center gap-1.5 sm:gap-2 min-h-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                        </TabsTrigger>
                      </div>
                    );
                  })}
                </TabsList>
              </div>

              {/* Account Tab - Academic Design: Section titles 24px semibold, descriptions 16px regular #6B7280 */}
              <TabsContent value="account" className="space-y-6">
                <div>
                  <h2 className="text-[24px] font-semibold text-[#111827] dark:text-white mb-2" dir="rtl">الحساب</h2>
                  <p className="text-base text-[#6B7280] dark:text-neutral-400 mb-6" dir="rtl">تحديث بيانات حسابك الشخصية</p>
                  <Card className="shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">الاسم الكامل</Label>
                        <Input
                          id="name"
                          value={account.name}
                          onChange={(e) => setAccount({ ...account, name: e.target.value })}
                          className="h-11 sm:h-12 text-base sm:text-lg min-h-[44px]"
                          aria-label="الاسم الكامل"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">البريد الإلكتروني</Label>
                        <div className="relative">
                          <Mail className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="email"
                            type="email"
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="البريد الإلكتروني"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">رقم الهاتف</Label>
                        <div className="relative">
                          <Phone className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="phone"
                            value={account.phone}
                            onChange={(e) => setAccount({ ...account, phone: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="رقم الهاتف"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">الموقع</Label>
                        <div className="relative">
                          <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                          <Input
                            id="location"
                            value={account.location}
                            onChange={(e) => setAccount({ ...account, location: e.target.value })}
                            className="h-11 sm:h-12 min-h-[44px] ps-10 pe-4 text-base sm:text-lg"
                            aria-label="الموقع"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">نبذة شخصية</Label>
                      <textarea
                        id="bio"
                        value={account.bio}
                        onChange={(e) => setAccount({ ...account, bio: e.target.value })}
                        rows={4}
                        className="w-full p-3 sm:p-4 min-h-[120px] border-2 border-neutral-300 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base sm:text-lg resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                        placeholder="اكتب نبذة قصيرة عن نفسك..."
                        aria-label="نبذة شخصية"
                      />
                    </div>

                    <div>
                      <button
                        onClick={handleSave}
                        className="w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white text-base sm:text-lg font-semibold rounded-lg shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="حفظ التغييرات"
                        type="button"
                      >
                        {saved ? (
                          <>
                            <Check className="w-5 h-5" aria-hidden="true" />
                            <span>تم الحفظ</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" aria-hidden="true" />
                            <span>حفظ التغييرات</span>
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
                </div>

                {/* Danger Zone */}
                <Card className="border-2 border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-danger-600 dark:text-danger-400">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      منطقة الخطر
                    </CardTitle>
                    <CardDescription className="text-danger-700 dark:text-danger-300">
                      الإجراءات التي لا يمكن التراجع عنها
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-white dark:bg-neutral-800 rounded-xl transition-all duration-200 ease-out hover:shadow-md">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">تصدير بيانات الحساب</h4>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">قم بتحميل نسخة من جميع بياناتك</p>
                      </div>
                      <button
                        className="px-3 sm:px-4 py-2 min-h-[44px] bg-white dark:bg-neutral-700 border-2 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-400 font-semibold rounded-lg shadow-sm hover:shadow-md hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="تصدير بيانات الحساب"
                        type="button"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm sm:text-base">تصدير</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-white dark:bg-neutral-800 rounded-xl transition-all duration-200 ease-out hover:shadow-md">
                      <div>
                        <h4 className="font-semibold text-danger-600 dark:text-danger-400 text-sm sm:text-base">حذف الحساب</h4>
                        <p className="text-xs sm:text-sm text-danger-700 dark:text-danger-300">حذف حسابك وكل بياناتك بشكل دائم</p>
                      </div>
                      <button
                        className="px-3 sm:px-4 py-2 min-h-[44px] bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-700 hover:to-danger-800 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md shadow-danger-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2"
                        aria-label="حذف الحساب"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm sm:text-base">حذف الحساب</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-success-600 via-success-700 to-success-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Bell className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>
                        إعدادات الإشعارات
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        تحكم في الإشعارات التي تريد تلقيها
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <MotionWrapper stagger staggerDelay={0.05} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    {Object.entries(notifications).map(([key, value], index) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 sm:p-4 min-h-[64px] bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-md transition-all duration-200 ease-out group"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 text-sm sm:text-base">
                            {(notificationText[key]?.label) || key}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                            {(notificationText[key]?.description) || 'تحكم في هذا النوع من الإشعارات'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                            value ? 'bg-success-500' : 'bg-neutral-300 dark:bg-neutral-600'
                          }`}
                          aria-label={`${(notificationText[key]?.label) || key} - ${value ? 'مفعل' : 'معطل'}`}
                          type="button"
                        >
                          <motion.div
                            className="absolute top-0.5 start-0.5 sm:top-1 sm:start-1 w-5 h-5 bg-white rounded-full shadow-lg"
                            animate={{ x: value ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleSave}
                      className="w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white text-base sm:text-lg font-semibold rounded-lg shadow-md shadow-success-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="حفظ إعدادات الإشعارات"
                      type="button"
                    >
                      {saved ? (
                        <>
                          <Check className="w-5 h-5" aria-hidden="true" />
                          <span>تم الحفظ</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" aria-hidden="true" />
                          <span>حفظ الإعدادات</span>
                        </>
                      )}
                    </button>
                  </MotionWrapper>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-4 sm:space-y-6">
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-secondary-innovate-600 via-secondary-innovate-700 to-secondary-innovate-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Lock className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>
                        إعدادات الخصوصية
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        تحكم في خصوصية حسابك ومعلوماتك
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <MotionWrapper stagger staggerDelay={0.1} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    {Object.entries(privacy).map(([key, value], index) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all group border-2 border-purple-100"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 capitalize">
                            {key === 'profileVisibility' ? 'رؤية الملف الشخصي' :
                             key === 'showProgress' ? 'عرض التقدم' :
                             key === 'showAchievements' ? 'عرض الإنجازات' :
                             key === 'allowMessages' ? 'السماح بالرسائل' :
                             key === 'searchable' ? 'ظهور في البحث' : key}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {typeof value === 'boolean'
                              ? (value ? 'مفعل' : 'معطل')
                              : value === 'public'
                                ? 'عام'
                                : value === 'private'
                                  ? 'خاص'
                                  : value === 'friends'
                                    ? 'الأصدقاء فقط'
                                    : String(value)}
                          </p>
                        </div>
                        {typeof value === 'boolean' ? (
                          <button
                            onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                            className={`relative w-14 h-7 rounded-full transition-colors active:scale-90 ${
                              value ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                              animate={{ x: value ? 28 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </button>
                        ) : (
                          <select
                            value={value}
                            onChange={(e) => setPrivacy({ ...privacy, [key]: e.target.value })}
                            className="px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="public">عام</option>
                            <option value="private">خاص</option>
                            <option value="friends">الأصدقاء فقط</option>
                          </select>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={handleSave}
                      size="lg"
                      variant="default"
                      className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
                    >
                      {saved ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          تم الحفظ
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          حفظ الإعدادات
                        </>
                      )}
                    </Button>
                  </MotionWrapper>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Globe className="w-6 h-6" />
                        </div>
                        التفضيلات العامة
                      </CardTitle>
                      <CardDescription className="text-orange-100">
                        تخصيص تجربة التعلم حسب تفضيلاتك
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                        <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                          <Languages className="w-5 h-5 text-orange-600" />
                          اللغة
                        </Label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                          className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg bg-white"
                        >
                          <option value="ar">العربية</option>
                          <option value="en">الإنجليزية</option>
                        </select>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                        <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                          <div className="flex gap-2">
                            <Sun className="w-5 h-5 text-orange-600" />
                            <Moon className="w-5 h-5 text-orange-600" />
                          </div>
                          المظهر
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { value: 'light', icon: Sun, label: 'فاتح' },
                            { value: 'dark', icon: Moon, label: 'داكن' },
                            { value: 'auto', icon: Monitor, label: 'تلقائي' },
                          ].map(({ value, icon: Icon, label }) => (
                            <button
                              key={value}
                              onClick={() => setPreferences({ ...preferences, theme: value })}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                preferences.theme === value
                                  ? 'border-orange-600 bg-orange-100 scale-105'
                                  : 'border-orange-200 bg-white hover:border-orange-300'
                              }`}
                            >
                              <Icon className={`w-8 h-8 mx-auto mb-2 ${preferences.theme === value ? 'text-orange-600' : 'text-gray-400'}`} />
                              <span className="font-semibold">{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                        <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-orange-600" />
                          المنطقة الزمنية
                        </Label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                          className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-lg bg-white"
                        >
                          <option value="Africa/Cairo">مصر (UTC+3)</option>
                          <option value="Asia/Riyadh">السعودية (UTC+3)</option>
                          <option value="Asia/Dubai">الإمارات (UTC+4)</option>
                          <option value="Asia/Kuwait">الكويت (UTC+3)</option>
                          <option value="Asia/Bahrain">البحرين (UTC+3)</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      size="lg"
                      variant="default"
                      className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-lg px-8"
                    >
                      {saved ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          تم الحفظ
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          حفظ التفضيلات
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Shield className="w-6 h-6" />
                        </div>
                        الأمان
                      </CardTitle>
                      <CardDescription className="text-red-100">
                        حماية حسابك بكلمات مرور قوية
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">كلمة المرور الحالية</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="أدخل كلمة المرور الحالية"
                          className="h-12 text-lg"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">كلمة المرور الجديدة</Label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="أدخل كلمة المرور الجديدة"
                        className="h-12 text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">تأكيد كلمة المرور</Label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="أعد إدخال كلمة المرور الجديدة"
                        className="h-12 text-lg"
                      />
                    </div>

                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">المصادقة الثنائية</h4>
                        <p className="text-sm text-gray-600">طبقة أمان إضافية لحسابك</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          security.twoFactor ? 'bg-red-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: security.twoFactor ? 28 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>

                    <Button
                      onClick={handleSave}
                      size="lg"
                      variant="default"
                      className="w-full md:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-lg px-8"
                    >
                      {saved ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          تم الحفظ
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          حفظ الإعدادات
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        الفواتير والاشتراكات
                      </CardTitle>
                      <CardDescription className="text-indigo-100">
                        إدارة اشتراكك وطرق الدفع
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">💎</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">اشتراك مميز</h3>
                      <p className="text-gray-600 mb-6">أنت مشترك حالياً في الخطة المميزة</p>
                      <div className="flex items-center justify-center gap-4">
                        <Button size="lg" variant="secondary">
                          إدارة الاشتراك
                        </Button>
                        <Button size="lg" variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                          ترقية الخطة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

                {/* Sticky Footer with Save Changes Button - Academic Design from agent.md */}
                <div className="sticky bottom-0 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 -mx-8 px-8 pb-8">
                  <Button
                    onClick={handleSave}
                    size="lg"
                    variant="default"
                    className="w-full md:w-auto h-[48px] px-6 bg-[#5B36E8] hover:bg-[#6D4AFF] text-white font-semibold rounded-[10px] shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200"
                  >
                    {saved ? (
                      <>
                        <Check className="w-5 h-5 ml-2" />
                        تم الحفظ
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 ml-2" />
                        حفظ التغييرات
                      </>
                    )}
                  </Button>
                </div>
                </div>
              </MotionWrapper>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
