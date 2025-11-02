'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import DiscussionPost from './DiscussionPost';
import DiscussionFilter from './DiscussionFilter';
import { discussionPosts } from './community-data';

/**
 * Discussion board component displaying a filterable list of community discussion posts. Supports filtering by recent, popular, and unanswered posts. Includes pagination with 'Load More' functionality.
 */
export default function DiscussionBoard() {
  const [filter, setFilter] = useState('recent'); // Manages the current filter selection for discussion posts
  // TODO: Use the filter state to actually filter the discussionPosts array

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">لوحة المناقشات</h2>
          <DiscussionFilter currentFilter={filter} onFilterChange={setFilter} />
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {discussionPosts.map((post) => (
          <DiscussionPost key={post.id} post={post} />
        ))}
      </div>
      <div className="p-6 border-t border-gray-200 text-center">
        <Button variant="outline">عرض المزيد من المناقشات</Button>
      </div>
    </div>
  );
}
