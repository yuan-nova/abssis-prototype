import { Box, Typography, Button, Card, CardContent, Chip, Paper } from '@mui/material';
import { Circle, Send, LinkOff, Refresh } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const stats = [
  { label: 'Terkirim Minggu Ini', value: '312', color: '#388e3c' },
  { label: 'Gagal', value: '8', color: '#d32f2f' },
  { label: 'Antrian', value: '5', color: '#f57c00' },
  { label: 'Tingkat Keberhasilan', value: '97.5%', color: '#1976d2' },
];

export default function GatewayStatusPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>WhatsApp Gateway</Typography>

      <Card sx={{ mb: 3, border: '2px solid #4caf50' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Circle sx={{ fontSize: 48, color: '#4caf50' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700} color="success.main">Terhubung</Typography>
            <Typography variant="body2" color="text.secondary">Nomor: +62 812-3456-7890</Typography>
            <Typography variant="body2" color="text.secondary">Terhubung sejak: 30 Januari 2026, 08:00 WIB</Typography>
            <Typography variant="body2" color="text.secondary">Pesan terkirim hari ini: 45 | Gagal: 2</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="outlined" color="error" startIcon={<LinkOff />} onClick={() => enqueueSnackbar('Koneksi diputus', { variant: 'warning' })}>Putuskan</Button>
            <Button variant="contained" startIcon={<Send />} onClick={() => enqueueSnackbar('Pesan test berhasil dikirim', { variant: 'success' })}>Kirim Test</Button>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>QR Code</Typography>
        <Box sx={{ width: 200, height: 200, bgcolor: '#e0e0e0', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
          <Typography color="text.secondary" variant="body2">QR Code akan muncul di sini saat perlu autentikasi ulang</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Refresh />} sx={{ mt: 2 }} onClick={() => enqueueSnackbar('Mencoba menghubungkan ulang...', { variant: 'info' })}>Hubungkan Ulang</Button>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
        {stats.map((s) => (
          <Card key={s.label}><CardContent sx={{ textAlign: 'center' }}><Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography><Typography variant="body2" color="text.secondary">{s.label}</Typography></CardContent></Card>
        ))}
      </Box>
    </Box>
  );
}
