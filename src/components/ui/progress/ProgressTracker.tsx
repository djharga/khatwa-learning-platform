import React from 'react';

type ProgressType = 'circular' | 'linear' | 'milestone';

interface ProgressTrackerProps {
  type: ProgressType;
  value: number;
  max?: number;
  milestones?: {label: string; value: number}[];
  showStats?: boolean;
  className?: string;
}

const CircularProgress = ({value, max = 100}: {value: number; max?: number}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 - percentage}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

const LinearProgress = ({value, max = 100}: {value: number; max?: number}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 rounded-full transition-all duration-300" 
        style={{width: `${percentage}%`}}
      />
    </div>
  );
};

const MilestoneTracker = ({milestones, value}: {milestones: {label: string; value: number}[]; value: number}) => {
  const sortedMilestones = [...milestones].sort((a, b) => a.value - b.value);
  return (
    <div className="flex flex-col gap-2">
      {sortedMilestones.map((milestone, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${value >= milestone.value ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-sm">{milestone.label}</span>
        </div>
      ))}
    </div>
  );
};

const ProgressStats = ({value, max = 100}: {value: number; max?: number}) => {
  return (
    <div className="text-sm text-gray-600">
      {value} / {max} ({Math.round((value / max) * 100)}%)
    </div>
  );
};

export const ProgressTracker = ({
  type,
  value,
  max = 100,
  milestones = [],
  showStats = false,
  className = ''
}: ProgressTrackerProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {type === 'circular' && <CircularProgress value={value} max={max} />}
      {type === 'linear' && <LinearProgress value={value} max={max} />}
      {type === 'milestone' && <MilestoneTracker milestones={milestones} value={value} />}
      {showStats && <ProgressStats value={value} max={max} />}
    </div>
  );
};
