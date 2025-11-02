import { Button } from '@/components/ui';
import { Award } from 'lucide-react';
import { challenges } from './community-data';

/**
 * Weekly challenges component displaying a list of active community challenges.
 * Shows challenge title, description, progress percentage, participant count, and join button.
 * Encourages community engagement through gamification.
 */
export default function WeeklyChallenges() {

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800">التحديات الأسبوعية</h2>
        </div>
        <p className="text-gray-600 mb-6">انضم إلى التحديات الأسبوعية وارفع من مهاراتك مع المجتمع</p>
        <Button className="w-full">عرض جميع التحديات</Button>
      </div>
      <div className="divide-y divide-gray-100">
        // Render each challenge in the list
        {challenges.map((challenge) => (
          <div key={challenge.id} className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-900">{challenge.title}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {challenge.participants} مشارك
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>التقدم</span>
                <span>{challenge.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                // Progress bar visualization based on challenge progress percentage
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              انضم إلى التحدي
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
