import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Archive, Download } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const archives = [
  { id: 1, type: 'Kehadiran', year: '2024/2025', records: 12450, size: '45 MB', status: 'Belum Diarsipkan', date: '' },
  { id: 2, type: 'Poin Disiplin', year: '2024/2025', records: 890, size: '8 MB', status: 'Belum Diarsipkan', date: '' },
  { id: 3, type: 'Kehadiran', year: '2023/2024', records: 11200, size: '42 MB', status: 'Diarsipkan', date: '2024-07-20' },
  { id: 4, type: 'Poin Disiplin', year: '2023/2024', records: 756, size: '6 MB', status: 'Diarsipkan', date: '2024-07-20' },
  { id: 5, type: 'Jurnal Mengajar', year: '2023/2024', records: 4520, size: '18 MB', status: 'Diarsipkan', date: '2024-07-21' },
];

const columns: GridColDef[] = [
  { field: 'type', headerName: 'Tipe Data', width: 160 },
  { field: 'year', headerName: 'Tahun Ajaran', width: 130 },
  { field: 'records', headerName: 'Jumlah Record', width: 140, type: 'number' },
  { field: 'size', headerName: 'Ukuran', width: 100 },
  { field: 'status', headerName: 'Status', width: 150, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Diarsipkan' ? 'success' : 'warning'} /> },
  { field: 'date', headerName: 'Tanggal Arsip', width: 140 },
];

export default function DataArchivePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const handleArchive = () => {
    setConfirmOpen(false);
    setArchiving(true);
    setTimeout(() => {
      setArchiving(false);
      enqueueSnackbar('Data berhasil diarsipkan', { variant: 'success' });
    }, 2000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Arsip Data</Typography>
        <Button variant="outlined" startIcon={<Download />} onClick={() => enqueueSnackbar('Mengexport data arsip...', { variant: 'info' })}>Export Arsip</Button>
      </Box>

      {archiving && <LinearProgress sx={{ mb: 2 }} />}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
        {archives.filter((a) => a.status === 'Belum Diarsipkan').map((a) => (
          <Card key={a.id}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>{a.type} {a.year}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{a.records.toLocaleString()} records | {a.size}</Typography>
              <Chip label="Belum Diarsipkan" color="warning" size="small" sx={{ mb: 2 }} />
              <Box><Button variant="contained" startIcon={<Archive />} onClick={() => setConfirmOpen(true)}>Arsipkan</Button></Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Arsip</Typography>
      <DataGrid rows={archives} columns={columns} autoHeight pageSizeOptions={[10]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Konfirmasi Arsip</DialogTitle>
        <DialogContent><Typography>Data akan dipindahkan ke tabel arsip. Data tetap dapat diakses untuk laporan. Lanjutkan?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleArchive}>Arsipkan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
