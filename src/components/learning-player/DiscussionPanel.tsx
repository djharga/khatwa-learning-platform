'use client';

import { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
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
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment('');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="h-full flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-md transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">مناقشة الدرس</h3>
        </div>

        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب سؤالك أو تعليقك..."
            className="flex-1 px-3 py-2 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none outline-none transition-all"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addComment();
            }}
          />
          <button
            onClick={addComment}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md hover:from-primary-700 hover:to-primary-600 transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <div className="flex items-center gap-1.5">
              <Send className="w-4 h-4" />
              <span>إرسال</span>
            </div>
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-neutral-500 dark:text-neutral-400 py-10"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
              <p className="text-sm">لا توجد مناقشات بعد. كن أول من يطرح سؤالاً!</p>
            </motion.div>
          ) : (
            comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="p-3 bg-white/80 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-inner">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">{comment.author}</h4>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
