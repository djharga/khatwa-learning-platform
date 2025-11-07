'use client';

import { Sparkles, BookOpen, Zap } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Introduction Section - قسم التعريف بالمنصة
 * يعرض التعريف الأساسي بمنصة خطى
 */

const IntroductionSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Enhanced Abstract Background - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-100/12 to-transparent dark:from-purple-900/8 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              منصة التعلم المهني
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
            خطى للتعليم والتدريب والاستشارات
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl lg:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 mb-8">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              تعليم وتدريب بلا حدود
            </span>
          </h2>

          {/* First Paragraph */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-center">
              خطى هي منصة عربية رائدة في تعليم وتطوير مهارات الأعمال، تجمع بين المحتوى الأكاديمي والتطبيق العملي الواقعي، وتقدّم تجربة تعليمية ذكية تعتمد على اللأدوات التقنية الحديثة والذكاء الاصطناعي.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium text-center">
              "خطى" ليست مجرد منصة تعليمية، بل حل متكامل لتحويل أي متعلم إلى محترف في تخصصه من خلال{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">محتوى واقعي</span>،{' '}
              <span className="text-purple-600 dark:text-purple-400 font-bold">أدوات ذكية</span>، و{' '}
              <span className="text-pink-600 dark:text-pink-400 font-bold">دعم شخصي</span>.
            </p>
          </div>

          {/* Second Paragraph with Icon */}
          <div className="max-w-4xl mx-auto mt-12 p-8 lg:p-12 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl">
            <div className="flex items-center justify-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center space-y-4">
                <p className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                  في "خطى"، نؤمن بأن التعلم الحقيقي يبدأ عندما تُطبّق المعرفة على أرض الواقع.
                </p>
                <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  تأسست منصتنا بهدف توفير محتوى تدريبي عملي 100%، مستند إلى خبرات وتجارب شركات رائدة، لتسهل عليك طريق التميز المهني.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
};

export default IntroductionSection;

