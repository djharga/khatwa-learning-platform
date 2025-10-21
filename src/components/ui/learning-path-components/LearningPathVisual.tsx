'use client';

import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Flag } from 'lucide-react';

export type LearningPathStep = {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
};

export const LearningPathVisual = ({ steps }: { steps: LearningPathStep[] }) => {
  return (
    <div className="space-y-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        مسار التعلم الخاص بك
      </h3>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg ${step.current ? 'bg-indigo-50' : 'bg-gray-50'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : step.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
              {step.completed ? <Flag className="w-4 h-4" /> : index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${step.completed ? 'text-green-700' : step.current ? 'text-indigo-700' : 'text-gray-700'}`}>
                {step.title}
              </p>
            </div>
            {!step.completed && (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
