import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ContactForm({ onClose }) {
  const [step, setStep] = useState(0);
  const totalSteps = 7; // 6 pasos + final
  const [errors, setErrors] = useState({});
  

  // Todos los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    eventType: "",
    guests: "",
    services: [],
    message: "",
    email: "",
    phone: "",
  });


  // Botón siguiente con validación
  const next = () => {
    if (!validateStep(step)) return;
    setStep(step + 1);
  };

  // Verifica cada paso antes de avanzar
  const validateStep = (step) => {
    let ok = true;
    let newErrors = {name:"", eventType:"", guests:"", contact: ""};

    switch (step) {
      case 0:
        if (formData.name.trim() === "") {
          newErrors.name = "Il nome è obbligatorio.";
          ok = false;
        }
        break;

      case 1:
        if (formData.eventType === "") {
          newErrors.eventType = "Seleziona un tipo di evento.";
          ok = false;
        }
        break;

      case 2:
        if (formData.guests.trim() === "") {
          newErrors.guests = "Inserisci il numero approssimativo di ospiti.";
          ok = false;
        }
        break;

      case 6:
        if (
          formData.email.trim() === "" &&
          formData.phone.trim() === ""
        ) {
          newErrors.contact = "Inserisci almeno email o telefono.";
          ok = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return ok;
  };

  // Enviar los datos al backend
  const sendForm = async () => {
    if (!validateStep(6)) return;

    try {
      await fetch("https://api.lacasonagroup.it/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStep(6);
    } catch (err) {
      console.error("Error enviando formulario:", err);
      alert("Errore durante l’invio. Riprova più tardi.");
    }
  };

  return (
    <div className="fixed inset-0 z-[51] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      {/* Caja del formulario (80% en desktop, 90% en móvil) */}
      <div className="relative w-[90%] h-[80%] sm:w-[70%] sm:h-[80%] bg-white rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
        
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-burdeaux font-bold text-2xl hover:scale-110 transition"
          aria-label="Chiudi il modulo di contatto"
        >
         <X className="text-amarillo w-12 h-12"  strokeWidth={2} />
        </button>

        {/* Contenedor animado de pasos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-8 text-center"
          >
            {step === 0 && (
              <Step1 formData={formData} setFormData={setFormData} onNext={next} errors={errors}/>
            )}
            {step === 1 && (
              <Step2 formData={formData} setFormData={setFormData} onNext={next} onBack={() => setStep(0)} errors={errors}/>
            )}
            {step === 2 && (
              <Step3 formData={formData} setFormData={setFormData} onNext={next} onBack={() => setStep(1)} errors={errors}/>
            )}
            {step === 3 && (
              <Step4 formData={formData} setFormData={setFormData} onNext={next} onBack={() => setStep(2)} />
            )}
            {step === 4 && (
              <Step5 formData={formData} setFormData={setFormData} onNext={next} onBack={() => setStep(3)} />
            )}
            {step === 5 && (
              <Step6 formData={formData} setFormData={setFormData} onSend={sendForm} onBack={() => setStep(4)} errors={errors}/>
            )}
            {step === 6 && <StepFinal onClose={onClose} />}
          </motion.div>
        </AnimatePresence>

        {/* Indicador de progreso */}
        {step!=6 && <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {[...Array(totalSteps - 1)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i <= step ? "bg-amarillo" : "bg-gray-300"
              }`}
            />
          ))}
        </div>}
      </div>
    </div>
  );
}

/* ---------------- PASOS ---------------- */

function Step1({ formData, setFormData, onNext, errors }) {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Come ti chiami?
      </h2>
      <input
        type="text"
        placeholder="Nome e Cognome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
      />
      {errors.name && (
        <p className="text-red-600 text-sm mb-4">{errors.name}</p>
      )}
      <button
        onClick={onNext}
        className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
        aria-label="Avanti"
      >
        Avanti
      </button>
    </div>
  );
}

function Step2({ formData, setFormData, onNext, onBack, errors }) {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Che tipo di evento stai organizzando?
      </h2>
      <select 
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={formData.eventType}
        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}>
        <option value="" disabled hidden className="placeholder-option">
          Scegli...
        </option>
        <option>Matrimonio</option>
        <option>Evento aziendale</option>
        <option>Festa privata</option>
        <option>Altro</option>
      </select>
      {errors.eventType && (
        <p className="text-red-600 text-sm mb-4">{errors.eventType}</p>
      )}
      <div className="flex justify-between px-2">
        <button onClick={onBack} className="text-burdeaux font-normal" aria-label="Indietro">
          Indietro
        </button>
        <button
          onClick={onNext}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Avanti">
          Avanti
        </button>
      </div>
    </div>
  );
}

function Step3({ formData, setFormData, onNext, onBack, errors } ) {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Quanti invitati prevedi?
      </h2>
      <input
        type="number"
        placeholder="Numero di invitati"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
      />
      {errors.guests && (
        <p className="text-red-600 text-sm mb-4">{errors.guests}</p>
      )}
      <div className="flex justify-between px-2">
        <button onClick={onBack} className="text-burdeaux font-normal" aria-label="Indietro">
          Indietro
        </button>
        <button
          onClick={onNext}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Avanti"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

function Step4({ formData, setFormData, onNext, onBack }) {
  const toggleService = (service) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== service),
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      });
    }
  };
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Quali servizi ti interessano?
      </h2>
      <div className="flex flex-col gap-2 mb-4 text-left">
        {["Catering", "Allestimento", "Musica / DJ", "Fotografia", "Location"].map((srv) => (
          <label key={srv} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.services.includes(srv)}
              onChange={() => toggleService(srv)}
            />
            {srv}
          </label>
        ))}
      </div>
      <div className="flex justify-between px-2">
        <button onClick={onBack} className="text-burdeaux font-normal" aria-label="Indietro">
          Indietro
        </button>
        <button
          onClick={onNext}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Avanti"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}


function Step5({ formData, setFormData, onNext, onBack }) {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">Richiesta <span className="text-sm font-light text-burdeaux">(Opzionale)</span></h2>

      <textarea
        maxLength={512}
        className="w-full border rounded-lg p-3 mb-4 h-32"
        placeholder="Scrivi qui..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <div className="flex justify-between px-2">
        <button onClick={onBack} className="text-burdeaux font-normal" aria-label="Indietro">
          Indietro
        </button>
        <button
          onClick={onNext}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Avanti"
        >
          Avanti
        </button>
      </div>
     </div>
  );
}


function Step6({ formData, setFormData, onSend, onBack, errors }) {
  return (
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Come possiamo contattarti?
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Telefono"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      {errors.contact && (
        <p className="text-red-600 text-sm mb-4">{errors.contact}</p>
      )}
      <div className="flex justify-between px-2">
        <button onClick={onBack} className="text-burdeaux font-normal" aria-label="Indietro">
          Indietro
        </button>
        <button
          onClick={onSend}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Invia Formulario"
        >
          Invia
        </button>
      </div>
    </div>
  );
}



function StepFinal({ onClose }) {
  return (
    <div className="max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-burdeaux mb-6">
        Grazie! 🎉
      </h2>
      <p className="mb-8">
        Abbiamo ricevuto la tua richiesta. Ti contatteremo al più presto con un preventivo personalizzato.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="inline-block bg-amarilloPastel text-burdeaux text-xl font-semibold px-4 py-2 my-2 rounded-sm
          hover:scale-105 transition-all duration-300"
          aria-label="Chiudi il modulo di contatto"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}

