"use client";

import CommunityHeader from './CommunityHeader';
import DiscussionBoard from './DiscussionBoard';
import WeeklyChallenges from './WeeklyChallenges';
import CommunityStats from './CommunityStats';
import AchievementsBadges from './AchievementsBadges';
import { RecommendedPaths } from '@/components/ui/learning-paths';
import { recommendedPaths } from './community-data';
import PageBackground from '@/components/ui/PageBackground';
import { heroSectionSpacing } from '@/data/hero-presets';

/**
 * Community page component displaying discussion board, weekly challenges, statistics, achievements, and recommended learning paths. Serves as the main hub for community interaction and engagement.
 */
export default function CommunityPage() {
  /**
   * Handles selection of a recommended learning path. Currently a placeholder for future navigation implementation.
   */
  const handlePathSelect = (pathId: string) => {
    console.log('Selected path:', pathId);
  };

  return (
    <PageBackground variant="community" pattern>
      <div className="grid grid-cols-1 gap-y-12 py-16 lg:py-20">
        {/* Community Header Section */}
        <section className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <CommunityHeader />
        </section>

        {/* Main Community Content */}
        <section
          id="discussion-board"
          className={`container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 ${heroSectionSpacing}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Discussion Area */}
            <div className="lg:col-span-2">
              <DiscussionBoard />
            </div>

            {/* Sidebar Components */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-1 gap-y-8">
                <div id="weekly-challenges">
                  <WeeklyChallenges />
                </div>
                <AchievementsBadges />
                <CommunityStats />
                <RecommendedPaths paths={recommendedPaths} onPathSelect={handlePathSelect} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageBackground>
  );
}
