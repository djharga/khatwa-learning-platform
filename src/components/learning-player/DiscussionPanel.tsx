'use client';

import { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface DiscussionPanelProps {
  lessonId: string;
}

export default function DiscussionPanel({ lessonId }: DiscussionPanelProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'أحمد محمد',
      avatar: '/api/placeholder/32/32',
      content: 'هل يمكن توضيح الجزء المتعلق بالمراجعة الداخلية؟',
      createdAt: '2024-01-15T10:30:00Z',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'أنت',
      avatar: '/api/placeholder/32/32',
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 mb-3">
          <MessageSquare className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-xs text-gray-900 dark:text-white">مناقشة الدرس</h3>
        </div>

        <div className="flex gap-1.5">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب سؤالك أو تعليقك..."
            className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                addComment();
              }
            }}
          />
          <button
            onClick={addComment}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span className="text-xs">إرسال</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
            <p className="text-xs">لا توجد مناقشات بعد. كن أول من يطرح سؤالاً!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="font-semibold text-xs text-gray-900 dark:text-white">{comment.author}</h4>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

