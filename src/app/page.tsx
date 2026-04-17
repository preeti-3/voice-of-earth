import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center font-sans selection:bg-white/30">
      {/* Cinematic Full-Screen Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/bg/hero.png" 
          alt="Mystical Nature Background" 
          fill 
          priority 
          quality={100}
          className="object-cover animate-[ping_60s_linear_infinite]"
          style={{ animation: 'zoomInOut 60s infinite alternate ease-in-out' }}
        />
      </div>
      {/* Dark overlay for readability and dramatic effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" /> */}

      {/* Custom Keyframe for smooth scale zooming */}
      <style>{`
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-6 w-full max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          What if nature could <br className="hidden md:block"/> speak to you?
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-neutral-300 font-light tracking-wide drop-shadow-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 ease-out">
          You've been talking. It's time to listen.
        </p>
        <div className="pt-12 animate-in fade-in zoom-in-95 duration-1000 delay-700 ease-out">
          <Link
            href="/listen"
            className="group relative px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-lg md:text-xl tracking-wide transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-3"
          >
            Start Listening
            <span className="block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
