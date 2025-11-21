'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type ProgressType = 'circular' | 'linear' | 'milestone';

interface ProgressTrackerProps {
  type: ProgressType;
  value: number;
  max?: number;
  milestones?: {label: string; value: number}[];
  showStats?: boolean;
  className?: string;
  size?: 'small' | 'large'; // For circular progress
}

// Academic Design: Circular Progress - agent.md specs
const CircularProgress = ({value, max = 100, size = 'small'}: {value: number; max?: number; size?: 'small' | 'large'}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const dimensions = size === 'small' ? 64 : 120;
  const strokeWidth = size === 'small' ? 6 : 8;
  const radius = (dimensions - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: `${dimensions}px`, height: `${dimensions}px` }}>
      <svg className="w-full h-full" viewBox={`0 0 ${dimensions} ${dimensions}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Circle */}
        <circle
          cx={dimensions / 2}
          cy={dimensions / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <motion.circle
          cx={dimensions / 2}
          cy={dimensions / 2}
          r={radius}
          fill="none"
          stroke="#5B36E8"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base font-bold text-[#111827]" style={{ fontSize: size === 'small' ? '16px' : '24px' }}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

// Academic Design: Linear Progress Bar - agent.md specs
const LinearProgress = ({value, max = 100}: {value: number; max?: number}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full h-[8px] bg-[#E5E7EB] rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-[#5B36E8] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
};

// Academic Design: Step Progress Indicator - agent.md specs
const MilestoneTracker = ({milestones, value}: {milestones: {label: string; value: number}[]; value: number}) => {
  const sortedMilestones = [...milestones].sort((a, b) => a.value - b.value);
  return (
    <div className="flex items-center gap-2" dir="rtl">
      {sortedMilestones.map((milestone, index) => {
        const isCompleted = value >= milestone.value;
        const isActive = !isCompleted && index === sortedMilestones.findIndex(m => value < m.value);
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div 
                className={`h-[2px] flex-1 ${isCompleted ? 'bg-[#5B36E8]' : 'bg-[#E5E7EB]'}`}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-[#10B981]' 
                    : isActive 
                    ? 'bg-[#5B36E8]' 
                    : 'bg-[#E5E7EB]'
                } transition-all duration-200`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={`text-xs text-center ${isCompleted || isActive ? 'text-[#111827] font-medium' : 'text-[#9CA3AF]'}`}>
                {milestone.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ProgressStats = ({value, max = 100}: {value: number; max?: number}) => {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="text-sm text-[#6B7280] font-medium" dir="rtl">
      {value} / {max} ({percentage}%)
    </div>
  );
};

export const ProgressTracker = ({
  type,
  value,
  max = 100,
  milestones = [],
  showStats = false,
  className = '',
  size = 'small'
}: ProgressTrackerProps) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {type === 'circular' && <CircularProgress value={value} max={max} size={size} />}
      {type === 'linear' && <LinearProgress value={value} max={max} />}
      {type === 'milestone' && <MilestoneTracker milestones={milestones} value={value} />}
      {showStats && <ProgressStats value={value} max={max} />}
    </div>
  );
};
