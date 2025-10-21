'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { useExamState, Question } from '../hooks/useExamState';
import QuestionList from './exam/QuestionList';
import QuestionContent from './exam/QuestionContent';
import ExamHeader from './exam/ExamHeader';
import ReviewPanel from './exam/ReviewPanel';
import Calculator from './exam/Calculator';

// Sample questions data
const questions: Question[] = [
  {
    id: '1',
    arabic: 'ما هو الفرق بين الإيرادات والأرباح؟',
    english: 'What is the difference between revenue and profit?',
    type: 'multiple_choice',
    options: [
      'لا يوجد فرق',
      'الإيرادات أكبر من الأرباح',
      'الإيرادات تشمل التكاليف',
      'الأرباح تشمل الضرائب فقط',
    ],
    difficulty: 'beginner',
    tags: ['المحاسبة', 'الأساسيات'],
  },
  {
    id: '2',
    arabic: 'هل يُعتبر الاستهلاك الشخصي جزءاً من الناتج المحلي الإجمالي؟',
    english: 'Is personal consumption part of GDP?',
    type: 'true_false',
    difficulty: 'intermediate',
    tags: ['الاقتصاد', 'الناتج المحلي'],
  },
  {
    id: '3',
    arabic: 'اشرح مفهوم التضخم وأسبابه.',
    english: 'Explain the concept of inflation and its causes.',
    type: 'essay',
    difficulty: 'advanced',
    tags: ['التضخم', 'الاقتصاد الكلي'],
  },
];

const ExamInterface: React.FC = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  const {
    examState,
    progress,
    performanceIndicator,
    formatTime,
    toggleCalculator,
    closeCalculator,
    handleAnswerChange,
    toggleMarkQuestion,
    navigateQuestion,
    startExam,
    finishExam,
    submitExam,
    notifications,
    dismissNotification,
  } = useExamState(questions);

  const currentQuestion = questions[examState.currentQuestion];

  const handleStart = () => {
    if (acceptedTerms) {
      startExam(acceptedTerms);
      setShowInstructions(false);
    }
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full"
        >
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            مرحباً بك في برنامج الإرشاد التعليمي
          </h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">
                تعليمات الاستخدام:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>لديك ساعة واحدة لإكمال الاختبار</li>
                <li>يمكنك التنقل بين الأسئلة في أي وقت</li>
                <li>يمكنك تمييز الأسئلة للمراجعة لاحقاً</li>
                <li>استخدم آلة الحاسبة إذا احتجت للحسابات</li>
                <li>تأكد من الإجابة على جميع الأسئلة قبل التسليم</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                اتفاقية السرية للمعلومات
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                أتعهد بالحفاظ على سرية المعلومات والأسئلة، وأن أستخدمها لأغراض
                تعليمية فقط.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="accept-terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="accept-terms" className="text-sm">
                أقر بقراءة التعليمات وموافقتي على اتفاقية السرية
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              disabled={!acceptedTerms}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                acceptedTerms
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              بدء الاختبار
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (examState.showReview) {
    return (
      <ReviewPanel
        examState={examState}
        questions={questions}
        onNavigate={navigateQuestion}
        onBackToExam={() => {
          // TODO: update examState.showReview
          alert('Back to exam');
        }}
        onSubmit={submitExam}
      />
    );
  }

  // TODO: handle showProgressDashboard

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <QuestionList
        questions={questions}
        examState={examState}
        onNavigate={navigateQuestion}
      />

      <div className="flex-1 flex flex-col">
        <ExamHeader
          examState={examState}
          progress={progress}
          performanceIndicator={performanceIndicator}
          formatTime={formatTime}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          toggleCalculator={toggleCalculator}
          totalQuestions={questions.length}
        />

        <QuestionContent
          question={currentQuestion}
          examState={examState}
          onAnswerChange={handleAnswerChange}
          onToggleMark={toggleMarkQuestion}
          onNavigate={navigateQuestion}
          totalQuestions={questions.length}
        />
      </div>

      {examState.showCalculator && <Calculator onClose={closeCalculator} />}

      {/* TODO: ProgressNotification */}
    </div>
  );
};

export default ExamInterface;
