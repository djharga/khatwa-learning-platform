import { useState, useEffect, useCallback } from 'react';
import {
  useProgressNotifications,
  notificationTemplates,
} from '../components/ProgressNotification';
import { Clock } from 'lucide-react';

export interface Question {
  id: string;
  arabic: string;
  english: string;
  type: 'multiple_choice' | 'true_false' | 'essay';
  options?: string[];
  answer?: any;
  marked?: boolean;
  answered?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface ExamState {
  currentQuestion: number;
  answers: Record<string, any>;
  markedQuestions: Set<string>;
  timeRemaining: number;
  isStarted: boolean;
  showReview: boolean;
  showCalculator: boolean;
  showProgressDashboard: boolean;
  userPerformance: {
    totalScore: number;
    averageTimePerQuestion: number;
    strengths: string[];
    weaknesses: string[];
    recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}

export const useExamState = (questions: Question[]) => {
  const [examState, setExamState] = useState<ExamState>({
    currentQuestion: 0,
    answers: {} as Record<string, any>,
    markedQuestions: new Set(),
    timeRemaining: 3600, // 1 hour in seconds
    isStarted: false,
    showReview: false,
    showCalculator: false,
    showProgressDashboard: false,
    userPerformance: {
      totalScore: 0,
      averageTimePerQuestion: 0,
      strengths: [],
      weaknesses: [],
      recommendedDifficulty: 'beginner',
    },
  });

  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const { notifications, add: addNotification, dismiss: dismissNotification } =
    useProgressNotifications();

  // Update last activity time
  const updateActivity = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  // Smart reminder effect
  useEffect(() => {
    if (!examState.isStarted || examState.showReview) return;

    const checkInactivity = (currentNotifications: typeof notifications) => {
      const inactiveTime = Date.now() - lastActivityTime;
      const inactiveMinutes = inactiveTime / (1000 * 60);

      if (inactiveMinutes >= 5 && currentNotifications.length === 0) {
        addNotification({
          type: 'milestone',
          title: 'عودة للتركيز',
          message: 'هل تريد الاستمرار في الاختبار؟',
          icon: 'Clock', // TODO: pass JSX element
          color: 'blue',
          duration: 10000,
        });
      }
    };

    const interval = setInterval(() => checkInactivity(notifications), 60000);
    return () => clearInterval(interval);
  }, [
    examState.isStarted,
    examState.showReview,
    lastActivityTime,
    notifications,
    addNotification,
  ]);

  // Attach activity listeners
  useEffect(() => {
    const handleActivity = () => updateActivity();

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [updateActivity]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      examState.isStarted &&
      examState.timeRemaining > 0 &&
      !examState.showReview
    ) {
      interval = setInterval(() => {
        setExamState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examState.isStarted, examState.timeRemaining, examState.showReview]);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Visual feedback calculations
  const getPerformanceIndicator = useCallback(() => {
    const answeredCount = Object.keys(examState.answers).length;
    const totalQuestions = questions.length;
    const progressPercent = (answeredCount / totalQuestions) * 100;

    if (progressPercent < 25)
      return { color: 'bg-gray-400', status: 'مبكر', message: 'ابدأ بثقة' };
    if (progressPercent < 50)
      return { color: 'bg-blue-500', status: 'جيد', message: 'أداء مستقر' };
    if (progressPercent < 75)
      return { color: 'bg-yellow-500', status: 'ممتاز', message: 'تقدم ممتاز' };
    if (progressPercent < 100)
      return {
        color: 'bg-orange-500',
        status: 'متميز',
        message: 'اقتراب من الإكمال',
      };
    return { color: 'bg-green-500', status: 'مكتمل', message: 'أداء متميز' };
  }, [examState.answers, questions.length]);

  // Progress calculation
  const progress = (
    (Object.keys(examState.answers).length / questions.length) *
    100
  ).toFixed(1);

  // Calculate performance
  const calculatePerformance = useCallback(() => {
    const answeredQuestions = Object.keys(examState.answers).length;
    const totalTimeSpent = 3600 - examState.timeRemaining;
    const averageTimePerQuestion =
      answeredQuestions > 0 ? totalTimeSpent / answeredQuestions : 0;

    const score = (answeredQuestions / questions.length) * 100;

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    const beginnerQuestions = questions.filter(
      (q) => q.difficulty === 'beginner'
    );
    const intermediateQuestions = questions.filter(
      (q) => q.difficulty === 'intermediate'
    );
    const advancedQuestions = questions.filter(
      (q) => q.difficulty === 'advanced'
    );

    if (beginnerQuestions.every((q) => examState.answers[q.id])) {
      strengths.push('الأساسيات');
    } else {
      weaknesses.push('الأساسيات');
    }

    if (intermediateQuestions.every((q) => examState.answers[q.id])) {
      strengths.push('المستوى المتوسط');
    } else {
      weaknesses.push('المستوى المتوسط');
    }

    if (advancedQuestions.every((q) => examState.answers[q.id])) {
      strengths.push('المستوى المتقدم');
    } else {
      weaknesses.push('المستوى المتقدم');
    }

    let recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced' =
      'beginner';
    if (score > 80) recommendedDifficulty = 'advanced';
    else if (score > 60) recommendedDifficulty = 'intermediate';

    return {
      totalScore: score,
      averageTimePerQuestion,
      strengths,
      weaknesses,
      recommendedDifficulty,
    };
  }, [examState.answers, examState.timeRemaining, questions]);

  // Update performance when answers change
  useEffect(() => {
    const performance = calculatePerformance();
    setExamState((prev) => ({
      ...prev,
      userPerformance: performance,
    }));
  }, [calculatePerformance]);

  // Toggle calculator
  const toggleCalculator = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setExamState((prev) => ({ ...prev, showCalculator: !prev.showCalculator }));
  }, []);

  // Close calculator
  const closeCalculator = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setExamState((prev) => ({ ...prev, showCalculator: false }));
  }, []);

