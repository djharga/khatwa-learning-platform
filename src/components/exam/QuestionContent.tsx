'use client';

import { motion } from 'framer-motion';
import { Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, ExamState } from '../../hooks/useExamState';

/**
 * Props for the question content component
 */
interface QuestionContentProps {
  /** The current question object */
  question: Question;
  /** The current exam state */
  examState: ExamState;
  /** Callback to handle answer changes */
  onAnswerChange: (questionId: string, answer: any) => void;
  /** Callback to toggle mark on a question */
  onToggleMark: (questionId: string) => void;
  /** Callback to navigate to next or previous question */
  onNavigate: (direction: 'next' | 'prev') => void;
  /** Total number of questions in the exam */
  totalQuestions: number;
}

/**
 * Question header with difficulty badge, tags, and mark toggle button
 */
interface QuestionHeaderProps {
  question: Question;
  isMarked: boolean;
  onToggleMark: (questionId: string) => void;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  question,
  isMarked,
  onToggleMark,
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-3 space-x-reverse">
      <div
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          question.difficulty === 'beginner'
            ? 'bg-green-100 text-green-800'
            : question.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}
      >
        {question.difficulty === 'beginner'
          ? 'مبتدئ'
          : question.difficulty === 'intermediate'
            ? 'متوسط'
            : 'متقدم'}
      </div>
      {question.tags && (
        <div className="flex space-x-2 space-x-reverse">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>

    <button
      onClick={() => onToggleMark(question.id)}
      className={`p-2 rounded-lg transition-colors ${
        isMarked
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700'
      }`}
      aria-label={
        isMarked
          ? 'إلغاء تمييز السؤال'
          : 'تمييز السؤال للمراجعة'
      }
    >
      <Flag className="w-5 h-5" />
    </button>
  </div>
);

/**
 * Question text display in both Arabic and English
 */
interface QuestionTextProps {
  arabic: string;
  english: string;
}

const QuestionText: React.FC<QuestionTextProps> = ({ arabic, english }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      {arabic}
    </h2>
    <p className="text-gray-600 dark:text-gray-300">{english}</p>
  </div>
);

/**
 * Multiple choice answer options with radio buttons
 */
interface MultipleChoiceOptionsProps {
  questionId: string;
  options: string[];
  selectedAnswer: any;
  onAnswerChange: (questionId: string, answer: any) => void;
}

const MultipleChoiceOptions: React.FC<MultipleChoiceOptionsProps> = ({
  questionId,
  options,
  selectedAnswer,
  onAnswerChange,
}) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-center space-x-3 space-x-reverse bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <input
          type="radio"
          name={`question-${questionId}`}
          value={option}
          checked={selectedAnswer === option}
          onChange={() => onAnswerChange(questionId, option)}
          className="text-primary"
        />
        <span className="text-gray-900 dark:text-white">{option}</span>
      </label>
    ))}
  </div>
);

/**
 * True/False answer options
 */
interface TrueFalseOptionsProps {
  questionId: string;
  selectedAnswer: any;
  onAnswerChange: (questionId: string, answer: any) => void;
}

const TrueFalseOptions: React.FC<TrueFalseOptionsProps> = ({
  questionId,
  selectedAnswer,
  onAnswerChange,
}) => (
  <div className="space-y-3">
    {['صحيح', 'خطأ'].map((option) => (
      <label
        key={option}
        className="flex items-center space-x-3 space-x-reverse bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <input
          type="radio"
          name={`question-${questionId}`}
          value={option}
          checked={selectedAnswer === option}
          onChange={() => onAnswerChange(questionId, option)}
          className="text-primary"
        />
        <span className="text-gray-900 dark:text-white">{option}</span>
      </label>
    ))}
  </div>
);

/**
 * Essay-type answer textarea
 */
interface EssayAnswerProps {
  questionId: string;
  value: string;
  onAnswerChange: (questionId: string, answer: any) => void;
}

const EssayAnswer: React.FC<EssayAnswerProps> = ({
  questionId,
  value,
  onAnswerChange,
}) => (
  <textarea
    value={value}
    onChange={(e) => onAnswerChange(questionId, e.target.value)}
    placeholder="اكتب إجابتك هنا..."
    className="w-full h-64 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
  />
);

/**
 * Bottom navigation bar with previous/next buttons and progress indicator
 */
interface NavigationFooterProps {
  currentQuestion: number;
  totalQuestions: number;
  onNavigate: (direction: 'next' | 'prev') => void;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({
  currentQuestion,
  totalQuestions,
  onNavigate,
}) => (
  <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-4xl mx-auto flex justify-between items-center">
      <button
        onClick={() => onNavigate('prev')}
        disabled={currentQuestion === 0}
        className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
        <span>السابق</span>
      </button>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        {currentQuestion + 1} من {totalQuestions}
      </div>

      <button
        onClick={() => onNavigate('next')}
        disabled={currentQuestion === totalQuestions - 1}
        className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>التالي</span>
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  </div>
);

/**
 * Main question content area displaying question text, answer options, and navigation controls.
 * Supports multiple question types: multiple choice, true/false, and essay.
 * Includes difficulty badge, tags, mark-for-review toggle, and previous/next navigation.
 */
export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  examState,
  onAnswerChange,
  onToggleMark,
  onNavigate,
  totalQuestions,
}) => {
  const isMarked = examState.markedQuestions.has(question.id);

  const renderAnswerOptions = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceOptions
            questionId={question.id}
            options={question.options!}
            selectedAnswer={examState.answers[question.id]}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'true_false':
        return (
          <TrueFalseOptions
            questionId={question.id}
            selectedAnswer={examState.answers[question.id]}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'essay':
        return (
          <EssayAnswer
            questionId={question.id}
            value={examState.answers[question.id] || ''}
            onAnswerChange={onAnswerChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Question Content */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex-1 p-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <QuestionHeader
            question={question}
            isMarked={isMarked}
            onToggleMark={onToggleMark}
          />
          <QuestionText arabic={question.arabic} english={question.english} />
          {renderAnswerOptions()}
        </div>
      </motion.div>

      <NavigationFooter
        currentQuestion={examState.currentQuestion}
        totalQuestions={totalQuestions}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default QuestionContent;
