import { ArrowRight } from "lucide-react";
import type { FeatureSectionProps } from "../types";
import { motion } from "framer-motion";
const ClassicFeatureSection = ({
  title,
  description,
  icon,
  imageSrc,
  align,
}: FeatureSectionProps) => {
  const isLeft = align === "left";

  return (
    <div
      className={`flex flex-col ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-16`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center lg:text-left"
      >
        <div
          className={`inline-flex p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner ${
            !isLeft && "lg:ml-auto"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
          {description}
        </p>
        <div className={`pt-4 ${!isLeft ? "lg:flex lg:justify-end" : ""}`}>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 group"
          >
            Learn more{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="flex-1 relative"
      >
        <div className="relative z-10 rounded-xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl">
          <img
            src={imageSrc}
            alt={title}
            className="w-full rounded-lg border border-white/5 shadow-sm"
          />
        </div>

        <div
          className={`absolute top-1/2 ${
            isLeft ? "left-1/2" : "right-1/2"
          } -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-purple-600/20 blur-[100px] -z-10 rounded-full opacity-40`}
        ></div>
      </motion.div>
    </div>
  );
};

export default ClassicFeatureSection;
