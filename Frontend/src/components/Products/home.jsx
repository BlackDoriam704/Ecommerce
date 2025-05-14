import React from 'react';
import { Button } from 'primereact/button';
import Navbar from '../utility/Navbar';
import Footer from '../utility/Footer';
import '../css/home.css';

const Home = () => {
    const handleExploreProducts = () => {
        // Redirige a la página de productos
    };

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Tu Estilo, Tu Elección</h1>
                    <p className="hero-subtitle">
                        Descubre las mejores marcas de ropa en un solo lugar. Adidas, Versace, Nike y más.
                    </p>
                    <Button
                        label="Explorar Marcas"
                        className="hero-button p-button-raised p-button-rounded"
                        onClick={handleExploreProducts}
                    />
                </div>
                <div className="hero-image">
                    <img src="https://source.unsplash.com/600x400/?fashion,brands" alt="Hero" />
                </div>
            </section>

            {/* Brands Section */}
            <section className="brands">
                <h2 className="section-title">Marcas Destacadas</h2>
                <div className="brands-grid">
                    {['Adidas', 'Versace', 'Nike', 'Gucci', 'Puma', 'Levi\'s'].map((brand, index) => (
                        <div key={index} className="brand-card">
                            <img
                                src={`https://source.unsplash.com/300x200/?${brand}`}
                                alt={brand}
                                width={300}
                                height={200}
                            />
                            <h3>{brand}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;