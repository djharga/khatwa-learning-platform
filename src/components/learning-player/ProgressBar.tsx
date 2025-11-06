'use client';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1 bg-gray-800 flex-shrink-0">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

