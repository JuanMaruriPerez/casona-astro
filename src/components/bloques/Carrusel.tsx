import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Asegúrate de tener lucide-react instalado

export default function Carrusel() {
  const images = [
    { src: "Carrusel/00.webp", alt: "Tavolo apparecchiato con fiori e mise en place elegante in una corte storica" },
    { src: "Carrusel/02.webp", alt: "Tagliere di formaggi con confetture artigianali e miele per buffet" },
    { src: "Carrusel/03.webp", alt: "Crostata artigianale con frutta e dolci di pasticceria per il dessert" },
    { src: "Carrusel/04.webp", alt: "Staff La Casona Group – squadra di servizio sorridente durante un evento" },
    { src: "Carrusel/05.webp", alt: "Allestimento all’aperto con tavoli in legno, fiori freschi e calici per evento estivo" },
    { src: "Carrusel/06.webp", alt: "Tagliere di formaggi assortiti con fiori e aceto balsamico" },
    { src: "Carrusel/07.webp", alt: "Tagliatelle al ragù servite in piatto fondo – cucina tradizionale bolognese" },
    { src: "Carrusel/01.webp", alt: "Sala storica con lampadari e mise en place per grande ricevimento o matrimonio" },
  ];
  
  const viewportRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

    const computeVisibleCount = () => {
    const w = window.innerWidth;
    if (w >= 1600) return 5;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640)  return 2;
    return 1;
  };

  // Recalcula visibleCount al montar y cuando cambie el tamaño real del contenedor/ventana
  useEffect(() => {
    const update = () => {
      const vc = computeVisibleCount();
      setVisibleCount(vc);
      setIndex(0); // re-coloca al inicio al cambiar columnas
    };

    update(); // una vez al montar

    // Resize de ventana
    window.addEventListener("resize", update);

    // Resize real del viewport (padding, barras, etc.)
    const ro = new ResizeObserver(update);
    if (viewportRef.current) ro.observe(viewportRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev >= images.length - visibleCount ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [images.length, visibleCount]);

  // Movimiento manual
  const next = () => setIndex(prev => (prev >= images.length - visibleCount ? 0 : prev + 1));
  const prev = () => setIndex(prev => (prev <= 0 ? images.length - visibleCount : prev - 1));

  // 🎯 Clave: trasladar en porcentaje de una tarjeta
  const stepPercent = 100 / visibleCount;
  const translate = `translateX(-${index * stepPercent}%)`;


  return (
    <section
      className="relative overflow-hidden py-[7%] group bg-burdeauxOscuro"
      ref={viewportRef}
    >
      {/* Pista */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: translate }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            // Cada tarjeta ocupa exactamente 1/N del viewport. Sin padding para no romper el cálculo:
            className="flex-shrink-0"
            style={{ width: `${100 / visibleCount}%` }}
          >
            <div className="relative w-full h-[45vh] md:h-[50vh] p-2 box-border">
              <img
                src={`assets/fotos/${img.src}`}
                alt={img.alt}
                className="h-full w-full object-cover shadow-md block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
        aria-label="Slide precedente"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
        aria-label="Slide successivo"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </section>
  );
}