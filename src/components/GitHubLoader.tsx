import React, { useState } from 'react';

interface GitHubLoaderProps {
  onLoad: (content: string) => void;
}

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const GitHubLoader: React.FC<GitHubLoaderProps> = ({ onLoad }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLoad = async () => {
    setMessage(null);
    if (!url.startsWith('https://raw.githubusercontent.com/')) {
      setMessage('La URL debe ser de un archivo crudo de GitHub (raw.githubusercontent.com)');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo obtener el archivo');
      const text = await res.text();
      onLoad(text);
      setMessage('¡Código cargado exitosamente!');
    } catch (err) {
      setMessage('Error al cargar el archivo de GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <input
        type="text"
        placeholder="Pega la URL cruda de GitHub aquí..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{
          border: `2px solid ${palette.primary}`,
          borderRadius: '8px',
          padding: '8px 14px',
          width: '320px',
          color: palette.dark,
          background: palette.secondary,
        }}
      />
      <button
        type="button"
        onClick={handleLoad}
        disabled={loading || !url}
        style={{
          background: palette.primary,
          color: palette.secondary,
          border: `2px solid ${palette.primary}`,
          borderRadius: '10px',
          padding: '10px 18px',
          fontWeight: 600,
          cursor: loading || !url ? 'not-allowed' : 'pointer',
          opacity: loading || !url ? 0.6 : 1,
        }}
      >
        {loading ? 'Cargando...' : 'Cargar desde GitHub'}
      </button>
      {message && (
        <span style={{ color: message.startsWith('¡') ? palette.primary : palette.dark, fontWeight: 500 }}>{message}</span>
      )}
    </div>
  );
};

export default GitHubLoader;
