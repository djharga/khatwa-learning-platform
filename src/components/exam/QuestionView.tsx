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
      className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <input
        type="radio"
        name={`question-${questionId}`}
        value={index}
        checked={isSelected}
        onChange={() => onSelect(index)}
        className="form-radio text-blue-600 focus:ring-blue-500"
      />
      <span className="mr-3">{option}</span>
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
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          السؤال {examState.currentQuestionIndex + 1} من{' '}
          {examData.questions.length}
        </h3>
        <p className="text-gray-700">{currentQuestion.question}</p>
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
