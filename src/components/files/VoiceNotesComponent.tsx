'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Trash2,
  Edit,
  Download,
  Clock,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Interface for a voice note
 */
interface VoiceNote {
  id: string;
  title: string;
  duration: number; // in seconds
  dateAdded: Date;
  audioUrl: string;
}

/**
 * Props for the VoiceNotesComponent
 */
interface VoiceNotesComponentProps {
  fileId: string;
}

/**
 * Mock data for voice notes - in a real app, this would come from an API
 */
const mockVoiceNotes: VoiceNote[] = [
  {
    id: '1',
    title: 'ملاحظة حول الملف الأول',
    duration: 45,
    dateAdded: new Date('2023-10-01'),
    audioUrl: '/mock-audio/note1.mp3', // Mock audio URL
  },
  {
    id: '2',
    title: 'تذكير مهم',
    duration: 120,
    dateAdded: new Date('2023-10-05'),
    audioUrl: '/mock-audio/note2.mp3',
  },
];

/**
 * Volume control component
 */
interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, isMuted, onToggleMute, onVolumeChange }: VolumeControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={onToggleMute}
        className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </motion.button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-16 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer slider"
      />
    </div>
  );
};

/**
 * Progress bar for audio playback
 */
interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (percentage: number) => void;
  formatTime: (seconds: number) => string;
}

const ProgressBar = ({ currentTime, duration, onSeek, formatTime }: ProgressBarProps) => {
  return (
    <div className="mb-2">
      <div
        className="w-full bg-gray-300 rounded-full h-1 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width;
          onSeek(percentage * 100);
        }}
      >
        <motion.div
          className="bg-blue-500 h-1 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between text-gray-600 text-xs mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

/**
 * Playback controls
 */
interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkip: (seconds: number) => void;
  playbackRate: number;
  onSpeedChange: (rate: number) => void;
}

const PlaybackControls = ({ isPlaying, onTogglePlay, onSkip, playbackRate, onSpeedChange }: PlaybackControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={onTogglePlay}
        className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </motion.button>

      <motion.button
        onClick={() => onSkip(-10)}
        className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SkipBack className="w-4 h-4" />
      </motion.button>

      <motion.button
        onClick={() => onSkip(10)}
        className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SkipForward className="w-4 h-4" />
      </motion.button>

      <select
        value={playbackRate}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        className="text-xs bg-gray-100 rounded px-2 py-1"
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </div>
  );
};

/**
 * Recording modal component
 */
interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

const RecordingModal = ({ isOpen, onClose, onSave }: RecordingModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [title, setTitle] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    toast.success('بدء التسجيل');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.success('تم إيقاف التسجيل');
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('يرجى إدخال عنوان للملاحظة');
      return;
    }
    onSave(title);
    setTitle('');
    setRecordingTime(0);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-lg p-6 w-96 max-w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">تسجيل ملاحظة صوتية</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">عنوان الملاحظة</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل عنوان الملاحظة"
              />
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {isRecording ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Mic className="w-12 h-12 text-red-500" />
                    </motion.div>
                  ) : (
                    <MicOff className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="text-2xl font-mono">{formatTime(recordingTime)}</div>
              </div>
            </div>

            <div className="flex gap-2">
              {!isRecording ? (
                <motion.button
                  onClick={handleStartRecording}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  بدء التسجيل
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleStopRecording}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  إيقاف التسجيل
                </motion.button>
              )}

              <motion.button
                onClick={handleSave}
                disabled={recordingTime === 0}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                whileHover={{ scale: recordingTime > 0 ? 1.05 : 1 }}
                whileTap={{ scale: recordingTime > 0 ? 0.95 : 1 }}
              >
                حفظ
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Voice note item component with player
 */
interface VoiceNoteItemProps {
  note: VoiceNote;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onExport: (note: VoiceNote) => void;
}

const VoiceNoteItem = ({ note, onDelete, onEdit, onExport }: VoiceNoteItemProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
    audio.currentTime = newTime;
  };

  const seekTo = (percentage: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (percentage / 100) * duration;
    audio.currentTime = newTime;
  };

  const handleSpeedChange = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(note.id, editTitle);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <audio ref={audioRef} src={note.audioUrl} preload="metadata" />

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            />
          ) : (
            <h4 className="font-medium text-gray-900">{note.title}</h4>
          )}
        </div>

        <div className="flex items-center gap-1 ml-2">
          <motion.button
            onClick={handleEdit}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={() => onExport(note)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Download className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={() => onDelete(note.id)}
            className="p-1 hover:bg-red-100 rounded text-red-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4" />
        <span>{formatTime(note.duration)}</span>
        <Calendar className="w-4 h-4 ml-2" />
        <span>{note.dateAdded.toLocaleDateString('ar-SA')}</span>
      </div>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={seekTo}
        formatTime={formatTime}
      />

      <div className="flex items-center justify-between">
        <PlaybackControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onSkip={skip}
          playbackRate={playbackRate}
          onSpeedChange={handleSpeedChange}
        />

        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </motion.div>
  );
};

/**
 * Main VoiceNotesComponent
 */
const VoiceNotesComponent = ({ fileId }: VoiceNotesComponentProps) => {
  const [notes, setNotes] = useState<VoiceNote[]>(mockVoiceNotes.filter(note => note.id.startsWith(fileId.charAt(0)))); // Mock filter
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);

  const handleAddNote = () => {
    setIsRecordingModalOpen(true);
  };

  const handleSaveNote = (title: string) => {
    const newNote: VoiceNote = {
      id: Date.now().toString(),
      title,
      duration: Math.floor(Math.random() * 180) + 30, // Mock duration between 30-210 seconds
      dateAdded: new Date(),
      audioUrl: `/mock-audio/note${notes.length + 1}.mp3`, // Mock URL
    };
    setNotes([...notes, newNote]);
    toast.success('تم حفظ الملاحظة الصوتية');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('تم حذف الملاحظة');
  };

  const handleEditNote = (id: string, newTitle: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, title: newTitle } : note));
    toast.success('تم تحديث الملاحظة');
  };

  const handleExportNote = (note: VoiceNote) => {
    // Simulate export
    const link = document.createElement('a');
    link.href = note.audioUrl;
    link.download = `${note.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('تم تصدير الملاحظة');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">الملاحظات الصوتية</h3>
        <motion.button
          onClick={handleAddNote}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-4 h-4" />
          إضافة ملاحظة
        </motion.button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد ملاحظات صوتية لهذا الملف
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <VoiceNoteItem
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
              onExport={handleExportNote}
            />
          ))}
        </div>
      )}

      <RecordingModal
        isOpen={isRecordingModalOpen}
        onClose={() => setIsRecordingModalOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default VoiceNotesComponent;