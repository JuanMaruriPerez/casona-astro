import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Prenota from "../bloques/Prenota";

export const RistoranteHeader = () => {

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [open, setOpen] = useState(false);
  
  return (
    <header className={cn("w-full px-3 sm:px-6 py-4 sm:py-8 fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur-md bg-pastel/70 "
          : "bg-transparent",
      )}> {/** border-b border-border/50 shadow-sm */ }

      <div className="flex justify-evenly items-center max-w-7xl mx-auto gap-4 sm:gap-8">
        
        {/** Logo Ristorante */}
        <div className="flex-1 flex justify-start items-center">
          <a href="/ristorante" className="flex" >
          <img
            src="assets/svg/LaCasonaRistorante.svg" // cambia la ruta por tu logo
            alt="Logo Ristorante - La Casona Tuttifritti"
            className="h-16 w-auto"
          />
        </a>
        </div>

        {/** Logo CasonaGroup */}
        <a href="/" className="flex flex-col items-center" >
          <div className="hidden [@media(min-width:850px)]:flex flex-1 flex justify-center items-center">
          
            <img
              src="assets/svg/LaCasonaGroup.svg" // cambia la ruta por tu logo
              alt="Logo La Casona Group"
              className="max-h-3 w-auto"
            />
          </div>
        </a>

        {/** CTAs */}
        <div className="flex-1 flex justify-end items-center">
          <div className="flex gap-x-1 md:w-[70%]">
            <div>
                        <button
                          onClick={() => setOpen(true)}
                          className="flex-1 text-center  border border-burdeaux bg-burdeaux px-5 py-2 
                              text-center text-xs sm:text-base md:text-lg lg:text-xl font-light text-white
                                    hover:bg-burdeaux hover:scale-105 transition-transform duration-200"
                          aria-label="Prenota un Tavolo">
                          Prenota
                        </button>
                      
                        {open && <Prenota onClose={() => setOpen(false)} />}
            </div>
            <a
              href="/ristorante/menu"
              className="text-center border border-2 border-burdeaux/60 px-5 py-2   
                text-xs sm:text-base md:text-lg lg:text-xl font-normal text-burdeaux
                hover:bg-burdeaux hover:scale-105 hover:text-white transition-transform duration-200"
              onClick={() => { setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);}}
            >
              Menù
            </a>
          </div>
        </div>

       

      </div>
    </header>
  );
};

