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
  SkipBack,
  SkipForward,
  PictureInPicture,
  ChevronDown,
} from 'lucide-react';
import { learningAnalytics } from '@/lib/analytics';
import { calculateProgress, shouldMarkComplete, syncProgressToServer, markLessonComplete } from '@/lib/progress-tracking';

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  lessonId: string;
  courseId: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  autoplay?: boolean;
}

export default function VideoPlayer({
  src,
  title,
  poster,
  lessonId,
  courseId,
  onComplete,
  onProgress,
  autoplay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
    if (savedProgress && videoRef.current) {
      const progress = parseFloat(savedProgress);
      videoRef.current.currentTime = progress * duration;
    }
  }, [lessonId, duration]);

  // Save progress and sync to server
  useEffect(() => {
    if (duration > 0 && currentTime > 0) {
      const progressPercent = calculateProgress(currentTime, duration);
      const progress = currentTime / duration;
      
      // Save locally
      localStorage.setItem(`lesson-progress-${lessonId}`, progress.toString());
      onProgress?.(progressPercent);

      // Sync to server every 10 seconds
      if (Math.floor(currentTime) % 10 === 0) {
        syncProgressToServer({
          lessonId,
          courseId,
          progress: progressPercent,
          watchedDuration: currentTime,
          totalDuration: duration,
          lastWatchedAt: new Date().toISOString(),
        }).catch(console.error);
      }

      // Track analytics
      learningAnalytics.videoProgress(lessonId, progressPercent, courseId);

      // Check if should mark as complete
      if (shouldMarkComplete(progressPercent, currentTime, duration)) {
        markLessonComplete(courseId, lessonId)
          .then(() => {
            learningAnalytics.lessonComplete(lessonId, courseId);
            onComplete?.();
          })
          .catch(console.error);
      }
    }
  }, [currentTime, duration, lessonId, courseId, onProgress, onComplete]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      learningAnalytics.videoComplete(lessonId, courseId);
      markLessonComplete(courseId, lessonId)
        .then(() => {
          learningAnalytics.lessonComplete(lessonId, courseId);
          onComplete?.();
        })
        .catch(console.error);
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Auto-resume from saved position
    const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
    if (savedProgress && autoplay) {
      video.currentTime = parseFloat(savedProgress) * video.duration;
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [lessonId, autoplay, onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        learningAnalytics.videoPause(lessonId, courseId);
      } else {
        videoRef.current.play();
        learningAnalytics.videoPlay(lessonId, courseId);
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const seek = (percentage: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (percentage / 100) * duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
      if (value > 0) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    if (!videoRef.current) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 3000);
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        playsInline
      />

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
          >
            {/* Top Bar */}
            <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-auto">
              <h3 className="text-white font-semibold text-xs">{title}</h3>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto bg-gradient-to-t from-black/90 via-black/70 to-transparent">
              {/* Progress Bar */}
              <div
                className="w-full bg-white/20 rounded-full h-1.5 cursor-pointer mb-4 group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                  seek(percentage);
                }}
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full relative"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </motion.div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Play/Pause */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>

                  {/* Skip Backward */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skip(-10)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                    aria-label="رجوع 10 ثوان"
                  >
                    <SkipBack className="w-3 h-3" />
                  </motion.button>

                  {/* Skip Forward */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skip(10)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                    aria-label="تقديم 10 ثوان"
                  >
                    <SkipForward className="w-3 h-3" />
                  </motion.button>

                  {/* Volume */}
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMute}
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                      aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3 h-3" />
                      ) : (
                        <Volume2 className="w-3 h-3" />
                      )}
                    </motion.button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                      }}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-white text-xs font-medium bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Speed Control */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-colors flex items-center gap-1 backdrop-blur-sm"
                    >
                      {playbackRate}x
                      <ChevronDown className="w-3 h-3" />
                    </motion.button>
                    <AnimatePresence>
                      {showSpeedMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full mb-1.5 left-0 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                        >
                          {speedOptions.map((speed) => (
                            <button
                              key={speed}
                              onClick={() => changePlaybackRate(speed)}
                              className={`w-full px-3 py-1.5 text-right text-xs transition-colors ${
                                playbackRate === speed
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Picture-in-Picture */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePictureInPicture}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                    aria-label="صورة داخل صورة"
                  >
                    <PictureInPicture className="w-3 h-3" />
                  </motion.button>

                  {/* Fullscreen */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm"
                    aria-label={isFullscreen ? 'إلغاء ملء الشاشة' : 'ملء الشاشة'}
                  >
                    {isFullscreen ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

