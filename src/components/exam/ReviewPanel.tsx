'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { ExamState, Question } from '../../hooks/useExamState';

/**
 * Props for the review panel component
 */
interface ReviewPanelProps {
  /** The current state of the exam */
  examState: ExamState;
  /** Array of exam questions */
  questions: Question[];
  /** Function to navigate to a specific question index */
  onNavigate: (index: number) => void;
  /** Function to go back to the exam */
  onBackToExam: () => void;
  /** Function to submit the exam */
  onSubmit: () => void;
}

/**
 * Displays three statistics cards showing answered, unanswered, and marked question counts
 */
interface StatisticsCardsProps {
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  answeredCount,
  unansweredCount,
  markedCount,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="text-center">
      <div className="text-2xl font-bold text-green-600">
        {answeredCount}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        مجابة
      </div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-red-600">
        {unansweredCount}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        غير مجابة
      </div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-yellow-600">
        {markedCount}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        معلمة للمراجعة
      </div>
    </div>
  </div>
);

/**
 * Action buttons for returning to exam or submitting
 */
interface ActionButtonsProps {
  onBackToExam: () => void;
  onSubmit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBackToExam,
  onSubmit,
}) => (
  <div className="flex justify-center space-x-4 space-x-reverse mb-8">
    <button
      onClick={onBackToExam}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      العودة للاختبار
    </button>
    <button
      onClick={onSubmit}
      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      تسليم الاختبار
    </button>
  </div>
);

/**
 * Grid of question numbers with color-coded status indicators
 */
interface QuestionGridProps {
  questions: Question[];
  examState: ExamState;
  onNavigate: (index: number) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({
  questions,
  examState,
  onNavigate,
}) => (
  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
    {questions.map((question, index) => (
      <button
        key={question.id}
        onClick={() => onNavigate(index)}
        className={`p-3 rounded-lg border-2 transition-colors ${
          examState.answers[question.id]
            ? 'bg-green-100 border-green-500 text-green-700'
            : examState.markedQuestions.has(question.id)
              ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
              : 'bg-gray-100 border-gray-300 text-gray-700'
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

/**
 * Review panel displaying exam completion summary and question grid. Shows statistics for answered, unanswered, and marked questions. Provides navigation to specific questions and options to return to exam or submit.
 */
export const ReviewPanel: React.FC<ReviewPanelProps> = ({
  examState,
  questions,
  onNavigate,
  onBackToExam,
  onSubmit,
}) => {
  const answeredCount = Object.keys(examState.answers).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = examState.markedQuestions.size;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6"
        >
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            مراجعة الاختبار
          </h1>

          <StatisticsCards
            answeredCount={answeredCount}
            unansweredCount={unansweredCount}
            markedCount={markedCount}
          />

          <ActionButtons
            onBackToExam={onBackToExam}
            onSubmit={onSubmit}
          />

          <QuestionGrid
            questions={questions}
            examState={examState}
            onNavigate={onNavigate}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewPanel;
