import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export interface ActivityTabProps {
  activityLog: any[];
}

export const ActivityTab = ({ activityLog }: ActivityTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">النشاط</h3>
        
        {/* محتوى تبويب النشاط */}
        <div className="space-y-4">
          {activityLog.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span>{activity.icon}</span>
                <h4>{activity.title}</h4>
              </div>
              <p>{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
