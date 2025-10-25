'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
  gradient?: string;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  description,
  gradient = 'bg-gradient-to-b from-primary-500 to-accent-500',
  iconColor = 'text-white',
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={"rounded-2xl shadow-lg p-6 bg-white dark:bg-slate-800 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-neutral-100 mb-4">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-neutral-400 mb-6">
          {description}
        </p>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-primary">{value}</div>
          <span className={`text-base font-normal ${getChangeColor()}`}>
            {change}
          </span>
          <TrendingUp className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
