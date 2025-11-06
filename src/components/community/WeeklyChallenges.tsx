'use client';

import { useState } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import { Award, Trophy, Users, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { challenges } from './community-data';

/**
 * Weekly challenges component displaying a list of active community challenges.
 * Shows challenge title, description, progress percentage, participant count, and join button.
 * Encourages community engagement through gamification with interactive features.
 */
export default function WeeklyChallenges() {
  const [expandedChallenges, setExpandedChallenges] = useState<number[]>([]);
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  /**
   * Toggle challenge expansion
   */
  const toggleExpand = (id: number) => {
    setExpandedChallenges((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  /**
   * Handle joining a challenge
   */
  const handleJoinChallenge = (id: number) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges((prev) => prev.filter((cid) => cid !== id));
    } else {
      setJoinedChallenges((prev) => [...prev, id]);
      alert('تم الانضمام للتحدي بنجاح! ابدأ الآن وحقق إنجازاتك.');
    }
  };

  /**
   * Get progress color based on percentage
   */
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'from-red-500 to-orange-500';
    if (progress < 70) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  /**
   * Calculate days remaining (mock calculation)
   */
  const getDaysRemaining = (id: number) => {
    return 14 - ((id - 1) * 2); // Mock calculation
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-xl overflow-hidden border-2 border-orange-400">
      {/* Header */}
      <div className="p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">التحديات الأسبوعية</h2>
            <p className="text-sm text-orange-100">اكتسب مهارات جديدة واحصل على شارات</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/30">
            <div className="text-2xl font-bold text-white">{challenges.length}</div>
            <div className="text-xs text-orange-100 font-medium">تحديات نشطة</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/30">
            <div className="text-2xl font-bold text-white">{joinedChallenges.length}</div>
            <div className="text-xs text-orange-100 font-medium">انضممت إليها</div>
          </div>
        </div>
        
        <Button className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-lg">
          <Award className="w-4 h-4 mr-2" />
          عرض جميع التحديات
        </Button>
      </div>

      {/* Challenges List */}
      <div className="divide-y-2 divide-orange-200 max-h-[600px] overflow-y-auto bg-white">
        {challenges.map((challenge) => {
          const isExpanded = expandedChallenges.includes(challenge.id);
          const isJoined = joinedChallenges.includes(challenge.id);
          const daysRemaining = getDaysRemaining(challenge.id);

          return (
            <div
              key={challenge.id}
              className={`p-4 transition-all ${isJoined ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-green-500' : 'hover:bg-orange-50/30'}`}
            >
              {/* Challenge Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 text-sm">{challenge.title}</h3>
                    {isJoined && (
                      <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                        ✓ منضم
                      </span>
                    )}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2.5 text-xs text-gray-700 mb-1.5 font-medium">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                      <Users className="w-3 h-3 text-orange-600" />
                      <span>{challenge.participants}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-red-600" />
                      <span>{daysRemaining} يوم</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(challenge.id)}
                  className="p-1.5 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-600" />
                  )}
                </button>
              </div>

              {/* Description (Expandable) */}
              {isExpanded && (
                <p className="text-gray-700 text-sm mb-3 pr-3 border-r-4 border-orange-400 bg-orange-50/50 p-2 rounded">
                  {challenge.description}
                </p>
              )}

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-700 mb-1 font-bold">
                  <span>التقدم</span>
                  <span className="text-orange-600">{challenge.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(challenge.progress)} transition-all duration-500 rounded-full shadow-lg`}
                    style={{ width: `${challenge.progress}%` }}
                  >
                    <div className="h-full w-full bg-white opacity-30"></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant={isJoined ? 'outline' : 'default'}
                className={`w-full font-bold ${
                  isJoined
                    ? 'border-2 border-green-500 text-green-700 hover:bg-green-500 hover:text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md'
                }`}
                onClick={() => handleJoinChallenge(challenge.id)}
              >
                {isJoined ? (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    متابعة التحدي
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    انضم للتحدي
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
