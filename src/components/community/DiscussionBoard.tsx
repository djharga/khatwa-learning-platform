'use client';

import React, { useState, useMemo } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import DiscussionPost from './DiscussionPost';
import DiscussionFilter from './DiscussionFilter';
import { discussionPosts, DiscussionPost as PostType } from './community-data';
import { Search } from 'lucide-react';

/**
 * Discussion board component displaying a filterable and searchable list of community discussion posts. 
 * Supports filtering by recent, popular, and unanswered posts. Includes search functionality and pagination.
 */
export default function DiscussionBoard() {
  const [filter, setFilter] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  /**
   * Filter and sort posts based on current filter selection and search query
   */
  const filteredPosts = useMemo(() => {
    let posts = [...discussionPosts];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Apply sorting based on filter
    switch (filter) {
      case 'popular':
        return posts.sort((a, b) => b.votes - a.votes);
      case 'unanswered':
        return posts.filter((post) => post.comments === 0).sort((a, b) => b.votes - a.votes);
      case 'recent':
      default:
        return posts; // Already in recent order
    }
  }, [filter, searchQuery]);

  /**
   * Get posts to display based on visible count
   */
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  /**
   * Handle loading more posts
   */
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
          <h2 className="text-xl font-bold text-white">لوحة المناقشات</h2>
          <DiscussionFilter currentFilter={filter} onFilterChange={setFilter} />
        </div>
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث في المناقشات، الوسوم، أو الكاتب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border-2 border-indigo-300 bg-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none transition-all font-medium"
          />
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="mt-2 text-sm text-indigo-100 font-medium">
            تم العثور على {filteredPosts.length} نتيجة
          </p>
        )}
      </div>

      <div className="divide-y-2 divide-gray-200 bg-white">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => <DiscussionPost key={post.id} post={post} />)
        ) : (
          <div className="p-10 text-center bg-gray-50">
            <p className="text-gray-700 text-lg font-bold">لا توجد مناقشات تطابق بحثك</p>
            <p className="text-gray-500 text-sm mt-1">جرب كلمات بحث مختلفة</p>
          </div>
        )}
      </div>

      {visiblePosts.length < filteredPosts.length && (
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 text-center border-t-2 border-indigo-200">
          <StyledButton 
            variant="secondary" 
            onClick={handleLoadMore}
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold"
          >
            عرض المزيد من المناقشات ({filteredPosts.length - visibleCount} متبقية)
          </StyledButton>
        </div>
      )}
    </div>
  );
}
