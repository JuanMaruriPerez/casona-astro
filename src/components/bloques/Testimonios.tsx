  import { useEffect, useState, useRef } from "react";
  import { ChevronLeft, ChevronRight, Star } from "lucide-react";

  type Review = {
      rating: number;
      text: string;
      author: string;
      date: string;
    };

  export default function Testimonios() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const trackRef = useRef(null);;




    // === Fetch de reseñas ===
    useEffect(() => {
      fetch("https://api.lacasonagroup.it/reviews")
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener reseñas:", err);
          setLoading(false);
        });
    }, []);

    // === Ajusta número de reseñas visibles según ancho ===
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) setVisibleCount(3);
        else if (window.innerWidth >= 768) setVisibleCount(2);
        else setVisibleCount(1);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // === Funciones para moverse manualmente ===
    const nextSlide = () => {
      setIndex((prev) =>
        prev >= reviews.length - visibleCount ? 0 : prev + 1
      );
    };

    const prevSlide = () => {
      setIndex((prev) =>
        prev === 0 ? reviews.length - visibleCount : prev - 1
      );
    };
    // === Autoslide cada 3 s ===
    useEffect(() => {
      startAutoSlide();
      return stopAutoSlide;
    }, [reviews]);

    const startAutoSlide = () => {
      stopAutoSlide();
      intervalRef.current = setInterval(() => {
        setIndex((prev) =>
          prev >= reviews.length - visibleCount ? 0 : prev + 1
        );
      }, 4500);
    };

    const stopAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    if (loading || reviews.length === 0) {
      return (
        <section
        className="bg-burdeaux py-24 px-6 md:px-16 lg:px-24 text-center relative group overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl mb-4 text-pastel text-center">
          Cosa dicono i nostri clienti
        </h2>

        {/* Separador */}
        <div className="h-[4px] w-32  mx-auto my-8 bg-amarillo"></div>

          <p className="text-white">Caricamento delle recensioni...</p>
        </section>
      );
    }

    // === Selecciona reseñas visibles ===
    const slidesToShow = reviews.slice(index, index + visibleCount);
    // Si llega al final, añade las que faltan desde el inicio
    if (slidesToShow.length < visibleCount) {
      slidesToShow.push(...reviews.slice(0, visibleCount - slidesToShow.length));
    }

    return (
      <section
        className="bg-burdeaux py-24 px-6 md:px-16 lg:px-24 text-center relative group overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl mb-4 text-pastel text-center">
          Cosa Dicono i Nostri Clienti
        </h2>

        {/* Separador */}
        <div className="h-[4px] w-32  mx-auto my-8 bg-amarillo"></div>

        {/* Viewport (oculta lo que se sale) */}
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(reviews.length * 100) / visibleCount}%`,
              transform: `translateX(-${index * (100 / reviews.length)}%)`,
            }}
          >
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 p-3 box-border"
                style={{ width: `${100 / reviews.length}%` }}
              >
                <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full min-h-[22rem]">
                  {/* Rating */}
                  <div className="flex items-center mb-3 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Texto */}
                  <p className="text-gray-700 italic mb-4 leading-relaxed flex-grow">
                    “{r.text}”
                  </p>

                  {/* Autor y fecha */}
                  <div className="mt-auto">
                    <p className="font-semibold text-gray-900">{r.author}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(r.date).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>




        {/* Botón IZQUIERDO */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md  "
          aria-label="Slide precedente"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Botón DERECHO */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md  "
          aria-label="Slide successivo"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </section>
    );
  }
