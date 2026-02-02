import { Box, Typography, Button, Paper, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

const studentOptions = ['Hadi Kurniawan - 65 poin (12-B)', 'Bagas Setiawan - 55 poin (11-A)', 'Dimas Aditya - 50 poin (11-B)', 'Farel Anggara - 45 poin (12-A)', 'Oki Setiawan - 40 poin (10-B)'];

const historyRows = [
  { id: 1, date: '2026-01-20', target: 'Reza Firmansyah', type: 'Parsial', before: 30, after: 15, reason: 'Perilaku baik selama 2 bulan', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
  { id: 2, date: '2026-01-15', target: 'Sinta Dewi', type: 'Penuh', before: 25, after: 0, reason: 'Telah menjalani konseling lengkap', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
  { id: 3, date: '2026-01-10', target: 'Lina Marlina', type: 'Parsial', before: 20, after: 10, reason: 'Perilaku membaik, aktif kegiatan positif', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
  { id: 4, date: '2026-01-08', target: 'Kartika Sari', type: 'Penuh', before: 15, after: 0, reason: 'Lulus semester dengan catatan baik', status: 'Ditolak', approvedBy: '-' },
  { id: 5, date: '2025-12-20', target: 'Kelas 12 (Semester)', type: 'Parsial', before: '-', after: '-', reason: 'Reset semester ganjil kelas 12', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
  { id: 6, date: '2025-12-15', target: 'Joko Susanto', type: 'Penuh', before: 35, after: 0, reason: 'Hasil mediasi dengan orang tua', status: 'Menunggu', approvedBy: '-' },
  { id: 7, date: '2025-12-10', target: 'Taufik Hidayat', type: 'Parsial', before: 28, after: 14, reason: 'Aktif ikut kegiatan OSIS', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
  { id: 8, date: '2025-12-01', target: 'Ahmad Rizki', type: 'Penuh', before: 10, after: 0, reason: 'Poin rendah, perilaku baik', status: 'Disetujui', approvedBy: 'Dra. Hj. Siti Aminah' },
];

const histCols: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal', width: 110 },
  { field: 'target', headerName: 'Siswa/Kelas', flex: 1, minWidth: 160 },
  { field: 'type', headerName: 'Tipe', width: 90, renderCell: (p) => <Chip label={p.value} size="small" variant="outlined" /> },
  { field: 'before', headerName: 'Sebelum', width: 80 },
  { field: 'after', headerName: 'Sesudah', width: 80 },
  { field: 'reason', headerName: 'Alasan', flex: 1, minWidth: 200 },
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Disetujui' ? 'success' : p.value === 'Menunggu' ? 'warning' : 'error'} /> },
  { field: 'approvedBy', headerName: 'Disetujui Oleh', width: 180 },
];

export default function PointResetPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Reset Poin Disiplin</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Reset Individual</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Autocomplete options={studentOptions} renderInput={(params) => <TextField {...params} label="Pilih Siswa" size="small" />} />
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">Poin Saat Ini: <strong>65</strong></Typography>
              <Typography variant="body2" color="text.secondary">Total Pelanggaran: <strong>8 kasus</strong></Typography>
            </Paper>
            <FormControl size="small"><InputLabel>Tipe Reset</InputLabel><Select label="Tipe Reset" defaultValue="Penuh"><MenuItem value="Penuh">Penuh (Reset ke 0)</MenuItem><MenuItem value="Parsial">Parsial (Kurangi sebagian)</MenuItem></Select></FormControl>
            <TextField label="Jumlah Poin Dikurangi" type="number" size="small" placeholder="Untuk tipe Parsial" />
            <TextField label="Alasan Reset" multiline rows={2} size="small" />
            <Button variant="contained" onClick={() => enqueueSnackbar('Pengajuan reset berhasil, menunggu persetujuan Kepsek', { variant: 'info' })}>Ajukan Reset</Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Reset Kelas Lulus</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl size="small"><InputLabel>Kelas</InputLabel><Select label="Kelas" defaultValue=""><MenuItem value="12-A">Kelas 12-A (34 siswa)</MenuItem><MenuItem value="12-B">Kelas 12-B (35 siswa)</MenuItem><MenuItem value="12-C">Kelas 12-C (33 siswa)</MenuItem></Select></FormControl>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">Jumlah Siswa: <strong>34</strong></Typography>
              <Typography variant="body2" color="text.secondary">Total Poin Kelas: <strong>450</strong></Typography>
              <Typography variant="body2" color="text.secondary">Rata-rata Poin: <strong>13.2</strong></Typography>
            </Paper>
            <Button variant="contained" color="warning" onClick={() => setConfirmOpen(true)}>Reset Semua</Button>
          </Box>
        </Paper>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Reset</Typography>
      <DataGrid rows={historyRows} columns={histCols} autoHeight pageSizeOptions={[10]} />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Konfirmasi Reset Massal</DialogTitle>
        <DialogContent><Typography>Reset poin semua siswa di kelas terpilih ke 0? Tindakan ini memerlukan persetujuan Kepsek.</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Batal</Button>
          <Button variant="contained" color="warning" onClick={() => { setConfirmOpen(false); enqueueSnackbar('Pengajuan reset massal berhasil, menunggu persetujuan Kepsek', { variant: 'info' }); }}>Konfirmasi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
