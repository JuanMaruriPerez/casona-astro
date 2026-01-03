import { useState } from "react";
import ContactForm from "@/components/bloques/ContactForm";

export default function CTAActions2() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold
                   px-4 py-2 my-16 rounded-sm
                   hover:scale-110 transition-all duration-300"
        aria-label="Contattaci"
      >
        Contattaci
      </button>

      {open && <ContactForm onClose={() => setOpen(false)} />}
    </div>
  );
}