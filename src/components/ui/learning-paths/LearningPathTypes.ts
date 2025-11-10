export type LearningPathStep = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  current: boolean;
  progress?: number;
};

export type LearningPathProps = {
  steps: LearningPathStep[];
  onStepClick?: (stepId: string) => void;
};

export type ProgressTrackerProps = {
  progress: number;
  completedSteps: number;
  totalSteps: number;
  estimatedTime?: string;
  nextStep?: string;
  onNextStepClick?: () => void;
};

export type RecommendedPath = {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  recommendedFor: string[];
  duration?: string;
  level?: 'مبتدئ' | 'متوسط' | 'متقدم';
};
