import Link from 'next/link';
import { 
  Crown, 
  ChevronRight, 
  Award, 
  Globe,
  ArrowLeft
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Simplified Fellowship Section - قسم الزمالة المبسّط
 * قسم بسيط مع دعوة للانتقال إلى صفحة CIA التفصيلية
 */
const FellowshipSection = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              زمالة المدقق الداخلي المعتمد
            </h2>
            <p className="text-xl lg:text-2xl text-indigo-600 dark:text-indigo-400 mb-2">
              Certified Internal Auditor (CIA)
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-8">
              <Globe className="w-4 h-4" />
              <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية. اكتشف التفاصيل الكاملة والفوائد والموارد التعليمية المتاحة.
            </p>

            {/* CTA Button */}
            <Link
              href="/cia"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 active:from-indigo-500 active:via-purple-500 active:to-indigo-500 active:brightness-110 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 active:shadow-lg active:scale-[0.98] transition-all duration-200 text-lg focus:outline-none focus-visible:outline-none"
            >
              <span>اكتشف برنامج الزمالة الكامل</span>
              <ChevronRight className="w-6 h-6" />
            </Link>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/80 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">190+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">دولة معترف بها</div>
              </div>
              <div className="text-center p-4 bg-white/80 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">مستويات احترافية</div>
              </div>
              <div className="text-center p-4 bg-white/80 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">2000+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">سؤال تدريبي</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FellowshipSection;
