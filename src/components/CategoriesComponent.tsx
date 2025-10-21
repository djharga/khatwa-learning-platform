'use client';

import { motion } from 'framer-motion';
import { Shield, BookOpen, Brain, Users } from 'lucide-react';

/**
 * Service category card with animated icon, title, description, and optional level indicator. Features gradient background and scale hover effect.
 */
interface CategoryCardProps {
  category: {
    icon: React.ComponentType;
    title: string;
    description: string;
    levels?: string;
  };
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const renderIcon = () => {
    switch (category.title) {
      case 'الدورات':
        return <BookOpen className="w-10 h-10 text-primary transition-all duration-300" />;
      case 'المراجعة الداخلية':
        return <Shield className="w-10 h-10 text-primary transition-all duration-300" />;
      case 'زمالة المراجعين':
        return <Users className="w-10 h-10 text-primary transition-all duration-300" />;
      case 'الذكاء الاصطناعي':
        return <Brain className="w-10 h-10 text-primary transition-all duration-300" />;
      default:
        return <BookOpen className="w-10 h-10 text-primary transition-all duration-300" />;
    }
  };

  return (
    <motion.article
      key={category.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-blue-100 transition-all duration-300"
      role="listitem"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          delay: index * 0.1 + 0.3,
          type: 'spring',
          stiffness: 200,
        }}
        viewport={{ once: true }}
        className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 transition-all duration-300"
        aria-hidden="true"
      >
        {renderIcon()}
      </motion.div>
      <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4 leading-tight">
        {category.title}
      </h3>
      {category.levels && (
        <p
          className="text-sm text-blue-600 font-semibold mb-3"
          aria-label={`يحتوي على ${category.levels}`}
        >
          {category.levels}
        </p>
      )}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {category.description}
      </p>
    </motion.article>
  );
};

/**
 * Platform services/categories section displaying four main service areas: courses, internal auditing, auditors fellowship, and AI tools. Features animated cards with icons and descriptions.
 */
const CategoriesComponent = () => {
  // Platform service categories with icons and descriptions
  const categories = [
    {
      icon: BookOpen,
      title: 'الدورات',
      description:
        'دورات تدريبية متخصصة في المحاسبة، المالية، والإدارة لتطوير مهاراتك المهنية وتعزيز فرصك في سوق العمل.',
    },
    {
      icon: Shield,
      title: 'المراجعة الداخلية',
      description:
        'تدريب شامل على المراجعة الداخلية بثلاثة مستويات: أساسي، متوسط، ومتقدم، مع شهادات معتمدة.',
      levels: '3 مستويات',
    },
    {
      icon: Users,
      title: 'زمالة المراجعين',
      description:
        'برنامج زمالة متخصص للمراجعين يوفر فرص تطوير مهني مستمر، تبادل خبرات، وشبكة مهنية واسعة.',
    },
    {
      icon: Brain,
      title: 'الذكاء الاصطناعي',
      description:
        'استكشف أحدث الأدوات المدعومة بالذكاء الاصطناعي لتحسين العمليات والتحليلات في مجال المراجعة الداخلية.',
    },
  ];

  return (
    <section
      className="py-20 lg:py-24 bg-white transition-all duration-300"
      aria-labelledby="services-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="services-section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-16 leading-tight"
        >
          خدماتنا
        </motion.h2>

        {/* Grid of service category cards with staggered entrance animations */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          role="list"
        >
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesComponent;
