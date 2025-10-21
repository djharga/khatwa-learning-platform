import { LucideIcon, UserPlus, BookOpen, CreditCard, Play, Users, TrendingUp, Award } from 'lucide-react';

export interface HowItWorksVariant {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  background?: string;
  text?: string;
}

export interface HowItWorksStepDefinition {
  step: number;
  landing: HowItWorksVariant;
  catalog: HowItWorksVariant;
}

export const howItWorksSteps: HowItWorksStepDefinition[] = [
  {
    step: 1,
    landing: {
      icon: UserPlus,
      title: 'التسجيل',
      description: 'قم بإنشاء حسابك مجاناً وابدأ رحلتك التعليمية في دقائق معدودة.',
      gradient: 'from-blue-500 to-cyan-500',
      background: 'bg-blue-50',
      text: 'text-blue-700',
    },
    catalog: {
      icon: Users,
      title: 'سجل حسابك',
      description: 'أنشئ حساباً موثوقاً خلال دقائق مع توثيق ثنائي واعتماد معهد المراجعة الداخلي.',
    },
  },
  {
    step: 2,
    landing: {
      icon: BookOpen,
      title: 'اختيار الدورة',
      description: 'تصفح مجموعة واسعة من الدورات المتخصصة واختر ما يناسب احتياجاتك المهنية.',
      gradient: 'from-purple-500 to-pink-500',
      background: 'bg-purple-50',
      text: 'text-purple-700',
    },
    catalog: {
      icon: BookOpen,
      title: 'اختر دورة معتمدة',
      description: 'تصفح دورات معتمدة من جهات دولية مع إيضاح شهادات الإنهاء وضمان التحديث المستمر.',
    },
  },
  {
    step: 3,
    landing: {
      icon: CreditCard,
      title: 'الدفع الآمن',
      description: 'ادفع بأمان تام من خلال بوابات دفع موثوقة ومحمية بأعلى معايير الأمان.',
      gradient: 'from-green-500 to-emerald-500',
      background: 'bg-green-50',
      text: 'text-green-700',
    },
    catalog: {
      icon: TrendingUp,
      title: 'تعلم وتابع التقدم',
      description: 'تابع الدروس بمرافقة مدربين معتمدين وخطط تدقيق أسبوعية لضمان تحقيق الأهداف.',
    },
  },
  {
    step: 4,
    landing: {
      icon: Play,
      title: 'بدء التعلم',
      description: 'ابدأ في التعلم فوراً مع محتوى تفاعلي ودعم مستمر من مدربينا الخبراء.',
      gradient: 'from-orange-500 to-red-500',
      background: 'bg-orange-50',
      text: 'text-orange-700',
    },
    catalog: {
      icon: Award,
      title: 'احصل على شهادة موثقة',
      description: 'استلم وثائق رقمية مختومة ومراجعة من شركائنا المعتمدين مع إمكانية التحقق الفوري.',
    },
  },
];
