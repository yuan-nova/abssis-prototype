import { Box, Typography, Button, Chip, Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Upload, Send, Edit } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const statsData = [
  { label: 'Total Siswa', value: 623, color: '#1976d2' },
  { label: 'Memiliki No. WA', value: 598, color: '#388e3c' },
  { label: 'Belum Ada', value: 25, color: '#f57c00' },
  { label: 'Terverifikasi', value: 580, color: '#00796b' },
];

const rows = [
  { id: 1, student: 'Ahmad Rizki Pratama', kelas: '10-A', guardian: 'Bpk. Rizki Kurniawan', phone: '081234567890', status: 'Terverifikasi' },
  { id: 2, student: 'Ayu Safitri', kelas: '10-B', guardian: 'Ibu Safitri Dewi', phone: '082145678901', status: 'Terverifikasi' },
  { id: 3, student: 'Bagas Setiawan', kelas: '11-A', guardian: 'Ibu Sari Wulandari', phone: '082156789012', status: 'Terverifikasi' },
  { id: 4, student: 'Citra Permata Sari', kelas: '10-C', guardian: 'Bpk. Permata', phone: '081378901234', status: 'Terverifikasi' },
  { id: 5, student: 'Dimas Aditya Putra', kelas: '11-B', guardian: 'Ibu Dewi Sinta', phone: '085289012345', status: 'Terverifikasi' },
  { id: 6, student: 'Eka Putri Rahayu', kelas: '11-A', guardian: 'Bpk. Rahayu', phone: '082267890123', status: 'Belum Verifikasi' },
  { id: 7, student: 'Farel Anggara', kelas: '12-A', guardian: 'Bpk. Anggara Wibowo', phone: '081590123456', status: 'Terverifikasi' },
  { id: 8, student: 'Gita Nadia Permata', kelas: '10-A', guardian: 'Ibu Nadia Sari', phone: '087801234567', status: 'Terverifikasi' },
  { id: 9, student: 'Hadi Kurniawan', kelas: '12-B', guardian: 'Bpk. Kurniawan', phone: '081345678901', status: 'Terverifikasi' },
  { id: 10, student: 'Indah Lestari', kelas: '11-C', guardian: 'Ibu Lestari', phone: '085723456789', status: 'Terverifikasi' },
  { id: 11, student: 'Joko Susanto', kelas: '11-C', guardian: 'Ibu Susanto', phone: '087856789012', status: 'Terverifikasi' },
  { id: 12, student: 'Kartika Sari', kelas: '12-C', guardian: 'Bpk. Kartika', phone: '', status: 'Belum Ada' },
  { id: 13, student: 'Lina Marlina', kelas: '10-C', guardian: 'Ibu Marlina', phone: '081389012345', status: 'Terverifikasi' },
  { id: 14, student: 'Muhammad Fajar', kelas: '10-A', guardian: 'Bpk. Fajar', phone: '087801234568', status: 'Invalid' },
  { id: 15, student: 'Nadia Permata', kelas: '10-C', guardian: 'Bpk. Permata Jaya', phone: '081612345999', status: 'Invalid' },
  { id: 16, student: 'Oki Setiawan', kelas: '10-B', guardian: 'Ibu Setiawan', phone: '', status: 'Belum Ada' },
  { id: 17, student: 'Putri Wulandari', kelas: '12-B', guardian: 'Ibu Wulandari', phone: '082190123456', status: 'Terverifikasi' },
  { id: 18, student: 'Reza Firmansyah', kelas: '12-A', guardian: 'Bpk. Firmansyah', phone: '081967890123', status: 'Terverifikasi' },
  { id: 19, student: 'Sinta Dewi', kelas: '12-B', guardian: 'Ibu Dewi', phone: '085278901234', status: 'Belum Verifikasi' },
  { id: 20, student: 'Taufik Hidayat', kelas: '10-A', guardian: 'Bpk. Hidayat', phone: '081834567890', status: 'Terverifikasi' },
];

const statusColor: Record<string, 'success' | 'warning' | 'error' | 'default'> = { 'Terverifikasi': 'success', 'Belum Verifikasi': 'warning', 'Invalid': 'error', 'Belum Ada': 'default' };

const columns: GridColDef[] = [
  { field: 'student', headerName: 'Siswa', flex: 1, minWidth: 170 },
  { field: 'kelas', headerName: 'Kelas', width: 70 },
  { field: 'guardian', headerName: 'Nama Wali', width: 170 },
  { field: 'phone', headerName: 'No. WA', width: 140, renderCell: (p) => p.value || <Typography variant="body2" color="text.secondary">-</Typography> },
  { field: 'status', headerName: 'Status', width: 140, renderCell: (p) => <Chip label={p.value} size="small" color={statusColor[p.value as string]} /> },
  { field: 'actions', headerName: 'Aksi', width: 100, sortable: false, renderCell: () => {
    const { enqueueSnackbar } = useSnackbar();
    return (<Box><IconButton size="small"><Edit fontSize="small" /></IconButton><IconButton size="small" onClick={() => enqueueSnackbar('Pesan test dikirim', { variant: 'success' })}><Send fontSize="small" /></IconButton></Box>);
  }},
];

export default function WANumberPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Kelola Nomor WhatsApp</Typography>
        <Button variant="contained" startIcon={<Upload />} onClick={() => enqueueSnackbar('Import dari Excel akan segera tersedia', { variant: 'info' })}>Import dari Excel</Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        {statsData.map((s) => (
          <Card key={s.label}><CardContent sx={{ textAlign: 'center' }}><Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography><Typography variant="body2" color="text.secondary">{s.label}</Typography></CardContent></Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}><InputLabel>Kelas</InputLabel><Select label="Kelas" defaultValue=""><MenuItem value="">Semua</MenuItem>{['10-A','10-B','10-C','11-A','11-B','11-C','12-A','12-B','12-C'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}><InputLabel>Status</InputLabel><Select label="Status" defaultValue=""><MenuItem value="">Semua</MenuItem><MenuItem value="Terverifikasi">Terverifikasi</MenuItem><MenuItem value="Belum Verifikasi">Belum Verifikasi</MenuItem><MenuItem value="Invalid">Invalid</MenuItem><MenuItem value="Belum Ada">Belum Ada</MenuItem></Select></FormControl>
        <TextField label="Cari" size="small" placeholder="Nama siswa..." />
      </Box>

      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
    </Box>
  );
}
