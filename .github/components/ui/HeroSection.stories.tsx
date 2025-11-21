/**
 * Storybook stories for HeroSection component
 * 
 * Run: npm run storybook
 * 
 * Stories demonstrate all variants, sizes, and use cases
 */

import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from './HeroSection';
import { Play, Star, Users, Award, ArrowRight, BookOpen } from 'lucide-react';

const meta: Meta<typeof HeroSection> = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Reusable Hero Section component with Design System standards. WCAG AA compliant, fully responsive, and performance optimized.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'dark', 'light', 'gradient'],
      description: 'Visual variant of the hero section',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the hero section',
    },
    overlayOpacity: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Overlay opacity percentage (0-100)',
    },
    enableAnimation: {
      control: 'boolean',
      description: 'Enable fade-in animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

// Basic Hero
export const Basic: Story = {
  args: {
    title: 'عنوان رئيسي',
    description: 'وصف تفصيلي للصفحة يشرح المحتوى والهدف من الصفحة',
    variant: 'primary',
    size: 'md',
  },
};

// With Background Image
export const WithBackgroundImage: Story = {
  args: {
    title: 'منصة التعلم المهني',
    description: 'احترف المراجعة الداخلية والمحاسبة مع شهادات معتمدة دولياً',
    backgroundImage: '/assets/hero-main-banner.jpg',
    variant: 'primary',
    size: 'lg',
    badges: [
      { label: 'معتمد دولياً', icon: <Award className="w-3.5 h-3.5" /> },
      { label: 'شهادات معتمدة', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
    cta: {
      label: 'ابدأ الآن',
      href: '/courses',
      variant: 'primary',
      icon: <ArrowRight className="w-4 h-4" />,
    },
  },
};

// With Stats
export const WithStats: Story = {
  args: {
    title: 'إحصائيات منصة خطى',
    description: 'انضم إلى آلاف المحترفين الذين حققوا النجاح',
    backgroundImage: '/assets/hero-main-banner.jpg',
    variant: 'primary',
    size: 'md',
    stats: [
      { value: '5,000+', label: 'متخصص معتمد', icon: <Users className="w-5 h-5" /> },
      { value: '50+', label: 'دورة تدريبية', icon: <BookOpen className="w-5 h-5" /> },
      { value: '95%', label: 'رضا المتدربين', icon: <Star className="w-5 h-5" /> },
    ],
    cta: {
      label: 'استكشف الدورات',
      href: '/courses',
    },
  },
};

// Multiple CTAs
export const MultipleCTAs: Story = {
  args: {
    title: 'ابدأ رحلتك التعليمية اليوم',
    description: 'اختر من بين مجموعة واسعة من الدورات والبرامج التدريبية',
    backgroundImage: '/assets/hero-main-banner.jpg',
    variant: 'primary',
    size: 'md',
    cta: [
      {
        label: 'شاهد معاينة',
        onClick: () => console.log('Play preview'),
        variant: 'primary',
        icon: <Play className="w-4 h-4" />,
      },
      {
        label: 'جرّب مجاناً',
        href: '/trial',
        variant: 'secondary',
      },
    ],
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['primary', 'secondary', 'dark', 'light', 'gradient'] as const).map((variant) => (
        <HeroSection
          key={variant}
          title={`Hero Section - ${variant}`}
          description={`This is a ${variant} variant of the hero section`}
          variant={variant}
          size="md"
          backgroundGradient={
            variant === 'gradient'
              ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'
              : undefined
          }
        />
      ))}
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <HeroSection
          key={size}
          title={`Hero Section - ${size.toUpperCase()}`}
          description={`This is a ${size} size hero section`}
          variant="primary"
          size={size}
        />
      ))}
    </div>
  ),
};

// With Custom Content
export const WithCustomContent: Story = {
  args: {
    title: 'قسم مخصص',
    description: 'يمكنك إضافة محتوى مخصص داخل Hero Section',
    variant: 'primary',
    size: 'md',
    children: (
      <div className="mt-8 flex justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
          <p className="text-white text-center">محتوى مخصص هنا</p>
        </div>
      </div>
    ),
  },
};

// Without Animation
export const WithoutAnimation: Story = {
  args: {
    title: 'بدون أنيميشن',
    description: 'مفيد للمستخدمين الذين يفضلون تقليل الحركة',
    variant: 'primary',
    size: 'md',
    enableAnimation: false,
  },
};

// Light Variant
export const LightVariant: Story = {
  args: {
    title: 'Light Variant',
    description: 'مثالي للخلفيات الفاتحة',
    variant: 'light',
    size: 'md',
    backgroundGradient: 'bg-gradient-to-br from-gray-100 to-gray-200',
    badges: [
      { label: 'جديد', variant: 'accent' },
      { label: 'مميز', variant: 'success' },
    ],
  },
};

// Course Hero Example
export const CourseHeroExample: Story = {
  args: {
    title: 'دورة المراجعة الداخلية المتقدمة',
    description: 'تعلم أساسيات المراجعة الداخلية والمحاسبة مع أفضل الخبراء في المجال',
    backgroundImage: '/assets/course-hero.jpg',
    variant: 'primary',
    size: 'lg',
    badges: [
      { label: 'متقدم', variant: 'warning' },
      { label: '40 ساعة', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
    stats: [
      { value: '4.8', label: 'تقييم', icon: <Star className="w-5 h-5 fill-current text-yellow-300" /> },
      { value: '1,250', label: 'طالب', icon: <Users className="w-5 h-5" /> },
      { value: '40', label: 'درس', icon: <BookOpen className="w-5 h-5" /> },
    ],
    cta: [
      {
        label: 'شاهد معاينة',
        onClick: () => console.log('Play preview'),
        variant: 'primary',
        icon: <Play className="w-4 h-4" />,
      },
      {
        label: 'جرّب درسًا مجانًا',
        href: '/trial',
        variant: 'secondary',
      },
    ],
  },
};

