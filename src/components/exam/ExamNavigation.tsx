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
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          تسجيل الدخول
        </a>
        <a
          href="/register"
          className="inline-block px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
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
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`px-6 py-2 rounded-lg transition-colors ${
          currentIndex === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        السؤال السابق
      </button>

      <span className="text-gray-600">
        {currentIndex + 1} / {totalQuestions}
      </span>

      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className={`px-6 py-2 rounded-lg transition-colors ${
          currentIndex === totalQuestions - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
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
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
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
