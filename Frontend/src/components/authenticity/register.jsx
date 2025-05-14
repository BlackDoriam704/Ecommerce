import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const endpoint = 'https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev';

const Register = () => {
    const [username, setname] = useState('');
    const [LastName, setLastName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const users = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/users/register`, {
                username: username, 
                LastName: LastName,
                phoneNumber: phoneNumber,
                roleId: 1, // Valor por defecto
                email: email,
                password: password
            });
            navigate('/'); // Redirige al usuario después de registrarse
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un problema al registrar el usuario. Por favor, intenta nuevamente.");
        }
    };

    return (
    <div>
             <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <h1>FashionHub</h1>
            </div>
        </nav>
        <div className="login-container">
        <div className="left-section2">
        <h1>Regístrate y </h1>
        <h2>Aprende a usar las librerías</h2>
        <p className="register">
        Si ya tienes una cuenta <br />
          ¡Puedes <a href="/login"> iniciar sesión aquí!</a>
        </p>
        </div>
        <div>
      <img src="/inicio.png" alt="inicio" className="image-illustration" />
      </div>
      <div className="right-section">
      <form onSubmit={users} className="form">
  <h2>Registrar</h2>

  <input
    type="text"
    className="input"
    placeholder="Nombre"
    onChange={(e) => setname(e.target.value)}
    required
  />
  <input
    type="text"
    className="input"
    placeholder="Apellido"
    onChange={(e) => setLastName(e.target.value)}
    required
  />
  <input
    type="text"
    className="input"
    placeholder="Correo"
    onChange={(e) => setemail(e.target.value)}
    required
  />
  <input
    type="number"
    className="input"
    placeholder="Número de teléfono"
    onChange={(e) => setphoneNumber(e.target.value)}
    required
  />
  <input
    type="password"
    className="input"
    placeholder="Contraseña"
    onChange={(e) => setpassword(e.target.value)}
    required
  />

  <button type="submit">Registrar</button>
</form>

            </div>
        </div>
        </div>
      
    );
};

export default Register;