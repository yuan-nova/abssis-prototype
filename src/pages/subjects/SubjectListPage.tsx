import { useState } from 'react';
import { Box, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, code: 'MTK', name: 'Matematika', category: 'Wajib', isActive: true },
  { id: 2, code: 'BIN', name: 'Bahasa Indonesia', category: 'Wajib', isActive: true },
  { id: 3, code: 'BIG', name: 'Bahasa Inggris', category: 'Wajib', isActive: true },
  { id: 4, code: 'FIS', name: 'Fisika', category: 'Peminatan MIPA', isActive: true },
  { id: 5, code: 'KIM', name: 'Kimia', category: 'Peminatan MIPA', isActive: true },
  { id: 6, code: 'BIO', name: 'Biologi', category: 'Peminatan MIPA', isActive: true },
  { id: 7, code: 'SEJ', name: 'Sejarah Indonesia', category: 'Wajib', isActive: true },
  { id: 8, code: 'PPK', name: 'Pendidikan Pancasila', category: 'Wajib', isActive: true },
  { id: 9, code: 'PAI', name: 'Pendidikan Agama Islam', category: 'Wajib', isActive: true },
  { id: 10, code: 'PJK', name: 'Pendidikan Jasmani', category: 'Wajib', isActive: true },
  { id: 11, code: 'SBD', name: 'Seni Budaya', category: 'Wajib', isActive: true },
  { id: 12, code: 'INF', name: 'Informatika', category: 'Wajib', isActive: true },
  { id: 13, code: 'EKO', name: 'Ekonomi', category: 'Peminatan IPS', isActive: true },
  { id: 14, code: 'PKW', name: 'Prakarya dan Kewirausahaan', category: 'Wajib', isActive: true },
];

export default function SubjectListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const catColor: Record<string, 'primary' | 'secondary' | 'warning'> = { 'Wajib': 'primary', 'Peminatan MIPA': 'secondary', 'Peminatan IPS': 'warning' };

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Kode', width: 90 },
    { field: 'name', headerName: 'Nama Mata Pelajaran', flex: 1, minWidth: 200 },
    { field: 'category', headerName: 'Kategori', width: 160, renderCell: (p) => <Chip label={p.value} size="small" color={catColor[p.value as string] || 'default'} /> },
    { field: 'isActive', headerName: 'Status', width: 100, renderCell: (p) => <Chip label={p.value ? 'Aktif' : 'Nonaktif'} size="small" color={p.value ? 'success' : 'default'} /> },
    { field: 'actions', headerName: 'Aksi', width: 110, sortable: false, renderCell: () => (
      <Box><IconButton size="small" onClick={() => setOpen(true)}><Edit fontSize="small" /></IconButton><IconButton size="small" onClick={() => enqueueSnackbar('Mata pelajaran berhasil dihapus', { variant: 'success' })}><Delete fontSize="small" /></IconButton></Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Mata Pelajaran</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah Mapel</Button>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[25]} initialState={{ pagination: { paginationModel: { pageSize: 25 } } }} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Mata Pelajaran</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Kode" placeholder="MTK" />
          <TextField label="Nama Mata Pelajaran" placeholder="Matematika" />
          <FormControl fullWidth size="small"><InputLabel>Kategori</InputLabel><Select label="Kategori"><MenuItem value="Wajib">Wajib</MenuItem><MenuItem value="Peminatan MIPA">Peminatan MIPA</MenuItem><MenuItem value="Peminatan IPS">Peminatan IPS</MenuItem></Select></FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Mata pelajaran berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
