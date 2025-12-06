// src/components/ContactUs/ContactUs.jsx
import React, { useState } from "react";
import { Send, CheckCircle, Phone, Mail, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    commentaire: "",
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.telephone.trim()) newErrors.telephone = "Téléphone requis";
    else if (!/^0[5-7]\d{8}$/.test(formData.telephone.replace(/\s/g, "")))
      newErrors.telephone = "Numéro invalide (ex: 0612345678)";
    if (!formData.commentaire.trim()) newErrors.commentaire = "Message requis";
    else if (formData.commentaire.length < 15) newErrors.commentaire = "Minimum 15 caractères";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const phone = "212615286898";
    const text = encodeURIComponent(
      `*Nouvelle demande de contact - Endalleys*\n\n` +
      `• *Nom* : ${formData.nom}\n` +
      `• *Email* : ${formData.email}\n` +
      `• *Téléphone* : ${formData.telephone}\n\n` +
      `*Message* :\n${formData.commentaire}`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

    setIsSent(true);
    setTimeout(() => setIsSent(false), 7000);
    setFormData({ nom: "", email: "", telephone: "", commentaire: "" });
    setErrors({});
  };

  return (
    <section className="min-h-screen bg-gray-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
            Contactez-nous
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Besoin d’un bijou sur mesure ? Une question sur une commande ? 
            Notre équipe vous répond dans l’heure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Formulaire */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            {isSent && (
              <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 text-emerald-700">
                <CheckCircle size={48} className="flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold">Message envoyé avec succès !</p>
                  <p className="text-emerald-600">Nous vous répondons très rapidement sur WhatsApp</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Mohammed Ahmed"
                  className={`w-full px-5 py-4 rounded-xl border ${
                    errors.nom ? "border-red-500" : "border-gray-300"
                  } focus:border-black focus:outline-none transition text-gray-900 placeholder:text-gray-400 text-lg font-medium`}
                />
                {errors.nom && <p className="text-red-500 text-sm mt-2">{errors.nom}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Adresse e-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mohammed@example.com"
                  className={`w-full px-5 py-4 rounded-xl border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-black focus:outline-none transition text-gray-900 placeholder:text-gray-400 text-lg font-medium`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="06 xx xx xx xx"
                  className={`w-full px-5 py-4 rounded-xl border ${
                    errors.telephone ? "border-red-500" : "border-gray-300"
                  } focus:border-black focus:outline-none transition text-gray-900 placeholder:text-gray-400 text-lg font-medium`}
                />
                {errors.telephone && <p className="text-red-500 text-sm mt-2">{errors.telephone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Votre message</label>
                <textarea
                  name="commentaire"
                  rows={6}
                  value={formData.commentaire}
                  onChange={handleChange}
                  placeholder="Décrivez-nous votre projet ou posez votre question..."
                  className={`w-full px-5 py-4 rounded-xl border ${
                    errors.commentaire ? "border-red-500" : "border-gray-300"
                  } focus:border-black focus:outline-none transition text-gray-900 placeholder:text-gray-400 text-lg font-medium resize-none`}
                />
                {errors.commentaire && <p className="text-red-500 text-sm mt-2">{errors.commentaire}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-bold text-xl py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
              >
                <Send size={28} />
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">On reste connectés</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Téléphone & WhatsApp</p>
                    <a href="https://wa.me/212615286898" target="_blank" rel="noopener noreferrer"
                       className="text-2xl font-bold text-green-600 hover:text-green-700 transition mt-1 inline-block">
                      +212 6 15 28 68 98
                    </a>
                    <p className="text-gray-600 mt-1">Réponse garantie sous 30 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">E-mail</p>
                    <a href="mailto:contact@endalleys.com" className="text-xl font-medium text-gray-800 hover:text-black transition">
                      contact@endalleys.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Livraison partout au Maroc</p>
                    <p className="text-gray-600">Casablanca • Rabat • Marrakech • Tanger • Fès • Agadir...</p>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}