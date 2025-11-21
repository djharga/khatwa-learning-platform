'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';

interface CountUpProps {
  end: number | string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * CountUp Component with Intersection Observer
 * عداد متحرك يبدأ عند ظهور العنصر
 */
export const CountUpComponent = ({
  end,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Parse end value
  const parseEndValue = (value: number | string): number => {
    if (typeof value === 'number') return value;
    
    // Remove commas and parse
    const cleaned = value.toString().replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const endValue = parseEndValue(end);
  const hasDecimal = endValue % 1 !== 0 || decimals > 0;

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <CountUp
          start={0}
          end={endValue}
          duration={duration}
          decimals={hasDecimal ? decimals : 0}
          separator=","
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
};

