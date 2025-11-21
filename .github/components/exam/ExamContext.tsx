'use client';

import { createContext, useContext, useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

/** Represents a single exam question with its options and correct answer */
interface Question {
  /** Unique identifier for the question */
  id: string;
  /** The question text */
  question: string;
  /** Array of possible answer options */
  options: string[];
  /** Index of the correct answer in the options array */
  correctAnswer: number;
}

/** Complete exam data structure including metadata and questions */
export interface ExamData {
  /** Unique identifier for the exam */
  id: string;
  /** Title of the exam */
  title: string;
  /** Description of the exam */
  description: string;
  /** Duration of the exam in minutes */
  duration: number;
  /** Array of questions in the exam */
  questions: Question[];
}

// TODO: Consolidate type definitions with hooks/useExamState.ts
/** Current state of the exam session including progress and answers */
interface ExamState {
  /** Index of the currently displayed question */
  currentQuestionIndex: number;
  /** Map of question IDs to selected answer indices */
  answers: { [key: string]: number };
  /** Time remaining in seconds */
  timeLeft: number;
}

/** Sample data for development/testing */
const mockExam: ExamData = {
  id: '1',
  title: 'الامتحان النهائي للمراجعة الداخلية',
  description: 'اختبار شامل في مفاهيم وممارسات المراجعة الداخلية',
  duration: 60,
  questions: [
    {
      id: '1',
      question: 'ما هو الهدف الرئيسي من المراجعة الداخلية في المؤسسة؟',
      options: [
        'تحسين العمليات وإدارة المخاطر',
        'اكتشاف الأخطاء المالية فقط',
        'تقييم أداء الموظفين',
        'إعداد التقارير السنوية',
      ],
      correctAnswer: 0,
    },
    // يمكن إضافة المزيد من الأسئلة هنا
  ],
};

/** React context for sharing exam state across components */
export const ExamContext = createContext<{
  examData: ExamData;
  examState: ExamState;
  setExamState: Dispatch<SetStateAction<ExamState>>;
} | null>(null);

/** Context provider that manages exam state and countdown timer. Automatically decrements time remaining every second. */
export const ExamProvider = ({
  children,
  examData = mockExam
}: {
  children: ReactNode;
  examData?: ExamData;
}) => {
  const [examState, setExamState] = useState<ExamState>({
    currentQuestionIndex: 0,
    answers: {},
    timeLeft: examData.duration * 60,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setExamState((prev) => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ExamContext.Provider value={{ examData, examState, setExamState }}>
      {children}
    </ExamContext.Provider>
  );
};

/** Custom hook to access exam context. Must be used within an ExamProvider. Returns exam data, current state, and state setter. */
export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
