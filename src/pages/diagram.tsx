import React, { useState } from 'react';
import Editor from '../components/Editor';
import FileUploader from '../components/FileUploader';
import ClipboardButton from '../components/ClipboardButton';
import DiagramViewer from '../components/DiagramViewer';
import ExportButton from '../components/ExportButton';
import GitHubLoader from '../components/GitHubLoader';
import { Box, Paper, Typography, Button, Divider } from '@mui/material';

// Paleta igual a mainPage
const palette = {
  primary: '#45572e',
  secondary: '#D7CBB7',
  accent: '#45572e',
  white: '#fff',
  dark: '#45572e',
};

const diagramTypes = [
  { value: 'aws', label: 'AWS' },
  { value: 'er', label: 'Entidad-Relación' },
  { value: 'uml', label: 'UML' },
  // Agrega más si tu backend los soporta
];

const DiagramPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [diagramUrl, setDiagramUrl] = useState<string | null>(null);
  const [diagramType, setDiagramType] = useState('aws');

  const handleGenerar = async () => {
    if (!code) {
      setMessage('Por favor ingresa o sube código antes de generar el diagrama.');
      setMessageType('error');
      return;
    }
    setLoading(true);
    setMessage(null);
    setMessageType(null);
    setDiagramUrl(null);
  
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No hay token de autenticación.');
      setMessageType('error');
      setLoading(false);
      return;
    }
  
    try {
      // LOG: antes de llamar al endpoint
      console.log('Enviando a generar-diagrama:', {
        diagram_code: code,
        diagram_type: diagramType,
        user_id: 'usuario-demo',
        token
      });
  
      const generarResp = await fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/generar-diagrama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          diagram_code: code,
          diagram_type: diagramType,
          user_id: 'usuario-demo',
        }),
      });
  
      // LOG: después de la respuesta
      console.log('Respuesta de generar-diagrama:', generarResp);
  
      const generarData = await generarResp.json();
      // Si el backend retorna { body: '{"message": "...", "s3_url": "..."}', ... }
      let parsedData = generarData;
      if (typeof generarData.body === 'string') {
        try {
          parsedData = { ...generarData, ...JSON.parse(generarData.body) };
        } catch (e) {}
      }
      console.log('Data de generar-diagrama:', parsedData);
  
      if (!generarResp.ok || !parsedData.s3_url) {
        setMessage(parsedData.error || parsedData.body || 'Error al generar el diagrama');
        setMessageType('error');
        setLoading(false);
        return;
      }
      setDiagramUrl(parsedData.s3_url);
  
      // 2. Validar diagrama (código fuente)
      const validarResp = await fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/validar-diagrama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          diagram_code: code,
          diagram_type: diagramType,
          user_id: 'usuario-demo',
        }),
      });
      const validarData = await validarResp.json();
      if (!validarResp.ok) {
        setMessage('❌ Error de validación: ' + (validarData.body || validarData.error || 'Error al validar el diagrama'));
        setMessageType('error');
        setLoading(false);
        return;
      }
  
      // 3. Guardar diagrama (código fuente en S3)
      const guardarResp = await fetch('https://jeflaob0xe.execute-api.us-east-1.amazonaws.com/dev/guardar-diagrama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          diagram_code: code,
          diagram_type: diagramType,
          user_id: 'usuario-demo',
        }),
      });
      const guardarData = await guardarResp.json();
      let parsedGuardar = guardarData;
      if (typeof guardarData.body === 'string') {
        try {
          parsedGuardar = { ...guardarData, ...JSON.parse(guardarData.body) };
        } catch (e) {}
      }
      if (!guardarResp.ok || !parsedGuardar.s3_url) {
        setMessage('❌ Error al guardar el diagrama: ' + (parsedGuardar.body || parsedGuardar.error || ''));
        setMessageType('error');
        setLoading(false);
        return;
      }
  
      // Todo OK
      setMessage(
        <>
          <span>✅ Diagrama generado, validado y guardado correctamente.</span>
          <br />
          <a href={parsedGuardar.s3_url} target="_blank" rel="noopener noreferrer" style={{ color: palette.primary, fontWeight: 600 }}>
            Descargar código fuente
          </a>
        </>
      );
      setMessageType('success');
    } catch (err) {
      console.error('Error en handleGenerar:', err);
      setMessage('Error de red o del servidor');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: palette.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        p: 0,
        m: 0,
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          background: palette.secondary,
          border: `2.5px solid ${palette.primary}`,
          borderRadius: '22px',
          boxShadow: '0 4px 24px rgba(99,86,59,0.10)',
          width: { xs: '98vw', md: '90vw', lg: '70vw' },
          height: { xs: '96vh', md: '92vh' },
          maxWidth: '1100px',
          maxHeight: '98vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          p: { xs: 1, md: 2 },
          m: 0,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: palette.dark,
            fontWeight: 900,
            mb: 1,
            letterSpacing: 1,
            fontSize: { xs: '1.5rem', md: '2.2rem' },
          }}
        >
          Editor de Diagrama
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: palette.primary,
            mb: 1,
            fontWeight: 500,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
          }}
        >
          Ingresa tu código, súbelo o pégalo desde GitHub para generar tu diagrama visual.
        </Typography>
        <Divider sx={{ my: 1, background: palette.primary, opacity: 0.2, width: '100%' }} />
        {/* Selector de tipo de diagrama */}
        <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {diagramTypes.map(type => (
              <Button
                key={type.value}
                variant={diagramType === type.value ? 'contained' : 'outlined'}
                onClick={() => setDiagramType(type.value)}
                sx={{
                  background: diagramType === type.value ? palette.primary : palette.secondary,
                  color: diagramType === type.value ? palette.secondary : palette.primary,
                  border: `2px solid ${palette.primary}`,
                  borderRadius: '10px',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  boxShadow: diagramType === type.value ? '0 2px 12px rgba(99,86,59,0.13)' : 'none',
                  transition: 'background 0.2s',
                }}
              >
                {type.label}
              </Button>
            ))}
          </Box>
        </Box>
        {/* GitHub Loader */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mb: 2
        }}>
          <GitHubLoader onLoad={setCode} />
        </Box>
        {/* Botones de archivo y portapapeles */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1, justifyContent: 'center' }}>
          <FileUploader onFileLoaded={setCode} />
          <ClipboardButton onPaste={setCode} />
        </Box>
        {/* Editor */}
        <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mb: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Box sx={{ flex: 1, minHeight: 200, maxHeight: { xs: 220, md: 320 }, overflow: 'auto', borderRadius: '12px', p: 0 }}>
            <Editor
              value={code}
              onChange={v => setCode(v ?? '')}
              height="200px"
            />
          </Box>
        </Box>
        {/* Botón Generar Diagrama */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerar}
            disabled={!code || loading}
            sx={{
              background: palette.accent,
              color: palette.secondary,
              border: `2px solid ${palette.primary}`,
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1.05rem',
              px: 4,
              py: 1,
              boxShadow: '0 4px 24px rgba(99,86,59,0.13)',
              opacity: !code || loading ? 0.6 : 1,
              cursor: !code || loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              minWidth: 220,
              display: 'block',
            }}
          >
            {loading ? 'Generando...' : 'Generar diagrama'}
          </Button>
        </Box>
        {/* Mensaje */}
        {message && (
          <Box
            sx={{
              mt: 1,
              color: messageType === 'success' ? '#388e3c' : '#b71c1c',
              fontWeight: 600,
              background: palette.secondary,
              border: `2px solid ${palette.primary}`,
              borderRadius: '10px',
              px: 2,
              py: 1,
              fontSize: '1rem',
              boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {message}
          </Box>
        )}
        {/* Visualización del diagrama */}
        {diagramUrl && (
          <Paper
            elevation={5}
            sx={{
              background: palette.secondary,
              border: `2px solid ${palette.primary}`,
              borderRadius: '18px',
              boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
              p: 2,
              mt: 1,
              width: '100%',
              maxWidth: 820,
              textAlign: 'center',
              overflow: 'auto',
            }}
          >
            <DiagramViewer src={diagramUrl} />
            <ExportButton imageUrl={diagramUrl} />
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default DiagramPage;