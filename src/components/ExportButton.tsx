import React from 'react';

interface ExportButtonProps {
  imageUrl?: string;
}

const getFileName = (url: string, ext: string) => {
  try {
    const name = url.split('/').pop()?.split('?')[0]?.split('#')[0] || 'diagrama';
    return name.replace(/\.(png|svg)$/i, '') + '.' + ext;
  } catch {
    return 'diagrama.' + ext;
  }
};

const downloadFile = (url: string, ext: string) => {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = getFileName(url, ext);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    });
};

const downloadAsPDF = async (url: string) => {
  const jsPDF = (await import('jspdf')).jsPDF;
  const res = await fetch(url);
  const blob = await res.blob();
  const reader = new FileReader();
  reader.onload = function(e) {
    const imgData = e.target?.result as string;
    const pdf = new jsPDF({ orientation: 'landscape' });
    pdf.addImage(imgData, 'PNG', 10, 10, 270, 180);
    pdf.save(getFileName(url, 'pdf'));
  };
  reader.readAsDataURL(blob);
};

// Paleta de colores global
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#63563B',
};

const ExportButton: React.FC<ExportButtonProps> = ({ imageUrl }) => {
  const isPng = imageUrl?.toLowerCase().endsWith('.png');
  const isSvg = imageUrl?.toLowerCase().endsWith('.svg');

  return (
    <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
      <button
        type="button"
        disabled={!imageUrl || (!isPng && !isSvg)}
        onClick={() => imageUrl && isPng && downloadFile(imageUrl, 'png')}
        style={{
          background: palette.primary,
          color: palette.secondary,
          border: `2px solid ${palette.primary}`,
          borderRadius: '10px',
          padding: '10px 22px',
          fontWeight: 600,
          cursor: !imageUrl || (!isPng && !isSvg) ? 'not-allowed' : 'pointer',
          opacity: !imageUrl || (!isPng && !isSvg) ? 0.6 : 1,
        }}
      >
        Descargar PNG
      </button>
      <button
        type="button"
        disabled={!imageUrl || !isSvg}
        onClick={() => imageUrl && isSvg && downloadFile(imageUrl, 'svg')}
        style={{
          background: palette.primary,
          color: palette.secondary,
          border: `2px solid ${palette.primary}`,
          borderRadius: '10px',
          padding: '10px 22px',
          fontWeight: 600,
          cursor: !imageUrl || !isSvg ? 'not-allowed' : 'pointer',
          opacity: !imageUrl || !isSvg ? 0.6 : 1,
        }}
      >
        Descargar SVG
      </button>
      <button
        type="button"
        disabled={!imageUrl || !isPng}
        onClick={() => imageUrl && isPng && downloadAsPDF(imageUrl)}
        style={{
          background: palette.primary,
          color: palette.secondary,
          border: `2px solid ${palette.primary}`,
          borderRadius: '10px',
          padding: '10px 22px',
          fontWeight: 600,
          cursor: !imageUrl || !isPng ? 'not-allowed' : 'pointer',
          opacity: !imageUrl || !isPng ? 0.6 : 1,
        }}
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default ExportButton;
