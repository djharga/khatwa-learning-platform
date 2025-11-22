import { useState } from 'react';
import { Button } from '@/components/ui/Button';
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
    <div className="p-4 hover:bg-indigo-50/50 transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-500">
      <div className="flex gap-3">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
          <button 
            onClick={() => handleVote('up')}
            className={`p-1.5 rounded-lg transition-all ${voted === 'up' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 hover:bg-green-100 hover:text-green-600'}`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className="my-1 font-bold text-gray-800 text-lg">{post.votes}</span>
          <button 
            onClick={() => handleVote('down')}
            className={`p-1.5 rounded-lg transition-all ${voted === 'down' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:bg-red-100 hover:text-red-600'}`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{post.author}</h3>
              <p className="text-xs text-gray-600">{post.date}</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1.5 hover:text-indigo-600 cursor-pointer">{post.title}</h3>
          <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              <Share2 className="w-4 h-4" />
              <span>مشاركة</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              <Bookmark className="w-4 h-4" />
              <span>حفظ</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}