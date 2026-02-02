import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Divider, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Save, ContentCopy } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const students = [
  'Ahmad Rizki Pratama', 'Ayu Safitri', 'Bagas Setiawan', 'Citra Permata Sari', 'Dimas Aditya Putra',
  'Eka Putri Rahayu', 'Farel Anggara', 'Gita Nadia Permata', 'Hadi Kurniawan', 'Indah Lestari',
  'Joko Susanto', 'Kartika Sari', 'Lina Marlina', 'Muhammad Fajar', 'Nadia Permata',
  'Oki Setiawan', 'Putri Wulandari', 'Reza Firmansyah', 'Sinta Dewi', 'Taufik Hidayat',
];

const recentJournals = [
  { id: 1, date: '2026-01-31', subject: 'Matematika', kelas: '10-A', period: 1, material: 'Persamaan Kuadrat - Diskriminan', status: 'Terisi' },
  { id: 2, date: '2026-01-31', subject: 'Matematika', kelas: '10-B', period: 3, material: 'Persamaan Kuadrat - Rumus ABC', status: 'Terisi' },
  { id: 3, date: '2026-01-30', subject: 'Matematika', kelas: '10-A', period: 1, material: 'Pengantar Persamaan Kuadrat', status: 'Terisi' },
  { id: 4, date: '2026-01-30', subject: 'Matematika', kelas: '10-C', period: 5, material: 'Pengantar Persamaan Kuadrat', status: 'Terisi' },
  { id: 5, date: '2026-01-29', subject: 'Matematika', kelas: '11-A', period: 2, material: 'Turunan Fungsi Aljabar', status: 'Terisi' },
];

const recentCols: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal', width: 110 },
  { field: 'subject', headerName: 'Mapel', width: 120 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'period', headerName: 'Jam Ke', width: 80 },
  { field: 'material', headerName: 'Materi', flex: 1, minWidth: 200 },
  { field: 'status', headerName: 'Status', width: 90, renderCell: () => <Chip label="Terisi" size="small" color="success" /> },
];

export default function JournalInputPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [material, setMaterial] = useState('');
  const [attendance, setAttendance] = useState<Record<string, boolean>>(Object.fromEntries(students.map((s) => [s, true])));

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Input Jurnal Mengajar</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
          <FormControl size="small"><InputLabel>Mata Pelajaran</InputLabel><Select label="Mata Pelajaran" defaultValue="MTK"><MenuItem value="MTK">Matematika</MenuItem><MenuItem value="BIN">B. Indonesia</MenuItem><MenuItem value="BIG">B. Inggris</MenuItem><MenuItem value="FIS">Fisika</MenuItem></Select></FormControl>
          <FormControl size="small"><InputLabel>Kelas</InputLabel><Select label="Kelas" defaultValue="10-A"><MenuItem value="10-A">10-A</MenuItem><MenuItem value="10-B">10-B</MenuItem><MenuItem value="10-C">10-C</MenuItem></Select></FormControl>
          <FormControl size="small"><InputLabel>Jam Ke</InputLabel><Select label="Jam Ke" defaultValue={1}>{[1,2,3,4,5,6,7,8].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}</Select></FormControl>
          <TextField label="Tanggal" type="date" defaultValue="2026-02-01" size="small" slotProps={{ inputLabel: { shrink: true } }} />
        </Box>

        <TextField label="Materi Pembelajaran" multiline rows={3} fullWidth value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Minimal 20 karakter..." sx={{ mb: 1 }} helperText={`${material.length}/20 karakter minimum`} error={material.length > 0 && material.length < 20} />
        <TextField label="Metode Mengajar" fullWidth sx={{ mb: 2 }} placeholder="Ceramah, diskusi, praktikum, dll." />
        <TextField label="Tugas/PR" fullWidth sx={{ mb: 2 }} placeholder="Opsional" />
        <TextField label="Catatan" multiline rows={2} fullWidth sx={{ mb: 2 }} placeholder="Catatan tambahan..." />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>Kehadiran Siswa ({Object.values(attendance).filter(Boolean).length}/{students.length} hadir)</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 0.5 }}>
          {students.map((s) => (
            <FormControlLabel key={s} control={<Checkbox checked={attendance[s]} onChange={(e) => setAttendance((p) => ({ ...p, [s]: e.target.checked }))} size="small" />} label={<Typography variant="body2">{s}</Typography>} />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Jurnal berhasil disimpan', { variant: 'success' })}>Simpan Jurnal</Button>
          <Button variant="outlined" startIcon={<ContentCopy />} onClick={() => enqueueSnackbar('Materi dari pertemuan sebelumnya disalin', { variant: 'info' })}>Salin dari Pertemuan Sebelumnya</Button>
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Jurnal Saya</Typography>
      <DataGrid rows={recentJournals} columns={recentCols} autoHeight pageSizeOptions={[5]} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} />
    </Box>
  );
}
