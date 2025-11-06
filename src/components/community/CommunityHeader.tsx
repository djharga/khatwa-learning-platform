'use client';

import { useState } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import { Users, MessageSquare, TrendingUp, Award, PenSquare } from 'lucide-react';
import CreatePostModal from './CreatePostModal';

/**
 * Community header component displaying the community title, description, and key statistics badges.
 * Shows member count, post count, satisfaction rate, and expert count with corresponding icons.
 */
export default function CommunityHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /**
   * Handles submission of new post
   */
  const handleCreatePost = (post: { title: string; content: string; tags: string[] }) => {
    // TODO: Implement actual post creation with backend
    console.log('New post created:', post);
    // Show success message
    alert('تم نشر منشورك بنجاح! شكراً لمشاركتك مع المجتمع.');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">مجتمع خطى التعليمي</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
          انضم إلى مجتمع من المحترفين والمتعلمين، شارك معرفتك، احصل على الدعم، وطور مهاراتك معًا.
        </p>
        
        {/* Statistics badges section displaying key community metrics */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
            <Users className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">12,847+ عضو</span>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
            <MessageSquare className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">8,420+ منشور</span>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
            <TrendingUp className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">98% معدل رضا</span>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
            <Award className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">250+ خبير</span>
          </div>
        </div>
        
        {/* Call-to-action button to create a new discussion */}
        <StyledButton 
          size="large" variant="primary" 
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg"
        >
          <PenSquare className="w-5 h-5" />
          ابدأ مناقشة جديدة
        </StyledButton>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}
