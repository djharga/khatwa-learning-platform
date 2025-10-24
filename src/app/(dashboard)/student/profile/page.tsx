'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+20 123 456 7890',
    bio: 'مهتم بالمحاسبة والمراجعة الداخلية',
    location: 'القاهرة، مصر',
    website: 'https://example.com',
    linkedin: 'https://linkedin.com/in/ahmed',
    experience: '3 سنوات في المحاسبة',
    education: 'بكالوريوس محاسبة - جامعة القاهرة',
    certifications: ['CIA Part 1', 'CPA'],
    skills: ['المحاسبة', 'المراجعة الداخلية', 'تحليل المخاطر', 'الامتثال'],
  });

  const [stats] = useState({
    completedCourses: 12,
    totalCourses: 16,
    certificates: 8,
    hoursLearned: 156,
    averageScore: 92,
  });

  const handleSaveProfile = () => {
    alert('تم حفظ الملف الشخصي بنجاح');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              الملف الشخصي
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة معلومات ملفك الشخصي وإحصائيات التعلم
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="user" size="sm" />
                    نظرة عامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.email}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.completedCourses}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        دورة مكتملة
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.certificates}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        شهادة
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stats.hoursLearned}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ساعة تعلم
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {stats.averageScore}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        متوسط الدرجات
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>التقدم العام</span>
                      <span>{Math.round((stats.completedCourses / stats.totalCourses) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.completedCourses / stats.totalCourses) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="user" size="sm" />
                    المعلومات الشخصية
                  </CardTitle>
                  <CardDescription>
                    تحديث معلوماتك الشخصية الأساسية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">نبذة شخصية</Label>
                    <textarea
                      id="bio"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="اكتب نبذة قصيرة عن نفسك..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="briefcase" size="sm" />
                    المعلومات المهنية
                  </CardTitle>
                  <CardDescription>
                    معلوماتك المهنية والتعليمية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="experience">الخبرة</Label>
                      <Input
                        id="experience"
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">التعليم</Label>
                      <Input
                        id="education"
                        value={profile.education}
                        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">الموقع الإلكتروني</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label>المهارات</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-2">
                    <Label>الشهادات</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900/20 dark:text-green-400"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} size="lg">
                  <Icon name="save" size="sm" className="ml-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
