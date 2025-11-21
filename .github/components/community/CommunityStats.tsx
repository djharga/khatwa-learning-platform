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
      return <Users className="w-5 h-5 text-white" />;
    case 'message-square':
      return <MessageSquare className="w-5 h-5 text-white" />;
    case 'award':
      return <Award className="w-5 h-5 text-white" />;
    case 'trending-up':
      return <TrendingUp className="w-5 h-5 text-white" />;
    default:
      return <Users className="w-5 h-5 text-white" />;
  }
}

/**
 * Displays community statistics in a card layout showing active members, monthly discussions, completed challenges, and community growth. Accepts optional className for styling customization.
 */
export default function CommunityStats({ className = '' }: CommunityStatsProps) {
  const iconColors = [
    { bg: 'bg-blue-500', text: 'text-white' },
    { bg: 'bg-green-500', text: 'text-white' },
    { bg: 'bg-orange-500', text: 'text-white' },
    { bg: 'bg-purple-500', text: 'text-white' },
  ];

  return (
    <div className={`bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl shadow-xl overflow-hidden border-2 border-cyan-400 ${className}`}>
      <div className="p-5 text-white border-b-2 border-cyan-400">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          إحصائيات المجتمع
        </h3>
      </div>
      <div className="p-4 space-y-3 bg-white">
        {communityStats.map((stat: CommunityStat, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 hover:border-cyan-400 transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${iconColors[index]?.bg || 'bg-blue-500'} rounded-lg shadow-md`}>
                {getIconComponent(stat.icon)}
              </div>
              <span className="text-gray-800 font-bold text-sm">{stat.label}</span>
            </div>
            <span className="font-extrabold text-gray-900 text-lg">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
