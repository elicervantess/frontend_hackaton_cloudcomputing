import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Grid from '@mui/material/Grid';
import {
  AppBar, Toolbar, Typography, IconButton, Tooltip, Box, Button, Avatar, Paper, Card, CardContent, CardActions,
  Divider, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery
} from '@mui/material';
import {
  Dashboard, Feedback, WbSunny, Nightlight, Settings, AccountCircle, Logout, ArrowForwardIos, Info, CheckCircle, Description, PictureAsPdf
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const palette = {
  primary: '#45572e',      // oliva/fondo principal
  secondary: '#D7CBB7',    // beige claro/tarjetas
  accent: '#45572e',       // acento/botón principal
  white: '#fff',
  dark: '#63563B',         // texto principal
};

const features = [
  {
    icon: <Description sx={{ color: palette.accent, fontSize: 36 }} />,
    title: 'Genera Diagramas',
    desc: 'Crea diagramas de arquitectura, ER, y más en segundos con plantillas inteligentes.',
  },
  {
    icon: <PictureAsPdf sx={{ color: palette.accent, fontSize: 36 }} />,
    title: 'Exporta y Comparte',
    desc: 'Descarga tus diagramas en PDF, PNG o compártelos con tu equipo fácilmente.',
  },
  {
    icon: <AccountCircle sx={{ color: palette.accent, fontSize: 36 }} />,
    title: 'Gestión de Usuarios',
    desc: 'Administra tus diagramas y colabora con otros usuarios de forma segura.',
  },
];

const fakeStats = [
  { label: 'Diagramas creados', value: 128, icon: <Description sx={{ color: palette.primary, fontSize: 32 }} /> },
  { label: 'Exportaciones', value: 87, icon: <PictureAsPdf sx={{ color: palette.primary, fontSize: 32 }} /> },
  { label: 'Usuarios activos', value: 42, icon: <AccountCircle sx={{ color: palette.primary, fontSize: 32 }} /> },
];

const fakeHistory = [
  { name: 'Diagrama AWS', date: '2024-06-01', type: 'AWS', status: 'Completado' },
  { name: 'Modelo ER', date: '2024-05-28', type: 'ER', status: 'Completado' },
  { name: 'Infraestructura Cloud', date: '2024-05-25', type: 'AWS', status: 'Completado' },
];

const comingSoon = [
  { icon: <Info sx={{ color: palette.primary, fontSize: 32 }} />, title: 'Colaboración en tiempo real', desc: 'Edita diagramas junto a tu equipo en vivo.' },
  { icon: <Info sx={{ color: palette.primary, fontSize: 32 }} />, title: 'Plantillas personalizadas', desc: 'Crea y reutiliza plantillas de diagramas.' },
  { icon: <Info sx={{ color: palette.primary, fontSize: 32 }} />, title: 'Integración con Slack', desc: 'Recibe notificaciones y comparte diagramas en Slack.' },
];

const tips = [
  'Utiliza plantillas para ahorrar tiempo en tus diagramas.',
  'Exporta tus diagramas en alta calidad para presentaciones.',
  'Comparte tus diagramas con tu equipo para recibir feedback.',
  'Aprovecha el modo oscuro para trabajar de noche.',
  'Guarda tus diagramas frecuentemente para evitar pérdidas.',
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '¡Trabajando de madrugada!';
  if (hour < 12) return '¡Buenos días!';
  if (hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleGoToDiagram = () => {
    navigate('/diagram');
  };

  const handleSendFeedback = () => {
    setFeedback('');
    setFeedbackOpen(false);
    alert('¡Gracias por tu feedback!');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: darkMode ? palette.primary : palette.secondary,
      pb: 6,
      transition: 'background 0.3s',
    }}>
      {/* AppBar superior */}
      <AppBar position="static" sx={{
        background: palette.secondary,
        color: palette.primary,
        boxShadow: '0 2px 12px rgba(99,86,59,0.08)',
      }}>
        <Toolbar>
          <Dashboard sx={{ mr: 2, color: palette.primary }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, color: palette.primary }}>
            Rimac Diagrams Home
          </Typography>
          <Tooltip title={darkMode ? 'Modo claro' : 'Modo oscuro'}>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <WbSunny sx={{ color: palette.accent }} /> : <Nightlight sx={{ color: palette.primary }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Feedback">
            <IconButton onClick={() => setFeedbackOpen(true)}>
              <Feedback sx={{ color: palette.primary }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Configuración">
            <IconButton>
              <Settings sx={{ color: palette.primary }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil">
            <IconButton>
              <AccountCircle sx={{ color: palette.primary }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cerrar sesión">
            <IconButton onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
              <Logout sx={{ color: palette.primary }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 6,
          px: 3,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" sx={{ color: palette.primary, fontWeight: 900, mb: 2 }}>
              {getGreeting()} Bienvenido a tu espacio de diagramas en la nube
            </Typography>
            <Typography variant="h6" sx={{ color: palette.dark, mb: 4 }}>
              Crea, visualiza y exporta tus diagramas de manera sencilla, rápida y segura.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIos />}
              sx={{
                background: palette.accent,
                color: palette.secondary,
                fontWeight: 700,
                fontSize: '1.2rem',
                px: 5,
                py: 2,
                borderRadius: '14px',
                boxShadow: '0 4px 24px rgba(99,86,59,0.18)',
                '&:hover': { background: palette.primary, color: palette.secondary },
                mb: 2,
              }}
              onClick={handleGoToDiagram}
            >
              Ir al Generador de Diagramas
            </Button>
          </motion.div>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: isMobile ? 4 : 0 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Avatar
            src={logo}
              alt="Logo"
              sx={{
                width: 180,
                height: 180,
                bgcolor: palette.primary,
                border: `6px solid ${palette.accent}`,
                boxShadow: '0 4px 24px rgba(99,86,59,0.18)',
              }}
            />
          </motion.div>
        </Box>
      </Box>

      {/* Estadísticas rápidas */}
      <Box sx={{ mt: 6, px: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {fakeStats.map((stat, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Paper
                elevation={4}
                sx={{
                  background: palette.secondary,
                  borderRadius: '16px',
                  p: 3,
                  textAlign: 'center',
                  boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.04)' },
                  border: `2px solid ${palette.primary}`,
                }}
              >
                <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h5" sx={{ color: palette.accent, fontWeight: 800 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: palette.primary, fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 8, px: 3 }}>
        <Typography variant="h4" sx={{ color: palette.primary, fontWeight: 800, mb: 3, textAlign: 'center' }}>
          ¿Qué puedes hacer aquí?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 + i * 0.1 }}
              >
                <Card
                  sx={{
                    background: palette.secondary,
                    borderRadius: '18px',
                    boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
                    minHeight: 220,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: `2px solid ${palette.primary}`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {f.icon}
                      <Typography variant="h6" sx={{ fontWeight: 700, color: palette.accent, ml: 2 }}>
                        {f.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: palette.primary, fontSize: '1.05rem' }}>
                      {f.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Divider sx={{ width: '100%', mb: 1 }} />
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Historial de diagramas recientes */}
      <Box sx={{ mt: 8, px: 3, maxWidth: 900, mx: 'auto' }}>
        <Paper
          elevation={4}
          sx={{
            background: palette.secondary,
            borderRadius: '18px',
            p: 4,
            boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
            mb: 4,
            border: `2px solid ${palette.primary}`,
          }}
        >
          <Typography variant="h5" sx={{ color: palette.accent, fontWeight: 800, mb: 2 }}>
            Diagramas recientes
          </Typography>
          <List>
            {fakeHistory.map((item, idx) => (
              <ListItem key={idx} divider>
                <ListItemIcon>
                  <CheckCircle sx={{ color: palette.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`Tipo: ${item.type} | Fecha: ${item.date} | Estado: ${item.status}`}
                  primaryTypographyProps={{ color: palette.accent, fontWeight: 600 }}
                  secondaryTypographyProps={{ color: palette.primary }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Tips Section */}
      <Box sx={{ mt: 4, px: 3, maxWidth: 900, mx: 'auto' }}>
        <Paper
          elevation={4}
          sx={{
            background: palette.secondary,
            borderRadius: '18px',
            p: 4,
            boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
            border: `2px solid ${palette.primary}`,
          }}
        >
          <Typography variant="h5" sx={{ color: palette.accent, fontWeight: 800, mb: 2 }}>
            Consejos para aprovechar al máximo la plataforma
          </Typography>
          <List>
            {tips.map((tip, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <CheckCircle sx={{ color: palette.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary={tip}
                  primaryTypographyProps={{ color: palette.accent, fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Próximamente */}
      <Box sx={{ mt: 8, px: 3, maxWidth: 900, mx: 'auto' }}>
        <Paper
          elevation={4}
          sx={{
            background: palette.secondary,
            borderRadius: '18px',
            p: 4,
            boxShadow: '0 2px 12px rgba(99,86,59,0.10)',
            border: `2px solid ${palette.primary}`,
          }}
        >
          <Typography variant="h5" sx={{ color: palette.accent, fontWeight: 800, mb: 2 }}>
            Próximamente
          </Typography>
          <Grid container spacing={2}>
            {comingSoon.map((item, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.icon}
                  <Box>
                    <Typography sx={{ color: palette.accent, fontWeight: 700 }}>{item.title}</Typography>
                    <Typography sx={{ color: palette.primary }}>{item.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Feedback Modal */}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>Envíanos tu feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="¿Qué te gustaría mejorar o reportar?"
            type="text"
            fullWidth
            multiline
            minRows={3}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSendFeedback} color="primary" disabled={!feedback.trim()}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box sx={{ mt: 8, textAlign: 'center', color: palette.primary, fontWeight: 600, fontSize: '1.1rem' }}>
        <Divider sx={{ mb: 2, background: palette.primary, opacity: 0.3 }} />
        <Typography>
          Cloud Diagrams &copy; {new Date().getFullYear()} &mdash; Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainPage;
