// src/components/Products/Products.jsx
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import all images
import grillz1 from "../../assets/products/Grillz-miami1.png";
import aphex1 from "../../assets/products/Aphex-twin-necklace1.png";
import mfdoom1 from "../../assets/products/Mf-doom-ring1.png";
import armure1 from "../../assets/products/armure-ring1.png";
import silver1 from "../../assets/products/silver-grills-set1.png";
import DoubleHollowHeart1 from "../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz1.png";

const products = [
  { id: 1, name: "Grillz Miami", price: "70 DH", preview: grillz1 },
  { id: 2, name: "Aphex Twin Necklace", price: "100 DH", preview: aphex1 },
  { id: 3, name: "MF DOOM Ring", price: "70 DH", preview: mfdoom1 },
  { id: 4, name: "Armure Ring", price: "100 DH", preview: armure1 },
  { id: 5, name: "Silver Grills Set", price: "200 DH", preview: silver1 },
  { id: 6, name: "Double Hollow Heart Star Teeth Grillz", price: "70 DH", preview: DoubleHollowHeart1 },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Nos Produits</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            // Extract number from "70 DH" → 70
            const realPrice = parseInt(product.price.replace(" DH", ""));
            const oldPrice = realPrice + 20; // +20 DH discount effect

            return (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.preview}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <ShoppingBag size={40} className="text-white drop-shadow-lg" />
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Current (discounted) price */}
                  <p className="text-2xl font-bold text-yellow-600 mt-2">
                    {product.price}
                  </p>

                  {/* Old price – strikethrough */}
                  <p className="text-sm text-gray-500 line-through">
                    {oldPrice} DH
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;