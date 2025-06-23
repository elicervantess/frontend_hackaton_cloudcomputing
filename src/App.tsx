import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import MainPage from './pages/mainPage';
import DiagramPage from './pages/diagram';
import Register from './pages/register'; 

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsValid(false);
      return;
    }
    fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/validar-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => setIsValid(res.ok))
      .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) return null; // Puedes poner un loader aquí
  if (!isValid) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainPage" element={
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      } />
      <Route path="/diagram" element={
        <ProtectedRoute>
          <DiagramPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}