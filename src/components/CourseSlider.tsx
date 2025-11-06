'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bookmark, Star } from 'lucide-react';
import { CourseSliderProps } from '@/types/course';

const CourseSlider = (props: CourseSliderProps & { visibleCards?: number }) => {
  const { courses = [], visibleCards = 3 } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 300;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      Math.min(courses.length - visibleCards, prev + 1)
    );
  }, [courses.length, visibleCards]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">الدورات المتاحة</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${currentIndex === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= courses.length - visibleCards}
              className={`p-2 rounded-full ${currentIndex >= courses.length - visibleCards ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentIndex * (cardWidth + 24) }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="flex-shrink-0"
                style={{ width: cardWidth }}
                whileHover={{ y: -2 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow h-full">
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          بواسطة {course.instructor.name}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < course.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({course.reviewCount})
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-gray-900">
                        {course.price > 0 ? `${course.price} دولار` : 'مجاناً'}
                      </div>
                      <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        ابدأ الآن
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(courses.length / visibleCards) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCards)}
                className={`w-3 h-3 rounded-full ${currentIndex === index * visibleCards ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

CourseSlider.displayName = 'CourseSlider';

export default CourseSlider;
