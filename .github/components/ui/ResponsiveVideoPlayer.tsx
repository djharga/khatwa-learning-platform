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
  PictureInPicture,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponsiveVideoPlayerProps {
  /** رابط الفيديو */
  url: string;
  /** عنوان الفيديو */
  title?: string;
  /** صورة البوستر */
  poster?: string;
  /** تشغيل تلقائي */
  autoplay?: boolean;
  /** CSS classes إضافية */
  className?: string;
  /** Callback عند بدء التشغيل */
  onPlay?: () => void;
  /** Callback عند الإيقاف */
  onPause?: () => void;
  /** Callback عند اكتمال الفيديو */
  onEnded?: () => void;
  /** ID الدرس (لحفظ التقدم) */
  lessonId?: string;
  /** ID الكورس (لحفظ التقدم) */
  courseId?: string;
  /** Callback عند تغيير التقدم */
  onProgress?: (progress: number) => void;
}

/**
 * ResponsiveVideoPlayer Component
 * مكون فيديو احترافي متجاوب مع دعم RTL كامل
 * 
 * @example
 * ```tsx
 * <ResponsiveVideoPlayer
 *   url="https://example.com/video.mp4"
 *   title="عنوان الفيديو"
 *   poster="/poster.jpg"
 * />
 * ```
 */
export function ResponsiveVideoPlayer({
  url,
  title,
  poster,
  autoplay = false,
  className,
  onPlay,
  onPause,
  onEnded,
  lessonId,
  courseId,
  onProgress,
}: ResponsiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // سرعات التشغيل المتاحة
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // إخفاء/إظهار عناصر التحكم
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  // معالجة Fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // معالجة Picture-in-Picture
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnterPictureInPicture = () => setIsPictureInPicture(true);
    const handleLeavePictureInPicture = () => setIsPictureInPicture(false);

    video.addEventListener('enterpictureinpicture', handleEnterPictureInPicture);
    video.addEventListener('leavepictureinpicture', handleLeavePictureInPicture);

    return () => {
      video.removeEventListener('enterpictureinpicture', handleEnterPictureInPicture);
      video.removeEventListener('leavepictureinpicture', handleLeavePictureInPicture);
    };
  }, []);

  // تحميل التقدم المحفوظ
  useEffect(() => {
    if (lessonId && videoRef.current && duration > 0) {
      const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
      if (savedProgress) {
        const progress = parseFloat(savedProgress);
        if (!isNaN(progress) && progress > 0 && progress < 1) {
          videoRef.current.currentTime = progress * duration;
        }
      }
    }
  }, [lessonId, duration]);

  // حفظ التقدم وتتبع التقدم
  useEffect(() => {
    if (duration > 0 && currentTime > 0 && lessonId) {
      const progress = currentTime / duration;
      
      // حفظ محلياً
      localStorage.setItem(`lesson-progress-${lessonId}`, progress.toString());
      
      // إرسال callback للتقدم
      if (onProgress) {
        const progressPercent = Math.round(progress * 100);
        onProgress(progressPercent);
      }
    }
  }, [currentTime, duration, lessonId, onProgress]);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const togglePictureInPicture = async () => {
    if (!videoRef.current) return;

    try {
      if (isPictureInPicture) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full max-w-5xl mx-auto', // حاوية مركزية
        'overflow-hidden', // منع overflow
        className
      )}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 2000);
        }
      }}
      style={{
        direction: 'inherit', // يرث direction من العنصر الأب
      }}
    >
      {/* Container with 16:9 aspect ratio */}
      <div
        className={cn(
          'relative w-full', // relative للـ absolute positioning
          'aspect-video', // نسبة 16:9 من Tailwind
          'bg-black dark:bg-gray-900', // خلفية سوداء
          'rounded-xl', // حواف مستديرة
          'shadow-lg', // ظل خفيف
          'overflow-hidden' // منع overflow
        )}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={url}
          poster={poster}
          className="absolute inset-0 w-full h-full object-contain"
          playsInline
          controlsList="nodownload" // منع التحميل
          disablePictureInPicture={false}
          onLoadStart={() => setIsLoading(true)}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onCanPlay={() => {
            setIsLoading(false);
            if (autoplay && videoRef.current) {
              videoRef.current.play();
            }
          }}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={() => setIsLoading(false)}
        />

        {/* Loading Indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 dark:bg-gray-900/80 z-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play Button Overlay (when paused) */}
        <AnimatePresence>
          {!isPlaying && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors rounded-xl z-20"
              aria-label="تشغيل"
            >
              <Play className="w-20 h-20 text-white" fill="white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-30"
            >
              {/* Title Bar */}
              {title && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent p-4 pointer-events-none">
                  <h3 className="text-white dark:text-gray-100 font-semibold text-sm sm:text-base">
                    {title}
                  </h3>
                </div>
              )}

              {/* Bottom Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 pointer-events-auto">
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = parseFloat(e.target.value);
                        setCurrentTime(parseFloat(e.target.value));
                      }
                    }}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                    style={{
                      direction: 'ltr', // Slider دائماً LTR
                    }}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Play/Pause Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayPause}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                    )}
                  </motion.button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </motion.button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 sm:w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                      style={{
                        direction: 'ltr', // Slider دائماً LTR
                      }}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-white text-xs sm:text-sm font-mono flex-shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Settings Menu (Playback Speed) */}
                  <div className="relative flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="الإعدادات"
                    >
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.button>

                    {/* Settings Dropdown */}
                    <AnimatePresence>
                      {showSettings && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full mb-2 right-0 bg-black/90 dark:bg-gray-800 rounded-lg p-2 min-w-[120px] shadow-xl"
                        >
                          <div className="text-white text-xs mb-2 px-2 py-1 border-b border-white/10">
                            سرعة التشغيل
                          </div>
                          {playbackRates.map((rate) => (
                            <motion.button
                              key={rate}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePlaybackRateChange(rate)}
                              className={cn(
                                'w-full text-right px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors',
                                playbackRate === rate
                                  ? 'bg-white/20 text-white font-semibold'
                                  : 'text-white/80'
                              )}
                            >
                              {rate}x
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Picture-in-Picture Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePictureInPicture}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    aria-label="صورة داخل صورة"
                  >
                    <PictureInPicture className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.button>

                  {/* Fullscreen Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    aria-label="ملء الشاشة"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

