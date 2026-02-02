import { Box, Typography, Button, Chip, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const statusChip = (val: string) => {
  const map: Record<string, 'success' | 'warning' | 'info' | 'secondary' | 'error'> = { H: 'success', T: 'warning', S: 'info', I: 'secondary', A: 'error' };
  const labels: Record<string, string> = { H: 'Hadir', T: 'Terlambat', S: 'Sakit', I: 'Izin', A: 'Alpha' };
  return <Chip label={labels[val] || val} size="small" color={map[val] || 'default'} />;
};

const rows = [
  { id: 1, date: '2026-01-31', student: 'Ahmad Rizki Pratama', kelas: '10-A', original: 'A', corrected: 'H', reason: 'Siswa hadir tapi lupa scan, dikonfirmasi wali kelas', admin: 'Rina Wulandari', timestamp: '2026-01-31 08:45', ip: '192.168.1.10' },
  { id: 2, date: '2026-01-31', student: 'Dimas Aditya Putra', kelas: '11-B', original: 'A', corrected: 'S', reason: 'Orang tua mengirim surat sakit via WA', admin: 'Rina Wulandari', timestamp: '2026-01-31 09:10', ip: '192.168.1.10' },
  { id: 3, date: '2026-01-30', student: 'Farel Anggara', kelas: '12-A', original: 'T', corrected: 'H', reason: 'Perangkat error saat scan, dikonfirmasi security', admin: 'Dedi Kurniawan', timestamp: '2026-01-30 10:20', ip: '192.168.1.11' },
  { id: 4, date: '2026-01-30', student: 'Indah Lestari', kelas: '11-C', original: 'A', corrected: 'I', reason: 'Izin mengikuti lomba debat tingkat kota', admin: 'Rina Wulandari', timestamp: '2026-01-30 08:30', ip: '192.168.1.10' },
  { id: 5, date: '2026-01-29', student: 'Bagas Setiawan', kelas: '11-A', original: 'A', corrected: 'H', reason: 'Terlambat scan karena antrian panjang', admin: 'Dedi Kurniawan', timestamp: '2026-01-29 09:15', ip: '192.168.1.11' },
  { id: 6, date: '2026-01-29', student: 'Gita Nadia Permata', kelas: '10-A', original: 'T', corrected: 'H', reason: 'Jam perangkat tidak akurat, scan ulang berhasil', admin: 'Rina Wulandari', timestamp: '2026-01-29 08:50', ip: '192.168.1.10' },
  { id: 7, date: '2026-01-28', student: 'Kartika Sari', kelas: '12-C', original: 'A', corrected: 'S', reason: 'Surat dokter diserahkan hari berikutnya', admin: 'Dedi Kurniawan', timestamp: '2026-01-28 10:00', ip: '192.168.1.11' },
  { id: 8, date: '2026-01-28', student: 'Hadi Kurniawan', kelas: '12-B', original: 'H', corrected: 'A', reason: 'Terdeteksi titip scan oleh teman, dikonfirmasi BK', admin: 'Rina Wulandari', timestamp: '2026-01-28 14:00', ip: '192.168.1.10' },
  { id: 9, date: '2026-01-27', student: 'Ayu Safitri', kelas: '10-B', original: 'A', corrected: 'I', reason: 'Izin mengurus paspor ke imigrasi', admin: 'Dedi Kurniawan', timestamp: '2026-01-27 09:30', ip: '192.168.1.11' },
  { id: 10, date: '2026-01-27', student: 'Joko Susanto', kelas: '11-C', original: 'T', corrected: 'H', reason: 'Perangkat offline saat scan pertama', admin: 'Rina Wulandari', timestamp: '2026-01-27 08:40', ip: '192.168.1.10' },
];

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal', width: 110 },
  { field: 'student', headerName: 'Siswa', flex: 1, minWidth: 170 },
  { field: 'kelas', headerName: 'Kelas', width: 70 },
  { field: 'original', headerName: 'Status Asal', width: 110, renderCell: (p) => statusChip(p.value as string) },
  { field: 'corrected', headerName: 'Status Baru', width: 110, renderCell: (p) => statusChip(p.value as string) },
  { field: 'reason', headerName: 'Alasan', flex: 1, minWidth: 200 },
  { field: 'admin', headerName: 'Admin', width: 140 },
  { field: 'timestamp', headerName: 'Waktu Koreksi', width: 150 },
  { field: 'ip', headerName: 'IP', width: 120 },
];

export default function CorrectionHistoryPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Riwayat Koreksi</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport riwayat koreksi...', { variant: 'info' })}>Export</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Dari Tanggal" type="date" defaultValue="2026-01-01" size="small" slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="Sampai Tanggal" type="date" defaultValue="2026-01-31" size="small" slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="Cari Siswa" size="small" placeholder="Nama siswa..." />
      </Box>

      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
    </Box>
  );
}
