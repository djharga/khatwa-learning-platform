'use client';

import { useState } from 'react';
import { BookOpen, FileText, Download, StickyNote, MessageSquare } from 'lucide-react';
import TranscriptPanel from './TranscriptPanel';
import ResourcesPanel from './ResourcesPanel';
import NotesPanel from './NotesPanel';
import DiscussionPanel from './DiscussionPanel';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  transcript?: string;
  resources?: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
  }>;
}

interface PlayerTabsProps {
  lesson: Lesson;
}

export default function PlayerTabs({ lesson }: PlayerTabsProps) {
  const [activeTab, setActiveTab] = useState<'lesson' | 'transcript' | 'resources' | 'notes' | 'discussion'>('lesson');

  const tabs = [
    { id: 'lesson' as const, label: 'الدرس', icon: BookOpen },
    { id: 'transcript' as const, label: 'النص المفرغ', icon: FileText },
    { id: 'resources' as const, label: 'الموارد', icon: Download },
    { id: 'notes' as const, label: 'الملاحظات', icon: StickyNote },
    { id: 'discussion' as const, label: 'المناقشة', icon: MessageSquare },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-blue-600 text-blue-400 bg-gray-800'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'lesson' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">{lesson.title}</h3>
            {lesson.description ? (
              <div className="prose prose-invert max-w-none text-gray-300">
                <p className="leading-relaxed whitespace-pre-line">{lesson.description}</p>
              </div>
            ) : (
              <p className="text-gray-400">لا يوجد وصف متاح لهذا الدرس.</p>
            )}
          </div>
        )}

        {activeTab === 'transcript' && (
          <TranscriptPanel transcript={lesson.transcript || ''} lessonId={lesson.id} />
        )}

        {activeTab === 'resources' && (
          <ResourcesPanel resources={lesson.resources || []} />
        )}

        {activeTab === 'notes' && (
          <NotesPanel lessonId={lesson.id} />
        )}

        {activeTab === 'discussion' && (
          <DiscussionPanel lessonId={lesson.id} />
        )}
      </div>
    </div>
  );
}

