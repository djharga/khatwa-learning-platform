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

  // Quiz completion screen with score, statistics, and restart option
  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              results.score >= 80 ? 'bg-green-100 text-green-600' :
              results.score >= 60 ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}
          >
            {results.score >= 80 ? <Award className="w-10 h-10" /> :
             results.score >= 60 ? <Target className="w-10 h-10" /> :
             <AlertCircle className="w-10 h-10" />}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            نتيجة الاختبار مكتملة!
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.score}%</div>
              <div className="text-sm text-blue-800">النتيجة</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.correctAnswers}</div>
              <div className="text-sm text-green-800">إجابات صحيحة</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{results.wrongAnswers}</div>
              <div className="text-sm text-red-800">إجابات خاطئة</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{formatTime(results.timeSpent)}</div>
              <div className="text-sm text-purple-800">الوقت المستغرق</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={restartQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              إعادة المحاولة
            </motion.button>
          </div>
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

  // Main quiz interface with question, options, and navigation
  return (
    <div className="max-w-4xl mx-auto">
      {/* رأس الاختبار */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              السؤال {currentQuestionIndex + 1} من {questions.length}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentQuestion.difficulty === 'سهل' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className={timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* شريط التقدم */}
        // Visual progress indicator showing quiz completion percentage
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* السؤال */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
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

        {/* خيارات الإجابة */}
        // Answer options with visual feedback for selected and correct answers
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showExplanation && setSelectedAnswer(index)}
              disabled={showExplanation}
              className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
              whileHover={!showExplanation ? { scale: 1.02 } : undefined}
              whileTap={!showExplanation ? { scale: 0.98 } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* التفسير */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
            >
              <h4 className="font-semibold text-blue-900 mb-2">التفسير:</h4>
              <p className="text-blue-800 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* أزرار التحكم */}
        <div className="flex justify-between items-center">
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
  );
};

export default QuestionBank;