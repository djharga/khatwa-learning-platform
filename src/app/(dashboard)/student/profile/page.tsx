'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';

export default function StudentProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleSaveProfile = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const completionPercentage = (stats.completedCourses / stats.totalCourses) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-extrabold border-4 border-white shadow-2xl">
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
                      className="text-3xl md:text-4xl font-extrabold mb-2"
                    >
                      {profile.name}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-indigo-100 mb-2"
                    >
                      {profile.email}
                    </motion.p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </span>
                      <span>•</span>
                      <span>عضو منذ {new Date(stats.joinedDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                  className="group hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-md rounded-xl hover:from-white/30 hover:via-white/40 hover:to-white/30 transition-all duration-300 border-2 border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl"
                >
                  {editMode ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Save className="w-5 h-5" />
                      </motion.div>
                      <span className="font-semibold">حفظ</span>
                    </>
                  ) : saved ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-300" />
                      </motion.div>
                      <span className="font-semibold">تم الحفظ</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-semibold">تعديل</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30">
                  <div className="text-3xl font-extrabold mb-1">{stats.completedCourses}</div>
                  <div className="text-sm text-indigo-100">دورة مكتملة</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30">
                  <div className="text-3xl font-extrabold mb-1">{stats.certificates}</div>
                  <div className="text-sm text-indigo-100">شهادة</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30">
                  <div className="text-3xl font-extrabold mb-1">{stats.hoursLearned}</div>
                  <div className="text-sm text-indigo-100">ساعة تعلم</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30">
                  <div className="text-3xl font-extrabold mb-1">{stats.averageScore}%</div>
                  <div className="text-sm text-indigo-100">متوسط الدرجات</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modern Tabs Navigation */}
          <div className="mb-8">
            <ModernTabs
              tabs={[
                { id: 'overview', label: 'نظرة عامة', icon: User, count: undefined },
                { id: 'achievements', label: 'الإنجازات', icon: Award, count: stats.certificates },
                { id: 'certificates', label: 'الشهادات', icon: Award, count: stats.certificates },
                { id: 'activity', label: 'الأنشطة', icon: Activity, count: undefined },
                { id: 'settings', label: 'الإعدادات', icon: Settings, count: undefined },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="default"
              size="lg"
              fullWidth={false}
            />
          </div>

          {/* Tab Content */}
          <ModernTabContent value="overview" activeValue={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* About */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl">نبذة عني</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-600" />
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
                        transition={{ delay: index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 text-orange-700 rounded-xl text-sm font-bold"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    الشهادات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl"
                      >
                        <div className="p-2 bg-yellow-500 rounded-lg">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-900">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl">الروابط</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href={profile.website} target="_blank" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <Globe className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="font-medium">الموقع الإلكتروني</span>
                    </a>
                    <a href={profile.linkedin} target="_blank" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                        <User className="w-6 h-6" />
                      </div>
                      المعلومات الشخصية
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      تحديث معلوماتك الشخصية الأساسية
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
                      <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                        <User className="w-4 h-4" />
                        الاسم الكامل
                      </Label>
                      {editMode ? (
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="h-12 text-lg"
                        />
                      ) : (
                        <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                          {profile.name}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        البريد الإلكتروني
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      ) : (
                        <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                          {profile.email}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        رقم الهاتف
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      ) : (
                        <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                          {profile.phone}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        الموقع
                      </Label>
                      {editMode ? (
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="h-12 pr-10 text-lg"
                          />
                        </div>
                      ) : (
                        <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                          {profile.location}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="bio" className="text-base font-semibold">نبذة شخصية</Label>
                    {editMode ? (
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
                        placeholder="اكتب نبذة قصيرة عن نفسك..."
                      />
                    ) : (
                      <div className="w-full p-4 bg-gray-50 rounded-xl text-lg min-h-[100px]">
                        {profile.bio}
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      المعلومات المهنية
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      معلوماتك المهنية والتعليمية
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="experience" className="text-base font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      الخبرة
                    </Label>
                    {editMode ? (
                      <Input
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                        className="h-12 text-lg"
                      />
                    ) : (
                      <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                        {profile.experience}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="education" className="text-base font-semibold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      التعليم
                    </Label>
                    {editMode ? (
                      <Input
                        id="education"
                        value={profile.education}
                        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                        className="h-12 text-lg"
                      />
                    ) : (
                      <div className="h-12 px-4 flex items-center text-lg font-semibold bg-gray-50 rounded-lg">
                        {profile.education}
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Save Button */}
              {editMode && (
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setEditMode(false)}
                    className="text-lg px-8"
                  >
                    إلغاء
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveProfile}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl"
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 inline ml-2" />
                        تم الحفظ
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 inline ml-2" />
                        حفظ التغييرات
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </div>
          </ModernTabContent>

          <ModernTabContent value="achievements" activeValue={activeTab}>
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                  الإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'متعلم نشط', description: 'أكملت 5 دورات في شهر', icon: Star, color: 'from-blue-500 to-indigo-600' },
                    { title: 'خبير المراجعة', description: 'حصلت على شهادة CIA Part 1', icon: Award, color: 'from-purple-500 to-pink-600' },
                    { title: 'متسابق سريع', description: 'أكملت دورة في أقل من أسبوع', icon: Activity, color: 'from-green-500 to-emerald-600' },
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-2xl bg-gradient-to-br ${achievement.color} text-white shadow-xl`}
                    >
                      <achievement.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                      <p className="text-white/80">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="certificates" activeValue={activeTab}>
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                  الشهادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="p-4 bg-yellow-500 rounded-xl">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{cert}</h3>
                        <p className="text-gray-600">شهادة معتمدة من منصة خطى</p>
                      </div>
                      <Button variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-50">
                        عرض
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="activity" activeValue={activeTab}>
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                  الأنشطة الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'أكملت دورة', course: 'أساسيات المراجعة الداخلية', date: 'منذ يومين', icon: CheckCircle2, color: 'text-green-600' },
                    { action: 'حصلت على شهادة', course: 'CIA Part 1', date: 'منذ أسبوع', icon: Award, color: 'text-yellow-600' },
                    { action: 'بدأت دورة جديدة', course: 'تحليل المخاطر', date: 'منذ أسبوعين', icon: Play, color: 'text-blue-600' },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <activity.icon className={`w-6 h-6 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.course}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

          <ModernTabContent value="settings" activeValue={activeTab}>
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Settings className="w-6 h-6" />
                    </div>
                    إعدادات الملف الشخصي
                  </CardTitle>
                  <CardDescription className="text-gray-100">
                    إدارة إعداداتك وتفضيلاتك الشخصية
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">الإشعارات</p>
                      <p className="text-sm text-gray-600">تلقي إشعارات حول التقدم والإنجازات</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">الخصوصية</p>
                      <p className="text-sm text-gray-600">إظهار ملفك الشخصي للآخرين</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">المشاركة</p>
                      <p className="text-sm text-gray-600">السماح بمشاركة إنجازاتك</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ModernTabContent>

        </motion.div>
      </div>
    </div>
  );
}
