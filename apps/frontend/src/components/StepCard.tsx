import { motion } from "framer-motion";
import { fadeInUp } from "../utils";
const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
  >
    <div className="text-6xl font-extrabold text-slate-800 absolute -top-4 -left-2 select-none z-0 opacity-50">
      {number}
    </div>
    <div className="w-12 h-12 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-xl flex items-center justify-center text-xl font-bold mb-6 relative z-10">
      {number}
    </div>
    <h4 className="text-xl font-bold text-white mb-4 relative z-10">{title}</h4>
    <p className="text-slate-400 leading-relaxed relative z-10">
      {description}
    </p>
  </motion.div>
);

export default StepCard;
