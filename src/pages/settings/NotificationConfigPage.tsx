import { Box, Typography, Button, Paper, TextField, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const notifications = [
  { type: 'Kehadiran Alpha', enabled: true, priority: 'Normal' },
  { type: 'Keterlambatan', enabled: true, priority: 'Normal' },
  { type: 'Sakit/Izin', enabled: true, priority: 'Low' },
  { type: 'Izin Tengah Hari', enabled: true, priority: 'Normal' },
  { type: 'Poin Ditambahkan', enabled: true, priority: 'High' },
  { type: 'Poin Disesuaikan', enabled: false, priority: 'Low' },
  { type: 'Ambang Batas Tercapai', enabled: true, priority: 'Urgent' },
];

export default function NotificationConfigPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Konfigurasi Notifikasi</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Tipe Notifikasi</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead><TableRow><TableCell>Tipe Notifikasi</TableCell><TableCell>Aktif</TableCell><TableCell>Prioritas</TableCell></TableRow></TableHead>
            <TableBody>
              {notifications.map((n) => (
                <TableRow key={n.type}>
                  <TableCell>{n.type}</TableCell>
                  <TableCell><Switch defaultChecked={n.enabled} /></TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 120 }}><Select defaultValue={n.priority}><MenuItem value="Low">Low</MenuItem><MenuItem value="Normal">Normal</MenuItem><MenuItem value="High">High</MenuItem><MenuItem value="Urgent">Urgent</MenuItem></Select></FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pengaturan Pengiriman</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Jeda antar pesan (detik)" type="number" defaultValue={5} />
          <TextField label="Batas pesan harian" type="number" defaultValue={500} />
          <TextField label="Percobaan ulang maksimal" type="number" defaultValue={3} />
          <Box />
          <TextField label="Jam tenang mulai" type="time" defaultValue="21:00" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Jam tenang selesai" type="time" defaultValue="06:00" slotProps={{ inputLabel: { shrink: true } }} />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Konfigurasi notifikasi berhasil disimpan', { variant: 'success' })}>Simpan</Button>
        <Button variant="outlined" startIcon={<Send />} onClick={() => enqueueSnackbar('Pesan test dikirim ke nomor admin', { variant: 'info' })}>Kirim Test</Button>
      </Box>
    </Box>
  );
}
