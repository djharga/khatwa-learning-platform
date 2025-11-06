'use client';

import React, { useState } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import { X, Hash, AlertCircle } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; tags: string[] }) => void;
}

/**
 * Modal component for creating new discussion posts.
 * Includes title, content, and tag inputs with validation.
 */
export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  if (!isOpen) return null;

  /**
   * Validates form inputs
   */
  const validate = (): boolean => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'عنوان المنشور مطلوب';
    } else if (title.trim().length < 10) {
      newErrors.title = 'العنوان يجب أن يكون 10 أحرف على الأقل';
    }

    if (!content.trim()) {
      newErrors.content = 'محتوى المنشور مطلوب';
    } else if (content.trim().length < 20) {
      newErrors.content = 'المحتوى يجب أن يكون 20 حرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles adding a new tag
   */
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag.startsWith('#') ? tag : `#${tag}`]);
      setTagInput('');
    }
  };

  /**
   * Handles removing a tag
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        title: title.trim(),
        content: content.trim(),
        tags: tags.length > 0 ? tags : ['#عام'],
      });

      // Reset form
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
      setErrors({});
      onClose();
    }
  };

  /**
   * Handles closing modal
   */
  const handleClose = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-indigo-500">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <h2 className="text-2xl font-bold">إنشاء منشور جديد</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 bg-gradient-to-br from-gray-50 to-white">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
              عنوان المنشور *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اكتب عنواناً واضحاً ومفيداً..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={150}
            />
            {errors.title && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.title}</span>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">{title.length}/150 حرف</p>
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">
              محتوى المنشور *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اشرح سؤالك أو شارك خبرتك بالتفصيل..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={2000}
            />
            {errors.content && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.content}</span>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">{content.length}/2000 حرف</p>
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-2">
              الوسوم (اختياري)
            </label>
            <div className="flex gap-2 mb-2">
              <div className="flex-1 relative">
                <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="أضف وسماً (اضغط Enter)"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  disabled={tags.length >= 5}
                />
              </div>
              <StyledButton
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                variant="secondary"
                size="medium"
              >
                إضافة
              </StyledButton>
            </div>

            {/* Tags Display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              يمكنك إضافة حتى 5 وسوم ({5 - tags.length} متبقية)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <StyledButton 
              type="submit" 
              variant="primary"
              size="large"
              fullWidth
            >
              نشر المنشور
            </StyledButton>
            <StyledButton 
              type="button" 
              variant="secondary" 
              onClick={handleClose} 
              size="large"
            >
              إلغاء
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
}

