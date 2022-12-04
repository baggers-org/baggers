import { AnimatePresence, motion } from 'framer-motion';
import { TableRowProps } from './table.props';

export function TableRow(props: TableRowProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.1,
        }}
        exit={{
          opacity: 0,
        }}
        {...(props as any)}
      />
    </AnimatePresence>
  );
}
