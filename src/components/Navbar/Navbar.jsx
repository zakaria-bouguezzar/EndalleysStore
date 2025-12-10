// Navbar.jsx - FULLY FIXED (Mobile scroll navbar works perfectly)
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import Endalleys from "../../assets/Endalleys-logo.png";

// Product preview images
import grillz1 from "../../assets/products/Grillz-miami1.png";
import aphex1 from "../../assets/products/Aphex-twin-necklace1.png";
import mfdoom1 from "../../assets/products/Mf-doom-ring1.png";
import armure1 from "../../assets/products/armure-ring1.png";
import silver1 from "../../assets/products/silver-grills-set1.png";
import DoubleHollowHeart1 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz1.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [productsVisible, setProductsVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearch();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  // All products for search
  const allProducts = [
    { id: 1, name: "Grillz Miami", price: "70 DH", preview: grillz1 },
    { id: 2, name: "Aphex Twin Necklace", price: "100 DH", preview: aphex1 },
    { id: 3, name: "MF DOOM Ring", price: "70 DH", preview: mfdoom1 },
    { id: 4, name: "Armure Ring", price: "100 DH", preview: armure1 },
    { id: 5, name: "Silver Grills Set", price: "200 DH", preview: silver1 },
    { id: 6, name: "Double Hollow Heart Star Teeth Grillz", price: "70 DH", preview: DoubleHollowHeart1 },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search overlay
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // FIXED SCROLL HANDLER - Works perfectly on mobile & desktop
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      // Show navbar if scrolling up OR near the top
      const shouldShow = scrollY <= 80 || scrollY < lastScrollY;
      setIsVisible(shouldShow);

      // Update last known position
      lastScrollY = scrollY > 0 ? scrollY : 0;

      // Update products section visibility (for active link highlight)
      const productsSection = document.getElementById("products");
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        setProductsVisible(rect.top <= 100);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Use passive for better mobile performance
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Runs only once

  const isActive = (path) => location.pathname === path;

  const goHome = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/");
  };

  const goCatalogue = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    closeSearch();
  };

  // WhatsApp Order
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
  
    const phoneNumber = "212632254523";
    const totalItems = getTotalItems(); // Nombre total d'articles (somme des quantités)
  
    let message = `Welcome to Endalleys Store*\n\n`;
    message += `Détails des Produits :\n\n`;
  
    cartItems.forEach((item) => {
      const product = allProducts.find(p => p.id === item.id);
      const priceNum = parseInt(item.price.replace(" DH", ""));
      const subtotal = priceNum * item.quantity;
  
      message += `• *${item.name}*\n`;
      message += `   Quantité : ${item.quantity} × ${item.price} = ${subtotal} DH\n\n`;
    });
  
    message += `Total : *${getTotalPrice()} DH*\n\n`;
  
    // LIVRAISON GRATUITE SI 2 PRODUITS OU PLUS
    if (totalItems >= 2) {
      message += `🚚 Livraison GRATUITE partout au Maroc !\n`;
    } else {
      message += `🚚 Livraison : 30 DH (gratuite dès 2 produits)\n`;
    }
  
    message += `\nMerci pour votre confiance !\nNous vous contactons dans les plus brefs délais`;
  
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setCartOpen(false);
  };

  return (
    <>
      {/* FULL SCREEN SEARCH OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-500 ease-in-out ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center flex-1 max-w-4xl mx-auto">
            <Search className="w-6 h-6 text-gray-500 mr-4" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full text-2xl outline-none placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Escape") closeSearch();
                if (e.key === "Enter" && filteredProducts.length === 1) {
                  handleProductClick(filteredProducts[0].id);
                }
              }}
            />
          </div>
          <button
            onClick={closeSearch}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-10 py-8 overflow-y-auto h-[calc(100vh-140px)]">
          {searchQuery.trim() ? (
            filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                Aucun produit trouvé pour "<span className="font-semibold">{searchQuery}</span>"
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.preview}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-lg font-bold text-red-800 mt-1">{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )
          ) : (
            <div className="text-gray-600">Commencez à taper pour voir les résultats...</div>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR - Fixed scroll behavior */}
      <header
        className={`fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
          isVisible && !searchOpen ? "translate-y-0" : "-translate-y-full"
        } ${searchOpen ? "pointer-events-none" : ""}`}
      >
        <div className="text-center py-2 text-sm font-semibold tracking-wide bg-gray-50">
          LIVRAISON GRATUITE DÈS 2 PRODUITS
        </div>
        <div className="border-t border-gray-200"></div>

        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Recherche</span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="md:hidden relative text-gray-700 hover:text-gray-900 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          <div className="flex justify-center flex-1 md:flex-initial">
            <button onClick={goHome} className="focus:outline-none">
              <img src={Endalleys} alt="Endalleys Logo" className="h-14 object-contain" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-gray-900 transition relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              <span className="text-sm">Panier</span>
            </button>

            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Desktop Links */}
        <div className="hidden md:flex justify-center gap-16 py-4">
          <Link
            to="/"
            className={`relative text-lg font-semibold transition-colors pb-2 ${
              isActive("/") && !productsVisible ? "text-red-800" : "text-gray-700 hover:text-red-800"
            }`}
          >
            Accueil
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-red-800 transition-all duration-300 ${
                isActive("/") && !productsVisible ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>
          <button
            onClick={goCatalogue}
            className={`relative text-lg font-semibold pb-2 transition-colors ${
              location.pathname === "/catalogue" || productsVisible
                ? "text-red-800"
                : "text-gray-700 hover:text-red-800"
            }`}
          >
            Produits
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-red-800 transition-all duration-300 ${
                location.pathname === "/catalogue" || productsVisible ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </button>
          <Link
            to="/contact"
            className={`relative text-lg font-semibold transition-colors pb-2 ${
              isActive("/contact") ? "text-red-800" : "text-gray-700 hover:text-red-800"
            }`}
          >
            Contact
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-red-800 transition-all duration-300 ${
                isActive("/contact") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>
        </div>
      </header>

      {/* CART PANEL */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Votre panier</h2>
              <X className="w-6 h-6 cursor-pointer" onClick={() => setCartOpen(false)} />
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Votre panier est vide.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    <img
                      src={allProducts.find(p => p.id === item.id)?.preview}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">
                        +
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-600">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{getTotalPrice()} DH</span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Passer commande via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* MOBILE MENU */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40 pt-24 px-8 flex flex-col gap-10 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpen(false)} className={isActive("/") && !productsVisible ? "text-red-800" : "text-gray-700"}>
              Accueil
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                goCatalogue(new Event("click"));
              }}
              className={`text-left ${location.pathname === "/catalogue" || productsVisible ? "text-red-800" : "text-gray-700"}`}
            >
              Produits
            </button>
            <Link to="/contact" onClick={() => setOpen(false)} className={isActive("/contact") ? "text-red-800" : "text-gray-700"}>
              Contact
            </Link>

            <div className="pt-8 border-t mt-auto space-y-4">
              <button
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-4 py-3 text-xl w-full text-left text-gray-700 hover:text-red-800 transition"
              >
                <Search className="w-6 h-6" />
                Recherche
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setCartOpen(true);
                }}
                className="flex items-center gap-4 py-3 text-xl w-full text-left text-gray-700 hover:text-red-800 transition relative"
              >
                <ShoppingBag className="w-6 h-6" />
                Panier
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-10 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}