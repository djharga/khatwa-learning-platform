'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  TrendingUp,
  Clock,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Represents a single quiz question with options, correct answer, and metadata
 * @property {string} id - Unique identifier for the question
 * @property {string} question - The question text
 * @property {string[]} options - Array of possible answer options
 * @property {number} correctAnswer - Index of the correct answer in options array
 * @property {string} explanation - Explanation for the correct answer
 * @property {'سهل' | 'متوسط' | 'صعب'} difficulty - Difficulty level of the question
 * @property {string} category - Category or topic of the question
 * @property {number} points - Points awarded for correct answer
 */
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  category: string;
  points: number;
}

/**
 * Props for the question bank quiz component
 * @property {Question[]} questions - Array of quiz questions
 * @property {number} [timeLimit=30] - Time limit in minutes for the quiz
 * @property {boolean} [showResults=true] - Whether to show results after completion
 * @property {(results: QuizResults) => void} [onComplete] - Callback function called when quiz is completed
 */
interface QuestionBankProps {
  questions: Question[];
  timeLimit?: number; // بالدقائق
  showResults?: boolean;
  onComplete?: (results: QuizResults) => void;
}

/**
 * Quiz completion results including score, timing, and answer history
 * @property {number} score - Percentage score (0-100)
 * @property {number} totalQuestions - Total number of questions
 * @property {number} correctAnswers - Number of correct answers
 * @property {number} wrongAnswers - Number of wrong answers
 * @property {number} timeSpent - Time spent in seconds
 * @property {Record<string, number>} answers - Mapping of question IDs to selected answer indices
 */
interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  answers: Record<string, number>;
}

/**
 * Represents a user's answer to a specific question with timing information
 * @property {string} questionId - ID of the question answered
 * @property {number} selectedAnswer - Index of the selected answer
 * @property {boolean} isCorrect - Whether the answer was correct
 * @property {number} timeSpent - Time spent on this question in seconds
 */
interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

/**
 * Interactive quiz component with timed questions, multiple choice answers, explanations, and results tracking. Supports difficulty levels, categories, and point scoring. Includes progress tracking, timer countdown, and comprehensive results display.
 */
