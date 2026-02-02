import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
} from '@mui/material';
import { FileDownload, Search } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

interface AuditLog {
  id: number;
  timestamp: string;
  userName: string;
  module: string;
  action: string;
  details: string;
  ipAddress: string;
}

const initialLogs: AuditLog[] = [
  { id: 1, timestamp: '2026-01-31 08:12:00', userName: 'Rina Wulandari', module: 'Kehadiran', action: 'UPDATE', details: 'Koreksi kehadiran siswa Ahmad Rizki', ipAddress: '192.168.1.10' },
  { id: 2, timestamp: '2026-01-31 08:05:30', userName: 'Dr. H. Bambang Sutrisno', module: 'Pengguna', action: 'CREATE', details: 'Menambahkan pengguna baru: Fitri Amelia', ipAddress: '192.168.1.1' },
  { id: 3, timestamp: '2026-01-31 07:55:12', userName: 'Agus Setiawan', module: 'Jurnal', action: 'CREATE', details: 'Membuat jurnal Matematika kelas X-A', ipAddress: '192.168.1.25' },
  { id: 4, timestamp: '2026-01-31 07:45:00', userName: 'Rina Wulandari', module: 'Siswa', action: 'UPDATE', details: 'Memperbarui data siswa Dina Putri kelas XI-B', ipAddress: '192.168.1.10' },
  { id: 5, timestamp: '2026-01-31 07:30:18', userName: 'Siti Nurhaliza', module: 'Disiplin', action: 'CREATE', details: 'Mencatat pelanggaran terlambat: Rudi Hartono', ipAddress: '192.168.1.30' },
  { id: 6, timestamp: '2026-01-30 16:05:44', userName: 'Fitri Amelia', module: 'Jurnal', action: 'UPDATE', details: 'Mengubah jurnal Bahasa Inggris kelas XII-C', ipAddress: '192.168.1.42' },
  { id: 7, timestamp: '2026-01-30 15:40:22', userName: 'Pratama Yudi', module: 'Kehadiran', action: 'CREATE', details: 'Input kehadiran kelas XI-A jam ke-5', ipAddress: '192.168.1.35' },
  { id: 8, timestamp: '2026-01-30 14:22:10', userName: 'Agus Setiawan', module: 'Jurnal', action: 'DELETE', details: 'Menghapus jurnal duplikat Fisika kelas X-B', ipAddress: '192.168.1.25' },
  { id: 9, timestamp: '2026-01-30 11:20:55', userName: 'Nurul Aini', module: 'Disiplin', action: 'UPDATE', details: 'Memperbarui status konseling siswa Budi Setiawan', ipAddress: '192.168.1.31' },
  { id: 10, timestamp: '2026-01-30 10:30:00', userName: 'Drs. Hadi Purnomo', module: 'Laporan', action: 'READ', details: 'Mengunduh laporan kehadiran bulanan Januari', ipAddress: '192.168.1.5' },
  { id: 11, timestamp: '2026-01-30 09:10:33', userName: 'Budi Santoso', module: 'Jurnal', action: 'CREATE', details: 'Membuat jurnal TIK kelas XII-A', ipAddress: '192.168.1.38' },
  { id: 12, timestamp: '2026-01-29 15:40:11', userName: 'Pratama Yudi', module: 'Kehadiran', action: 'UPDATE', details: 'Koreksi kehadiran Siti Aminah kelas X-C', ipAddress: '192.168.1.35' },
  { id: 13, timestamp: '2026-01-29 13:18:45', userName: 'Dewi Kartika', module: 'Jurnal', action: 'CREATE', details: 'Membuat jurnal Biologi kelas XI-B', ipAddress: '192.168.1.28' },
  { id: 14, timestamp: '2026-01-29 10:00:22', userName: 'Fajar Hidayat', module: 'Kelas', action: 'UPDATE', details: 'Memperbarui jadwal kelas X-A semester genap', ipAddress: '192.168.1.12' },
  { id: 15, timestamp: '2026-01-29 08:55:00', userName: 'Drs. Teguh Prasetyo', module: 'Kehadiran', action: 'CREATE', details: 'Input kehadiran kelas XII-B jam ke-1', ipAddress: '192.168.1.40' },
  { id: 16, timestamp: '2026-01-28 14:30:17', userName: 'Dr. H. Bambang Sutrisno', module: 'Pengaturan', action: 'UPDATE', details: 'Mengubah jam operasional sekolah', ipAddress: '192.168.1.1' },
  { id: 17, timestamp: '2026-01-28 11:45:33', userName: 'Rina Wulandari', module: 'Siswa', action: 'CREATE', details: 'Mendaftarkan siswa baru: Adi Nugroho kelas X-A', ipAddress: '192.168.1.10' },
  { id: 18, timestamp: '2026-01-28 09:20:05', userName: 'Eko Wijaya', module: 'Jurnal', action: 'CREATE', details: 'Membuat jurnal Kimia kelas XI-C', ipAddress: '192.168.1.44' },
  { id: 19, timestamp: '2026-01-28 08:30:00', userName: 'Anisa Rahma', module: 'Kehadiran', action: 'CREATE', details: 'Input kehadiran kelas X-B jam ke-1', ipAddress: '192.168.1.36' },
  { id: 20, timestamp: '2026-01-27 16:10:28', userName: 'Dr. H. Bambang Sutrisno', module: 'Pengguna', action: 'UPDATE', details: 'Menonaktifkan akun Sri Wahyuni', ipAddress: '192.168.1.1' },
  { id: 21, timestamp: '2026-01-27 14:55:42', userName: 'Fajar Hidayat', module: 'Siswa', action: 'DELETE', details: 'Menghapus data siswa pindahan: Toni Wirawan', ipAddress: '192.168.1.12' },
  { id: 22, timestamp: '2026-01-27 10:22:15', userName: 'Siti Nurhaliza', module: 'Disiplin', action: 'CREATE', details: 'Mencatat pelanggaran seragam: Lisa Permata kelas XI-A', ipAddress: '192.168.1.30' },
  { id: 23, timestamp: '2026-01-27 08:00:00', userName: 'Citra Dewi', module: 'Kehadiran', action: 'CREATE', details: 'Input kehadiran kelas XII-A jam ke-1', ipAddress: '192.168.1.46' },
  { id: 24, timestamp: '2026-01-26 15:30:20', userName: 'Muhammad Ridwan', module: 'Jurnal', action: 'UPDATE', details: 'Mengubah jurnal PKN kelas X-C', ipAddress: '192.168.1.33' },
  { id: 25, timestamp: '2026-01-26 11:10:08', userName: 'Drs. Hadi Purnomo', module: 'Laporan', action: 'READ', details: 'Melihat rekap disiplin semester ganjil', ipAddress: '192.168.1.5' },
];

