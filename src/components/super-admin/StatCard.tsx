import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  gradient: string;
  delay?: number;
}

export default function StatCard({ title, value, icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-zinc-900/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
