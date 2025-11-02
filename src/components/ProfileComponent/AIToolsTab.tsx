import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Button } from '../ui';

export interface AIToolsTabProps {
  aiInsights: any[];
  handleGenerateAIInsight: () => void;
  isLoading: boolean;
}

export const AIToolsTab = ({
  aiInsights,
  handleGenerateAIInsight,
  isLoading,
}: AIToolsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">أدوات الذكاء الاصطناعي</h3>
        
        {/* محتوى تبويب أدوات الذكاء الاصطناعي */}
        <div className="space-y-4">
          <Button onClick={handleGenerateAIInsight} loading={isLoading}>
            توليد تحليل جديد
          </Button>
          
          {aiInsights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
