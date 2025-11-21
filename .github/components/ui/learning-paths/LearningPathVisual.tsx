'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BookOpen, ChevronRight, Flag, Info, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { useState, useRef } from 'react';
import type { LearningPathStep } from './LearningPathTypes'; // Import from types.ts for consistency

export const LearningPathVisual = ({ steps }: { steps: LearningPathStep[] }) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const startPanRef = useRef({ x: 0, y: 0 });
  const currentIndex = steps.findIndex(step => step.current);
  const completedIndex = steps.findIndex(step => !step.completed) - 1;

  // Calculate node positions (horizontal path, responsive)
  const nodeSpacing = 120; // Base spacing, scales with zoom
  const nodes = steps.map((step, index) => ({
    ...step,
    x: index * nodeSpacing,
    y: 50, // Center vertically
  }));

  // Zoom and pan handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handlePan = (deltaX: number, deltaY: number) => {
    setPan(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl shadow-modern border border-gray-100 hover-lift" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          مسار التعلم الخاص بك
        </h3>
        {/* Zoom/Pan Controls */}
        <div className="flex gap-2">
          <button onClick={handleZoomIn} className="btn-icon hover-glow" aria-label="تكبير">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleZoomOut} className="btn-icon hover-glow" aria-label="تصغير">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={() => handlePan(20, 0)} className="btn-icon hover-glow" aria-label="تحريك يمين">
            <Move className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="overflow-hidden rounded-lg bg-gradient-modern-primary p-4">
        <svg
          ref={svgRef}
          width="100%"
          height="200"
          viewBox={`0 0 ${steps.length * nodeSpacing} 200`}
          className="cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center',
          }}
          onMouseDown={(e) => {
            startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
            const handleMouseMove = (moveEvent: MouseEvent) => {
              setPan({
                x: moveEvent.clientX - startPanRef.current.x,
                y: moveEvent.clientY - startPanRef.current.y
              });
            };
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          onMouseMove={(e) => {
            if (startPanRef.current) {
              setPan({
                x: e.clientX - startPanRef.current.x,
                y: e.clientY - startPanRef.current.y
              });
            }
          }}
        >
          {/* Connecting Lines */}
          {nodes.slice(0, -1).map((node, index) => {
            const nextNode = nodes[index + 1];
            const isCompleted = index <= completedIndex;
            return (
              <motion.line
                key={`line-${index}`}
                x1={node.x + 20} // Offset for node center
                y1={node.y}
                x2={nextNode.x + 20}
                y2={nextNode.y}
                stroke={isCompleted ? '#10b981' : '#d1d5db'} // Green for completed, gray otherwise
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="hover-glow"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const isCompleted = node.completed;
            const isCurrent = node.current;
            const Icon = isCompleted ? Flag : BookOpen;
            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                className="cursor-pointer"
                onClick={() => setExpandedStep(expandedStep === node.id ? null : node.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Node Circle */}
                <circle
                  cx={node.x + 20}
                  cy={node.y}
                  r="20"
                  fill={isCompleted ? '#10b981' : isCurrent ? '#3b82f6' : '#d1d5db'}
                  className={`hover-glow ${isCurrent ? 'animate-pulse-glow' : ''}`}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Icon */}
                <foreignObject x={node.x + 10} y={node.y - 10} width="20" height="20">
                  <Icon className="w-5 h-5 text-white" />
                </foreignObject>
                {/* Label */}
                <text
                  x={node.x + 20}
                  y={node.y + 40}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {node.title}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Expanded Details */}
      {expandedStep && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-gray-50 rounded-lg border"
        >
          {steps.find(step => step.id === expandedStep)?.description}
        </motion.div>
      )}

      {/* Mobile Fallback: Simple List for Small Screens */}
      <div className="md:hidden space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col gap-3 p-3 rounded-lg ${step.current ? 'bg-indigo-50' : 'bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : step.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                {step.completed ? <Flag className="w-4 h-4" /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${step.completed ? 'text-green-700' : step.current ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {step.title}
                </p>
              </div>
              {step.description && (
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="عرض التفاصيل"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
            </div>
            {step.description && expandedStep === step.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden text-xs text-gray-600 pr-11"
              >
                {step.description}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
