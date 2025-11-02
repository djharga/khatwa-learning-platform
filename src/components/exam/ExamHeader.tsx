'use client';
  
import { motion } from 'framer-motion';
import { Clock, Eye, Calculator } from 'lucide-react';
import { ExamState } from '../../hooks/useExamState';
  
/**
 * Props for the exam header component including state, controls, and display functions.
 */
interface ExamHeaderProps {
  /** The current state of the exam, including progress and settings. */
  examState: ExamState;
  /** The progress percentage as a string (e.g., "45.0"). */
  progress: string;
  /** Object containing color, status, and message for the performance indicator. */
  performanceIndicator: { color: string; status: string; message: string };
  /** Function to format time in seconds into a readable string. */
  formatTime: (seconds: number) => string;
  /** Boolean indicating if focus mode is enabled, hiding progress indicators. */
  focusMode: boolean;
  /** Function to set the focus mode state. */
  setFocusMode: (mode: boolean) => void;
  /** Function to toggle the calculator visibility. */
  toggleCalculator: (e: React.MouseEvent) => void;
  /** Total number of questions in the exam. */
  totalQuestions: number;
}
  
/**
 * Displays real-time performance status with animated indicator.
 */
interface PerformanceIndicatorProps {
  color: string;
  status: string;
  message: string;
}
const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  color,
  status,
  message,
}) => (
  <div className="flex items-center space-x-2 space-x-reverse bg-white/90 dark:bg-gray-800/90 rounded-lg px-3 py-2 shadow-sm">
    <div className={`w-3 h-3 rounded-full ${color} animate-pulse`}></div>
    <div className="text-xs">
      <div className="font-semibold text-gray-900 dark:text-white">{status}</div>
      <div className="text-gray-600 dark:text-gray-300">{message}</div>
    </div>
  </div>
);
  
/**
 * Animated progress bar showing exam completion percentage.
 */
interface ProgressBarProps {
  progress: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="flex items-center space-x-2 space-x-reverse">
    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {progress}%
    </div>
    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);
  
/**
 * Countdown timer display with warning styling.
 */
interface TimerDisplayProps {
  timeRemaining: number;
  formatTime: (seconds: number) => string;
}
const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  formatTime,
}) => (
  <div className="flex items-center space-x-2 space-x-reverse bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
    <Clock className="w-4 h-4 text-red-600" />
    <div className="text-sm font-mono text-red-700 dark:text-red-300">
      {formatTime(timeRemaining)}
    </div>
  </div>
);
  
/**
 * Exam header component displaying exam title, progress, timer, and control buttons.
 * Supports focus mode that hides progress indicators. Includes performance indicator,
 * progress bar, countdown timer, calculator toggle, and focus mode toggle.
 */
export const ExamHeader: React.FC<ExamHeaderProps> = ({
  examState,
  progress,
  performanceIndicator,
  formatTime,
  focusMode,
  setFocusMode,
  toggleCalculator,
  totalQuestions,
}) => (
  <motion.header
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center"
  >
    <div className="flex items-center space-x-4 space-x-reverse">
      <div className="text-2xl font-bold text-primary">
        برنامج الإرشاد التعليمي
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        السؤال {examState.currentQuestion + 1} من {totalQuestions}
      </div>
    </div>
  
    <div className="flex items-center space-x-4 space-x-reverse">
      {/* Performance Indicator */}
      {!focusMode && (
        <PerformanceIndicator
          color={performanceIndicator.color}
          status={performanceIndicator.status}
          message={performanceIndicator.message}
        />
      )}
  
      {/* Progress Bar */}
      {!focusMode && <ProgressBar progress={progress} />}
  
      {/* Timer */}
      <TimerDisplay
        timeRemaining={examState.timeRemaining}
        formatTime={formatTime}
      />
  
      {/* Calculator Toggle */}
      <button
        onClick={toggleCalculator}
        className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
        aria-label="فتح الآلة الحاسبة"
      >
        <Calculator className="w-5 h-5" />
      </button>
  
      {/* Focus Mode Toggle */}
      <button
        onClick={() => setFocusMode(!focusMode)}
        className={`p-2 rounded-lg transition-colors ${
          focusMode
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        } hover:opacity-80`}
        aria-label={focusMode ? 'تعطيل وضع التركيز' : 'تفعيل وضع التركيز'}
      >
        <Eye className="w-5 h-5" />
      </button>
    </div>
  </motion.header>
);
  
export default ExamHeader;
