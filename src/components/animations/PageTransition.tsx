import { motion } from "framer-motion";
const variants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <motion.div variants={variants} initial="initial" animate="animate" exit="exit">{children}</motion.div>;
}
