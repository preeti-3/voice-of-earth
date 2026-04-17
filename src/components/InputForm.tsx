"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface InputFormProps {
  city: string;
  setCity: (c: string) => void;
  message: string;
  setMessage: (m: string) => void;
  elementName: string | undefined;
  onSubmit: () => void;
  isLoading: boolean;
}

export function InputForm({ city, setCity, message, setMessage, elementName, onSubmit, isLoading }: InputFormProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-3xl mx-auto backdrop-blur-2xl bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 space-y-8 md:space-y-10">
        <div className="space-y-4">
          <label className="text-white/90 text-lg md:text-xl tracking-wide font-light">Where are you currently?</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="E.g., London, Kyoto, New York..."
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-xl"
          />
        </div>

        <div className="space-y-4">
          <label className="text-white/90 text-lg md:text-xl tracking-wide font-light">What do you want to whisper to the {elementName?.toLowerCase()}?</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="(Optional) A thought, an apology, a wish..."
            disabled={isLoading}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-xl resize-none"
          />
        </div>

        <div className="pt-4">
            <motion.button
            whileHover={{ scale: city.trim() && !isLoading ? 1.03 : 1 }}
            whileTap={{ scale: city.trim() && !isLoading ? 0.97 : 1 }}
            onClick={onSubmit}
            disabled={!city.trim() || isLoading}
            className="w-full relative overflow-hidden group bg-white/90 text-black font-semibold tracking-wide py-5 rounded-2xl disabled:opacity-50 transition-all duration-300 flex justify-center items-center gap-3 text-xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
            {isLoading ? (
                <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Listening...
                </>
            ) : (
                "Hear the Response"
            )}
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
