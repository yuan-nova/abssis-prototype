import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, guru: 'Ahmad Fauzi', mapel: 'Matematika', kelas: '10-A, 10-B, 11-A', totalJadwal: 24, terisi: 24, belum: 0, persen: 100 },
  { id: 2, guru: 'Sri Wahyuni', mapel: 'Biologi', kelas: '10-A, 10-B, 10-C', totalJadwal: 20, terisi: 20, belum: 0, persen: 100 },
  { id: 3, guru: 'Budi Santoso', mapel: 'Kimia', kelas: '10-A, 11-B', totalJadwal: 22, terisi: 20, belum: 2, persen: 90.9 },
  { id: 4, guru: 'Dewi Lestari', mapel: 'B. Inggris', kelas: '10-A, 11-A', totalJadwal: 18, terisi: 18, belum: 0, persen: 100 },
  { id: 5, guru: 'Eko Prasetyo', mapel: 'Fisika', kelas: '10-A, 11-B, 12-B', totalJadwal: 24, terisi: 22, belum: 2, persen: 91.7 },
  { id: 6, guru: 'Nur Hidayah', mapel: 'P. Pancasila', kelas: '10-A, 11-C', totalJadwal: 16, terisi: 16, belum: 0, persen: 100 },
  { id: 7, guru: 'Irfan Hakim', mapel: 'P. Agama', kelas: '10-A, 12-A', totalJadwal: 20, terisi: 15, belum: 5, persen: 75.0 },
  { id: 8, guru: 'Maria Ulfa', mapel: 'B. Indonesia', kelas: '10-A, 12-B', totalJadwal: 22, terisi: 22, belum: 0, persen: 100 },
  { id: 9, guru: 'Fajar Ramadhan', mapel: 'Informatika', kelas: '10-A, 12-C', totalJadwal: 18, terisi: 16, belum: 2, persen: 88.9 },
  { id: 10, guru: 'Wahyu Hidayat', mapel: 'Sejarah, Penjas', kelas: '10-A, 11-A', totalJadwal: 20, terisi: 18, belum: 2, persen: 90.0 },
];

const columns: GridColDef[] = [
  { field: 'guru', headerName: 'Guru', flex: 1, minWidth: 150 },
  { field: 'mapel', headerName: 'Mata Pelajaran', width: 160 },
  { field: 'kelas', headerName: 'Kelas', width: 150 },
  { field: 'totalJadwal', headerName: 'Total Jadwal', width: 110, type: 'number' },
  { field: 'terisi', headerName: 'Terisi', width: 80, type: 'number' },
  { field: 'belum', headerName: 'Belum', width: 80, type: 'number' },
  { field: 'persen', headerName: '% Kelengkapan', width: 170, renderCell: (p) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
      <LinearProgress variant="determinate" value={p.value as number} sx={{ flex: 1, height: 8, borderRadius: 4 }} color={(p.value as number) === 100 ? 'success' : (p.value as number) >= 90 ? 'primary' : 'warning'} />
      <Typography variant="caption" fontWeight={600}>{p.value}%</Typography>
    </Box>
  )},
];

export default function JournalReportPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Laporan Jurnal Mengajar</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport laporan jurnal...', { variant: 'info' })}>Export</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 130 }}><InputLabel>Guru</InputLabel><Select label="Guru" defaultValue=""><MenuItem value="">Semua</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}><InputLabel>Mata Pelajaran</InputLabel><Select label="Mata Pelajaran" defaultValue=""><MenuItem value="">Semua</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}><InputLabel>Periode</InputLabel><Select label="Periode" defaultValue="Januari"><MenuItem value="Januari">Januari 2026</MenuItem></Select></FormControl>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[25]} />
    </Box>
  );
}
