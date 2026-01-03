import { useEffect } from "react";

declare global {
  interface Window {
    wpShowReviews?: (id: number, color: string) => void;
  }
}

export default function TestimoniosWidget() {
  useEffect(() => {
    // Evitar cargar dos veces
    if (document.getElementById("wp-widget-script")) return;

    const script = document.createElement("script");
    script.id = "wp-widget-script";
    script.src =
      "https://cdn1.matrimonio.com/js/wp-widget.js?symfnw-IT73-1-20251027-013_www_m_";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      window.wpShowReviews?.(151661, "white");
    };

    return () => {
      const widget = document.getElementById("wp-widget-reviews");
      if (widget) widget.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="wp-widget-reviews"
      className="mt-8 flex justify-center bg-white"
    >
      <div id="wp-widget-preview" style={{ fontSize: "0.95rem", color: "#555" }}>
        Leggi{" "}
        <a
          href="https://www.matrimonio.com/catering-matrimoni/la-casona-eventi--e151661/opinioni"
          rel="nofollow"
        >
          le nostre recensioni
        </a>{" "}
        a{" "}
        <a href="https://www.matrimonio.com" rel="nofollow">
          <img
            src="https://cdn1.matrimonio.com/assets/img/logos/gen_logoHeader.svg"
            height={20}
            alt="Matrimonio.com"
          />
        </a>
      </div>
    </div>
  );
}
