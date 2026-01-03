import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export default function Hero() {

  const VIDEO_SRC = "/assets/video/catering_720p.webm";

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = scrolled / Math.max(total, 1);
      setProgress(Number.isFinite(p) ? (p) : 0);
    };
    const onScroll = () => requestAnimationFrame(handle);
    handle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  return (
    <section  ref={wrapRef} className="h-[100vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0" />

        
        {/* Video container */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          <div className="relative h-[100vh] w-[100vw] overflow-hidden shadow-2xl">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              aria-label="Video di presentazione degli eventi La Casona Group: allestimenti, catering in azione, staff al lavoro, location eleganti e 
              momenti autentici durante cerimonie e feste."
            />
          </div>

          {/** Overlay nergo */}
          <div className="absolute inset-0 bg-black/55 z-10"></div>

        </div>

        {/* Slogan */}
        <div className="absolute inset-0 flex items-center justify-center z-20 p-2 md:p-24">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] text-white" >
              Eventi a <span className="text-amarillo">360°</span>
            </h1>
            <p className="mt-4 text-white/90 drop-shadow
              font-regular text-md sm:text-xl md:text-2xl">
              Esperienza, cura totale e zero pensieri <strong className="text-amarillo">per te</strong>
            </p>
          </div>
        </div>

               
        {/* Ciudades en esquina inferior izquierda */}
        <div className="absolute bottom-28 sm:bottom-6 inset-x-0 flex justify-center px-4 sm:px-8 text-white z-20">
          <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-4 text-center">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 " />
            <span className="text-xs sm:text-sm md:text-md font-normal">
              Via Matteotti, 39/B | Sala Bolognese (BO)
            </span>
          </div>
        </div>


      </div>
    </section>
  );
}
