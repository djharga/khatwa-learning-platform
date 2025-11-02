'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressTracker } from '../ui/progress/ProgressTracker';

// Types for the quiz
/** Quiz option with text and correctness flag */
interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

/** Quiz question with multiple options and explanation */
interface Question {
  id: string;
  question: string;
  options: Option[];
  explanation: string;
}

/** Complete quiz data with title and questions array */
interface QuizData {
  questions: Question[];
  title: string;
}

/** Props for quiz progress display component */
interface QuizProgressProps {
  current: number;
  total: number;
  score: number;
}

/** Props for quiz options list component */
interface QuizOptionsProps {
  options: Option[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  showFeedback: boolean;
}

/** Props for quiz feedback component */
interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

/** Props for quiz results component */
interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
  onShare: () => void;
}

// Sample quiz data - in a real app, this would come from props or API
const sampleQuizData: QuizData = {
  title: 'اختبار سريع في البرمجة',
  questions: [
    {
      id: '1',
      question: 'ما هو React؟',
      options: [
        { id: 'a', text: 'لغة برمجة', isCorrect: false },
        { id: 'b', text: 'مكتبة JavaScript للواجهات', isCorrect: true },
        { id: 'c', text: 'قاعدة بيانات', isCorrect: false },
        { id: 'd', text: 'نظام تشغيل', isCorrect: false },
      ],
      explanation: 'React هي مكتبة JavaScript لبناء واجهات المستخدم.',
    },
    {
      id: '2',
      question: 'ما هو TypeScript؟',
      options: [
        { id: 'a', text: 'إطار عمل', isCorrect: false },
        { id: 'b', text: 'لغة برمجة', isCorrect: false },
        { id: 'c', text: 'امتداد لـ JavaScript', isCorrect: true },
        { id: 'd', text: 'أداة تصميم', isCorrect: false },
      ],
      explanation: 'TypeScript هو امتداد لـ JavaScript يضيف أنواع بيانات.',
    },
  ],
};

/** Interactive quick quiz component with multiple choice questions, immediate feedback, and results display. Features progress tracking, score calculation, and share functionality. */
const QuickQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = sampleQuizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuizData.questions.length - 1;

  /** Handles option selection, shows feedback, and updates score if correct */
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
    setShowFeedback(true);
    const selected = currentQuestion.options.find(opt => opt.id === optionId);
    if (selected?.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  /** Advances to next question or completes quiz if on last question */
  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  /** Resets quiz to initial state for retaking */
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  /** Handles sharing quiz results. Currently shows alert - needs social share integration. */
  const handleShare = () => {
    // TODO: Implement social share functionality - integrate with Web Share API or social media SDKs
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <QuizResults
          score={score}
          total={sampleQuizData.questions.length}
          onRestart={handleRestart}
          onShare={handleShare}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <QuizProgress
        current={currentQuestionIndex + 1}
        total={sampleQuizData.questions.length}
        score={score}
      />
      <QuizCard
        question={currentQuestion}
        selectedOption={selectedOption}
        showFeedback={showFeedback}
        onSelect={handleOptionSelect}
      />
      <AnimatePresence>
        {showFeedback && (
          <QuizFeedback
            isCorrect={currentQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect || false}
            explanation={currentQuestion.explanation}
            onNext={handleNext}
            isLast={isLastQuestion}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/** Quiz progress indicator showing current question number and score with linear progress bar */
const QuizProgress: React.FC<QuizProgressProps> = ({ current, total, score }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">السؤال {current} من {total}</span>
        <span className="text-sm text-gray-600">النقاط: {score}</span>
      </div>
      <ProgressTracker 
        type="linear"
        value={(current / total) * 100}
      />
    </div>
  );
};

/** Quiz question card displaying question text and answer options */
const QuizCard: React.FC<{
  question: Question;
  selectedOption: string | null;
  showFeedback: boolean;
  onSelect: (optionId: string) => void;
}> = ({ question, selectedOption, showFeedback, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <QuizOptions
        options={question.options}
        selectedOption={selectedOption}
        onSelect={onSelect}
        showFeedback={showFeedback}
      />
    </motion.div>
  );
};

/** Quiz options list with selection handling and visual feedback for correct/incorrect answers */
const QuizOptions: React.FC<QuizOptionsProps> = ({ options, selectedOption, onSelect, showFeedback }) => {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        const isCorrect = option.isCorrect;
        const isIncorrect = showFeedback && isSelected && !isCorrect;

        return (
          <motion.button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              isSelected
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={showFeedback}
          >
            <div className="flex items-center justify-between">
              <span>{option.text}</span>
              {showFeedback && isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={isCorrect ? 'text-green-500' : 'text-red-500'}
                >
                  {isCorrect ? '✓' : '✗'}
                </motion.span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

/** Quiz answer feedback component showing correctness, explanation, and next button */
const QuizFeedback: React.FC<QuizFeedbackProps> = ({ isCorrect, explanation, onNext, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
    >
      <div className="flex items-center mb-2">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-2xl mr-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
        >
          {isCorrect ? '🎉' : '😞'}
        </motion.span>
        <h3 className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
        </h3>
      </div>
      <p className="text-gray-700 mb-4">{explanation}</p>
      <motion.button
        onClick={onNext}
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLast ? 'عرض النتائج' : 'السؤال التالي'}
      </motion.button>
    </motion.div>
  );
};

/** Quiz completion results displaying score percentage, recommendation, and restart/share actions */
const QuizResults: React.FC<QuizResultsProps> = ({ score, total, onRestart, onShare }) => {
  const percentage = Math.round((score / total) * 100);
  /** Returns personalized recommendation message based on score percentage */
  const getRecommendation = () => {
    if (percentage >= 80) return 'ممتاز! استمر في التعلم.';
    if (percentage >= 60) return 'جيد، لكن يمكنك تحسين أكثر.';
    return 'حاول مرة أخرى واستمر في الدراسة.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4">نتائج الاختبار</h2>
      <div className="text-6xl mb-4">{percentage}%</div>
      <p className="text-lg mb-2">لقد أجبت على {score} من {total} أسئلة بشكل صحيح</p>
      <p className="text-gray-600 mb-6">{getRecommendation()}</p>
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={onRestart}
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          إعادة الاختبار
        </motion.button>
        <motion.button
          onClick={onShare}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          مشاركة النتائج
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuickQuiz;
