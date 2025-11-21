'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import PageBackground from '@/components/ui/PageBackground';
import HeroSection from '@/components/ui/HeroSection';

const articles = [
  {
    id: 1,
    slug: 'importance-of-internal-audit',
    title: 'أهمية المراجعة الداخلية في المنظمات الحديثة',
    excerpt:
      'تكتشف في هذا المقال أهمية المراجعة الداخلية ودورها في تعزيز الرقابة والامتثال داخل المنظمات...',
    image: '/article1.jpg',
    author: 'د. أحمد محمد',
    date: '2025-01-15',
    readTime: '5 دقائق',
    category: 'المراجعة الداخلية',
  },
  {
    id: 2,
    slug: 'accounting-standards-update',
    title: 'تحديثات معايير المحاسبة الدولية 2025',
    excerpt:
      'استعرض أحدث التحديثات في معايير المحاسبة الدولية وتأثيرها على الممارسات المحاسبية...',
    image: '/article2.jpg',
    author: 'د. فاطمة علي',
    date: '2025-01-10',
    readTime: '8 دقائق',
    category: 'المحاسبة',
  },
  {
    id: 3,
    slug: 'risk-management-strategies',
    title: 'استراتيجيات إدارة المخاطر في البيئة الرقمية',
    excerpt:
      'تعرف على أفضل الممارسات لإدارة المخاطر في العصر الرقمي وكيفية تطبيقها...',
    image: '/article3.jpg',
    author: 'م. سارة حسن',
    date: '2025-01-05',
    readTime: '6 دقائق',
    category: 'إدارة المخاطر',
  },
  {
    id: 4,
    slug: 'professional-certifications-guide',
    title: 'دليل الشهادات المهنية في مجال المراجعة والمحاسبة',
    excerpt:
      'اكتشف أهم الشهادات المهنية في مجال المراجعة والمحاسبة وكيفية الحصول عليها...',
    image: '/article4.jpg',
    author: 'د. محمد سالم',
    date: '2024-12-28',
    readTime: '10 دقائق',
    category: 'التطوير المهني',
  },
  {
    id: 5,
    slug: 'digital-transformation-audit',
    title: 'التحول الرقمي في عمليات المراجعة',
    excerpt:
      'كيف يمكن للتكنولوجيا الحديثة تحسين عمليات المراجعة والتدقيق المالي...',
    image: '/article5.jpg',
    author: 'د. لينا أحمد',
    date: '2024-12-20',
    readTime: '7 دقائق',
    category: 'التكنولوجيا',
  },
  {
    id: 6,
    slug: 'compliance-best-practices',
    title: 'أفضل الممارسات في الامتثال المؤسسي',
    excerpt:
      'دليل شامل لتطبيق أفضل الممارسات في مجال الامتثال داخل المنظمات...',
    image: '/article6.jpg',
    author: 'م. عمر خالد',
    date: '2024-12-15',
    readTime: '9 دقائق',
    category: 'الامتثال',
  },
];

const BlogPage = () => {
  return (
    <PageBackground variant="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <HeroSection
          title="المدونة"
          description="اكتشف أحدث المقالات والمقالات المتخصصة في مجالات المراجعة الداخلية والمحاسبة"
          variant="primary"
          size="sm"
          className="mx-0 my-0 rounded-none mb-16"
          contentClassName="py-8"
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="card-modern bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden hover-lift-sm rounded-2xl p-0"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {article.category}
                </div>
              </div>

              <div className="p-8">
                <h2 className="heading-3 text-primary line-clamp-2 mb-4">
                  {article.title}
                </h2>
                <p className="body-text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-1" />
                    {new Date(article.date).toLocaleDateString('ar-SA')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {article.readTime} قراءة
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary hover:text-accent font-semibold text-sm transition-all duration-300 min-h-11"
                  >
                    اقرأ المزيد
                    <ArrowRight className="w-5 h-5 mr-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <button className="btn-primary bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-xl font-semibold transition-all duration-300 min-h-11">
            تحميل المزيد من المقالات
          </button>
        </motion.div>
      </div>
    </PageBackground>
  );
};

export default BlogPage;
