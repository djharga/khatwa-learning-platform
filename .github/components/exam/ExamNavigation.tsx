'use client';

import { useExam } from './ExamContext';

/**
 * Displays login/register prompt for unauthenticated users
 */
const UnauthenticatedPrompt: React.FC = () => {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600 mb-4">
        للوصول إلى الامتحان الكامل، يرجى تسجيل الدخول أو إنشاء حساب
      </p>
      <div className="space-x-4 rtl:space-x-reverse">
        <a
          href="/login"
          className="inline-block px-6 py-2 min-h-[44px] bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          تسجيل الدخول
        </a>
        <a
          href="/register"
          className="inline-block px-6 py-2 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          إنشاء حساب
        </a>
      </div>
    </div>
  );
};

/**
 * Previous/next navigation buttons with disabled states at boundaries
 */
const NavigationButtons: React.FC<{
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ currentIndex, totalQuestions, onPrevious, onNext }) => {
  return (
      <div className="flex justify-between items-center gap-4">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`px-6 py-2 min-h-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          currentIndex === 0
            ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
        }`}
      >
        السؤال السابق
      </button>

      <span className="text-neutral-600 dark:text-neutral-400 font-medium">
        {currentIndex + 1} / {totalQuestions}
      </span>

      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className={`px-6 py-2 min-h-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          currentIndex === totalQuestions - 1
            ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-elevation-2 hover:shadow-elevation-4'
        }`}
      >
        السؤال التالي
      </button>
    </div>
  );
};

/**
 * Navigation controls for the exam interface. Displays previous/next buttons with progress indicator for authenticated users. Shows login/register prompts for unauthenticated users.
 */
const ExamNavigation: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const { examData, examState, setExamState } = useExam();

  /**
   * Advances to the next question if available
   */
  const handleNext = () => {
    if (examState.currentQuestionIndex < examData.questions.length - 1) {
      setExamState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  /**
   * Returns to the previous question if available
   */
  const handlePrevious = () => {
    if (examState.currentQuestionIndex > 0) {
      setExamState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  if (!isAuthenticated) {
    return <UnauthenticatedPrompt />;
  }

  const progress =
    ((examState.currentQuestionIndex + 1) / examData.questions.length) * 100;

  return (
    <div className="mt-6">
      {/* شريط التقدم */}
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>

      <NavigationButtons
        currentIndex={examState.currentQuestionIndex}
        totalQuestions={examData.questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default ExamNavigation;
