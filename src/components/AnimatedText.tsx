import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedCharProps {
  char: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  totalChars: number;
  index: number;
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, progress, start, end, totalChars, index }) => {
  const charProgress = index / (totalChars - 1);
  const charStart = Math.max(0, charProgress - 0.1);
  const charEnd = Math.min(1, charProgress + 0.05);
  const opacity = useTransform(progress, [charStart, charEnd], [0.2, 1]);

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
      }}
    >
      <span style={{ opacity: 0, userSelect: 'none', display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
          display: 'inline-block',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <p ref={ref} className={`relative block w-full max-w-full text-center break-words overflow-wrap-anywhere overflow-hidden ${className}`} style={style}>
      {characters.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={scrollYProgress}
          start={0} // start and end are not used in the char, we calculate inside
          end={0}
          totalChars={totalChars}
          index={i}
        />
      ))}
    </p>
  );
};

export default AnimatedText;
