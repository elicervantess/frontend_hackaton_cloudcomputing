import React, { useRef, useState } from 'react';

interface FileUploaderProps {
  onFileLoaded: (content: string) => void;
}

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onFileLoaded(text);
      };
      reader.readAsText(file);
    } else {
      setFileName('');
      alert('Por favor selecciona un archivo .txt');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
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
        Subir archivo .txt
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {fileName && (
        <span style={{ color: palette.dark, fontWeight: 500 }}>
          {fileName}
        </span>
      )}
    </div>
  );
};

export default FileUploader;
