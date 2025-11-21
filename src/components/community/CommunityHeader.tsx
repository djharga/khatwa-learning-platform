'use client';

import { useState } from 'react';
import { Users, MessageSquare, TrendingUp, Award, PenSquare } from 'lucide-react';
import UnifiedHeroSection from '@/components/ui/UnifiedHeroSection';
import { heroPresets } from '@/data/hero-presets';
import CreatePostModal from './CreatePostModal';

const communityHeroPreset = heroPresets.community;

/**
 * Community header component that leverages the unified hero section.
 */
export default function CommunityHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePost = (post: { title: string; content: string; tags: string[] }) => {
    console.log('New post created:', post);
    alert('تم نشر منشورك بنجاح! شكراً لمشاركتك مع المجتمع.');
  };

  const heroProps = {
    ...communityHeroPreset,
    primaryAction: {
      label: 'ابدأ مناقشة جديدة',
      onClick: () => setIsCreateModalOpen(true),
      icon: <PenSquare className="w-4 h-4" />,
    },
    secondaryAction: communityHeroPreset.secondaryAction
      ? {
          ...communityHeroPreset.secondaryAction,
          icon: <MessageSquare className="w-4 h-4" />,
        }
      : undefined,
    stats: communityHeroPreset.stats,
    visual: communityHeroPreset.visual
      ? {
          ...communityHeroPreset.visual,
          custom: (
            <div className="space-y-4 text-white/90">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/80" />
                  <span className="text-sm">جلسة AMA القادمة</span>
                </div>
                <span className="text-sm font-semibold text-white">الأربعاء • 7 مساءً</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-white/80" />
                  <span className="text-sm">تحديات الأسبوع</span>
                </div>
                <span className="text-sm font-semibold text-white">3 تحديات نشطة</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <Award className="w-5 h-5 text-amber-300" />
                <div className="text-sm">
                  <p className="font-semibold text-white">شارات المجتمع</p>
                  <p className="text-white/70">احصل على شارة «صانع محتوى» عند نشر 5 مساهمات أسبوعية.</p>
                </div>
              </div>
            </div>
          ),
        }
      : undefined,
  };

  return (
    <>
      <UnifiedHeroSection {...heroProps} />
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}
