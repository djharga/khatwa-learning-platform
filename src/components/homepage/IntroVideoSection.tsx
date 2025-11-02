'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Intro Video Section - قسم الفيديو التعريفي
 * عرض الفيديو التعريفي بشكل أفقي
 */

const IntroVideoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // يمكنك استبدال هذا برابط الفيديو الفعلي
  const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // مثال - استبدله بالفيديو الفعلي

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
  };

  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/30 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent-200/30 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-6 text-center lg:text-right"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
              اكتشف منصة
              <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent mt-2">
                خطى التعليمية
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              شاهد هذا الفيديو التعريفي القصير لتتعرف على منصة خطى وكيف يمكنها أن تساعدك في تطوير مهاراتك المهنية في المراجعة الداخلية والمحاسبة.
            </p>
          </motion.div>

          {/* Right Column - Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {!isVideoPlaying ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 group cursor-pointer" onClick={handlePlayVideo}>
                {/* Thumbnail Image - يمكنك استبدالها بصورة الفيديو */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-colors" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center shadow-elevation-5">
                      <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </motion.div>
                </div>

                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-semibold text-lg">اضغط للمشاهدة</p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="إغلاق الفيديو"
                >
                  <X className="w-6 h-6" />
                </button>
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="الفيديو التعريفي - منصة خطى"
                />
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default IntroVideoSection;


