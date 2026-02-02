import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useSnackbar } from 'notistack';

const stats = [
  { label: 'Total Poin Minggu Ini', value: '85', color: '#1976d2' },
  { label: 'Total Poin Bulan Ini', value: '320', color: '#f57c00' },
  { label: 'Siswa Melebihi Ambang', value: '8', color: '#d32f2f' },
  { label: 'Kasus Pelanggaran', value: '15', color: '#9c27b0' },
];

const barData = [
  { name: 'Alpha', poin: 120 }, { name: 'Terlambat', poin: 85 },
  { name: 'Berkelahi', poin: 30 }, { name: 'Merokok', poin: 20 },
  { name: 'Seragam', poin: 45 }, { name: 'Lainnya', poin: 20 },
];

const pieData = [{ name: 'Ringan', value: 60 }, { name: 'Sedang', value: 30 }, { name: 'Berat', value: 10 }];
const COLORS = ['#ff9800', '#f57c00', '#d32f2f'];

const trendData = [
  { week: 'Minggu 1', poin: 65 }, { week: 'Minggu 2', poin: 78 },
  { week: 'Minggu 3', poin: 92 }, { week: 'Minggu 4', poin: 85 },
];

const topStudents = [
  { id: 1, nama: 'Hadi Kurniawan', kelas: '12-B', total: 65, terakhir: 'Membolos 3 jam' },
  { id: 2, nama: 'Bagas Setiawan', kelas: '11-A', total: 55, terakhir: 'Alpha berulang' },
  { id: 3, nama: 'Dimas Aditya', kelas: '11-B', total: 50, terakhir: 'Terlambat 5x' },
  { id: 4, nama: 'Farel Anggara', kelas: '12-A', total: 45, terakhir: 'Pelanggaran seragam' },
  { id: 5, nama: 'Oki Setiawan', kelas: '10-B', total: 40, terakhir: 'Merokok di toilet' },
  { id: 6, nama: 'Joko Susanto', kelas: '11-C', total: 35, terakhir: 'Alpha' },
  { id: 7, nama: 'Reza Firmansyah', kelas: '12-A', total: 30, terakhir: 'Terlambat 3x' },
  { id: 8, nama: 'Taufik Hidayat', kelas: '10-A', total: 28, terakhir: 'Berkelahi' },
  { id: 9, nama: 'Sinta Dewi', kelas: '12-B', total: 25, terakhir: 'Penggunaan HP' },
  { id: 10, nama: 'Lina Marlina', kelas: '10-C', total: 20, terakhir: 'Alpha' },
];

const topCols: GridColDef[] = [
  { field: 'nama', headerName: 'Nama Siswa', flex: 1, minWidth: 160 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'total', headerName: 'Total Poin', width: 100, renderCell: (p) => <Typography fontWeight={700} color={(p.value as number) >= 50 ? 'error' : (p.value as number) >= 25 ? 'warning.main' : 'text.primary'}>{p.value}</Typography> },
  { field: 'terakhir', headerName: 'Pelanggaran Terakhir', flex: 1, minWidth: 180 },
  { field: 'actions', headerName: 'Aksi', width: 120, sortable: false, renderCell: () => <Button size="small" variant="outlined">Detail</Button> },
];

export default function BKDashboardPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Dashboard BK</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport laporan BK...', { variant: 'info' })}>Export Laporan</Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        {stats.map((s) => (
          <Card key={s.label}><CardContent sx={{ textAlign: 'center' }}><Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography><Typography variant="body2" color="text.secondary">{s.label}</Typography></CardContent></Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 3 }}>
        <Card><CardContent><Typography variant="h6" sx={{ mb: 2 }}>Poin per Kategori</Typography><ResponsiveContainer width="100%" height={250}><BarChart data={barData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="poin" fill="#1976d2" /></BarChart></ResponsiveContainer></CardContent></Card>
        <Card><CardContent><Typography variant="h6" sx={{ mb: 2 }}>Tingkat Pelanggaran</Typography><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>{pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
      </Box>

      <Card sx={{ mb: 3 }}><CardContent><Typography variant="h6" sx={{ mb: 2 }}>Tren Poin Mingguan</Typography><ResponsiveContainer width="100%" height={200}><LineChart data={trendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="poin" stroke="#d32f2f" strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent></Card>

      <Typography variant="h6" sx={{ mb: 2 }}>Top 10 Siswa Poin Tertinggi</Typography>
      <DataGrid rows={topStudents} columns={topCols} autoHeight pageSizeOptions={[10]} />
    </Box>
  );
}
