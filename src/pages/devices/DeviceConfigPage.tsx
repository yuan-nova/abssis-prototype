import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, IconButton, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Edit, Delete, NetworkCheck } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const rows = [
  { id: 1, name: 'Gerbang Utama', ip: '192.168.1.101', location: 'Gerbang Depan', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: true, status: 'Online' },
  { id: 2, name: 'Gerbang Belakang', ip: '192.168.1.102', location: 'Gerbang Belakang', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: false, status: 'Online' },
  { id: 3, name: 'Gedung A Lt.1', ip: '192.168.1.103', location: 'Lobby Gedung A', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: false, status: 'Online' },
  { id: 4, name: 'Gedung A Lt.2', ip: '192.168.1.104', location: 'Koridor Gedung A', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: false, status: 'Warning' },
  { id: 5, name: 'Gedung B Lt.1', ip: '192.168.1.105', location: 'Lobby Gedung B', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: false, status: 'Online' },
  { id: 6, name: 'Gedung B Lt.2', ip: '192.168.1.106', location: 'Koridor Gedung B', timezone: 'WIB (UTC+7)', hours: '06:00-17:00', primary: false, status: 'Offline' },
];

export default function DeviceConfigPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nama', width: 160 },
    { field: 'ip', headerName: 'IP Address', width: 140 },
    { field: 'location', headerName: 'Lokasi', width: 160 },
    { field: 'timezone', headerName: 'Timezone', width: 120 },
    { field: 'hours', headerName: 'Jam Kerja', width: 120 },
    { field: 'primary', headerName: 'Primary', width: 90, renderCell: (p) => p.value ? <Chip label="Ya" size="small" color="primary" /> : <Chip label="-" size="small" variant="outlined" /> },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'Online' ? 'success' : p.value === 'Warning' ? 'warning' : 'error'} /> },
    { field: 'actions', headerName: 'Aksi', width: 150, sortable: false, renderCell: () => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size="small" onClick={() => setOpen(true)}><Edit fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => enqueueSnackbar('Koneksi berhasil!', { variant: 'success' })}><NetworkCheck fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => enqueueSnackbar('Perangkat berhasil dihapus', { variant: 'success' })}><Delete fontSize="small" /></IconButton>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Konfigurasi Perangkat</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah Perangkat</Button>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Konfigurasi Perangkat</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Nama Perangkat" defaultValue="" />
          <TextField label="IP Address" defaultValue="" placeholder="192.168.1.xxx" />
          <TextField label="Lokasi" defaultValue="" />
          <TextField label="Jam Mulai" type="time" defaultValue="06:00" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Jam Selesai" type="time" defaultValue="17:00" slotProps={{ inputLabel: { shrink: true } }} />
          <FormControlLabel control={<Switch />} label="Primary Registration Device" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Konfigurasi berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
