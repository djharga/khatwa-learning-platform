'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function StudentSettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      examReminders: true,
      newContent: false,
    },
    privacy: {
      profileVisibility: 'private',
      showProgress: false,
      allowMessages: true,
    },
    preferences: {
      language: 'ar',
      theme: 'auto',
      timezone: 'Africa/Cairo',
    },
  });

  const [profile, setProfile] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+20 123 456 7890',
    bio: 'مهتم بالمحاسبة والمراجعة الداخلية',
  });

  const handleSaveSettings = () => {
    alert('تم حفظ الإعدادات بنجاح');
  };

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
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              إعدادات الحساب
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة إعدادات حسابك وتفضيلاتك الشخصية
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="privacy">الخصوصية</TabsTrigger>
              <TabsTrigger value="preferences">التفضيلات</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="user" size="sm" />
                    المعلومات الشخصية
                  </CardTitle>
                  <CardDescription>
                    تحديث معلومات ملفك الشخصي
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
                  <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                    <Icon name="save" size="sm" className="ml-2" />
                    حفظ التغييرات
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="notifications" size="sm" />
                    إعدادات الإشعارات
                  </CardTitle>
                  <CardDescription>
                    تحكم في الإشعارات التي تريد تلقيها
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          تلقي إشعارات عبر البريد الإلكتروني
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="email-notifications"
                        checked={settings.notifications.email}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, email: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">إشعارات الدفع</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          تلقي إشعارات فورية في المتصفح
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="push-notifications"
                        checked={settings.notifications.push}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, push: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="course-updates">تحديثات الدورات</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          إشعارات عند إضافة محتوى جديد للدورات
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="course-updates"
                        checked={settings.notifications.courseUpdates}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, courseUpdates: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="exam-reminders">تذكيرات الامتحانات</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          تذكيرات قبل موعد الامتحانات
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="exam-reminders"
                        checked={settings.notifications.examReminders}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, examReminders: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} className="w-full md:w-auto">
                    <Icon name="save" size="sm" className="ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="lock" size="sm" />
                    إعدادات الخصوصية
                  </CardTitle>
                  <CardDescription>
                    تحكم في خصوصية حسابك ومعلوماتك
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>رؤية الملف الشخصي</Label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={settings.privacy.profileVisibility}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, profileVisibility: e.target.value },
                          })
                        }
                      >
                        <option value="public">عام</option>
                        <option value="private">خاص</option>
                        <option value="friends">الأصدقاء فقط</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-progress">عرض التقدم في الملف الشخصي</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          السماح للآخرين برؤية تقدمك في الدورات
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="show-progress"
                        checked={settings.privacy.showProgress}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showProgress: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-messages">السماح بالرسائل</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          السماح للآخرين بإرسال رسائل لك
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="allow-messages"
                        checked={settings.privacy.allowMessages}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, allowMessages: e.target.checked },
                          })
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} className="w-full md:w-auto">
                    <Icon name="save" size="sm" className="ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="settings" size="sm" />
                    التفضيلات العامة
                  </CardTitle>
                  <CardDescription>
                    تخصيص تجربة التعلم حسب تفضيلاتك
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>اللغة</Label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={settings.preferences.language}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            preferences: { ...settings.preferences, language: e.target.value },
                          })
                        }
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>المظهر</Label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={settings.preferences.theme}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            preferences: { ...settings.preferences, theme: e.target.value },
                          })
                        }
                      >
                        <option value="light">فاتح</option>
                        <option value="dark">داكن</option>
                        <option value="auto">تلقائي</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>المنطقة الزمنية</Label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={settings.preferences.timezone}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            preferences: { ...settings.preferences, timezone: e.target.value },
                          })
                        }
                      >
                        <option value="Africa/Cairo">مصر (UTC+3)</option>
                        <option value="Asia/Riyadh">السعودية (UTC+3)</option>
                        <option value="Asia/Dubai">الإمارات (UTC+4)</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} className="w-full md:w-auto">
                    <Icon name="save" size="sm" className="ml-2" />
                    حفظ التفضيلات
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
