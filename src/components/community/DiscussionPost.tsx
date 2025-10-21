import { useState } from 'react';
import { Button } from '@/components/ui';
import { ThumbsUp, MessageCircle, Share2, Bookmark, ChevronUp, ChevronDown } from 'lucide-react';

/**
 * Represents a discussion post with metadata and engagement metrics
 */
interface Post {
  /** Unique identifier for the post */
  id: number;
  /** Title of the discussion post */
  title: string;
  /** Author of the post */
  author: string;
  /** Date the post was created */
  date: string;
  /** Main content of the post */
  content: string;
  /** Number of votes the post has received */
  votes: number;
  /** Number of comments on the post */
  comments: number;
  /** Array of tags associated with the post */
  tags: string[];
}

/**
 * Props for the DiscussionPost component
 */
interface DiscussionPostProps {
  post: Post;
}

/**
 * Individual discussion post component with voting, commenting, sharing, and bookmarking functionality. Displays post author, title, content, tags, and engagement metrics. Supports upvote/downvote interactions.
 */
export default function DiscussionPost({ post }: DiscussionPostProps) {
  const [voted, setVoted] = useState<string | null>(null); // 'up' or 'down'
  
  /**
   * Handles upvote/downvote interactions. Toggles vote if same type is clicked, otherwise switches to new vote type.
   */
  const handleVote = (type: 'up' | 'down') => {
    if (voted === type) {
      setVoted(null); // Undo vote
    } else {
      setVoted(type); // Set vote
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <button 
            onClick={() => handleVote('up')}
            className={`p-2 rounded-full ${voted === 'up' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className="my-1 font-bold text-gray-700">{post.votes}</span>
          <button 
            onClick={() => handleVote('down')}
            className={`p-2 rounded-full ${voted === 'down' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div>
              <h3 className="font-bold text-gray-900">{post.author}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} تعليق</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>مشاركة</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span>حفظ</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}