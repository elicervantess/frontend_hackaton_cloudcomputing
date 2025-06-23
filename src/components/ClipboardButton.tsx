import React, { useState } from 'react';

interface ClipboardButtonProps {
  onPaste: (content: string) => void;
}

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const ClipboardButton: React.FC<ClipboardButtonProps> = ({ onPaste }) => {
  const [success, setSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onPaste(text);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      alert('No se pudo leer el portapapeles.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button
        type="button"
        onClick={handlePaste}
        style={{
          background: palette.primary,
          color: palette.secondary,
          border: `2px solid ${palette.primary}`,
          borderRadius: '10px',
          padding: '10px 22px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background 0.2s',
        }}
      >
        Pegar desde portapapeles
      </button>
      {success && (
        <span style={{ color: palette.dark, fontWeight: 500 }}>
          ¡Pegado!
        </span>
      )}
    </div>
  );
};

export default ClipboardButton;
