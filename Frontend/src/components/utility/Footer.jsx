import React from 'react';
import '../css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Sobre Nosotros</h3>
                <p>
                    En FashionHub, conectamos a los mejores proveedores de ropa con nuestros clientes.
                    Encuentra tus marcas favoritas en un solo lugar.
                </p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="pi pi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="pi pi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="pi pi-instagram"></i>
                    </a>
                </div>
            </div>
            <p className="footer-copy">© 2025 FashionHub. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;