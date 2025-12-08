// src/components/ContactUs/ContactUs.jsx
import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import logo from "../../assets/Endalleys-logo.png";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  // États du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    commentaire: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  // Initialisation EmailJS (clé publique)
  useEffect(() => {
    emailjs.init("YDScSbEFakXxek5Y-");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_x0m991u",
        "template_juy2umi",
        {
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          commentaire: formData.commentaire,
        }
      );

      setIsSent(true);
      setFormData({ nom: "", email: "", telephone: "", commentaire: "" });
      setTimeout(() => setIsSent(false), 8000);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Popup téléphone/WhatsApp
  const openPhonePopup = () => setShowPhoneOptions(true);
  const closePhonePopup = () => setShowPhoneOptions(false);

  const goToWhatsApp = () => {
    window.open("https://wa.me/212632254523", "_blank");
    closePhonePopup();
  };

 212632254523;
  const call = () => {
    window.location.href = "tel:+212632254523";
    closePhonePopup();
  };

  return (
    <section className="min-h-screen bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900">
            Contactez-nous
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Devis gratuit • Réponse sous 30 minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* === FORMULAIRE === */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {isSent && (
              <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 text-emerald-700">
                <CheckCircle size={48} />
                <div>
                  <p className="text-xl font-bold">Message envoyé !</p>
                  <p>Nous vous répondons très rapidement</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <input
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom complet"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
                required
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
                required
              />
              <input
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
                required
              />
              <textarea
                name="commentaire"
                rows={6}
                value={formData.commentaire}
                onChange={handleChange}
                placeholder="Votre message..."
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none text-lg resize-none"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-orange-900 border-2 border-orange-900 hover:text-white bg-white hover:bg-orange-900 disabled:opacity-70  font-bold text-xl py-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl"
              >
                {isLoading ? "Envoi en cours..." : (
                  <>
                    Envoyer <Send size={28} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* === COORDONNÉES === */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900">
              On reste connectés
            </h2>

            <div className="space-y-10">
              {/* Téléphone & WhatsApp */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Téléphone & WhatsApp</p>
                  <button
                    onClick={openPhonePopup}
                    className="text-2xl font-bold text-orange-800 hover:text-orange-700 underline mt-1"
                  >
                    +212 6 32 25 45 23
                  </button>
                  <p className="text-gray-600 mt-1">Réponse sous 30 minutes</p>
                </div>
              </div>

              {/* E-mail */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">E-mail</p>
                  <a
                    href="mailto:endalleyss@gmail.com"
                    className="text-xl font-medium text-gray-800 hover:text-black transition"
                  >
                    endalleyss@gmail.com
                  </a>
                </div>
              </div>

              {/* Livraison */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Livraison partout au Maroc
                  </p>
                  <p className="text-gray-600">
                    Casablanca • Rabat • Marrakech • Tanger • Fès • Agadir...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === POPUP TÉLÉPHONE / WHATSAPP === */}
      {showPhoneOptions && (
        <div
  className="fixed inset-0 bg-white backdrop-blur-md flex items-start justify-center z-50 p-6 pt-20"
  onClick={closePhonePopup}
>

          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du popup */}
            <div className="  p-10 text-center relative">
              <button
                onClick={closePhonePopup}
                className="absolute top-4 right-4 text-white hover:bg-white rounded-full p-2 transition"
              >
                <X size={24} />
              </button>
              <img
                src={logo}
                alt="Endalleys"
                className="h-20 mx-auto object-contain "
              />
              <h3 className="text-2xl font-bold text-black mt-4">
                Nous contacter
              </h3>
              {/* ⭐ LIGNE AJOUTÉE ICI (BOLD) */}
              <div className="w-full h-1 bg-orange-900 my-4 rounded shadow-sm" />

            </div>

            {/* Boutons */}
            <div className="p-1 space-y-5">
              <button
                onClick={goToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 rounded-2xl flex items-center justify-center gap-4 transition hover:scale-105 shadow-lg"
              >
                <MessageCircle size={28} /> WhatsApp
              </button>

              <button
                onClick={call}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold text-xl py-6 rounded-2xl flex items-center justify-center gap-4 transition hover:scale-105 shadow-lg"
              >
                <Phone size={28} /> Appeler
              </button>
            </div>

            {/* Pied du popup */}
            <div className="bg-gray-50 px-8 py-6 text-center">
              <p className="font-medium text-gray-700">
                +212 6 32 25 45 23
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}