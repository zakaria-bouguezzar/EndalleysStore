// src/components/ProductDetail/ProductDetail.jsx (Updated with scroll to top on load)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag, MessageCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext"; // New import for cart
// === IMAGES (unchanged) ===
import grillz1 from "../../assets/products/Grillz-miami1.png";
import grillz2 from "../../assets/products/Grillz-miami2.png";
import grillz3 from "../../assets/products/Grillz-miami3.png";
import grillz4 from "../../assets/products/Grillz-miami4.png";
import aphex1 from "../../assets/products/Aphex-twin-necklace1.png";
import aphex2 from "../../assets/products/Aphex-twin-necklace2.png";
import aphex3 from "../../assets/products/Aphex-twin-necklace3.png";
import aphex4 from "../../assets/products/Aphex-twin-necklace4.png";
import mfdoom1 from "../../assets/products/Mf-doom-ring1.png";
import mfdoom2 from "../../assets/products/Mf-doom-ring2.png";
import mfdoom3 from "../../assets/products/Mf-doom-ring3.png";
import mfdoom4 from "../../assets/products/Mf-doom-ring4.png";
import mfdoom5 from "../../assets/products/Mf-doom-ring5.png";
import armure1 from "../../assets/products/armure-ring1.png";
import armure2 from "../../assets/products/armure-ring2.png";
import armure3 from "../../assets/products/armure-ring3.png";
import armure4 from "../../assets/products/armure-ring4.png";
import silver1 from "../../assets/products/silver-grills-set1.png";
import silver2 from "../../assets/products/silver-grills-set2.png";
import silver3 from "../../assets/products/silver-grills-set3.png";
import DoubleHollowHeart1 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz1.png";
import DoubleHollowHeart2 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz2.png";
import DoubleHollowHeart3 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz3.png";
import DoubleHollowHeart4 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz4.png";

const productDatabase = [
  { id: 1, name: "Grillz Miami", price: "70 DH", images: [grillz1, grillz2, grillz3, grillz4] },
  { id: 2, name: "Aphex Twin Necklace", price: "100 DH", images: [aphex1, aphex2, aphex3, aphex4] },
  { id: 3, name: "MF DOOM Ring", price: "70 DH", images: [mfdoom1, mfdoom2, mfdoom3, mfdoom4, mfdoom5] },
  { id: 4, name: "Armure Ring", price: "100 DH", images: [armure1, armure2, armure3, armure4] },
  { id: 5, name: "Silver Grills Set", price: "200 DH", images: [silver1, silver2, silver3] },
  { id: 6, name: "Double Hollow Heart Star Teeth Grillz", price: "70 DH", images: [DoubleHollowHeart1, DoubleHollowHeart2, DoubleHollowHeart3, DoubleHollowHeart4] },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // New hook for cart
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showToast, setShowToast] = useState(false); // New state for toast
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const product = productDatabase.find((p) => p.id === parseInt(id));

  // Scroll to top on component mount (new)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!product) navigate("/404");
  }, [product, navigate]);

  if (!product) return null;

  // Calculate prices
  const currentPriceNum = parseInt(product.price.replace(" DH", ""));
  const oldPriceNum = currentPriceNum + 20;
  const totalPrice = currentPriceNum * quantity;
  const oldTotalPrice = oldPriceNum * quantity;

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pass quantity to cart
    setShowToast(true); // Show toast instead of alert
  };

  const handleBack = () => {
    navigate(-1); // Navigate back in history
  };

  // New function: Handle WhatsApp order
  const handleWhatsAppOrder = () => {
    const phoneNumber = '212615286898'; // Your WhatsApp number

    // Construct receipt-like message for single product
    let message = `🛒 *Commande - Endalleys*\n\n`;
    message += `📋 *Détails du Produit:*\n`;
    message += `• *ID:* ${product.id} | *${product.name}*\n`;
    message += `  Quantité: ${quantity} | Prix unitaire: ${product.price}\n`;
    message += `  Total: ${totalPrice} DH\n\n`;
    message += `Merci pour votre commande ! 📞 Contactez-nous pour confirmer.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm text-center"
        >
          {quantity > 1 ? `${quantity}x ${product.name} ajouté au panier !` : `${product.name} ajouté au panier !`}
        </motion.div>
      )}
      <div className="relative pt-28 pb-20">
        {/* Back Button - Added at top */}
        <button
          onClick={handleBack}
          className="absolute left-6 top-8 bg-white/80 hover:bg-white p-3 rounded-full shadow z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE – IMAGES */}
            <div className="relative">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full rounded-2xl shadow-lg object-contain bg-gray-100"
                    />
                  </AnimatePresence>
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
                      >
                        <ChevronLeft size={26} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
                      >
                        <ChevronRight size={26} />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3 mt-6 justify-center flex-wrap">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                        i === currentImageIndex ? "border-yellow-500" : "border-gray-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* RIGHT SIDE – INFO */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {/* PRICE WITH OLD PRICE STRIKETHROUGH - Updated for quantity */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-yellow-600">{product.price}</p>
                  <p className="text-2xl text-gray-500 line-through">{oldPriceNum} DH</p>
                </div>
                <p className="text-lg text-gray-600">Total ({quantity} x {product.price}): <span className="font-bold text-yellow-600">{totalPrice} DH</span></p>
              </div>
              {/* QUANTITY SELECTOR - New */}
              <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-white rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="text-2xl font-bold min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 bg-white rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleAddToCart} // Updated to add to cart with quantity
                  className="w-full bg-grey-500 hover:bg-red-800 hover:text-white hover:border-yellow-600 border-2 border-black text-black font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 shadow"
                >
                  <ShoppingBag size={26} />
                  Ajouter au panier
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 shadow"
                >
                  <MessageCircle size={26} />
                  Commander sur WhatsApp
                </button>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 text-gray-700 space-y-2 border">
                <h3 className="text-xl font-semibold text-yellow-600">Pourquoi nous choisir ?</h3>
                <p>Livraison gratuite dès +2 produits</p>
                <p>Paiement à la livraison partout au Maroc</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;