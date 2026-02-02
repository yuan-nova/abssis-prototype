import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, rank: 1, nama: 'Hadi Kurniawan', kelas: '12-B', total: 65, alpha: 3, terlambat: 2, pelanggaran: 3, last: 'Membolos', status: 'Bahaya' },
  { id: 2, rank: 2, nama: 'Bagas Setiawan', kelas: '11-A', total: 55, alpha: 2, terlambat: 3, pelanggaran: 2, last: 'Vandalisme', status: 'Bahaya' },
  { id: 3, rank: 3, nama: 'Dimas Aditya', kelas: '11-B', total: 50, alpha: 1, terlambat: 5, pelanggaran: 1, last: 'Terlambat', status: 'Bahaya' },
  { id: 4, rank: 4, nama: 'Farel Anggara', kelas: '12-A', total: 45, alpha: 2, terlambat: 2, pelanggaran: 1, last: 'HP', status: 'Peringatan' },
  { id: 5, rank: 5, nama: 'Oki Setiawan', kelas: '10-B', total: 40, alpha: 0, terlambat: 0, pelanggaran: 2, last: 'Merokok', status: 'Peringatan' },
  { id: 6, rank: 6, nama: 'Joko Susanto', kelas: '11-C', total: 35, alpha: 2, terlambat: 1, pelanggaran: 1, last: 'Alpha', status: 'Peringatan' },
  { id: 7, rank: 7, nama: 'Reza Firmansyah', kelas: '12-A', total: 30, alpha: 1, terlambat: 3, pelanggaran: 0, last: 'Terlambat', status: 'Peringatan' },
  { id: 8, rank: 8, nama: 'Taufik Hidayat', kelas: '10-A', total: 28, alpha: 0, terlambat: 1, pelanggaran: 1, last: 'Berkelahi', status: 'Peringatan' },
  { id: 9, rank: 9, nama: 'Sinta Dewi', kelas: '12-B', total: 25, alpha: 1, terlambat: 2, pelanggaran: 0, last: 'HP', status: 'Peringatan' },
  { id: 10, rank: 10, nama: 'Lina Marlina', kelas: '10-C', total: 20, alpha: 2, terlambat: 0, pelanggaran: 0, last: 'Alpha', status: 'Aman' },
  { id: 11, rank: 11, nama: 'Nadia Permata', kelas: '10-C', total: 15, alpha: 1, terlambat: 1, pelanggaran: 0, last: 'Alpha', status: 'Aman' },
  { id: 12, rank: 12, nama: 'Muhammad Fajar', kelas: '10-A', total: 15, alpha: 0, terlambat: 3, pelanggaran: 0, last: 'Terlambat', status: 'Aman' },
  { id: 13, rank: 13, nama: 'Kartika Sari', kelas: '12-C', total: 10, alpha: 1, terlambat: 0, pelanggaran: 0, last: 'Alpha', status: 'Aman' },
  { id: 14, rank: 14, nama: 'Gita Nadia', kelas: '10-A', total: 10, alpha: 0, terlambat: 2, pelanggaran: 0, last: 'Terlambat', status: 'Aman' },
  { id: 15, rank: 15, nama: 'Indah Lestari', kelas: '11-C', total: 5, alpha: 0, terlambat: 1, pelanggaran: 0, last: 'Terlambat', status: 'Aman' },
];

const statusColor: Record<string, 'error' | 'warning' | 'success'> = { Bahaya: 'error', Peringatan: 'warning', Aman: 'success' };

const columns: GridColDef[] = [
  { field: 'rank', headerName: '#', width: 50 },
  { field: 'nama', headerName: 'Nama', flex: 1, minWidth: 150 },
  { field: 'kelas', headerName: 'Kelas', width: 70 },
  { field: 'total', headerName: 'Total Poin', width: 100, renderCell: (p) => <Typography fontWeight={700} color={(p.value as number) >= 50 ? 'error' : 'text.primary'}>{p.value}</Typography> },
  { field: 'alpha', headerName: 'Alpha', width: 70, type: 'number' },
  { field: 'terlambat', headerName: 'Terlambat', width: 90, type: 'number' },
  { field: 'pelanggaran', headerName: 'Pelanggaran', width: 100, type: 'number' },
  { field: 'last', headerName: 'Terakhir', width: 120 },
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={statusColor[p.value as string]} /> },
];

export default function DisciplineRankingPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Ranking Pelanggaran</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport ranking...', { variant: 'info' })}>Export</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 100 }}><InputLabel>Top</InputLabel><Select label="Top" defaultValue={20}><MenuItem value={10}>Top 10</MenuItem><MenuItem value={20}>Top 20</MenuItem><MenuItem value={50}>Top 50</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 100 }}><InputLabel>Kelas</InputLabel><Select label="Kelas" defaultValue=""><MenuItem value="">Semua</MenuItem></Select></FormControl>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[25]} />
    </Box>
  );
}
