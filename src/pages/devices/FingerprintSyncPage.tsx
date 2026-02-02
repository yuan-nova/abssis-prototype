import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fingerprint, Refresh } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const studentOptions = [
  'Ahmad Rizki Pratama (10-A)', 'Ayu Safitri (10-B)', 'Bagas Setiawan (11-A)', 'Citra Permata Sari (10-C)',
  'Dimas Aditya Putra (11-B)', 'Eka Putri Rahayu (11-A)', 'Farel Anggara (12-A)', 'Gita Nadia Permata (10-A)',
  'Hadi Kurniawan (12-B)', 'Indah Lestari (11-C)', 'Joko Susanto (10-B)', 'Kartika Sari (12-C)',
];

const syncStatus = [
  { id: 1, device: 'Gerbang Utama', status: 'Berhasil', templates: 612, lastSync: '2026-01-31 07:30' },
  { id: 2, device: 'Gerbang Belakang', status: 'Berhasil', templates: 612, lastSync: '2026-01-31 07:30' },
  { id: 3, device: 'Gedung A Lt.1', status: 'Berhasil', templates: 612, lastSync: '2026-01-31 07:31' },
  { id: 4, device: 'Gedung A Lt.2', status: 'Gagal', templates: 610, lastSync: '2026-01-30 15:00' },
  { id: 5, device: 'Gedung B Lt.1', status: 'Berhasil', templates: 612, lastSync: '2026-01-31 07:31' },
  { id: 6, device: 'Gedung B Lt.2', status: 'Menunggu', templates: 608, lastSync: '2026-01-29 08:00' },
];

const history = [
  { id: 1, date: '2026-01-31 07:30', student: 'Nadia Permata (10-C)', device: 'Gerbang Utama', finger: 'Jari Telunjuk Kanan', syncStatus: '5/6 berhasil' },
  { id: 2, date: '2026-01-30 10:15', student: 'Budi Setiawan (11-A)', device: 'Gerbang Utama', finger: 'Jari Telunjuk Kanan', syncStatus: '6/6 berhasil' },
  { id: 3, date: '2026-01-30 09:45', student: 'Siti Aminah (10-B)', device: 'Gedung A Lt.1', finger: 'Jari Jempol Kanan', syncStatus: '6/6 berhasil' },
  { id: 4, date: '2026-01-29 14:20', student: 'Reza Firmansyah (12-A)', device: 'Gerbang Utama', finger: 'Jari Telunjuk Kanan', syncStatus: '5/6 berhasil' },
  { id: 5, date: '2026-01-29 11:00', student: 'Dewi Anggraini (11-B)', device: 'Gerbang Utama', finger: 'Jari Jempol Kanan', syncStatus: '6/6 berhasil' },
];

const histCols: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal', width: 160 },
  { field: 'student', headerName: 'Siswa', flex: 1, minWidth: 180 },
  { field: 'device', headerName: 'Perangkat', width: 150 },
  { field: 'finger', headerName: 'Jari', width: 160 },
  { field: 'syncStatus', headerName: 'Status Sync', width: 130, renderCell: (p) => <Chip label={p.value} size="small" color={String(p.value).startsWith('6') ? 'success' : 'warning'} /> },
];

export default function FingerprintSyncPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [registering, setRegistering] = useState(false);

  const handleRegister = () => {
    setRegistering(true);
    setTimeout(() => { setRegistering(false); enqueueSnackbar('Sidik jari berhasil diregistrasi dan disinkronkan ke 5/6 perangkat', { variant: 'success' }); }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Sinkronisasi Sidik Jari</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Registrasi Sidik Jari</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
          <Autocomplete options={studentOptions} renderInput={(params) => <TextField {...params} label="Pilih Siswa" size="small" />} />
          <FormControl size="small"><InputLabel>Perangkat Registrasi</InputLabel><Select label="Perangkat Registrasi" defaultValue="1"><MenuItem value="1">Gerbang Utama</MenuItem><MenuItem value="3">Gedung A Lt.1</MenuItem></Select></FormControl>
          <Button variant="contained" startIcon={<Fingerprint />} onClick={handleRegister} disabled={registering}>{registering ? 'Menunggu...' : 'Mulai Registrasi'}</Button>
        </Box>
        {registering && <LinearProgress sx={{ mt: 2 }} />}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Status Sinkronisasi per Perangkat</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          {syncStatus.map((s) => (
            <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">{s.device}</Typography>
                <Chip label={s.status} size="small" color={s.status === 'Berhasil' ? 'success' : s.status === 'Gagal' ? 'error' : 'warning'} />
              </Box>
              <Typography variant="caption" color="text.secondary">Templates: {s.templates} | Last: {s.lastSync}</Typography>
              {s.status === 'Gagal' && <Box sx={{ mt: 1 }}><Button size="small" startIcon={<Refresh />} onClick={() => enqueueSnackbar(`Sinkronisasi ulang ke ${s.device}...`, { variant: 'info' })}>Sync Ulang</Button></Box>}
            </Paper>
          ))}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Registrasi</Typography>
        <DataGrid rows={history} columns={histCols} autoHeight pageSizeOptions={[10]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Paper>
    </Box>
  );
}
