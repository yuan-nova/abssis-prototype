import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, no: i + 1,
  nama: ['Ahmad Rizki', 'Ayu Safitri', 'Bagas Setiawan', 'Citra Permata', 'Dimas Aditya', 'Eka Putri', 'Farel Anggara', 'Gita Nadia', 'Hadi Kurniawan', 'Indah Lestari', 'Joko Susanto', 'Kartika Sari', 'Lina Marlina', 'Muhammad Fajar', 'Nadia Permata', 'Oki Setiawan', 'Putri Wulandari', 'Reza Firmansyah', 'Sinta Dewi', 'Taufik Hidayat'][i],
  nisn: `005123400${String(i + 1).padStart(2, '0')}`,
  hadir: 18 + Math.floor(Math.random() * 4), terlambat: Math.floor(Math.random() * 4), sakit: Math.floor(Math.random() * 3), izin: Math.floor(Math.random() * 2), alpha: Math.floor(Math.random() * 2),
  get persen() { return ((this.hadir / 22) * 100).toFixed(1); },
}));

const columns: GridColDef[] = [
  { field: 'no', headerName: 'No', width: 50 },
  { field: 'nama', headerName: 'Nama Siswa', flex: 1, minWidth: 160 },
  { field: 'nisn', headerName: 'NISN', width: 120 },
  { field: 'hadir', headerName: 'Hadir', width: 70, type: 'number' },
  { field: 'terlambat', headerName: 'Terlambat', width: 90, type: 'number' },
  { field: 'sakit', headerName: 'Sakit', width: 70, type: 'number' },
  { field: 'izin', headerName: 'Izin', width: 60, type: 'number' },
  { field: 'alpha', headerName: 'Alpha', width: 70, type: 'number', renderCell: (p) => <Typography color={p.value > 0 ? 'error' : 'text.primary'} fontWeight={p.value > 0 ? 700 : 400}>{p.value}</Typography> },
  { field: 'persen', headerName: '% Kehadiran', width: 120, renderCell: (p) => <Chip label={`${p.value}%`} size="small" color={Number(p.value) >= 90 ? 'success' : Number(p.value) >= 75 ? 'warning' : 'error'} /> },
];

export default function AttendanceReportPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Rekap Kehadiran</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport ke Excel...', { variant: 'info' })}>Export Excel</Button>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport ke PDF...', { variant: 'info' })}>Export PDF</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 130 }}><InputLabel>Periode</InputLabel><Select label="Periode" defaultValue="Bulanan"><MenuItem value="Bulanan">Bulanan</MenuItem><MenuItem value="Semester">Semester</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}><InputLabel>Bulan</InputLabel><Select label="Bulan" defaultValue="Januari"><MenuItem value="Januari">Januari 2026</MenuItem><MenuItem value="Desember">Desember 2025</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 100 }}><InputLabel>Kelas</InputLabel><Select label="Kelas" defaultValue="10-A">{['10-A','10-B','10-C','11-A','11-B','11-C','12-A','12-B','12-C'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</Select></FormControl>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', gap: 3 }}>
        <Box><Typography variant="caption" color="text.secondary">Hari Efektif</Typography><Typography variant="h6" fontWeight={700}>22</Typography></Box>
        <Box><Typography variant="caption" color="text.secondary">Rata-rata Kehadiran</Typography><Typography variant="h6" fontWeight={700} color="success.main">94.5%</Typography></Box>
      </Paper>

      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[25]} initialState={{ pagination: { paginationModel: { pageSize: 25 } } }} />
    </Box>
  );
}
