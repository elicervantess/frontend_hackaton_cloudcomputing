import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
}

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const Editor: React.FC<EditorProps> = ({ value, onChange, height = '400px' }) => {
  return (
    <div
      style={{
        border: `2px solid ${palette.primary}`,
        borderRadius: '16px',
        background: palette.secondary,
        boxShadow: '0 4px 24px rgba(99, 86, 59, 0.08)',
        padding: '8px',
      }}
    >
      <MonacoEditor
        height={height}
        defaultLanguage="python"
        value={value}
        onChange={onChange}
        theme="vs-light"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          fontFamily: 'Fira Mono, monospace',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          scrollbar: { vertical: 'auto', horizontal: 'auto' },
        }}
      />
    </div>
  );
};

export default Editor;
