'use client';

import { useExam } from './ExamContext';

/** Displays the remaining exam time in MM:SS format. Automatically updates every second via the ExamContext timer. Styled with monospace font for consistent digit width. */
const ExamTimer: React.FC = () => {
  const { examState } = useExam();
  // Calculate minutes and seconds from total time left
  const minutes = Math.floor(examState.timeLeft / 60);
  const seconds = examState.timeLeft % 60;

  return (
    <div className="bg-blue-50 px-4 py-2 rounded-lg">
      <span className="font-mono text-blue-600">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default ExamTimer;
