// C:\LF\luiz-felipe-portfolio\src\components\sections\Hero\TypingAnimation.tsx
'use client'; // <-- CORREÇÃO
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 100,
  delay = 0,
  cursor = true,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayedText(text.slice(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            if (onComplete) onComplete();
            return prevIndex;
          }
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className="inline-flex items-center">
      <span className="inline-block">
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={`${text}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      
      {cursor && (
        <AnimatePresence>
          <motion.span
            className="inline-block w-0.5 h-[1em] bg-current ml-1"
            animate={{
              opacity: isComplete ? [1, 0, 1] : 1,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </AnimatePresence>
      )}
    </span>
  );
};

export default TypingAnimation;