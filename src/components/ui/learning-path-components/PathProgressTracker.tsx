'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, ChevronRight } from 'lucide-react';

export type ProgressTrackerProps = {
  progress: number;
  completedSteps: number;
  totalSteps: number;
  estimatedTime?: string;
  nextStep?: string;
};

export const PathProgressTracker = ({
  progress,
  completedSteps,
  totalSteps,
  estimatedTime = '~4 ساعات متبقية',
  nextStep = 'المراجعة المالية المتقدمة'
}: ProgressTrackerProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          تقدمك في المسار
        </h3>
        <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
          {completedSteps}/{totalSteps} مكتمل
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 283 }}
                animate={{ 
                  strokeDashoffset: 283 - (283 * progress) / 100 
                }}
                transition={{ duration: 1 }}
                strokeDasharray="283"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">
                {progress}%
              </span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-700">
                {progress >= 75 ? 'مستوى متقدم' : progress >= 50 ? 'مستوى متوسط' : 'مبتدئ'}
              </span>
            </div>
            
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>التالي: {nextStep}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
