import { useState } from 'react';
import { Box, Typography, Button, Chip, Paper, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PauseCircle, PlayCircle, Delete, Refresh, CleaningServices } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, time: '2026-02-01 08:45', recipient: 'Ibu Sari (Wali Bagas)', student: 'Bagas Setiawan', type: 'Alpha', status: 'Menunggu' },
  { id: 2, time: '2026-02-01 08:44', recipient: 'Bpk. Kurniawan (Wali Hadi)', student: 'Hadi Kurniawan', type: 'Terlambat', status: 'Mengirim' },
  { id: 3, time: '2026-02-01 08:43', recipient: 'Ibu Dewi (Wali Dimas)', student: 'Dimas Aditya', type: 'Poin', status: 'Terkirim' },
  { id: 4, time: '2026-02-01 08:42', recipient: 'Bpk. Anggara (Wali Farel)', student: 'Farel Anggara', type: 'Izin', status: 'Terkirim' },
  { id: 5, time: '2026-02-01 08:41', recipient: 'Ibu Rahayu (Wali Putri)', student: 'Putri Rahayu', type: 'Sakit', status: 'Terkirim' },
  { id: 6, time: '2026-02-01 08:40', recipient: 'Bpk. Oki (Wali Nadia)', student: 'Nadia Permata', type: 'Alpha', status: 'Gagal' },
  { id: 7, time: '2026-02-01 08:39', recipient: 'Ibu Susanto (Wali Joko)', student: 'Joko Susanto', type: 'Poin', status: 'Terkirim' },
  { id: 8, time: '2026-02-01 08:38', recipient: 'Bpk. Rizki (Wali Ahmad)', student: 'Ahmad Rizki', type: 'Terlambat', status: 'Terkirim' },
  { id: 9, time: '2026-02-01 08:37', recipient: 'Ibu Lestari (Wali Indah)', student: 'Indah Lestari', type: 'Alpha', status: 'Gagal' },
  { id: 10, time: '2026-02-01 08:36', recipient: 'Bpk. Permata (Wali Citra)', student: 'Citra Permata', type: 'Izin', status: 'Terkirim' },
  { id: 11, time: '2026-02-01 08:35', recipient: 'Ibu Safitri (Wali Ayu)', student: 'Ayu Safitri', type: 'Sakit', status: 'Terkirim' },
  { id: 12, time: '2026-02-01 08:34', recipient: 'Bpk. Setiawan (Wali Eki)', student: 'Eki Setiawan', type: 'Poin', status: 'Gagal' },
  { id: 13, time: '2026-02-01 08:33', recipient: 'Ibu Kartika (Wali Gita)', student: 'Gita Nadia', type: 'Terlambat', status: 'Menunggu' },
  { id: 14, time: '2026-02-01 08:32', recipient: 'Bpk. Firmansyah (Wali Reza)', student: 'Reza Firmansyah', type: 'Alpha', status: 'Menunggu' },
  { id: 15, time: '2026-02-01 08:31', recipient: 'Ibu Hidayat (Wali Taufik)', student: 'Taufik Hidayat', type: 'Poin', status: 'Menunggu' },
];

const statusColor: Record<string, 'default' | 'primary' | 'success' | 'error' | 'warning'> = { Menunggu: 'default', Mengirim: 'primary', Terkirim: 'success', Gagal: 'error' };

const columns: GridColDef[] = [
  { field: 'time', headerName: 'Waktu', width: 160 },
  { field: 'recipient', headerName: 'Penerima', flex: 1, minWidth: 200 },
  { field: 'student', headerName: 'Siswa', width: 150 },
  { field: 'type', headerName: 'Tipe', width: 100, renderCell: (p) => <Chip label={p.value} size="small" variant="outlined" /> },
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={statusColor[p.value as string]} /> },
  { field: 'actions', headerName: 'Aksi', width: 100, sortable: false, renderCell: (p) => {
    const { enqueueSnackbar } = useSnackbar();
    return p.row.status === 'Gagal' ? (
      <Box><IconButton size="small" onClick={() => enqueueSnackbar('Mengirim ulang...', { variant: 'info' })}><Refresh fontSize="small" /></IconButton><IconButton size="small" onClick={() => enqueueSnackbar('Pesan dihapus', { variant: 'success' })}><Delete fontSize="small" /></IconButton></Box>
    ) : null;
  }},
];

export default function MessageQueuePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [paused, setPaused] = useState(false);

  const pending = rows.filter((r) => r.status === 'Menunggu').length;
  const sending = rows.filter((r) => r.status === 'Mengirim').length;
  const failed = rows.filter((r) => r.status === 'Gagal').length;
  const sent = rows.filter((r) => r.status === 'Terkirim').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Antrian Pesan</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant={paused ? 'contained' : 'outlined'} color={paused ? 'success' : 'warning'} startIcon={paused ? <PlayCircle /> : <PauseCircle />} onClick={() => { setPaused(!paused); enqueueSnackbar(paused ? 'Antrian dilanjutkan' : 'Antrian dijeda', { variant: 'info' }); }}>{paused ? 'Lanjutkan' : 'Jeda Antrian'}</Button>
          <Button variant="outlined" startIcon={<CleaningServices />} onClick={() => enqueueSnackbar('Pesan gagal dibersihkan', { variant: 'success' })}>Bersihkan Gagal</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2, mb: 3 }}>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}><Typography variant="h5" fontWeight={700}>{pending}</Typography><Typography variant="body2" color="text.secondary">Menunggu</Typography></Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color="primary">{sending}</Typography><Typography variant="body2" color="text.secondary">Mengirim</Typography></Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color="error">{failed}</Typography><Typography variant="body2" color="text.secondary">Gagal</Typography></Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color="success.main">{sent}</Typography><Typography variant="body2" color="text.secondary">Terkirim Hari Ini</Typography></Paper>
      </Box>

      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
    </Box>
  );
}
