import { useState } from 'react';
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const notificationPresets = [
  { type: 'success', label: 'Успех', icon: <CheckCircleOutlineIcon fontSize="small" /> },
  { type: 'error', label: 'Ошибка', icon: <ErrorOutlineIcon fontSize="small" /> },
  { type: 'warning', label: 'Предупреждение', icon: <WarningAmberIcon fontSize="small" /> },
  { type: 'info', label: 'Инфо', icon: <InfoOutlinedIcon fontSize="small" /> },
];

const messages = {
  success: 'Задача успешно завершена.',
  error: 'Произошла ошибка при сохранении данных.',
  warning: 'Проверьте заполненные поля и попробуйте снова.',
  info: 'Напоминание: обновите дорожную карту.',
};

const NotificationCenter = () => {
  const [active, setActive] = useState(null);

  const handleShow = (type) => setActive({ type, message: messages[type] });
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setActive(null);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Уведомления
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        {notificationPresets.map((preset) => (
          <Button
            key={preset.type}
            variant="outlined"
            startIcon={preset.icon}
            onClick={() => handleShow(preset.type)}
            sx={{ minWidth: 160 }}
          >
            {preset.label}
          </Button>
        ))}
      </Stack>
      <Snackbar
        open={Boolean(active)}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={active?.type} variant="filled" sx={{ width: '100%' }}>
          {active?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationCenter;

