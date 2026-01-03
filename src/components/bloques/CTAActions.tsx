import Prenota from "@/components/bloques/Prenota"; 
import { useState } from "react"; 

export default function CTAActions() { 
    const [open, setOpen] = useState(false); 
    
    return ( 
    <div> 
      <button onClick={() => setOpen(true)} 
        className="flex-1 text-center border border-burdeaux bg-burdeaux px-5 py-2 text-xs sm:text-base md:text-lg lg:text-xl font-light text-white hover:scale-105 transition-transform duration-200" 
        aria-label="Prenota un Tavolo" > 
        
        Prenota 
      </button> {open && <Prenota onClose={() => setOpen(false)} />} 

      </div>
       ); 
    }