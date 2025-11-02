'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Building } from 'lucide-react';
import { Container, Card, Button } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * Pricing Section - الباقات
 * يعرض خطط الاشتراك المتاحة
 */

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  icon: typeof Star;
  popular?: boolean;
  color: 'primary' | 'accent' | 'success';
}

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'باقة أساسية',
      description: 'مثالية للمبتدئين',
      price: billingCycle === 'monthly' ? 50 : 425,
      originalPrice: billingCycle === 'monthly' ? 75 : 600,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      features: [
        'وصول لعدد محدد من الدورات',
        'شهادة حضور إلكترونية',
        'دعم عبر الإيميل',
        'مساحة تخزين 2 جيجا',
      ],
      icon: Star,
      color: 'primary',
    },
    {
      id: 'professional',
      name: 'باقة برو',
      description: 'الحل الأمثل للمحترفين',
      price: billingCycle === 'monthly' ? 100 : 850,
      originalPrice: billingCycle === 'monthly' ? 150 : 1200,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      features: [
        'وصول كامل لجميع الدورات',
        'شهادات معتمدة',
        'خصومات على الاستشارات',
        'دعم مباشر 24/7',
        'مساحة تخزين 5 جيجا',
      ],
      icon: Crown,
      color: 'accent',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'للشركات',
      description: 'حلول مخصصة للشركات',
      price: billingCycle === 'monthly' ? 200 : 1700,
      originalPrice: billingCycle === 'monthly' ? 300 : 2400,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      features: [
        'وصول لـ 5 موظفين',
        'متابعة تقارير الأداء',
        'مكتبة شاملة',
        'دعم فني مخصص',
        'تكامل مع أنظمة الشركة',
      ],
      icon: Building,
      color: 'success',
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800/50">
      <Container size="xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            اختر الباقة المناسبة لك
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            خطط مرنة تناسب جميع المستويات والميزانيات
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-neutral-800 rounded-xl shadow-elevation-2 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-2.5 rounded-lg font-semibold text-sm transition-all',
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white shadow-elevation-2'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              )}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                'px-6 py-2.5 rounded-lg font-semibold text-sm transition-all relative',
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white shadow-elevation-2'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              )}
            >
              سنوي
              <span className="absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-0.5 rounded-full">
                توفير 15%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const colorClasses = {
              primary: 'from-primary-500 to-primary-600 border-primary-300',
              accent: 'from-accent-500 to-accent-600 border-accent-300',
              success: 'from-success-500 to-success-600 border-success-300',
            };

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-elevation-3">
                      الأكثر شعبية ⭐
                    </span>
                  </div>
                )}

                <Card
                  variant={plan.popular ? 'elevated' : 'default'}
                  size="lg"
                  className={cn(
                    'h-full text-center',
                    plan.popular && 'border-2',
                    plan.popular && colorClasses[plan.color]
                  )}
                  hover
                >
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-elevation-3",
                    colorClasses[plan.color]
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-xl text-neutral-400 dark:text-neutral-600 line-through">
                          {plan.originalPrice} ر.س
                        </span>
                      )}
                      <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                        {plan.price} ر.س
                      </span>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {plan.period}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-right">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                        <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                        <span className="text-sm lg:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                    animated
                  >
                    <Link href={`/register?plan=${plan.id}`}>
                      {plan.id === 'enterprise' ? 'تواصل معنا' : 'اشترك الآن'}
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;