  // Handle answer change
  const handleAnswerChange = useCallback((questionId: string, answer: any) => {
    setExamState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  // Toggle mark question
  const toggleMarkQuestion = useCallback((questionId: string) => {
    setExamState((prev) => ({
      ...prev,
      markedQuestions: new Set(
        prev.markedQuestions.has(questionId)
          ? Array.from(prev.markedQuestions).filter((id) => id !== questionId)
          : [...Array.from(prev.markedQuestions), questionId]
      ),
    }));
  }, []);

  // Navigate questions
  const navigateQuestion = useCallback(
    (direction: 'next' | 'prev' | number) => {
      const totalQuestions = questions.length;
      let newIndex = examState.currentQuestion;

      if (direction === 'next') {
        newIndex = Math.min(examState.currentQuestion + 1, totalQuestions - 1);
      } else if (direction === 'prev') {
        newIndex = Math.max(examState.currentQuestion - 1, 0);
      } else {
        newIndex = Math.max(0, Math.min(direction, totalQuestions - 1));
      }

      setExamState((prev) => ({ ...prev, currentQuestion: newIndex }));
    },
    [examState.currentQuestion, questions.length]
  );

  // Start exam
  const startExam = useCallback((acceptedTerms: boolean) => {
    if (acceptedTerms) {
      setExamState((prev) => ({ ...prev, isStarted: true }));
    }
  }, []);

  // Finish exam
  const finishExam = useCallback(() => {
    setExamState((prev) => ({ ...prev, showReview: true }));
  }, []);

  // Submit exam
  const submitExam = useCallback(() => {
    const performance = calculatePerformance();
    const score = performance.totalScore;

    addNotification(notificationTemplates.examCompleted(score));

    if (score >= 90) {
      setTimeout(
        () => addNotification(notificationTemplates.badgeEarned('سيد الدقة')),
        1000
      );
    } else if (score >= 80) {
      setTimeout(
        () => addNotification(notificationTemplates.improvement(15)),
        1000
      );
    }

    alert('تم تسليم الاختبار بنجاح!');
  }, [calculatePerformance, addNotification]);

  const performanceIndicator = getPerformanceIndicator();

  return {
    examState,
    setExamState,
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
  };
};
