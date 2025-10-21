'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Zap,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  X,
  Settings,
  BarChart3,
} from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  networkLatency: number;
  batteryLevel: number;
  cpuUsage: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  compact?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  showInProduction = false,
  position = 'top-right',
  compact = false,
  onMetricsUpdate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    networkLatency: 0,
    batteryLevel: 100,
    cpuUsage: 0,
  });
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef<number | null>(null);
  const renderStartTime = useRef<number>(0);

  // Performance measurement
  const measureRenderTime = useCallback(() => {
    const now = performance.now();
    const renderTime = now - renderStartTime.current;
    return renderTime;
  }, []);

  const measureFPS = useCallback(() => {
    frameCount.current++;
    const now = performance.now();

    if (now - lastTime.current >= 1000) {
      const fps = Math.round(
        (frameCount.current * 1000) / (now - lastTime.current)
      );
      frameCount.current = 0;
      lastTime.current = now;

      setFpsHistory((prev) => {
        const newHistory = [...prev, fps];
        return newHistory.slice(-30); // Keep last 30 measurements
      });

      return fps;
    }

    return metrics.fps;
  }, [metrics.fps]);

  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100);
    }
    return 0;
  }, []);

  const measureNetworkLatency = useCallback(async () => {
    try {
      const start = performance.now();
      await fetch('/api/ping', { method: 'HEAD', cache: 'no-cache' });
      return performance.now() - start;
    } catch {
      return 0;
    }
  }, []);

  const measureBatteryLevel = useCallback(async () => {
    try {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        return Math.round(battery.level * 100);
      }
    } catch {
      // Battery API not supported
    }
    return 100;
  }, []);

  const measureCPUUsage = useCallback(() => {
    // Mock CPU usage based on performance timing
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      return Math.min(Math.round(loadTime / 10), 100);
    }
    return 0;
  }, []);

  // Update metrics
  const updateMetrics = useCallback(async () => {
    const newMetrics: PerformanceMetrics = {
      fps: measureFPS(),
      memoryUsage: measureMemoryUsage(),
      renderTime: measureRenderTime(),
      networkLatency: await measureNetworkLatency(),
      batteryLevel: await measureBatteryLevel(),
      cpuUsage: measureCPUUsage(),
    };

    setMetrics(newMetrics);
    onMetricsUpdate?.(newMetrics);
  }, [
    measureFPS,
    measureMemoryUsage,
    measureRenderTime,
    measureNetworkLatency,
    measureBatteryLevel,
    measureCPUUsage,
    onMetricsUpdate,
  ]);

  // Animation loop
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      updateMetrics();
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [enabled, updateMetrics]);

  // Render time measurement
  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  // Keyboard shortcut to toggle visibility
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  // Performance status
  const getPerformanceStatus = () => {
    if (metrics.fps < 30)
      return { status: 'poor', color: 'red', icon: AlertTriangle };
    if (metrics.fps < 50)
      return { status: 'fair', color: 'yellow', icon: TrendingDown };
    return { status: 'good', color: 'green', icon: CheckCircle };
  };

  const performanceStatus = getPerformanceStatus();

  if (
    !enabled ||
    (!showInProduction && process.env.NODE_ENV === 'production')
  ) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed ${positionClasses[position]} z-50 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors`}
        title="Performance Monitor (Ctrl+Shift+P)"
      >
        <Activity className="w-6 h-6" />
      </motion.button>

      {/* Monitor Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${positionClasses[position]} z-40 mt-16`}
          >
            <div className="bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Performance Monitor
                  </span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Settings className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-3 min-w-64"
                  >
                    {/* FPS */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">FPS</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm font-mono">{metrics.fps}</span>
                        <performanceStatus.icon
                          className={`w-3 h-3 text-${performanceStatus.color}-400`}
                        />
                      </div>
                    </div>

                    {/* Memory Usage */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <HardDrive className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Memory</span>
                      </div>
                      <span className="text-sm font-mono">
                        {metrics.memoryUsage}%
                      </span>
                    </div>

                    {/* Render Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Render</span>
                      </div>
                      <span className="text-sm font-mono">
                        {metrics.renderTime.toFixed(1)}ms
                      </span>
                    </div>

                    {/* Network Latency */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Wifi className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Network</span>
                      </div>
                      <span className="text-sm font-mono">
                        {metrics.networkLatency.toFixed(0)}ms
                      </span>
                    </div>

                    {/* Battery Level */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Battery className="w-4 h-4 text-orange-400" />
                        <span className="text-sm">Battery</span>
                      </div>
                      <span className="text-sm font-mono">
                        {metrics.batteryLevel}%
                      </span>
                    </div>

                    {/* CPU Usage */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Cpu className="w-4 h-4 text-red-400" />
                        <span className="text-sm">CPU</span>
                      </div>
                      <span className="text-sm font-mono">
                        {metrics.cpuUsage}%
                      </span>
                    </div>

                    {/* FPS Chart */}
                    {fpsHistory.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">
                            FPS History
                          </span>
                          <span className="text-xs text-gray-400">
                            {fpsHistory[fpsHistory.length - 1]} FPS
                          </span>
                        </div>
                        <div className="flex items-end space-x-1 h-8">
                          {fpsHistory.slice(-10).map((fps, index) => (
                            <motion.div
                              key={index}
                              initial={{ height: 0 }}
                              animate={{ height: `${(fps / 60) * 100}%` }}
                              transition={{ duration: 0.1 }}
                              className="bg-blue-500 rounded-t flex-1 min-h-1"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceMonitor;
