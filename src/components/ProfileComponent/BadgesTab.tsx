import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export interface BadgesTabProps {
  badges: any[];
}

export const BadgesTab = ({ badges }: BadgesTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">الشارات</h3>
        
        {/* محتوى تبويب الشارات */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="border rounded-lg p-4 text-center">
              <span className="text-2xl">{badge.icon}</span>
              <h4>{badge.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
