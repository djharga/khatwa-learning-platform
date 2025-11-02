import { motion } from '@/tokens';
export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

export const getMotionDuration = (speed: MotionDuration) =>
  parseFloat(motion.duration[speed]) / 1000;
export const getMotionEasing = (type: MotionEasing): string | number[] => {
  const v = motion.easing[type];
  if (v.startsWith('cubic-bezier')) {
    return v
      .substring(v.indexOf('(') + 1, v.indexOf(')'))
      .split(',')
      .map((n) => Number(n.trim()));
  }
  return v;
};
export const createTransition = (
  speed: MotionDuration = 'normal',
  ease: MotionEasing = 'easeInOut'
) => ({
  duration: getMotionDuration(speed),
  ease: getMotionEasing(ease),
});
