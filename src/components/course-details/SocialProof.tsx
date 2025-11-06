'use client';

import { motion } from 'framer-motion';
import { Star, Users, Award, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  comment: string;
  verified?: boolean;
}

interface SocialProofProps {
  stats?: {
    graduates?: number;
    satisfaction?: number;
    companies?: number;
  };
  testimonials?: Testimonial[];
}

export default function SocialProof({ stats, testimonials = [] }: SocialProofProps) {
  return (
    <div className="space-y-8">
      {/* Stats */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {stats.graduates && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 text-center">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stats.graduates.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">خريج</div>
            </div>
          )}
          {stats.satisfaction && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {stats.satisfaction}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">معدل الرضا</div>
            </div>
          )}
          {stats.companies && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 text-center">
              <Award className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {stats.companies}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">شركة توظف خريجينا</div>
            </div>
          )}
        </motion.div>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ماذا يقول طلابنا</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-gray-50 dark:bg-neutral-700/50 rounded-xl border border-gray-200 dark:border-neutral-600"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-800">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {testimonial.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-6 p-6 bg-gray-50 dark:bg-neutral-700/50 rounded-2xl border border-gray-200 dark:border-neutral-600"
      >
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-medium">ضمان استرجاع الأموال</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium">شهادات معتمدة</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="font-medium">وصول مدى الحياة</span>
        </div>
      </motion.div>
    </div>
  );
}

