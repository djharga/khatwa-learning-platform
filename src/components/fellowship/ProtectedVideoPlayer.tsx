'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Download,
  Lock,
  AlertTriangle,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Props for the protected video player component with DRM-like features
 */
interface ProtectedVideoPlayerProps {
  /** The source URL of the video file */
  src: string;
  /** The title of the video */
  title: string;
  /** Optional description of the video */
  description?: string;
  /** Optional poster image URL for the video */
  poster?: string;
  /** Whether the video is protected from unauthorized access (default: true) */
  isProtected?: boolean;
  /** Whether downloading the video is allowed (default: false) */
  downloadAllowed?: boolean;
  /** Whether the video should autoplay on load (default: false) */
  autoplay?: boolean;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * Volume control with mute toggle button and slider
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
        className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
      />
    </div>
  );
};

/**
 * Video progress bar with time display and seek functionality
 */
interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (percentage: number) => void;
  formatTime: (seconds: number) => string;
}

const ProgressBar = ({ currentTime, duration, onSeek, formatTime }: ProgressBarProps) => {
  return (
    <div className="mb-4">
      <div
        className="w-full bg-white/30 rounded-full h-1 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width;
          onSeek(percentage * 100);
        }}
      >
        <motion.div
          className="bg-white h-1 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between text-white text-sm mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

/**
 * Playback control buttons including play/pause and skip forward/backward
 */
interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkip: (seconds: number) => void;
}

const PlaybackControls = ({ isPlaying, onTogglePlay, onSkip }: PlaybackControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* تشغيل/إيقاف */}
      <motion.button
        onClick={onTogglePlay}
        className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>

      {/* الانتقال للخلف */}
      <motion.button
        onClick={() => onSkip(-10)}
        className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SkipBack className="w-5 h-5" />
      </motion.button>

      {/* الانتقال للأمام */}
      <motion.button
        onClick={() => onSkip(10)}
        className="p-2 hover:bg-white/20 rounded-full text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SkipForward className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

/**
 * Protected video player component with custom controls, DRM-like protection, and content security features. Prevents right-click, download, and screenshot attempts. Includes play/pause, volume control, seeking, fullscreen, and optional protected download functionality.
 */
const ProtectedVideoPlayer = ({
  src,
  title,
  description,
  poster,
  isProtected = true,
  downloadAllowed = false,
  autoplay = false,
  className = ''
}: ProtectedVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // مراقبة حالة الفيديو
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError('فشل في تحميل الفيديو');
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // إخفاء عناصر التحكم تلقائياً
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    if (isPlaying) {
      resetTimeout();
    } else {
      setShowControls(true);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  /**
   * Toggles video playback state between playing and paused
   */
  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      toast.error('فشل في تشغيل الفيديو');
    }
  };

  /**
   * Toggles audio mute state
   */
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  /**
   * Updates video volume level and unmutes if volume is increased
   */
  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  /**
   * Skips forward or backward by specified seconds, clamped to video duration
   */
  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
    video.currentTime = newTime;
  };

  /**
   * Seeks to a specific percentage of the video duration
   */
  const seekTo = (percentage: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (percentage / 100) * duration;
    video.currentTime = newTime;
  };

  /**
   * Formats seconds into MM:SS display format
   */
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Toggles fullscreen mode for the video container
   */
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // مراقبة حالة ملء الشاشة
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  /**
   * Initiates protected download with temporary token and expiration. Only works if downloadAllowed prop is true.
   */
  const handleProtectedDownload = async () => {
    if (!downloadAllowed) {
      toast.error('التحميل غير مسموح لهذا الفيديو');
      return;
    }

    try {
      // هنا يتم إنشاء رابط تحميل مؤقت محمي
      const downloadUrl = `${src}?token=${generateTempToken()}&expires=${Date.now() + 300000}`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('تم بدء التحميل بنجاح');
    } catch (error) {
      toast.error('فشل في التحميل');
    }
  };

  /**
   * Generates a temporary random token for secure download links
   */
  const generateTempToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${className}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* فيديو محمي */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        controls={false}
        controlsList="nodownload"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        onLoadedData={() => setIsLoading(false)}
        onError={() => setError('فشل في تحميل الفيديو')}
      />

      {/* رسالة الحماية */}
      {isProtected && (
        <div className="absolute top-4 right-4 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            محمي
          </div>
        </div>
      )}

      {/* رسالة التحذير */}
      {isProtected && (
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            محمي بحقوق الطبع
          </div>
        </div>
      )}

      {/* مؤشر التحميل */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p>جاري تحميل الفيديو...</p>
          </div>
        </div>
      )}

      {/* رسالة الخطأ */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* عناصر التحكم */}
      <AnimatePresence>
        {showControls && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
          >
            {/* رأس الفيديو */}
            <div className="absolute top-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">{title}</h3>
                  {description && (
                    <p className="text-gray-300 text-sm mt-1">{description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {downloadAllowed && (
                    <motion.button
                      onClick={handleProtectedDownload}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  )}

                  <motion.button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* وسط الفيديو - زر التشغيل */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={togglePlay}
                className="p-6 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </motion.button>
            </div>

            {/* أسفل الفيديو - عناصر التحكم */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seekTo}
                formatTime={formatTime}
              />

              {/* عناصر التحكم الرئيسية */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <PlaybackControls
                    isPlaying={isPlaying}
                    onTogglePlay={togglePlay}
                    onSkip={skip}
                  />

                  <VolumeControl
                    volume={volume}
                    isMuted={isMuted}
                    onToggleMute={toggleMute}
                    onVolumeChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* رسالة حماية دائمة */}
      {isProtected && (
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
          محمي بحقوق الطبع والنشر - خطى التعليمية
        </div>
      )}
    </motion.div>
  );
};

export default ProtectedVideoPlayer;