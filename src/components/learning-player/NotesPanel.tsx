'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Clock, Trash2, Download } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: number;
  createdAt: string;
}

interface NotesPanelProps {
  lessonId: string;
  currentTime?: number;
}

export default function NotesPanel({ lessonId, currentTime = 0 }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`notes-${lessonId}`);
    if (saved) setNotes(JSON.parse(saved));
  }, [lessonId]);

  useEffect(() => {
    localStorage.setItem(`notes-${lessonId}`, JSON.stringify(notes));
  }, [notes, lessonId]);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      timestamp: currentTime,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote('');
  };

  const deleteNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const filteredNotes = searchQuery
    ? notes.filter((n) => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  const exportNotes = () => {
    const content = notes.map((n) => `[${formatTime(n.timestamp)}] ${n.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${lessonId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden transition-all">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 space-y-3 bg-gradient-to-r from-primary-50 to-primary-100/40 dark:from-primary-950/20 dark:to-primary-900/10">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الملاحظات..."
            className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 outline-none transition"
          />
        </div>

        <div className="flex gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="اكتب ملاحظة جديدة..."
            className="flex-1 px-3 py-2 bg-white/90 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none transition"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote();
            }}
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة</span>
          </button>
        </div>

        {notes.length > 0 && (
          <button
            onClick={exportNotes}
            className="flex items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير الملاحظات</span>
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <AnimatePresence>
          {filteredNotes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-neutral-500 dark:text-neutral-400 py-10 text-xs"
            >
              {searchQuery ? 'لم يتم العثور على ملاحظات' : 'لا توجد ملاحظات بعد'}
            </motion.div>
          ) : (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white/80 dark:bg-neutral-800/80 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(note.timestamp)}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
