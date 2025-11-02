'use client';

import { motion } from 'framer-motion';
import { Bookmark, ChevronLeft, Sparkles } from 'lucide-react';

type RecommendedPath = {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  recommendedFor: string[];
  duration?: string;
  level?: 'مبتدئ' | 'متوسط' | 'متقدم';
};

export const RecommendedPaths = ({ 
  paths,
  onPathSelect
}: {
  paths: RecommendedPath[];
  onPathSelect?: (pathId: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      dir="rtl"
    >
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        مسارات مقترحة لك
      </h3>

      <div className="space-y-4">
        {paths.map((path) => (
          <motion.div
            key={path.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onPathSelect?.(path.id)}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-800">{path.title}</h4>
                  {path.level && (
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                      {path.level}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                {path.duration && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Bookmark className="w-3 h-3" />
                    <span>{path.duration}</span>
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {path.recommendedFor.map((reason) => (
                    <span key={reason} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">
                    {path.matchPercentage}%
                  </span>
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500 mt-1">نسبة تطابق</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
