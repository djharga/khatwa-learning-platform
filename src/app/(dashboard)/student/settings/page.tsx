'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const tabConfig = [
    { id: 'account', label: 'الحساب', icon: User },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'privacy', label: 'الخصوصية', icon: Lock },
    { id: 'preferences', label: 'التفضيلات', icon: Globe },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'billing', label: 'الفواتير', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              إعدادات الحساب
            </h1>
            <p className="text-lg text-gray-600">
              إدارة حسابك وتفضيلاتك الشخصية بكل سهولة
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Tabs List */}
              <div className="bg-white rounded-3xl p-2 shadow-2xl border-2 border-gray-100">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-transparent h-auto">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.div key={tab.id}>
                        <TabsTrigger
                          value={tab.id}
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl py-3 px-4 transition-all duration-300 flex flex-col items-center gap-2"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs md:text-sm font-semibold">{tab.label}</span>
                        </TabsTrigger>
                      </motion.div>
                    );
                  })}
                </TabsList>
              </div>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <User className="w-6 h-6" />
                        </div>
                        المعلومات الأساسية
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        تحديث بيانات حسابك الشخصية
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="name" className="text-base font-semibold">الاسم الكامل</Label>
                        <Input
                          id="name"
                          value={account.name}
                          onChange={(e) => setAccount({ ...account, name: e.target.value })}
                          className="h-12 text-lg"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="email" className="text-base font-semibold">البريد الإلكتروني</Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="phone" className="text-base font-semibold">رقم الهاتف</Label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="phone"
                            value={account.phone}
                            onChange={(e) => setAccount({ ...account, phone: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="location" className="text-base font-semibold">الموقع</Label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="location"
                            value={account.location}
                            onChange={(e) => setAccount({ ...account, location: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="bio" className="text-base font-semibold">نبذة شخصية</Label>
                      <textarea
                        id="bio"
                        value={account.bio}
                        onChange={(e) => setAccount({ ...account, bio: e.target.value })}
                        rows={4}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
                        placeholder="اكتب نبذة قصيرة عن نفسك..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="group relative overflow-hidden w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {saved ? (
                          <>
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Check className="w-5 h-5 relative z-10" />
                            </motion.div>
                            <span className="relative z-10">تم الحفظ</span>
                          </>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Save className="w-5 h-5 relative z-10" />
                            </motion.div>
                            <span className="relative z-10">حفظ التغييرات</span>
                          </>
                        )}
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </motion.button>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-red-600">
                      <AlertCircle className="w-6 h-6" />
                      منطقة الخطر
                    </CardTitle>
                    <CardDescription className="text-red-700">
                      الإجراءات التي لا يمكن التراجع عنها
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-900">تصدير بيانات الحساب</h4>
                        <p className="text-sm text-gray-600">قم بتحميل نسخة من جميع بياناتك</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4 group-hover:animate-bounce" />
                        <span>تصدير</span>
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-semibold text-red-600">حذف الحساب</h4>
                        <p className="text-sm text-red-700">حذف حسابك وكل بياناتك بشكل دائم</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span>حذف الحساب</span>
                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Bell className="w-6 h-6" />
                        </div>
                        إعدادات الإشعارات
                      </CardTitle>
                      <CardDescription className="text-green-100">
                        تحكم في الإشعارات التي تريد تلقيها
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    {Object.entries(notifications).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all group"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {(notificationText[key]?.label) || key}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {(notificationText[key]?.description) || 'تحكم في هذا النوع من الإشعارات'}
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                            animate={{ x: value ? 28 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </motion.div>
                    ))}
                    <Button
                      onClick={handleSave}
                      size="lg"
                      className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8"
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

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                          <Lock className="w-6 h-6" />
                        </div>
                        إعدادات الخصوصية
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        تحكم في خصوصية حسابك ومعلوماتك
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    {Object.entries(privacy).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
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
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${
                              value ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                              animate={{ x: value ? 28 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </motion.button>
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
                      </motion.div>
                    ))}
                    <Button
                      onClick={handleSave}
                      size="lg"
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
                  </CardContent>
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
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
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
                    </motion.div>

                    <Button
                      onClick={handleSave}
                      size="lg"
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
                        <Button size="lg" variant="outline">
                          إدارة الاشتراك
                        </Button>
                        <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                          ترقية الخطة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
