'use client';

import { motion } from 'framer-motion';
import { ExamState, Question } from '../../hooks/useExamState';

/**
 * Props for the question list sidebar component
 */
interface QuestionListProps {
  /** Array of exam questions to display */
  questions: Question[];
  /** Current state of the exam including answers and progress */
  examState: ExamState;
  /** Callback function to navigate to a specific question by index */
  onNavigate: (index: number) => void;
}

/**
 * Individual question number button with status-based styling
 */
interface QuestionButtonProps {
  question: Question;
  index: number;
  isCurrent: boolean;
  isAnswered: boolean;
  isMarked: boolean;
  onNavigate: (index: number) => void;
}

const QuestionButton: React.FC<QuestionButtonProps> = ({
  question,
  index,
  isCurrent,
  isAnswered,
  isMarked,
  onNavigate,
}) => (
  <button
    onClick={() => onNavigate(index)}
    className={`p-3 rounded-lg border-2 transition-colors ${
      isCurrent
        ? 'bg-primary border-primary text-white'
        : isAnswered
          ? 'bg-green-100 border-green-500 text-green-700'
          : isMarked
            ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
            : 'bg-gray-100 border-gray-300 text-gray-700'
    }`}
    aria-label={`السؤال ${index + 1}`}
  >
    {index + 1}
  </button>
);

/**
 * Legend explaining question status color coding
 */
const StatusLegend: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center text-sm">
      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
      <span>مجابة</span>
    </div>
    <div className="flex items-center text-sm">
      <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
      <span>معلمة للمراجعة</span>
    </div>
    <div className="flex items-center text-sm">
      <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
      <span>غير مجابة</span>
    </div>
  </div>
);

/**
 * Sidebar panel displaying all exam questions as a numbered grid. Color-codes questions by status: current (primary), answered (green), marked (yellow), unanswered (gray). Includes a legend explaining the color coding.
 */
export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  examState,
  onNavigate,
}) => (
  <motion.div
    initial={{ x: -300 }}
    animate={{ x: 0 }}
    className="w-80 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto"
  >
    <div className="p-6">
      <h2 className="text-xl font-bold text-primary mb-6">الأسئلة</h2>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {questions.map((question, index) => (
          <QuestionButton
            key={question.id}
            question={question}
            index={index}
            isCurrent={index === examState.currentQuestion}
            isAnswered={!!examState.answers[question.id]}
            isMarked={examState.markedQuestions.has(question.id)}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <StatusLegend />
    </div>
  </motion.div>
);

export default QuestionList;
