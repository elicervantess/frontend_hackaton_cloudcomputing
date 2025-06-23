import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiMapPin, FiCompass, FiGlobe } from 'react-icons/fi';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    setErrorMessage('');

    try {
      const response = await fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/'); // Registro exitoso, redirige a login
      } else {
        setErrorMessage(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      setErrorMessage('Error de red o del servidor');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#7A846D', position: 'relative' }}>
      {/* Iconos flotantes animados por todo el fondo (idénticos al login) */}
      <motion.div className="absolute top-8 left-8" animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
        <FiMapPin className="text-5xl" style={{ color: '#D7CBB7', opacity: 0.4 }} />
      </motion.div>
      <motion.div className="absolute top-8 right-8" animate={{ x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}>
        <FiGlobe className="text-5xl" style={{ color: '#D7CBB7', opacity: 0.4 }} />
      </motion.div>
      <motion.div className="absolute bottom-8 left-8" animate={{ x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.2 }}>
        <FiCompass className="text-4xl" style={{ color: '#D7CBB7', opacity: 0.3 }} />
      </motion.div>
      <motion.div className="absolute bottom-8 right-8" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.7 }}>
        <FiMapPin className="text-4xl" style={{ color: '#D7CBB7', opacity: 0.3 }} />
      </motion.div>
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.3 }}>
        <FiGlobe className="text-7xl" style={{ color: '#D7CBB7', opacity: 0.1 }} />
      </motion.div>
      <motion.div className="absolute top-1/3 right-24" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.9 }}>
        <FiCompass className="text-3xl" style={{ color: '#D7CBB7', opacity: 0.2 }} />
      </motion.div>
      <motion.div className="absolute top-1/4 left-1/4" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.4 }}>
        <FiMapPin className="text-4xl" style={{ color: '#D7CBB7', opacity: 0.25 }} />
      </motion.div>
      <motion.div className="absolute bottom-1/4 right-1/4" animate={{ x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.6 }}>
        <FiGlobe className="text-4xl" style={{ color: '#D7CBB7', opacity: 0.18 }} />
      </motion.div>
      <motion.div className="absolute top-1/4 right-1/3" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.8 }}>
        <FiCompass className="text-3xl" style={{ color: '#D7CBB7', opacity: 0.18 }} />
      </motion.div>
      <motion.div className="absolute bottom-1/3 left-1/3" animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 0.2 }}>
        <FiMapPin className="text-3xl" style={{ color: '#D7CBB7', opacity: 0.18 }} />
      </motion.div>
      {/* Fin iconos flotantes animados */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg rounded-2xl shadow-xl p-12 min-h-[520px]" style={{ background: '#D7CBB7' }}>
        <h1 className="text-4xl font-bold mb-6 text-left" style={{ color: '#63563B' }}>
          Regístrate
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block font-semibold mb-2" style={{ color: '#63563B' }}>
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2" style={{ color: '#7A846D' }} />
              <input
                type="email"
                className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 transition duration-300 bg-white"
                style={{ color: '#63563B', borderColor: '#7A846D' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2" style={{ color: '#63563B' }}>
              Contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2" style={{ color: '#7A846D' }} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 transition duration-300 bg-white"
                style={{ color: '#63563B', borderColor: '#7A846D' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                style={{ background: '#7A846D', color: '#D7CBB7', borderRadius: '12px', padding: '6px 14px' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2" style={{ color: '#63563B' }}>
              Confirmar contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2" style={{ color: '#7A846D' }} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 transition duration-300 bg-white"
                style={{ color: '#63563B', borderColor: '#7A846D' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                style={{ background: '#7A846D', color: '#D7CBB7', borderRadius: '12px', padding: '6px 14px' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2" style={{ color: '#63563B' }}>
              ¿Tienes experiencia creando diagramas?
            </label>
              <select
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-300 bg-white"
              style={{ color: '#63563B', borderColor: '#7A846D' }}
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              required
              >
              <option value="">Selecciona una opción</option>
              <option value="Poco">Poco</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              </select>
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl shadow-md transition duration-300 font-semibold"
            style={{ background: '#7A846D', color: '#D7CBB7', border: '2px solid #7A846D' }}
          >
            Registrarse
          </button>
        </form>
        <p className="text-left mt-6 text-sm">
          <span className="font-semibold" style={{ color: '#63563B' }}>¿Ya tienes una cuenta? </span>
          <a
            href="/"
            className="font-bold underline underline-offset-4 decoration-[#7A846D] transition-all duration-200 hover:text-[#7A846D] hover:decoration-2"
            style={{ color: '#63563B', fontFamily: 'inherit' }}
          >
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
