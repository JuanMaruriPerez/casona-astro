import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) return;

    const showBanner = () => {
      setTimeout(() => {
        setVisible(true);
      }, 1200);
      
    };

           
   

    // ⬇️ MISMA lógica que el Preloader
    if (document.readyState === "complete") {
      showBanner();
    } else {
      window.addEventListener("load", showBanner);
    }

    return () => {
      window.removeEventListener("load", showBanner);
    };
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    window.location.reload(); // activa Clarity
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  

  return (
    <div className="fixed bottom-0 right-0 w-full  bg-white shadow-lg border-t border-gray-300 p-4 z-[9999] ">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-gray-700 text-sm sm:text-base">
          Questo sito utilizza i cookie. Accetti l'utilizzo dei cookie analitici e di terze parti per finalità di marketing e analisi?
        </p>

        <div className="flex gap-2">
          <button
            onClick={reject}
            className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
            aria-label="Rifiuta i cookie analitici"
          >
            Rifiuta
          </button>

          <button
            onClick={accept}
            className="px-4 py-2 bg-burdeaux text-white rounded hover:bg-burdeaux/80"
            aria-label="Accetta i cookie analitici"
          >
            Accetta
          </button>
        </div>

      </div>
    </div>
  );
}
