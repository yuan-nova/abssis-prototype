import { Box, Typography, Paper } from '@mui/material';
import { Construction } from '@mui/icons-material';

export default function PlaceholderPage({ title = 'Halaman' }: { title?: string }) {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Construction sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Typography color="text.secondary">Halaman ini sedang dalam pengembangan.</Typography>
    </Paper>
  );
}
