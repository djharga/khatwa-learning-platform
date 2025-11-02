"use client";

import CommunityHeader from './CommunityHeader';
import DiscussionBoard from './DiscussionBoard';
import WeeklyChallenges from './WeeklyChallenges';
import CommunityStats from './CommunityStats';
import { RecommendedPaths } from '@/components/ui/learning-paths';
import { recommendedPaths } from './community-data';

/**
 * Community page component displaying discussion board, weekly challenges, statistics, and recommended learning paths. Serves as the main hub for community interaction and engagement.
 */
export default function CommunityPage() {
  /**
   * Handles selection of a recommended learning path. Currently a placeholder for future navigation implementation.
   */
  const handlePathSelect = (pathId: string) => {
    // TODO: Implement navigation to selected learning path
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CommunityHeader />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DiscussionBoard />
        </div>
        <div className="lg:col-span-1">
          <WeeklyChallenges />
          <CommunityStats className="mt-8" />
          <RecommendedPaths
            paths={recommendedPaths}
            onPathSelect={handlePathSelect}
          />
        </div>
      </div>
    </div>
  );
}