const moduleOptions = ['Pengguna', 'Siswa', 'Kelas', 'Kehadiran', 'Jurnal', 'Disiplin', 'Laporan', 'Pengaturan'];
const actionOptions = ['CREATE', 'READ', 'UPDATE', 'DELETE'];
const userOptions = [
  ...new Set(initialLogs.map((log) => log.userName)),
].sort();

const actionColors: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  CREATE: 'success',
  READ: 'info',
  UPDATE: 'warning',
  DELETE: 'error',
};

const actionLabels: Record<string, string> = {
  CREATE: 'Tambah',
  READ: 'Lihat',
  UPDATE: 'Ubah',
  DELETE: 'Hapus',
};

export default function AuditLogPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userFilter, setUserFilter] = useState('Semua');
  const [moduleFilter, setModuleFilter] = useState('Semua');
  const [actionFilter, setActionFilter] = useState('Semua');

  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) => {
      const matchesUser = userFilter === 'Semua' || log.userName === userFilter;
      const matchesModule = moduleFilter === 'Semua' || log.module === moduleFilter;
      const matchesAction = actionFilter === 'Semua' || log.action === actionFilter;
      const logDate = log.timestamp.split(' ')[0];
      const matchesDateFrom = !dateFrom || logDate >= dateFrom;
      const matchesDateTo = !dateTo || logDate <= dateTo;
      return matchesUser && matchesModule && matchesAction && matchesDateFrom && matchesDateTo;
    });
  }, [dateFrom, dateTo, userFilter, moduleFilter, actionFilter]);

  const handleExport = () => {
    enqueueSnackbar('Mengexport log audit...', { variant: 'info' });
  };

  const columns: GridColDef[] = [
    {
      field: 'timestamp',
      headerName: 'Waktu',
      width: 180,
    },
    {
      field: 'userName',
      headerName: 'Pengguna',
      width: 200,
    },
    {
      field: 'module',
      headerName: 'Modul',
      width: 130,
      renderCell: (params) => (
        <Chip label={params.value} variant="outlined" size="small" />
      ),
    },
    {
      field: 'action',
      headerName: 'Aksi',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={actionLabels[params.value as string] || params.value}
          color={actionColors[params.value as string] || 'default'}
          size="small"
          variant="filled"
        />
      ),
    },
    {
      field: 'details',
      headerName: 'Detail',
      flex: 1,
      minWidth: 280,
    },
    {
      field: 'ipAddress',
      headerName: 'IP Address',
      width: 140,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Log Audit
        </Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExport}>
          Export CSV
        </Button>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <TextField
          size="small"
          label="Dari Tanggal"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          sx={{ minWidth: 170 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          size="small"
          label="Sampai Tanggal"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          sx={{ minWidth: 170 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Pengguna</InputLabel>
          <Select
            value={userFilter}
            label="Pengguna"
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <MenuItem value="Semua">Semua Pengguna</MenuItem>
            {userOptions.map((u) => (
              <MenuItem key={u} value={u}>
                {u}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Modul</InputLabel>
          <Select
            value={moduleFilter}
            label="Modul"
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <MenuItem value="Semua">Semua Modul</MenuItem>
            {moduleOptions.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Tipe Aksi</InputLabel>
          <Select
            value={actionFilter}
            label="Tipe Aksi"
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <MenuItem value="Semua">Semua Aksi</MenuItem>
            {actionOptions.map((a) => (
              <MenuItem key={a} value={a}>
                {actionLabels[a]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* DataGrid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredLogs}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: 'timestamp', sort: 'desc' }] },
          }}
          disableRowSelectionOnClick
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'grey.50',
            },
          }}
        />
      </Box>
    </Box>
  );
}
