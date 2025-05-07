import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Asegúrate de tener un archivo CSS para estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    console.log({ email, password }); // Verifica los valores enviados
  
    try {
      const response = await fetch('https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData); // Depura el error del servidor
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }
  
      const { token } = await response.json();
  
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;