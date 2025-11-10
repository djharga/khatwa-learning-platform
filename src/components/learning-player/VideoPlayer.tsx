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
import {
  calculateProgress,
  shouldMarkComplete,
  syncProgressToServer,
  markLessonComplete,
} from '@/lib/progress-tracking';
import { learningAnalytics } from '@/lib/analytics';

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
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // حفظ التقدم وتشغيله من المكان المتوقف
  useEffect(() => {
    const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
    if (savedProgress && videoRef.current) {
      const progress = parseFloat(savedProgress);
      videoRef.current.currentTime = progress * duration;
    }
  }, [lessonId, duration]);

  // مزامنة التقدم
  useEffect(() => {
    if (!duration || !currentTime) return;

    const percent = calculateProgress(currentTime, duration);
    localStorage.setItem(`lesson-progress-${lessonId}`, (currentTime / duration).toString());
    onProgress?.(percent);

    if (Math.floor(currentTime) % 10 === 0) {
      syncProgressToServer({
        lessonId,
        courseId,
        progress: percent,
        watchedDuration: currentTime,
        totalDuration: duration,
        lastWatchedAt: new Date().toISOString(),
      }).catch(console.error);
    }

    if (shouldMarkComplete(percent, currentTime, duration)) {
      markLessonComplete(courseId, lessonId)
        .then(() => {
          learningAnalytics.lessonComplete(lessonId, courseId);
          onComplete?.();
        })
        .catch(console.error);
    }
  }, [currentTime, duration, lessonId, courseId, onProgress, onComplete]);

  // التحكم في الأحداث
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      markLessonComplete(courseId, lessonId).then(onComplete).catch(console.error);
    };
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [lessonId, courseId, onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    isPlaying ? video.pause() : video.play();
  };

  const skip = (s: number) => {
    if (videoRef.current) videoRef.current.currentTime += s;
  };

  const seek = (p: number) => {
    if (videoRef.current) videoRef.current.currentTime = (p / 100) * duration;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const mute = !isMuted;
      videoRef.current.muted = mute;
      setIsMuted(mute);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      if (v > 0) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    isFullscreen ? document.exitFullscreen() : containerRef.current.requestFullscreen();
  };

  const togglePip = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await v.requestPictureInPicture();
    } catch (err) {
      console.error(err);
    }
  };

  const changeSpeed = (rate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group select-none"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setTimeout(() => setShowControls(false), 2000)}
    >
      <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-contain" playsInline />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
          >
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto bg-gradient-to-t from-black/80 via-black/60 to-transparent space-y-2">
              {/* Progress Bar */}
              <div
                className="w-full bg-white/30 h-1.5 rounded-full cursor-pointer mb-2"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seek(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <motion.div
                  className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skip(-10)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    <SkipBack className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skip(10)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    <SkipForward className="w-3 h-3" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </motion.button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 accent-blue-500"
                  />
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  {/* Speed Menu */}
                  <div className="relative">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-2 py-1 bg-white/10 rounded-lg flex items-center gap-1"
                    >
                      {playbackRate}x <ChevronDown className="w-3 h-3" />
                    </motion.button>
                    <AnimatePresence>
                      {showSpeedMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute bottom-full left-0 mb-1 bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                        >
                          {speedOptions.map((rate) => (
                            <button
                              key={rate}
                              onClick={() => changeSpeed(rate)}
                              className={`w-full px-3 py-1.5 text-xs ${
                                playbackRate === rate
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button whileTap={{ scale: 0.9 }} onClick={togglePip} className="p-1.5 bg-white/10 rounded-lg">
                    <PictureInPicture className="w-3 h-3" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={toggleFullscreen} className="p-1.5 bg-white/10 rounded-lg">
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
