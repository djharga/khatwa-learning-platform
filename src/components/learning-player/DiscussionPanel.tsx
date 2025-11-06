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
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white">مناقشة الدرس</h3>
        </div>

        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب سؤالك أو تعليقك..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                addComment();
              }
            }}
          />
          <button
            onClick={addComment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>إرسال</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>لا توجد مناقشات بعد. كن أول من يطرح سؤالاً!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{comment.author}</h4>
                      <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{comment.content}</p>
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

