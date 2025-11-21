'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, BookOpen, Calendar } from 'lucide-react';
import { Container, Card, Grid } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';

/**
 * Latest Content Section - أحدث المحتوى
 * يعرض المقالات والموارد الجديدة
 */

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  type: 'article' | 'resource';
}

const LatestContentSection = () => {
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'أهم معايير المراجعة الداخلية لعام 2024',
      excerpt: 'دليل شامل لأحدث معايير المراجعة الداخلية والمعتمدة دولياً',
      image: '/content/article1.jpg',
      author: 'د. أحمد محمد',
      date: 'منذ 3 أيام',
      category: 'مقالات',
      readTime: '5 دقائق',
      type: 'article',
    },
    {
      id: '2',
      title: 'دليل المحاسبة المالية للمبتدئين',
      excerpt: 'مقدمة شاملة لمبادئ المحاسبة المالية وأساسياتها',
      image: '/content/article2.jpg',
      author: 'د. سارة علي',
      date: 'منذ أسبوع',
      category: 'موارد',
      readTime: '8 دقائق',
      type: 'resource',
    },
    {
      id: '3',
      title: 'أفضل الممارسات في إدارة المخاطر',
      excerpt: 'تعلم كيفية تحديد وإدارة المخاطر في المؤسسات',
      image: '/content/article3.jpg',
      author: 'د. محمد حسن',
      date: 'منذ أسبوعين',
      category: 'مقالات',
      readTime: '6 دقائق',
      type: 'article',
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <Container size="xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              أحدث المقالات والموارد
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              اطلع على آخر المحتوى التعليمي والمقالات المتخصصة
            </p>
          </div>
          <Link href={ROUTES.RESOURCES} className="hidden lg:flex">
            <Button variant="secondary">
              <span>عرض المكتبة</span>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Content Grid */}
        <Grid cols={3} gap="lg">
          {contentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card variant="elevated" size="md" className="h-full hover:shadow-elevation-5 transition-all duration-300" hover>
                <Link href={`/resources/${item.id}`} className="block">
                  {/* Image */}
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-16 h-16 text-neutral-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </Grid>

        {/* Mobile CTA */}
        <div className="text-center mt-8 lg:hidden">
          <Link href={ROUTES.RESOURCES}>
            <Button variant="secondary">
              <span>عرض المكتبة الكاملة</span>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default LatestContentSection;

