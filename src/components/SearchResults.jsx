// src/components/SearchResults.jsx
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

// Liste complète des produits (même que dans ProductDetail et Products)
const allProducts = [
  { id: 1, name: "Grillz Miami", price: "70 DH", preview: require("../../assets/products/Grillz-miami1.png") },
  { id: 2, name: "Aphex Twin Necklace", price: "100 DH", preview: require("../../assets/products/Aphex-twin-necklace1.png") },
  { id: 3, name: "MF DOOM Ring", price: "70 DH", preview: require("../../assets/products/Mf-doom-ring1.png") },
  { id: 4, name: "Armure Ring", price: "100 DH", preview: require("../../assets/products/armure-ring1.png") },
  { id: 5, name: "Silver Grills Set", price: "200 DH", preview: require("../../assets/products/silver-grills-set1.png") },
  { id: 6, name: "Double Hollow Heart Star Teeth Grillz", price: "70 DH", preview: require("../../assets/products/Double-Hollow-Heart-Star-Teeth-Grillz1.png") },
];

export default function SearchResults() {
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  if (!searchQuery.trim()) return null;

  return (
    <div className="fixed inset-x-0 top-24 md:top-32 z-40 bg-white shadow-2xl border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun produit trouvé pour "<span className="font-semibold">{searchQuery}</span>"
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => setSearchQuery("")} // ferme la recherche
                className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
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
              </Link>
            ))}
          </div>
        )}

        {/* Bouton fermer */}
        <button
          onClick={() => setSearchQuery("")}
          className="absolute top-4 right-6 md:right-12 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}