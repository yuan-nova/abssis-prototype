import { useState } from 'react';
import { Box, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, name: 'Rekap Kehadiran Harian', type: 'Kehadiran', frequency: 'Harian', recipient: 'kepsek@sman1.sch.id', lastRun: '2026-01-31 17:00', isActive: true },
  { id: 2, name: 'Laporan Mingguan BK', type: 'Disiplin', frequency: 'Mingguan', recipient: 'bk@sman1.sch.id', lastRun: '2026-01-31 17:00', isActive: true },
  { id: 3, name: 'Rekap Kehadiran Bulanan', type: 'Kehadiran', frequency: 'Bulanan', recipient: 'admin@sman1.sch.id', lastRun: '2026-01-01 06:00', isActive: true },
  { id: 4, name: 'Kelengkapan Jurnal', type: 'Jurnal', frequency: 'Mingguan', recipient: 'wakasek@sman1.sch.id', lastRun: '2026-01-31 17:00', isActive: true },
  { id: 5, name: 'Ranking Pelanggaran', type: 'Disiplin', frequency: 'Bulanan', recipient: 'bk@sman1.sch.id', lastRun: '2026-01-01 06:00', isActive: false },
];

const freqColor: Record<string, 'primary' | 'secondary' | 'warning'> = { Harian: 'primary', Mingguan: 'secondary', Bulanan: 'warning' };

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nama Laporan', flex: 1, minWidth: 200 },
  { field: 'type', headerName: 'Tipe', width: 100 },
  { field: 'frequency', headerName: 'Frekuensi', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={freqColor[p.value as string]} /> },
  { field: 'recipient', headerName: 'Penerima', width: 200 },
  { field: 'lastRun', headerName: 'Terakhir Dijalankan', width: 170 },
  { field: 'isActive', headerName: 'Status', width: 90, renderCell: (p) => <Chip label={p.value ? 'Aktif' : 'Nonaktif'} size="small" color={p.value ? 'success' : 'default'} /> },
  { field: 'actions', headerName: 'Aksi', width: 110, sortable: false, renderCell: () => {
    const { enqueueSnackbar } = useSnackbar();
    return <Box><IconButton size="small" onClick={() => {}}><Edit fontSize="small" /></IconButton><IconButton size="small" onClick={() => enqueueSnackbar('Jadwal dihapus', { variant: 'success' })}><Delete fontSize="small" /></IconButton></Box>;
  }},
];

export default function ReportSchedulePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Jadwal Laporan Otomatis</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah Jadwal</Button>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Jadwal Laporan</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Nama Laporan" />
          <FormControl size="small"><InputLabel>Tipe Laporan</InputLabel><Select label="Tipe Laporan"><MenuItem value="Kehadiran">Kehadiran</MenuItem><MenuItem value="Disiplin">Disiplin</MenuItem><MenuItem value="Jurnal">Jurnal</MenuItem></Select></FormControl>
          <FormControl size="small"><InputLabel>Frekuensi</InputLabel><Select label="Frekuensi"><MenuItem value="Harian">Harian</MenuItem><MenuItem value="Mingguan">Mingguan</MenuItem><MenuItem value="Bulanan">Bulanan</MenuItem></Select></FormControl>
          <TextField label="Email Penerima" type="email" />
          <FormControlLabel control={<Switch defaultChecked />} label="Aktif" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Jadwal laporan berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
