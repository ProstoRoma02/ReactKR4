import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const statusTextMap = {
  'not-started': 'Не начато',
  'in-progress': 'В процессе',
  completed: 'Завершено',
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    default:
      return 'default';
  }
};

const SimpleTechCard = ({ technology, onStatusChange }) => (
  <Card
    sx={{
      maxWidth: 360,
      backdropFilter: 'blur(12px)',
      borderRadius: 4,
      border: (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
    <CardContent>
      <Typography variant="h5" component="h3" gutterBottom>
        {technology.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {technology.description}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label={technology.category} variant="outlined" size="small" />
        <Chip
          label={statusTextMap[technology.status] || 'Не определено'}
          color={getStatusColor(technology.status)}
          size="small"
        />
      </Box>
    </CardContent>

    <CardActions>
      {technology.status !== 'completed' && (
        <Button size="small" variant="contained" onClick={() => onStatusChange(technology.id, 'completed')}>
          Завершить
        </Button>
      )}

      <Button
        size="small"
        variant="outlined"
        onClick={() =>
          onStatusChange(technology.id, technology.status === 'in-progress' ? 'not-started' : 'in-progress')
        }
      >
        {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
      </Button>
    </CardActions>
  </Card>
);

export default SimpleTechCard;

