import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Save, Upload, Edit, Block } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const studentOptions = ['Ahmad Rizki (10-A)', 'Ayu Safitri (10-B)', 'Bagas Setiawan (11-A)', 'Citra Permata (10-C)', 'Dimas Aditya (11-B)', 'Eka Putri (11-A)', 'Farel Anggara (12-A)', 'Hadi Kurniawan (12-B)', 'Indah Lestari (11-C)', 'Joko Susanto (11-C)'];
const categories = [
  { name: 'Berkelahi', points: 15 }, { name: 'Merokok', points: 20 }, { name: 'Pelanggaran Seragam', points: 5 },
  { name: 'Terlambat Berulang', points: 5 }, { name: 'Membolos', points: 10 }, { name: 'Bullying', points: 25 },
  { name: 'Vandalisme', points: 15 }, { name: 'Penggunaan HP', points: 5 },
];

const rows = [
  { id: 1, date: '2026-01-31', student: 'Hadi Kurniawan', kelas: '12-B', category: 'Membolos', points: 10, action: 'Peringatan Tertulis', status: 'Aktif' },
  { id: 2, date: '2026-01-31', student: 'Oki Setiawan', kelas: '10-B', category: 'Merokok', points: 20, action: 'Panggilan Orang Tua', status: 'Aktif' },
  { id: 3, date: '2026-01-30', student: 'Dimas Aditya', kelas: '11-B', category: 'Pelanggaran Seragam', points: 5, action: 'Peringatan Lisan', status: 'Aktif' },
  { id: 4, date: '2026-01-30', student: 'Bagas Setiawan', kelas: '11-A', category: 'Terlambat Berulang', points: 5, action: 'Peringatan Lisan', status: 'Aktif' },
  { id: 5, date: '2026-01-29', student: 'Taufik Hidayat', kelas: '10-A', category: 'Berkelahi', points: 15, action: 'Skorsing', status: 'Aktif' },
  { id: 6, date: '2026-01-29', student: 'Farel Anggara', kelas: '12-A', category: 'Penggunaan HP', points: 5, action: 'Peringatan Lisan', status: 'Aktif' },
  { id: 7, date: '2026-01-28', student: 'Joko Susanto', kelas: '11-C', category: 'Membolos', points: 10, action: 'Peringatan Tertulis', status: 'Aktif' },
  { id: 8, date: '2026-01-28', student: 'Sinta Dewi', kelas: '12-B', category: 'Penggunaan HP', points: 5, action: 'Peringatan Lisan', status: 'Dibatalkan' },
  { id: 9, date: '2026-01-27', student: 'Reza Firmansyah', kelas: '12-A', category: 'Terlambat Berulang', points: 5, action: 'Peringatan Lisan', status: 'Aktif' },
  { id: 10, date: '2026-01-27', student: 'Lina Marlina', kelas: '10-C', category: 'Pelanggaran Seragam', points: 5, action: 'Peringatan Lisan', status: 'Aktif' },
  { id: 11, date: '2026-01-26', student: 'Hadi Kurniawan', kelas: '12-B', category: 'Bullying', points: 25, action: 'Skorsing', status: 'Aktif' },
  { id: 12, date: '2026-01-25', student: 'Bagas Setiawan', kelas: '11-A', category: 'Vandalisme', points: 15, action: 'Panggilan Orang Tua', status: 'Aktif' },
];

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal', width: 110 },
  { field: 'student', headerName: 'Siswa', flex: 1, minWidth: 150 },
  { field: 'kelas', headerName: 'Kelas', width: 70 },
  { field: 'category', headerName: 'Kategori', width: 160 },
  { field: 'points', headerName: 'Poin', width: 70, type: 'number' },
  { field: 'action', headerName: 'Tindakan', width: 160 },
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Aktif' ? 'error' : 'default'} variant={p.value === 'Aktif' ? 'filled' : 'outlined'} /> },
  { field: 'actions', headerName: 'Aksi', width: 110, sortable: false, renderCell: (p) => {
    const { enqueueSnackbar } = useSnackbar();
    return (
      <Box><IconButton size="small"><Edit fontSize="small" /></IconButton><IconButton size="small" onClick={() => enqueueSnackbar('Pelanggaran dibatalkan', { variant: 'warning' })} disabled={p.row.status !== 'Aktif'}><Block fontSize="small" /></IconButton></Box>
    );
  }},
];

export default function ViolationInputPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCat, setSelectedCat] = useState('');
  const [points, setPoints] = useState('');

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Input Pelanggaran</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Catat Pelanggaran Baru</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Autocomplete options={studentOptions} renderInput={(params) => <TextField {...params} label="Pilih Siswa" size="small" />} />
          <FormControl size="small"><InputLabel>Kategori</InputLabel><Select label="Kategori" value={selectedCat} onChange={(e) => { setSelectedCat(e.target.value); const c = categories.find((c) => c.name === e.target.value); if (c) setPoints(String(c.points)); }}>
            {categories.map((c) => <MenuItem key={c.name} value={c.name}>{c.name} ({c.points} poin)</MenuItem>)}
          </Select></FormControl>
          <TextField label="Poin" type="number" size="small" value={points} onChange={(e) => setPoints(e.target.value)} />
          <TextField label="Tanggal" type="date" size="small" defaultValue="2026-02-01" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Deskripsi/Kronologi" multiline rows={3} size="small" sx={{ gridColumn: '1 / -1' }} />
          <FormControl size="small"><InputLabel>Tindakan</InputLabel><Select label="Tindakan" defaultValue=""><MenuItem value="Peringatan Lisan">Peringatan Lisan</MenuItem><MenuItem value="Peringatan Tertulis">Peringatan Tertulis</MenuItem><MenuItem value="Panggilan Orang Tua">Panggilan Orang Tua</MenuItem><MenuItem value="Skorsing">Skorsing</MenuItem></Select></FormControl>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button variant="outlined" startIcon={<Upload />} onClick={() => enqueueSnackbar('Bukti berhasil diupload', { variant: 'success' })}>Upload Bukti</Button>
            <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Pelanggaran berhasil dicatat', { variant: 'success' })}>Simpan</Button>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Pelanggaran</Typography>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
    </Box>
  );
}
