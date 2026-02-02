import { Box, Typography, Button, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const schedule = [
  { day: 'Senin', start: '07:00', end: '15:00' }, { day: 'Selasa', start: '07:00', end: '15:00' },
  { day: 'Rabu', start: '07:00', end: '15:00' }, { day: 'Kamis', start: '07:00', end: '15:00' },
  { day: 'Jumat', start: '07:00', end: '11:30' },
];

export default function SchoolHoursPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Pengaturan Jam Sekolah</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Waktu Utama</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Jam Masuk" type="time" defaultValue="07:00" slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Batas Terlambat" type="time" defaultValue="07:15" slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Jam Pulang" type="time" defaultValue="15:00" slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Finalisasi Kehadiran" type="time" defaultValue="09:00" slotProps={{ inputLabel: { shrink: true } }} />
          </Box>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Jam Istirahat</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}><TextField label="Istirahat 1 Mulai" type="time" defaultValue="09:30" slotProps={{ inputLabel: { shrink: true } }} /><TextField label="Selesai" type="time" defaultValue="10:00" slotProps={{ inputLabel: { shrink: true } }} /></Box>
            <Box sx={{ display: 'flex', gap: 2 }}><TextField label="Istirahat 2 Mulai" type="time" defaultValue="12:00" slotProps={{ inputLabel: { shrink: true } }} /><TextField label="Selesai" type="time" defaultValue="12:30" slotProps={{ inputLabel: { shrink: true } }} /></Box>
          </Box>
        </Paper>
      </Box>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Jadwal per Hari</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead><TableRow><TableCell>Hari</TableCell><TableCell>Jam Masuk</TableCell><TableCell>Jam Pulang</TableCell></TableRow></TableHead>
            <TableBody>{schedule.map((s) => <TableRow key={s.day}><TableCell>{s.day}</TableCell><TableCell><TextField type="time" defaultValue={s.start} size="small" sx={{ width: 130 }} slotProps={{ inputLabel: { shrink: true } }} /></TableCell><TableCell><TextField type="time" defaultValue={s.end} size="small" sx={{ width: 130 }} slotProps={{ inputLabel: { shrink: true } }} /></TableCell></TableRow>)}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ mt: 3 }}><Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Pengaturan jam sekolah berhasil disimpan', { variant: 'success' })}>Simpan</Button></Box>
    </Box>
  );
}
