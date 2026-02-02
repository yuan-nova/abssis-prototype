import { Box, Typography, Button, Paper, TextField, Switch, FormControlLabel, Card, CardContent, Chip } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const levels = [
  { name: 'Kuning (Warning)', color: '#ff9800', threshold: 25, action: 'Peringatan lisan oleh wali kelas' },
  { name: 'Oranye (Danger)', color: '#f57c00', threshold: 50, action: 'Panggilan orang tua dan konseling BK' },
  { name: 'Merah (Critical)', color: '#d32f2f', threshold: 75, action: 'Skorsing dan surat peringatan tertulis' },
];

export default function PointThresholdsPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Ambang Batas Poin Disiplin</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Poin Otomatis</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <TextField label="Poin Alpha" type="number" defaultValue={10} sx={{ width: 150 }} />
          <TextField label="Poin Terlambat" type="number" defaultValue={5} sx={{ width: 150 }} />
        </Box>
      </Paper>
      <Typography variant="h6" sx={{ mb: 2 }}>Level Peringatan</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        {levels.map((l) => (
          <Card key={l.name} sx={{ borderTop: `4px solid ${l.color}` }}>
            <CardContent>
              <Chip label={l.name} sx={{ bgcolor: l.color, color: '#fff', mb: 2, fontWeight: 600 }} />
              <TextField label="Ambang Batas (poin)" type="number" defaultValue={l.threshold} fullWidth sx={{ mb: 2 }} />
              <TextField label="Tindakan" defaultValue={l.action} fullWidth multiline rows={2} />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pengaturan Lainnya</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Notifikasi otomatis saat mencapai ambang batas" />
          <FormControlLabel control={<Switch defaultChecked />} label="Poin otomatis aktif (Alpha & Terlambat)" />
          <TextField label="Batas koreksi kehadiran (hari)" type="number" defaultValue={7} sx={{ width: 250 }} />
        </Box>
      </Paper>
      <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Ambang batas poin berhasil disimpan', { variant: 'success' })}>Simpan</Button>
    </Box>
  );
}
