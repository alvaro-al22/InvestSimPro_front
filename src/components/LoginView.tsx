// src/components/LoginView.tsx
import React, { useState } from 'react';

interface LoginViewProps {
  onAuthSuccess: (username: string) => void;
  onSwitchToRegister: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onAuthSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Guarda los tokens en localStorage si lo deseas:
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        setMessage('Inicio de sesión exitoso');
        // Se invoca onAuthSuccess pasando el nombre de usuario recibido
        onAuthSuccess(data.username);
      } else {
        setMessage(data.error || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Iniciar Sesión
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
      <div className="mt-4 text-center">
        <p>
          ¿No tienes cuenta?{' '}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={onSwitchToRegister}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
