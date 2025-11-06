"use client";

import CommunityHeader from './CommunityHeader';
import DiscussionBoard from './DiscussionBoard';
import WeeklyChallenges from './WeeklyChallenges';
import CommunityStats from './CommunityStats';
import AchievementsBadges from './AchievementsBadges';
import { RecommendedPaths } from '@/components/ui/learning-paths';
import { recommendedPaths } from './community-data';

/**
 * Community page component displaying discussion board, weekly challenges, statistics, achievements, and recommended learning paths. Serves as the main hub for community interaction and engagement.
 */
export default function CommunityPage() {
  /**
   * Handles selection of a recommended learning path. Currently a placeholder for future navigation implementation.
   */
  const handlePathSelect = (pathId: string) => {
    // TODO: Implement navigation to selected learning path
    console.log('Selected path:', pathId);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <CommunityHeader />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <DiscussionBoard />
        </div>
        <div className="lg:col-span-1 space-y-5">
          <WeeklyChallenges />
          <AchievementsBadges />
          <CommunityStats />
          <RecommendedPaths
            paths={recommendedPaths}
            onPathSelect={handlePathSelect}
          />
        </div>
      </div>
    </div>
  );
}
