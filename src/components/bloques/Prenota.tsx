import { createPortal } from "react-dom";
import { X, MapPin, Mail, Phone } from "lucide-react";

type PrenotaProps = {
  onClose: () => void;
};

export default function Prenota({ onClose }) {
  const modalRoot = document.getElementById("modal-root");

  // ✅ Guard clause: si no existe el root, no renderizamos nada
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <div className="relative w-[70%] h-[65%] max-h-[400px] sm:w-[55%] sm:h-[45%]
        bg-white rounded-lg shadow-2xl overflow-y-auto p-6 
        bg-0 bg-contain bg-no-repeat bg-[url('/assets/fotos/linguini.webp')]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-burdeaux hover:scale-110 transition"
          aria-label="Chiudi Prenotazione"
        >
          <X className="text-burdeaux w-10 h-10" strokeWidth={2} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold text-burdeaux mb-6 text-center pt-8">
          Prenota un Tavolo
        </h2>

        <div className="flex flex-row justify-center max-h-[60%] gap-6 md:gap-12">
          <div className="flex flex-col w-full items-center h-full gap-4 sm:gap-8 text-gray-700 py-4">
            
            <a href="https://maps.app.goo.gl/yVT6gUK1UKf9tL8c9"
              target="_blank"
              className="flex items-center gap-2 hover:text-burdeaux transition"
            >
              <MapPin className="min-w-5 min-h-5" />
              <span>Via Bologna 114/B — San Giovanni in Persiceto (BO)</span>
            </a>

            <a href="mailto:sede@lacasonagroup.it"
              className="flex items-center gap-2 hover:text-burdeaux transition"
            >
              <Mail className="min-w-5 h-5" />
              <span>sede@lacasonagroup.it</span>
            </a>

            <a href="tel:+390516871713"
              className="flex items-center gap-2 hover:text-burdeaux transition"
            >
              <Phone className="min-w-5 h-5" />
              <span>+39 051 6871713</span>
            </a>

          </div>
        </div>

      </div>
    </div>,
    modalRoot
  );
}