const QuestionBank = ({
  questions,
  timeLimit = 30,
  showResults = true,
  onComplete
}: QuestionBankProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // بالثواني
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  // Quiz countdown timer that auto-completes when time expires
  useEffect(() => {
    if (quizCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, quizCompleted]);

  /**
   * Formats seconds into MM:SS display format for timer
   */
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  /**
   * Calculates quiz results including score percentage, correct/wrong counts, and time spent
   */
  const results = useMemo((): QuizResults => {
    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    return {
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      timeSpent,
      answers: Object.fromEntries(
        userAnswers.map(answer => [answer.questionId, answer.selectedAnswer])
      ),
    };
  }, [userAnswers, questions.length, startTime]);

  /**
   * Validates the selected answer, records the result, and displays explanation with success/error toast
   */
  const checkAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);

    if (isCorrect) {
      toast.success('إجابة صحيحة! رائع');
    } else {
      toast.error('إجابة خاطئة، لكن لا تقلق يمكنك المحاولة مرة أخرى');
    }
  };

  /**
   * Advances to the next question or completes the quiz if on the last question
   */
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  /**
   * Returns to the previous question, resetting answer selection and explanation
   */
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  /**
   * Marks the quiz as completed and triggers the onComplete callback with results
   */
  const completeQuiz = () => {
    setQuizCompleted(true);
    if (onComplete) {
      onComplete(results);
    }
  };

  /**
   * Handles timer expiration by displaying error toast and completing the quiz
   */
  const handleTimeUp = () => {
    toast.error('انتهى الوقت!');
    completeQuiz();
  };

  /**
   * Resets all quiz state to initial values for a fresh attempt
   */
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setUserAnswers([]);
    setTimeRemaining(timeLimit * 60);
    setQuizCompleted(false);
  };

  // تحليل النتائج
  const getPerformanceRating = () => {
    if (results.score >= 90) return { rating: 'ممتاز', color: 'text-green-600', bg: 'bg-green-50' };
    if (results.score >= 80) return { rating: 'جيد جداً', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (results.score >= 70) return { rating: 'جيد', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (results.score >= 60) return { rating: 'مقبول', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { rating: 'يحتاج تحسين', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getGrade = () => {
    if (results.score >= 90) return 'A';
    if (results.score >= 80) return 'B';
    if (results.score >= 70) return 'C';
    if (results.score >= 60) return 'D';
    return 'F';
  };

  const performance = getPerformanceRating();

  // Quiz completion screen with comprehensive analysis
  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 dark:border-neutral-700"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              results.score >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
              results.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}
          >
            {results.score >= 80 ? <Award className="w-12 h-12" /> :
             results.score >= 60 ? <Target className="w-12 h-12" /> :
             <AlertCircle className="w-12 h-12" />}
          </motion.div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            اكتمل الاختبار
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            تم إنهاء جميع الأسئلة بنجاح
          </p>
        </div>

        {/* Main Score Card */}
        <div className={`${performance.bg} dark:bg-neutral-700 rounded-xl p-6 mb-8 border-2 border-current`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-right">
              <div className={`text-5xl lg:text-6xl font-bold mb-2 ${performance.color}`}>
                {results.score}%
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                النسبة المئوية
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-4xl lg:text-5xl font-bold mb-2 ${performance.color}`}>
                {getGrade()}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                التقييم
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className={`text-2xl lg:text-3xl font-bold mb-2 ${performance.color}`}>
                {performance.rating}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                الأداء العام
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {results.correctAnswers}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">إجابات صحيحة</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800"
          >
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
              {results.wrongAnswers}
            </div>
            <div className="text-sm text-red-800 dark:text-red-300">إجابات خاطئة</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
          >
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {formatTime(results.timeSpent)}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">الوقت المستغرق</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800"
          >
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              {results.totalQuestions}
            </div>
            <div className="text-sm text-indigo-800 dark:text-indigo-300">إجمالي الأسئلة</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">نسبة الإنجاز</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{results.score}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                results.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                results.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${results.score}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            التحليل التفصيلي
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">معدل الإجابة الصحيحة:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">متوسط الوقت للسؤال:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {Math.round(results.timeSpent / results.totalQuestions)} ثانية
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">التقييم النهائي:</span>
              <span className={`font-bold ${performance.color}`}>
                {performance.rating} ({getGrade()})
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={restartQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            إعادة المحاولة
          </motion.button>
          <motion.button
            onClick={() => window.print()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            طباعة النتائج
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">لا توجد أسئلة متاحة</p>
      </div>
    );
  }

  // Main quiz interface with international exam format
  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      {/* Question Navigation Sidebar - International Style */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-4 h-fit sticky top-4"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
          الأسئلة ({questions.length})
        </h3>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {questions.map((q, index) => {
            const isAnswered = userAnswers.some(a => a.questionId === q.id);
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(index);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                }}
                className={`
                  aspect-square rounded-lg text-xs font-medium transition-all
                  ${isCurrent 
                    ? 'bg-primary-600 text-white ring-2 ring-primary-300' 
                    : isAnswered
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary-600"></div>
            <span className="text-neutral-600 dark:text-neutral-400">الحالي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"></div>
            <span className="text-neutral-600 dark:text-neutral-400">مُجاب</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-neutral-100 dark:bg-neutral-700"></div>
            <span className="text-neutral-600 dark:text-neutral-400">غير مُجاب</span>
          </div>
        </div>
      </motion.div>

      {/* Main Question Area */}
      <div className="flex-1">
        {/* Exam Header - International Style */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 lg:p-6 mb-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-4 py-2 rounded-lg text-sm font-bold">
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                currentQuestion.difficulty === 'سهل' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                currentQuestion.difficulty === 'متوسط' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                {currentQuestion.difficulty}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                {currentQuestion.points} نقطة
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                timeRemaining < 300 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card - International Exam Style */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700"
        >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
              {currentQuestion.category}
            </span>
            <span className="text-sm text-gray-600">
              {currentQuestion.points} نقطة
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

          {/* Answer Options - International Format */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
              return (
                <motion.button
                  key={index}
                  onClick={() => !showExplanation && setSelectedAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-4 ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                      : showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : selectedAnswer === index
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                  whileHover={!showExplanation ? { scale: 1.01, x: -4 } : undefined}
                  whileTap={!showExplanation ? { scale: 0.99 } : undefined}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selectedAnswer === index
                      ? 'bg-primary-600 text-white'
                      : showExplanation && index === currentQuestion.correctAnswer
                        ? 'bg-green-600 text-white'
                        : showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer
                          ? 'bg-red-600 text-white'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {optionLabel}
                  </div>
                  <span className="flex-1 font-medium">{option}</span>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6"
              >
                <h4 className="font-semibold text-primary-900 dark:text-primary-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  التفسير:
                </h4>
                <p className="text-primary-800 dark:text-primary-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <motion.button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            whileHover={currentQuestionIndex > 0 ? { scale: 1.05 } : undefined}
            whileTap={currentQuestionIndex > 0 ? { scale: 0.95 } : undefined}
          >
            <ChevronRight className="w-5 h-5" />
            السابق
          </motion.button>

          <div className="flex gap-3">
            {!showExplanation ? (
              <motion.button
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : undefined}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : undefined}
              >
                التحقق من الإجابة
              </motion.button>
            ) : (
              <motion.button
                onClick={nextQuestion}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestionIndex === questions.length - 1 ? (
                  <>
                    <Award className="w-5 h-5" />
                    إنهاء الاختبار
                  </>
                ) : (
                  <>
                    <ChevronLeft className="w-5 h-5" />
                    السؤال التالي
                  </>
                )}
              </motion.button>
            )}
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionBank;