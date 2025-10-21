import { motion } from 'framer-motion';
import { FileCheck } from 'lucide-react';

export interface ExamsTabProps {
  examProgress: any;
}

export const ExamsTab = ({ examProgress }: ExamsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">الاختبارات</h3>
        
        {/* محتوى تبويب الاختبارات */}
        <div className="space-y-4">
          <div>
            <span>متوسط النتائج: </span>
            <span>{examProgress.averageScore}%</span>
          </div>
          
          <div>
            <h4>نقاط القوة:</h4>
            <ul>
              {examProgress.strengths.map((strength: string, index: number) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
