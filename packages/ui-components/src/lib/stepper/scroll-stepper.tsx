import { useScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import { tlsx } from '../../util/clsx';
import { ScrollStepperProps } from './scroll-stepper.props';

export function ScrollStepper({ steps }: ScrollStepperProps) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <span className="flex">
          {index !== steps.length - 1 ? (
            <motion.div
              className="bg-primary-light dark:bg-primary-dark w-2 h-full"
              style={{
                scaleY: scrollYProgress,
                transformOrigin: '0 0',
              }}
            />
          ) : null}
        </span>
      ))}
    </div>
  );
}
