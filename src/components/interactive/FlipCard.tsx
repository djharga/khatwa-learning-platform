import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline'; // Assuming Heroicons for icons
// TODO: Replace Heroicons with lucide-react ChevronRight for consistency

/**
 * Props for FlipCard component with front/back content and flip trigger
 */
interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  trigger?: 'click' | 'hover';
  className?: string;
}

/**
 * 3D flip card component with front and back faces. Supports click or hover trigger for flipping. Features smooth rotation animation and customizable content on both sides.
 */
const FlipCard: React.FC<FlipCardProps> = ({
  frontContent,
  backContent,
  trigger = 'click',
  className = '',
}) => {
  // Tracks whether card is currently flipped to back face
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * Handles card flip on click when trigger is set to 'click'
   */
  const handleFlip = () => {
    if (trigger === 'click') {
      setIsFlipped(!isFlipped);
    }
  };

  /**
   * Flips card to back face on mouse enter when trigger is set to 'hover'
   */
  const handleHoverStart = () => {
    if (trigger === 'hover') {
      setIsFlipped(true);
    }
  };

  /**
   * Flips card back to front face on mouse leave when trigger is set to 'hover'
   */
  const handleHoverEnd = () => {
    if (trigger === 'hover') {
      setIsFlipped(false);
    }
  };

  // Framer Motion variants for 3D flip animation (0deg front, 180deg back)
  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div
      className={`relative w-full h-64 perspective-1000 ${className}`}
      onClick={handleFlip}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
        initial="front"
        animate={isFlipped ? 'back' : 'front'}
        variants={flipVariants}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front face of card with content and flip indicator icon */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex-1">{frontContent}</div>
          <div className="flex justify-end">
            <motion.div
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
              animate={{ rotate: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Back face of card with gradient background and rotated 180deg */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 flex flex-col justify-between text-white transform rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1">{backContent}</div>
          <div className="flex justify-start">
            <motion.div
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              animate={{ rotate: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRightIcon className="w-4 h-4 transform rotate-180" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
