import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMapPin,
  FiCompass,
  FiGlobe,
} from "react-icons/fi";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isPresent = useIsPresent();
  const location = useLocation();

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/login', {
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
      console.log('Respuesta backend:', data);
      let token = null;
      if (data.body) {
        try {
          const body = JSON.parse(data.body);
          token = body.token;
          console.log('Token extraído:', token);
        } catch (err) {
          console.log('Error al parsear body:', err);
        }
      }

      if (response.ok && token) {
        localStorage.setItem('token', token);
        navigate('/mainPage');
      } else {
        setError((data.error || (data.body && JSON.parse(data.body).error)) || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPresent ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-screen h-screen flex items-center justify-center"
      style={{ background: '#7A846D', position: 'relative' }}
    >
      {/* Iconos flotantes animados por todo el fondo */}
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
      {/* Más iconos para llenar el fondo */}
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
          Iniciar sesión
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl shadow-md transition duration-300 font-semibold"
            style={{ background: '#7A846D', color: '#D7CBB7', border: '2px solid #7A846D' }}
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-left mt-6 text-sm">
          <span className="font-semibold" style={{ color: '#63563B' }}>¿No tienes una cuenta? </span>
          <a
            href="/register"
            className="font-bold underline underline-offset-4 decoration-[#7A846D] transition-all duration-200 hover:text-[#7A846D] hover:decoration-2"
            style={{ color: '#63563B', fontFamily: 'inherit' }}
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;