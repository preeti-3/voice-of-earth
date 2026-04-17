"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

interface ResponseCardProps {
  element: string;
  city: string;
  response: string;
  onReset: () => void;
}

export function ResponseCard({ element, city, response, onReset }: ResponseCardProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const isComplete = displayedText.length >= response.length;
  
  // Typewriter effect using substring to prevent strict mode duplication bugs
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText(response.substring(0, i + 1));
      i++;
      if (i > response.length) {
        clearInterval(interval);
      }
    }, 40); // Slightly slower cinematic typing

    return () => clearInterval(interval);
  }, [response]);

  // Clean up Audio when component dies
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(response);
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes("en") && (v.name.includes("Natural") || v.name.includes("Google")));
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.rate = 0.85; 
      utterance.pitch = 0.7; // Lower pitch for an earthier, cinematic voice

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]"
    >
      <div className="text-center space-y-12">
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 tracking-widest uppercase text-sm font-semibold"
        >
          The {element} of {city} speaks
        </motion.p>
        
        <div className="text-2xl md:text-4xl lg:text-5xl text-white/90 leading-snug font-serif tracking-wide drop-shadow-lg max-w-3xl mx-auto text-center" style={{ textWrap: "balance" }}>
          "{displayedText}"
          {!isComplete && (
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-8 md:h-12 ml-2 bg-white/70 align-middle shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
            />
          )}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center gap-6 pt-12"
            >
              <button
                onClick={toggleSpeech}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors shadow-xl"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? "Pause Voice" : "Play Voice"}
              </button>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/10 transition-colors shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Generate Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
