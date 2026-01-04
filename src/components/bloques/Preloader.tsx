import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("loadedOnce");

    if (alreadyLoaded) {
      setVisible(false);
      return;
    }

    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(300 - elapsed, 0);

      setTimeout(() => {
        sessionStorage.setItem("loadedOnce", "true");
        setVisible(false);
      }, remaining);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);

    return () => window.removeEventListener("load", hide);
  }, []);

  if (!visible) return null;

  

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-black z-[9999] transition-opacity duration-700">
      <img
        src="/assets/svg/CasonaGroupLogo.svg"
        alt="Casona Group Logo"
        className="h-24 w-auto mb-6"
      />
      <p className="text-3xl tracking-widest">
        Caricamento...
      </p>
    </div>
  );
}
