'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RTLVideoPlayerSimpleProps {
  /** رابط الفيديو */
  src: string;
  /** عنوان الفيديو (اختياري) */
  title?: string;
  /** صورة البوستر (اختياري) */
  poster?: string;
  /** تشغيل تلقائي */
  autoplay?: boolean;
  /** التحكم في الصوت */
  controls?: boolean;
  /** حجم الحاوية (default: 'default') */
  size?: 'default' | 'large' | 'small';
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
 * RTLVideoPlayerSimple Component
 * مكون فيديو بسيط ومتجاوب ومتوافق مع RTL يستخدم HTML5 video
 * لا يحتاج إلى react-player
 * 
 * @example
 * ```tsx
 * <RTLVideoPlayerSimple
 *   src="https://example.com/video.mp4"
 *   title="عنوان الفيديو"
 *   autoplay={false}
 * />
 * ```
 */
export function RTLVideoPlayerSimple({
  src,
  title,
  poster,
  autoplay = false,
  controls = true,
  size = 'default',
  className,
  onPlay,
  onPause,
  onEnded,
  lessonId,
  courseId,
  onProgress,
}: RTLVideoPlayerSimpleProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // حجم الحاوية
  const containerSizes = {
    small: 'max-w-[600px]',
    default: 'max-w-[900px]',
    large: 'max-w-[1200px]',
  };

  // إخفاء/إظهار عناصر التحكم
  useEffect(() => {
    if (!controls) return;
    
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, controls]);

  // معالجة Fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full mx-auto',
        containerSizes[size],
        'overflow-hidden', // منع overflow
        className
      )}
      style={{
        direction: 'rtl',
        textAlign: 'right',
      }}
      onMouseMove={() => controls && setShowControls(true)}
      onMouseLeave={() => {
        if (controls && isPlaying) {
          setTimeout(() => setShowControls(false), 2000);
        }
      }}
    >
      {/* Container with 16:9 aspect ratio */}
      <div
        className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg"
        style={{
          aspectRatio: '16 / 9',
          // Fallback for older browsers using padding hack
          paddingBottom: '56.25%', // 16:9 = 56.25%
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* Play Button Overlay (when paused) */}
        {!isPlaying && !isLoading && (
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors rounded-xl z-20"
            aria-label="تشغيل"
          >
            <Play className="w-16 h-16 text-white" fill="white" />
          </button>
        )}

        {/* Custom Controls Overlay */}
        {controls && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none transition-opacity duration-300 z-30',
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Title Bar */}
            {title && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 pointer-events-none">
                <h3 className="text-white font-semibold text-sm sm:text-base">{title}</h3>
              </div>
            )}

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 sm:p-4 pointer-events-auto">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                  )}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 sm:w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                    style={{
                      direction: 'ltr', // Slider always LTR
                    }}
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label="ملء الشاشة"
                >
                  <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

