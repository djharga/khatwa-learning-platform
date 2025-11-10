'use client';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative h-1.5 w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-full overflow-hidden shadow-inner">
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}
