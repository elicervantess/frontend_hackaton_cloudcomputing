import React from 'react';

interface DiagramViewerProps {
  src?: string;
}

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const DiagramViewer: React.FC<DiagramViewerProps> = ({ src }) => {
  if (!src) return null;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '32px',
      background: palette.secondary,
      border: `2px solid ${palette.primary}`,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 24px rgba(99, 86, 59, 0.08)',
      maxWidth: '700px',
      width: '100%',
    }}>
      <img
        src={src}
        alt="Diagrama generado"
        style={{
          maxWidth: '100%',
          maxHeight: '400px',
          borderRadius: '12px',
          border: `1.5px solid ${palette.dark}`,
          background: palette.white,
        }}
      />
    </div>
  );
};

export default DiagramViewer;
