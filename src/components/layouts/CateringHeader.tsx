import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ContactForm from "@/components/bloques/ContactForm"; // ✅ importa el overlay

const navigation = [
  { label: "Home", to: "/eventi" },
  { label: "Servizi", to: "/eventi/servizi" },
  { label: "Portfolio", to: "/eventi/portfolio" },
  { label: "Partners", to: "/eventi/partners" },
  { label: "Contattaci", to: "#" }, // ya no usamos ruta real
];

export const CateringHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false); // ✅ controla el overlay
  const [isEventiPage, setIsEventiPage] = useState(true);


  //const navigate = useNavigate();
  //const location = useLocation(); 

  // efecto scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsEventiPage(/^\/eventi\/?$/.test(window.location.pathname));
  }, []);

  // 👇 Condición: si no estoy en /eventi, forzamos scrolled=true

  const showScrolledStyle = !isEventiPage || scrolled;

  return (
    <>
      {/* ✅ Overlay de contacto (renderizado sobre todo) */}
      {openContact && <ContactForm onClose={() => setOpenContact(false)} />}

      <header
        className={cn(
          "w-full px-6 py-4 fixed inset-x-0 top-0 z-[50] transition-all",
          showScrolledStyle 
            ? "backdrop-blur-md bg-amarilloPastel/40"
            : "bg-transparent"
        )}
      >
        <div className="flex max-w-[1300px] [@media(min-width:1300px)]:max-w-[90%] ">
          {/* --- Logo izquierdo --- */}
          <div className="lg:pl-[10%] justify-start items-center flex-1 flex">
            <a href="/eventi" className="flex items-center">
              <img
                src="/assets/svg/LaCasonaCatering.svg"
                alt="Logo La Casona Catering"
                className="p-2 sm p-0 h-18 sm:h-24 w-auto"
              />
            </a>
          </div>

          {/* --- Logo central --- */}
          <div className="hidden md:flex ml-[1%] justify-evenly items-center flex-1">
            <a href="/" className="flex flex-col items-center"
            >
              <img
                src="/assets/svg/LaCasonaGroup.svg"
                alt="Logo La Casona Group"
                className="max-h-3 w-auto"
              />
            </a>
          </div>

          {/* --- Botón hamburguesa --- */}
          <div className="flex justify-end items-center flex-1">
            <button
              className="text-burdeaux focus:outline-none z-[60]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              {menuOpen ? "" : <Menu className="hover:text-amarillo" size={48} strokeWidth={2.5}/>}
            </button>
          </div>
        </div>

        {/* --- Menú lateral hamburguesa --- */}
        {menuOpen && (
          <div
            className={cn(
              "fixed top-0 right-0 h-screen w-[100%] sm:w-[35%] xl:w-[25%] bg-black/80 backdrop-blur-sm",
              "flex flex-col items-center justify-center sm:items-start sm:justify-start px-6 lg:px-10 py-1 shadow-lg z-[70]",
              "animate-fade-in transition-all duration-200"
            )}
          >
            {/* --- Botón cierre (X) --- */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute py-8 px-8 top-0 right-0  transition-colors focus:outline-none"
              aria-label="Close Menu"
            >
              <X className="w-12 h-12 text-amarillo hover:scale-110 transition-all duration-300" strokeWidth={2} />
            </button>

            {/* --- Enlaces --- */}
            <nav className="mt-[-30%] sm:mt-8 flex flex-col sm:items-start gap-10 sm:gap-4">
              {navigation.map((item) =>
                item.label === "Contattaci" ? (
                  // ✅ Botón especial que abre el formulario
                  <button
                    key={item.label}
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => setOpenContact(true), 75);
                    }}
                    className="inline-block bg-amarilloPastel text-burdeaux font-semibold text-4xl sm:text-lg lg:text-xl px-6 py-3 sm:px-4 sm:py-2 rounded-sm hover:scale-105 transition-all duration-300"
                    aria-label="Contattaci"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => { setMenuOpen(false) ; setTimeout(() => window.scrollTo(0, 0))}} 
                    className={cn(
                      "text-center text-4xl sm:text-lg lg:text-xl font-normal text-white hover:text-amarillo transition-colors"
                    )}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
