'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RTLVideoPlayerProps {
  /** رابط الفيديو */
  url: string;
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
}

/**
 * RTLVideoPlayer Component
 * مكون فيديو متجاوب ومتوافق مع RTL يستخدم ReactPlayer
 * 
 * @example
 * ```tsx
 * <RTLVideoPlayer
 *   url="https://example.com/video.mp4"
 *   title="عنوان الفيديو"
 *   autoplay={false}
 * />
 * ```
 */
export function RTLVideoPlayer({
  url,
  title,
  poster,
  autoplay = false,
  controls = true,
  size = 'default',
  className,
  onPlay,
  onPause,
  onEnded,
}: RTLVideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
    if (isPlaying) {
      playerRef.current?.getInternalPlayer()?.pause();
    } else {
      playerRef.current?.getInternalPlayer()?.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
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
        {/* ReactPlayer wrapper */}
        <div className="absolute inset-0 w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing={isPlaying}
            muted={isMuted}
            volume={volume}
            controls={false} // نستخدم controls مخصصة
            light={poster}
            playIcon={
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors rounded-xl"
                onClick={togglePlayPause}
                aria-label="تشغيل"
              >
                <Play className="w-16 h-16 text-white" fill="white" />
              </button>
            }
            onReady={() => {
              setIsReady(true);
              setIsLoading(false);
            }}
            onStart={handlePlay}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onError={() => {
              setIsLoading(false);
            }}
            config={{
              youtube: {
              },
              vimeo: {
              },
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* Custom Controls Overlay */}
        {controls && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none transition-opacity duration-300',
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

