'use client';

import { useExam } from './ExamContext';
import { motion } from 'framer-motion';

interface AnswerOptionProps {
  option: string;
  index: number;
  questionId: string;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

/** Individual answer option with radio button and selection styling */
const AnswerOption: React.FC<AnswerOptionProps> = ({ option, index, questionId, isSelected, onSelect }) => {
  return (
    <label
      className={`flex items-center p-4 min-h-[44px] rounded-lg border-2 transition-all duration-200 ease-out cursor-pointer focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 ${
        isSelected
          ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/30'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-neutral-800'
      }`}
    >
      <input
        type="radio"
        name={`question-${questionId}`}
        value={index}
        checked={isSelected}
        onChange={() => onSelect(index)}
        className="form-radio text-primary-600 dark:text-primary-400 focus:ring-primary-500 transition-all duration-200 ease-out"
      />
      <span className="mr-3 text-neutral-900 dark:text-white">{option}</span>
    </label>
  );
};

/** Displays the current exam question with multiple choice options. Handles answer selection and updates exam state. Includes smooth animations for question transitions. */
const QuestionView = () => {
  const { examData, examState, setExamState } = useExam();
  const currentQuestion = examData.questions[examState.currentQuestionIndex];

  /** Updates the exam state with the selected answer for the current question */
  const handleAnswerSelect = (optionIndex: number) => {
    // Update the answers map with the selected option for the current question
    setExamState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: optionIndex,
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-elevation-2 p-6 border border-neutral-200 dark:border-neutral-700"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          السؤال {examState.currentQuestionIndex + 1} من{' '}
          {examData.questions.length}
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300">{currentQuestion.question}</p>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            index={index}
            questionId={currentQuestion.id}
            isSelected={examState.answers[currentQuestion.id] === index}
            onSelect={handleAnswerSelect}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionView;
