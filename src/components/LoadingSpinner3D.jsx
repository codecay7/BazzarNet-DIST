import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner3D = () => {
  const squareVariants = {
    initial: {
      opacity: 0,
      rotateY: 90,
      scale: 0.5,
    },
    animate: (i) => ({
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
    exit: (i) => ({
      opacity: 0,
      rotateY: -90,
      scale: 0.5,
      transition: {
        delay: i * 0.05, // Stagger exit
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  const rotationVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[var(--bg-body)] z-[2000]"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        variants={rotationVariants}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-lg border-2 border-[var(--accent)]"
            style={{
              transformOrigin: 'center center',
              backgroundColor: `rgba(var(--accent-rgb), ${0.1 + i * 0.05})`,
            }}
            variants={squareVariants}
            custom={i}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner3D;