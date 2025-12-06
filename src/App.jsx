// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./components/context/SearchContext";
import { CartProvider } from "./components/context/CartContext"; // New import for CartProvider

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <SearchProvider>
      <CartProvider> {/* Wrap with CartProvider */}
        <Router>
          <div className="min-h-screen bg-white">
            {/* Fixed Navbar */}
            <Navbar />

            {/* Main content with top padding to avoid overlap with fixed navbar */}
            <main className="pt-32 md:pt-36 lg:pt-40">
              <Routes>
                {/* Home Page */}
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <Products id="products" />
                    </>
                  }
                />

                {/* Full Catalogue Page */}
                <Route path="/catalogue" element={<Products id="products" />} />

                {/* Contact Page */}
                <Route path="/contact" element={<ContactUs />} />

                {/* Product Detail Page */}
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Optional: 404 fallback */}
                <Route path="*" element={
                  <div className="text-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800">404 - Page non trouvée</h1>
                    <a href="/" className="text-red-700 underline mt-4 inline-block">Retour à l'accueil</a>
                  </div>
                } />
              </Routes>
            </main>

            {/* Footer on all pages */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;