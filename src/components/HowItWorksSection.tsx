'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  howItWorksSteps,
  type HowItWorksVariant,
} from './how-it-works/how-it-works-data';

type CatalogueStep = HowItWorksVariant & { step: string };

const HowItWorksSection = ({ className }: { className?: string }) => {
  const steps = useMemo<CatalogueStep[]>(
    () =>
      howItWorksSteps.map((stepDefinition, index) => ({
        step: String(index + 1).padStart(2, '0'),
        ...stepDefinition.catalog,
      })),
    []
  );

  return (
    <section className="relative py-16 px-12 bg-gradient-to-br from-slate-50 via-indigo-50/10 to-slate-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.04),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-56 h-56 bg-blue-200/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/5 rounded-full blur-3xl"></div>

      <div className="grid-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight">
            كيف يعمل منصة خطى؟
          </h2>
          <p className="body-text text-slate-700 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed mb-20">
            رحلة مضمونة توفّر رقابة أكاديمية واعتماداً مهنياً في كل مرحلة
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              معتمد من معهد المدققين الداخليين IIA
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              ضمان استرداد خلال 30 يوماً
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              مراجعة جودة شهرية من خبراء مستقلين
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-slate-200/50 hover:border-slate-300/70"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-slate-700">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
