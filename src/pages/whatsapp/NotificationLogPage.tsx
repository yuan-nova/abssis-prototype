import { Box, Typography, Button, Chip, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, time: '2026-02-01 08:45', recipient: 'Ibu Sari', phone: '082156789012', student: 'Bagas Setiawan', type: 'Alpha', status: 'Delivered', error: null },
  { id: 2, time: '2026-02-01 08:44', recipient: 'Bpk. Kurniawan', phone: '081345678901', student: 'Hadi Kurniawan', type: 'Terlambat', status: 'Delivered', error: null },
  { id: 3, time: '2026-02-01 08:43', recipient: 'Ibu Dewi', phone: '085289012345', student: 'Dimas Aditya', type: 'Poin', status: 'Sent', error: null },
  { id: 4, time: '2026-02-01 08:42', recipient: 'Bpk. Anggara', phone: '081590123456', student: 'Farel Anggara', type: 'Izin', status: 'Delivered', error: null },
  { id: 5, time: '2026-02-01 08:41', recipient: 'Ibu Rahayu', phone: '082267890123', student: 'Putri Rahayu', type: 'Sakit', status: 'Delivered', error: null },
  { id: 6, time: '2026-02-01 08:40', recipient: 'Bpk. Oki', phone: '081612345999', student: 'Nadia Permata', type: 'Alpha', status: 'Failed', error: 'Nomor tidak terdaftar di WhatsApp' },
  { id: 7, time: '2026-02-01 08:39', recipient: 'Ibu Susanto', phone: '087856789012', student: 'Joko Susanto', type: 'Poin', status: 'Delivered', error: null },
  { id: 8, time: '2026-02-01 08:38', recipient: 'Bpk. Rizki', phone: '081234567890', student: 'Ahmad Rizki', type: 'Terlambat', status: 'Delivered', error: null },
  { id: 9, time: '2026-01-31 15:20', recipient: 'Ibu Lestari', phone: '085723456789', student: 'Indah Lestari', type: 'Izin Tengah Hari', status: 'Delivered', error: null },
  { id: 10, time: '2026-01-31 14:10', recipient: 'Bpk. Permata', phone: '081378901234', student: 'Citra Permata', type: 'Poin', status: 'Delivered', error: null },
  { id: 11, time: '2026-01-31 08:50', recipient: 'Ibu Safitri', phone: '082145678901', student: 'Ayu Safitri', type: 'Alpha', status: 'Delivered', error: null },
  { id: 12, time: '2026-01-31 08:49', recipient: 'Bpk. Setiawan', phone: '081834567890', student: 'Eki Setiawan', type: 'Poin', status: 'Failed', error: 'Connection timeout' },
  { id: 13, time: '2026-01-31 08:48', recipient: 'Ibu Kartika', phone: '087801234567', student: 'Gita Nadia', type: 'Terlambat', status: 'Delivered', error: null },
  { id: 14, time: '2026-01-31 08:47', recipient: 'Bpk. Firmansyah', phone: '081967890123', student: 'Reza Firmansyah', type: 'Alpha', status: 'Delivered', error: null },
  { id: 15, time: '2026-01-31 08:46', recipient: 'Ibu Hidayat', phone: '085278901234', student: 'Taufik Hidayat', type: 'Ambang Batas', status: 'Delivered', error: null },
  { id: 16, time: '2026-01-30 09:10', recipient: 'Bpk. Marlina', phone: '081389012345', student: 'Lina Marlina', type: 'Alpha', status: 'Delivered', error: null },
  { id: 17, time: '2026-01-30 09:05', recipient: 'Ibu Wulandari', phone: '082190123456', student: 'Putri Wulandari', type: 'Sakit', status: 'Delivered', error: null },
  { id: 18, time: '2026-01-30 08:55', recipient: 'Bpk. Fajar', phone: '087801234568', student: 'Muhammad Fajar', type: 'Terlambat', status: 'Delivered', error: null },
  { id: 19, time: '2026-01-30 08:50', recipient: 'Ibu Sari', phone: '082156789012', student: 'Bagas Setiawan', type: 'Poin', status: 'Delivered', error: null },
  { id: 20, time: '2026-01-29 09:15', recipient: 'Bpk. Kurniawan', phone: '081345678901', student: 'Hadi Kurniawan', type: 'Ambang Batas', status: 'Delivered', error: null },
];

const statusColor: Record<string, 'success' | 'primary' | 'error' | 'default'> = { Delivered: 'success', Sent: 'primary', Failed: 'error', Queued: 'default' };

const columns: GridColDef[] = [
  { field: 'time', headerName: 'Waktu', width: 160 },
  { field: 'recipient', headerName: 'Penerima', width: 150 },
  { field: 'phone', headerName: 'No. HP', width: 130 },
  { field: 'student', headerName: 'Siswa', width: 150 },
  { field: 'type', headerName: 'Tipe', width: 130, renderCell: (p) => <Chip label={p.value} size="small" variant="outlined" /> },
  { field: 'status', headerName: 'Status', width: 100, renderCell: (p) => <Chip label={p.value} size="small" color={statusColor[p.value as string]} /> },
  { field: 'error', headerName: 'Error', flex: 1, minWidth: 200, renderCell: (p) => <Typography variant="body2" color="error">{p.value || '-'}</Typography> },
];

export default function NotificationLogPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Log Notifikasi</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport log notifikasi...', { variant: 'info' })}>Export</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Dari" type="date" defaultValue="2026-01-01" size="small" slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="Sampai" type="date" defaultValue="2026-02-01" size="small" slotProps={{ inputLabel: { shrink: true } }} />
        <FormControl size="small" sx={{ minWidth: 120 }}><InputLabel>Tipe</InputLabel><Select label="Tipe" defaultValue=""><MenuItem value="">Semua</MenuItem><MenuItem value="Alpha">Alpha</MenuItem><MenuItem value="Terlambat">Terlambat</MenuItem><MenuItem value="Poin">Poin</MenuItem></Select></FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}><InputLabel>Status</InputLabel><Select label="Status" defaultValue=""><MenuItem value="">Semua</MenuItem><MenuItem value="Delivered">Delivered</MenuItem><MenuItem value="Failed">Failed</MenuItem></Select></FormControl>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
    </Box>
  );
}
