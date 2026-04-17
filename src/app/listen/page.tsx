"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NatureSelector, NATURE_ELEMENTS } from "@/components/NatureSelector";
import { InputForm } from "@/components/InputForm";
import { ResponseCard } from "@/components/ResponseCard";

export default function ListenPage() {
  const [step, setStep] = useState<"select" | "input" | "response">("select");
  const [selectedElement, setSelectedElement] = useState<string>("Tree");
  const [city, setCity] = useState("London");
  const [message, setMessage] = useState("I am sorry for taking you for granted.");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(null);

  const getBackground = () => `/bg/${selectedElement}.png`;

  const handleSubmit = async () => {
    if (!city.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          element: selectedElement,
          city: city.trim(),
          message: message.trim(),
          tone: "Hopeful Future"
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setGeneratedResponse(data.response);
      setStep("response");
    } catch (err: any) {
      console.error(err);
      alert("Failed to hear response: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedResponse(null);
    setCity("");
    setMessage("");
    setStep("select");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black flex flex-col font-sans text-white">
      {/* Dynamic Animated Background Container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
         <AnimatePresence>
            <motion.div
              // key is required so AnimatePresence knows when the image changes
              key={selectedElement}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={getBackground()} 
                alt="Nature Background" 
                fill 
                priority
                quality={100}
                className="object-cover opacity-70"
              />
            </motion.div>
         </AnimatePresence>
         {/* Heavy Gradient Overlay for UX readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 py-20">
        <AnimatePresence mode="wait">
          
          {step === "select" && (
            <motion.div 
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-2xl">
                  Choose your connection
                </h2>
                <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
                  Who do you want to speak with?
                </p>
              </div>
              <NatureSelector 
                selectedId={selectedElement} 
                onSelect={(id) => {
                  setSelectedElement(id);
                  // Brief pause to appreciate the smooth background fade before advancing
                  setTimeout(() => setStep("input"), 700);
                }} 
              />
            </motion.div>
          )}

          {step === "input" && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-10 space-y-4">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter shadow-black drop-shadow-lg">
                   The {NATURE_ELEMENTS.find(e => e.id === selectedElement)?.name} is listening
                 </h2>
                 <button 
                  onClick={() => setStep("select")} 
                  className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold border-b border-transparent hover:border-white pb-1"
                 >
                    ← Change Element
                 </button>
              </div>
              <InputForm 
                city={city}
                setCity={setCity}
                message={message}
                setMessage={setMessage}
                elementName={NATURE_ELEMENTS.find(e => e.id === selectedElement)?.name}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {step === "response" && generatedResponse && (
            <motion.div 
              key="response"
              initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full"
            >
              <ResponseCard 
                element={selectedElement}
                city={city}
                response={generatedResponse}
                onReset={handleReset}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
