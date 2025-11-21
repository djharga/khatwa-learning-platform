'use client';

import { ExamProvider } from './ExamContext';
import QuestionView from './QuestionView';
import ExamNavigation from './ExamNavigation';

/**
 * Props for the main exam interface component
 */
interface ExamInterfaceProps {
  /**
   * Controls access to full exam features
   */
  isAuthenticated?: boolean;
}

/**
 * Main exam interface component that wraps the exam context provider and renders the question view with navigation. Provides a contained exam experience with authentication-based access control.
 */
const ExamInterface = ({ isAuthenticated = false }: ExamInterfaceProps) => {
  return (
    <ExamProvider>
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-elevation-2 p-6 max-w-4xl mx-auto border border-neutral-200 dark:border-neutral-700">
        <QuestionView />
        <ExamNavigation isAuthenticated={isAuthenticated} />
      </div>
    </ExamProvider>
  );
};

export default ExamInterface;
