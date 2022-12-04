import { motion } from 'framer-motion';
export function NabvarProgress() {
  return (
    <svg className="w-full absolute h-1 z-50 -left-1 bottom-0">
      <motion.line
        style={{
          stroke: 'rgb(154,106,255)',
          strokeWidth: '100%',
        }}
        initial={{
          x1: '0',
          y1: '0',
          x2: '0',
          y2: '0',
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1,
        }}
        animate={{
          x1: ['0', '0', '100%'],
          y1: '0',
          x2: ['0', '100%', '100%'],
          y2: '0',
        }}
      />
      <motion.line
        style={{
          stroke: 'rgba(154,106,255,0.3)',
          strokeWidth: '100%',
        }}
        initial={{
          x1: '0',
          y1: '0',
          x2: '100%',
          y2: '0',
        }}
      />
    </svg>
  );
}
