import { useState } from 'react';
import { Box, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, name: 'Berkelahi', description: 'Terlibat perkelahian fisik di lingkungan sekolah', defaultPoints: 15, severity: 'Berat', isActive: true, usageCount: 5 },
  { id: 2, name: 'Merokok', description: 'Merokok di lingkungan sekolah', defaultPoints: 20, severity: 'Berat', isActive: true, usageCount: 3 },
  { id: 3, name: 'Pelanggaran Seragam', description: 'Tidak memakai seragam sesuai ketentuan', defaultPoints: 5, severity: 'Ringan', isActive: true, usageCount: 12 },
  { id: 4, name: 'Terlambat Berulang', description: 'Terlambat lebih dari 3 kali dalam sebulan', defaultPoints: 5, severity: 'Ringan', isActive: true, usageCount: 8 },
  { id: 5, name: 'Membolos', description: 'Tidak mengikuti pelajaran tanpa keterangan', defaultPoints: 10, severity: 'Sedang', isActive: true, usageCount: 15 },
  { id: 6, name: 'Bullying', description: 'Melakukan intimidasi/perundungan terhadap siswa lain', defaultPoints: 25, severity: 'Berat', isActive: true, usageCount: 2 },
  { id: 7, name: 'Vandalisme', description: 'Merusak fasilitas sekolah dengan sengaja', defaultPoints: 15, severity: 'Sedang', isActive: true, usageCount: 3 },
  { id: 8, name: 'Penggunaan HP', description: 'Menggunakan HP saat jam pelajaran tanpa izin', defaultPoints: 5, severity: 'Ringan', isActive: true, usageCount: 10 },
];

const sevColor: Record<string, 'warning' | 'error' | 'default'> = { 'Ringan': 'warning', 'Sedang': 'default', 'Berat': 'error' };

export default function ViolationCategoriesPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nama Kategori', flex: 1, minWidth: 160 },
    { field: 'description', headerName: 'Deskripsi', flex: 1.5, minWidth: 250 },
    { field: 'defaultPoints', headerName: 'Poin Default', width: 110, type: 'number' },
    { field: 'severity', headerName: 'Tingkat', width: 110, renderCell: (p) => <Chip label={p.value} size="small" color={sevColor[p.value as string] || 'default'} /> },
    { field: 'isActive', headerName: 'Status', width: 90, renderCell: (p) => <Chip label={p.value ? 'Aktif' : 'Nonaktif'} size="small" color={p.value ? 'success' : 'default'} /> },
    { field: 'usageCount', headerName: 'Penggunaan', width: 100, type: 'number' },
    { field: 'actions', headerName: 'Aksi', width: 110, sortable: false, renderCell: (p) => (
      <Box>
        <IconButton size="small" onClick={() => setOpen(true)}><Edit fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => {
          if ((p.row.usageCount as number) > 0) enqueueSnackbar('Tidak dapat menghapus kategori yang masih digunakan', { variant: 'error' });
          else enqueueSnackbar('Kategori berhasil dihapus', { variant: 'success' });
        }}><Delete fontSize="small" /></IconButton>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Kategori Pelanggaran</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah Kategori</Button>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Kategori Pelanggaran</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Nama Kategori" />
          <TextField label="Deskripsi" multiline rows={2} />
          <TextField label="Poin Default" type="number" />
          <FormControl size="small"><InputLabel>Tingkat Keparahan</InputLabel><Select label="Tingkat Keparahan"><MenuItem value="Ringan">Ringan</MenuItem><MenuItem value="Sedang">Sedang</MenuItem><MenuItem value="Berat">Berat</MenuItem></Select></FormControl>
          <FormControlLabel control={<Switch defaultChecked />} label="Aktif" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Kategori berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
