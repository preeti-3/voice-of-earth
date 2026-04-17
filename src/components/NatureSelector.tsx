"use client";

import { motion } from "framer-motion";
import { TreePine, Waves, Wind, Mountain, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

export const NATURE_ELEMENTS = [
  { id: "Tree", name: "Forest", icon: <TreePine className="w-8 h-8 md:w-10 md:h-10" /> },
  { id: "River", name: "River", icon: <Waves className="w-8 h-8 md:w-10 md:h-10" /> },
  { id: "Air", name: "Sky", icon: <Wind className="w-8 h-8 md:w-10 md:h-10" /> },
  { id: "Ocean", name: "Ocean", icon: <Droplets className="w-8 h-8 md:w-10 md:h-10" /> },
  { id: "Mountain", name: "Mountain", icon: <Mountain className="w-8 h-8 md:w-10 md:h-10" /> },
];

interface NatureSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function NatureSelector({ selectedId, onSelect }: NatureSelectorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-5xl mx-auto"
    >
      {NATURE_ELEMENTS.map((el) => {
        const isSelected = selectedId === el.id;
        return (
          <motion.button
            key={el.id}
            onClick={() => onSelect(el.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border transition-all duration-500 overflow-hidden group",
              isSelected 
                ? "border-white/50 bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-xl" 
                : "border-white/10 bg-black/20 backdrop-blur-md hover:bg-white/10 hover:border-white/30"
            )}
          >
            <motion.div 
              initial={false}
              animate={{ color: isSelected ? "#fff" : "#a3a3a3" }}
              className="mb-4 drop-shadow-md"
            >
              {el.icon}
            </motion.div>
            <motion.span 
              initial={false}
              animate={{ color: isSelected ? "#fff" : "#a3a3a3" }}
              className="text-base md:text-lg font-medium tracking-wide"
            >
              {el.name}
            </motion.span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
