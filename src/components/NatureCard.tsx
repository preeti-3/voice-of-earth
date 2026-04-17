"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface NatureCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  gradient: string;
  selected: boolean;
  onClick: (id: string) => void;
}

export function NatureCard({ id, name, icon, gradient, selected, onClick }: NatureCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50",
        selected 
          ? "border-white/40 bg-white/10 scale-105 shadow-xl" 
          : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-105"
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 blur-xl -z-10 group-hover:opacity-30",
          gradient,
          selected && "opacity-40 blur-2xl group-hover:opacity-50"
        )} 
      />
      
      <div className={cn(
        "text-neutral-400 transition-colors duration-300",
        selected ? "text-white" : "group-hover:text-white"
      )}>
        {icon}
      </div>
      
      <span className={cn(
        "font-medium transition-colors duration-300",
        selected ? "text-white" : "text-neutral-400 group-hover:text-white"
      )}>
        {name}
      </span>
    </button>
  );
}
