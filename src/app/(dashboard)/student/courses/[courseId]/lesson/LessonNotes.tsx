'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import styles from './lessons-page.module.css';

interface Note {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface LessonNotesProps {
  lessonId: number;
}

export default function LessonNotes({ lessonId }: LessonNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // تحميل الملاحظات من localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem(`lesson-notes-${lessonId}`);
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, [lessonId]);

  // حفظ الملاحظات في localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem(`lesson-notes-${lessonId}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // إضافة ملاحظة جديدة
  const handleAddNote = () => {
    if (newNoteText.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        text: newNoteText.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedNotes = [newNote, ...notes];
      saveNotes(updatedNotes);
      setNewNoteText('');
      setIsAdding(false);
    }
  };

  // بدء التحرير
  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  // حفظ التحرير
  const handleSaveEdit = () => {
    if (editingId && editingText.trim()) {
      const updatedNotes = notes.map(note =>
        note.id === editingId
          ? { ...note, text: editingText.trim(), updatedAt: new Date().toISOString() }
          : note
      );
      saveNotes(updatedNotes);
      setEditingId(null);
      setEditingText('');
    }
  };

  // إلغاء التحرير
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // حذف ملاحظة
  const handleDeleteNote = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      saveNotes(updatedNotes);
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesHeader}>
        <h3 className={styles.notesTitle}>ملاحظاتي</h3>
        {!isAdding && (
          <button
            className={styles.addNoteButton}
            onClick={() => setIsAdding(true)}
            aria-label="إضافة ملاحظة جديدة"
          >
            <Plus size={18} />
            <span>إضافة ملاحظة</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className={styles.noteInputCard}>
          <textarea
            className={styles.noteTextarea}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="اكتب ملاحظتك هنا..."
            rows={3}
            dir="rtl"
            autoFocus
          />
          <div className={styles.noteActions}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleAddNote}
              disabled={!newNoteText.trim()}
            >
              <Save size={16} />
              حفظ
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => {
                setIsAdding(false);
                setNewNoteText('');
              }}
            >
              <X size={16} />
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className={styles.notesList}>
        {notes.length === 0 && !isAdding ? (
          <div className={styles.emptyNotes}>
            <div className={styles.emptyNotesIcon}>📝</div>
            <div className={styles.emptyNotesText}>لا توجد ملاحظات بعد</div>
            <div className={styles.emptyNotesHint}>اضغط على &ldquo;إضافة ملاحظة&rdquo; لبدء الكتابة</div>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteCard}>
              {editingId === note.id ? (
                <>
                  <textarea
                    className={styles.noteTextarea}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    dir="rtl"
                    autoFocus
                  />
                  <div className={styles.noteActions}>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={handleSaveEdit}
                      disabled={!editingText.trim()}
                    >
                      <Save size={16} />
                      حفظ
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnSecondary}`}
                      onClick={handleCancelEdit}
                    >
                      <X size={16} />
                      إلغاء
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.noteContent}>{note.text}</div>
                  <div className={styles.noteFooter}>
                    <div className={styles.noteDate}>
                      {formatDate(note.updatedAt)}
                    </div>
                    <div className={styles.noteActionsInline}>
                      <button
                        className={styles.noteActionButton}
                        onClick={() => handleStartEdit(note)}
                        aria-label="تحرير الملاحظة"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles.noteActionButton}
                        onClick={() => handleDeleteNote(note.id)}
                        aria-label="حذف الملاحظة"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

