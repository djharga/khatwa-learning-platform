'use client';

import { useState, useEffect } from 'react';
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

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${lessonId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [lessonId]);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes-${lessonId}`, JSON.stringify(notes));
    }
  }, [notes, lessonId]);

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: currentTime,
      createdAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredNotes = searchQuery
    ? notes.filter(note => note.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  const exportNotes = () => {
    const content = notes
      .map(note => `[${formatTime(note.timestamp)}] ${note.content}`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes-lesson-${lessonId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في الملاحظات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-1.5">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="اكتب ملاحظة جديدة..."
            className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                addNote();
              }
            }}
          />
          <button
            onClick={addNote}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3" />
            <span className="text-xs">إضافة</span>
          </button>
        </div>

        {notes.length > 0 && (
          <button
            onClick={exportNotes}
            className="flex items-center gap-1.5 text-[10px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>تصدير الملاحظات</span>
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p className="text-xs">{searchQuery ? 'لم يتم العثور على ملاحظات' : 'لا توجد ملاحظات بعد'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(note.timestamp)}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                    aria-label="حذف الملاحظة"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

