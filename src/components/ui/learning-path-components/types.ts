export type LearningPathStep = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  current: boolean;
  progress?: number;
};

export type ProgressTrackerProps = {
  progress: number;
  completedSteps: number;
  totalSteps: number;
  estimatedTime?: string;
  nextStep?: string;
  onNextStepClick?: () => void;
};
