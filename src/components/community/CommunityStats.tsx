import { TrendingUp, Users, MessageSquare, Award } from 'lucide-react';
import { communityStats, CommunityStat } from './community-data';

/**
 * Props for the CommunityStats component
 */
interface CommunityStatsProps {
  className?: string;
}

/**
 * Maps icon identifier strings to their corresponding lucide-react icon components
 */
function getIconComponent(icon: string) {
  switch (icon) {
    case 'users':
      return <Users className="w-5 h-5" />;
    case 'message-square':
      return <MessageSquare className="w-5 h-5" />;
    case 'award':
      return <Award className="w-5 h-5" />;
    case 'trending-up':
      return <TrendingUp className="w-5 h-5" />;
    default:
      return <Users className="w-5 h-5" />;
  }
}

/**
 * Displays community statistics in a card layout showing active members, monthly discussions, completed challenges, and community growth. Accepts optional className for styling customization.
 */
export default function CommunityStats({ className = '' }: CommunityStatsProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">إحصائيات المجتمع</h3>
      <div className="space-y-4">
        {communityStats.map((stat: CommunityStat, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                {getIconComponent(stat.icon)}
              </div>
              <span className="text-gray-700">{stat.label}</span>
            </div>
            <span className="font-bold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
