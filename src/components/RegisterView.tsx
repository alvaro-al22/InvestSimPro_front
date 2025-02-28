// src/components/RegisterView.tsx
import React, { useState } from 'react';

interface RegisterViewProps {
  onAuthSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onAuthSuccess, onSwitchToLogin }) => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  // Función para validar la contraseña
  const validatePassword = (pwd: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    // Validar formato de la contraseña
    if (!validatePassword(password)) {
      setMessage('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setStep('verify');
      } else {
        setMessage(data.error || 'Error en el registro');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
      console.error(error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // Registro completado exitosamente, puedes notificar al padre
        onAuthSuccess();
      } else {
        setMessage(data.error || 'Error en la verificación');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {step === 'register' ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1">Nombre de Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
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
            <div>
              <label className="block mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Registrarse
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Verifica tu correo</h2>
          <p className="mb-4">
            Se ha enviado un código de verificación a <strong>{email}</strong>. Por favor, ingresa el código recibido.
          </p>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block mb-1">Código de Verificación</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Verificar
            </button>
          </form>
        </>
      )}
      {message && <p className="mt-4 text-center">{message}</p>}
      <div className="mt-4 text-center">
        {step === 'register' && (
          <p>
            ¿Ya tienes una cuenta?{' '}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={onSwitchToLogin}
            >
              Inicia sesión aquí
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterView;
