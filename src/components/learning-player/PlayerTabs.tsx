'use client';

import { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  StickyNote,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

type TabType = 'lesson' | 'transcript' | 'resources' | 'notes' | 'discussion';

export default function PlayerTabs({ lesson }: PlayerTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('resources');

  const tabs: Array<{
    id: TabType;
    label: string;
    icon: React.ElementType;
    color: string;
  }> = [
    { id: 'lesson', label: 'الدرس', icon: BookOpen, color: 'blue' },
    { id: 'transcript', label: 'النص المفرغ', icon: FileText, color: 'purple' },
    { id: 'resources', label: 'الموارد', icon: Download, color: 'emerald' },
    { id: 'notes', label: 'الملاحظات', icon: StickyNote, color: 'amber' },
    { id: 'discussion', label: 'المناقشة', icon: MessageSquare, color: 'pink' },
  ];

  const getTabColorClasses = (color: string, isActive: boolean): string => {
    if (!isActive) {
      return 'text-gray-500 hover:text-gray-700 transition-colors';
    }

    const colorMap: Record<string, string> = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      emerald: 'text-emerald-600',
      amber: 'text-amber-600',
      pink: 'text-pink-600',
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl border-l border-white/40 shadow-inner">
      {/* Tab Headers */}
      <div className="flex-shrink-0 border-b border-white/40 bg-white/60 backdrop-blur-lg">
        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2.5 font-medium transition-all whitespace-nowrap flex-shrink-0 min-w-[70px] ${getTabColorClasses(
                  tab.color,
                  isActive
                )}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                <span className="text-[10px]">{tab.label}</span>

                {tab.id === 'resources' &&
                  lesson.resources &&
                  lesson.resources.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {lesson.resources.length}
                    </span>
                  )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="h-full overflow-y-auto"
          >
            {activeTab === 'lesson' && (
              <div className="p-4">
                <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 border border-white/40 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                      <BookOpen className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-800">
                      {lesson.title}
                    </h3>
                  </div>
                  {lesson.description ? (
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                      {lesson.description}
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-500 text-center py-5">
                      لا يوجد وصف متاح لهذا الدرس.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'transcript' && (
              <TranscriptPanel
                transcript={lesson.transcript || ''}
                lessonId={lesson.id}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesPanel resources={lesson.resources || []} />
            )}

            {activeTab === 'notes' && <NotesPanel lessonId={lesson.id} />}

            {activeTab === 'discussion' && (
              <DiscussionPanel lessonId={lesson.id} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
