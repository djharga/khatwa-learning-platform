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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Grid-based layout with consistent spacing */}
      <div className="grid grid-cols-1 gap-y-12 py-24">
        
        {/* Community Header Section */}
        <section className="container mx-auto max-w-7xl px-8">
          <CommunityHeader />
        </section>

        {/* Main Community Content */}
        <section className="container mx-auto max-w-7xl px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Discussion Area */}
            <div className="lg:col-span-2">
              <DiscussionBoard />
            </div>
            
            {/* Sidebar Components */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-1 gap-y-8">
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
        </section>
        
      </div>
    </div>
  );
}
