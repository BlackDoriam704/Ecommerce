import React, { useEffect, useState } from "react";
import { Loader } from "../utility/loader";
import { Button } from "primereact/button";
import Navbar from '../utility/Navbar';
import Footer from '../utility/Footer';
import "./AllProducts.css"; // Archivo CSS para los estilos

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Token SAS para acceso a las imágenes
  const sasToken =
    "?sp=racwdl&st=2025-05-07T20:56:10Z&se=2026-01-02T04:56:10Z&spr=https&sv=2024-11-04&sr=c&sig=CIS3OGPxiOzzevL3U6vp0KK0axoaalRuMVv4IUZmKx8%3D";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/AllproductsV"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();

        // Agregar el token SAS a las URLs de las imágenes
        const updatedProducts = data.map((product) => ({
          ...product,
          variations: product.variations.map((variation) => ({
            ...variation,
            imageUrl: variation.imageUrl
              ? `${variation.imageUrl}${sasToken}`
              : null,
          })),
        }));

        setProducts(updatedProducts);
      } catch (err) {
        setError(err.message);
      } 
 
    };

    fetchProducts();
  }, []);



  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="all-products-container">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="card flex justify-content-center">
        <h1 className="section-title">Todos los Productos</h1>
        <div className="products-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.variations.length > 0 ? (
                <div className="variations-container">
                  {product.variations.map((variation) => (
                    <div key={variation.id} className="box p-4 fadein animation-duration-500">
                      {/* Mostrar la imagen de la variación */}
                      <div
                        className="surface-card mb w-full text-center p"
                        style={{ borderRadius: "10px" }}
                      >
                        {variation.imageUrl ? (
                          <img
                            src={variation.imageUrl}
                            alt={variation.name}
                            className="variation-image"
                          />
                        ) : (
                          <p>Sin imagen</p>
                        )}
                      </div>
                      <div className="flex align-items-center mb-2">
                        <div className="flex flex-column">
                          <span className="block font-semibold mb-1">
                            {variation.name}
                          </span>
                          <span className="text-secondary text-sm">
                            {product.id}
                          </span>
                        </div>
                        <span className="font-medium text-xl ml-auto">
                          ${variation.price}
                        </span>
                      </div>
                      <Button
                        label="Agregar al Carrito"
                        icon="pi pi-shopping-cart"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>Sin variaciones</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllProducts;