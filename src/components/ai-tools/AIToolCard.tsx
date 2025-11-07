'use client';

import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

export interface AIToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  status: 'available' | 'coming-soon';
  onClick?: () => void;
}

export default function AIToolCard({
  name,
  description,
  icon: Icon,
  gradient,
  status,
  onClick,
}: AIToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'available'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
        }`}>
          {status === 'available' ? 'متاح' : 'قريباً'}
        </span>
        
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
    </motion.div>
  );
}

