import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

const presentStudents = ['Ahmad Rizki Pratama (10-A)', 'Ayu Safitri (10-B)', 'Citra Permata Sari (10-C)', 'Dimas Aditya Putra (11-B)', 'Eka Putri Rahayu (11-A)', 'Gita Nadia Permata (10-A)', 'Indah Lestari (11-C)', 'Kartika Sari (12-C)'];
const periodOptions = ['Jam ke-4', 'Jam ke-5', 'Jam ke-6', 'Jam ke-7', 'Jam ke-8'];

const rows = [
  { id: 1, student: 'Bagas Setiawan', kelas: '11-A', time: '09:30', reason: 'Dijemput orang tua - kontrol ke dokter', periods: 'Jam 4-8', status: 'Disetujui' },
  { id: 2, student: 'Hadi Kurniawan', kelas: '12-B', time: '10:15', reason: 'Sakit perut, perlu ke klinik', periods: 'Jam 5-8', status: 'Disetujui' },
  { id: 3, student: 'Nadia Permata', kelas: '10-C', time: '11:00', reason: 'Acara keluarga mendesak', periods: 'Jam 6-8', status: 'Disetujui' },
  { id: 4, student: 'Farel Anggara', kelas: '12-A', time: '12:30', reason: 'Les persiapan UTBK', periods: 'Jam 7-8', status: 'Menunggu' },
  { id: 5, student: 'Joko Susanto', kelas: '11-C', time: '09:45', reason: 'Dipanggil orang tua', periods: 'Jam 4-8', status: 'Disetujui' },
];

const columns: GridColDef[] = [
  { field: 'student', headerName: 'Nama Siswa', flex: 1, minWidth: 160 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'time', headerName: 'Jam Keluar', width: 100 },
  { field: 'reason', headerName: 'Alasan', flex: 1, minWidth: 200 },
  { field: 'periods', headerName: 'Jam Terlewat', width: 120 },
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Disetujui' ? 'success' : 'warning'} /> },
];

export default function MidDayPermissionPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Izin Tengah Hari</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Input Izin Baru</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Autocomplete options={presentStudents} renderInput={(params) => <TextField {...params} label="Pilih Siswa (Hadir Hari Ini)" size="small" />} />
          <TextField label="Jam Keluar" type="time" defaultValue="10:00" size="small" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Alasan" multiline rows={2} size="small" sx={{ gridColumn: '1 / -1' }} />
          <FormControl size="small">
            <InputLabel>Jam Pelajaran Terlewat</InputLabel>
            <Select multiple value={selectedPeriods} onChange={(e) => setSelectedPeriods(e.target.value as string[])} input={<OutlinedInput label="Jam Pelajaran Terlewat" />} renderValue={(sel) => sel.join(', ')}>
              {periodOptions.map((p) => <MenuItem key={p} value={p}><Checkbox checked={selectedPeriods.includes(p)} /><ListItemText primary={p} /></MenuItem>)}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button variant="contained" onClick={() => enqueueSnackbar('Izin tengah hari berhasil disimpan', { variant: 'success' })}>Simpan</Button>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Izin Hari Ini</Typography>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />
    </Box>
  );
}
