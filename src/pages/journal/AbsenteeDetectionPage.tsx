import { Box, Typography, Button, Chip, Alert, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Warning } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, student: 'Bagas Setiawan', kelas: '11-A', scanPagi: '07:05', jamAbsen: 'Jam 4, 5', guru: 'Sri Wahyuni', status: 'Terindikasi Bolos' },
  { id: 2, student: 'Hadi Kurniawan', kelas: '12-B', scanPagi: '07:02', jamAbsen: 'Jam 5, 6, 7', guru: 'Eko Prasetyo', status: 'Terindikasi Bolos' },
  { id: 3, student: 'Farel Anggara', kelas: '12-A', scanPagi: '07:08', jamAbsen: 'Jam 6, 7, 8', guru: 'Dewi Lestari', status: 'Izin Tengah Hari' },
  { id: 4, student: 'Dimas Aditya', kelas: '11-B', scanPagi: '07:12', jamAbsen: 'Jam 3, 4', guru: 'Ahmad Fauzi', status: 'Terindikasi Bolos' },
  { id: 5, student: 'Nadia Permata', kelas: '10-C', scanPagi: '07:04', jamAbsen: 'Jam 7, 8', guru: 'Nur Hidayah', status: 'Dikonfirmasi' },
  { id: 6, student: 'Joko Susanto', kelas: '11-C', scanPagi: '07:10', jamAbsen: 'Jam 4, 5, 6', guru: 'Budi Santoso', status: 'Terindikasi Bolos' },
  { id: 7, student: 'Reza Firmansyah', kelas: '12-A', scanPagi: '07:06', jamAbsen: 'Jam 5', guru: 'Maria Ulfa', status: 'Dikonfirmasi' },
  { id: 8, student: 'Oki Setiawan', kelas: '10-B', scanPagi: '07:14', jamAbsen: 'Jam 6, 7, 8', guru: 'Putri Handayani', status: 'Terindikasi Bolos' },
];

const columns: GridColDef[] = [
  { field: 'student', headerName: 'Nama Siswa', flex: 1, minWidth: 160 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'scanPagi', headerName: 'Scan Pagi', width: 100 },
  { field: 'jamAbsen', headerName: 'Jam Tidak Hadir', width: 140 },
  { field: 'guru', headerName: 'Guru Pelapor', width: 140 },
  { field: 'status', headerName: 'Status', width: 160, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Terindikasi Bolos' ? 'error' : p.value === 'Dikonfirmasi' ? 'warning' : 'info'} /> },
  { field: 'actions', headerName: 'Aksi', width: 220, sortable: false, renderCell: (p) => {
    const { enqueueSnackbar } = useSnackbar();
    return p.row.status === 'Terindikasi Bolos' ? (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button size="small" variant="contained" color="error" onClick={() => enqueueSnackbar('Bolos dikonfirmasi. Poin +10 ditambahkan', { variant: 'warning' })}>Konfirmasi</Button>
        <Button size="small" variant="outlined" onClick={() => enqueueSnackbar('Ditandai sebagai izin', { variant: 'info' })}>Izin</Button>
      </Box>
    ) : <Chip label="Sudah Ditangani" size="small" variant="outlined" />;
  }},
];

export default function AbsenteeDetectionPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Warning color="warning" />
        <Typography variant="h4" fontWeight={700}>Deteksi Siswa Bolos</Typography>
      </Box>

      <Alert severity="warning" sx={{ mb: 3 }}>
        Ditemukan <strong>5 siswa</strong> terindikasi bolos hari ini. Siswa hadir saat scan pagi tetapi tidak hadir di beberapa jam pelajaran berdasarkan jurnal guru.
      </Alert>

      <Paper variant="outlined" sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <Box><Typography variant="caption" color="text.secondary">Minggu Ini</Typography><Typography variant="h6" fontWeight={700}>12 kasus</Typography></Box>
        <Box><Typography variant="caption" color="text.secondary">Bulan Ini</Typography><Typography variant="h6" fontWeight={700}>38 kasus</Typography></Box>
        <Box><Typography variant="caption" color="text.secondary">Sudah Ditindak</Typography><Typography variant="h6" fontWeight={700} color="success.main">30</Typography></Box>
        <Box><Typography variant="caption" color="text.secondary">Menunggu</Typography><Typography variant="h6" fontWeight={700} color="warning.main">8</Typography></Box>
      </Paper>

      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />
    </Box>
  );
}
