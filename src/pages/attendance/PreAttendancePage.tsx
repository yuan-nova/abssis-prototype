import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Edit, Delete, Upload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const studentOptions = ['Ahmad Rizki Pratama (10-A)', 'Ayu Safitri (10-B)', 'Bagas Setiawan (11-A)', 'Citra Permata Sari (10-C)', 'Dimas Aditya Putra (11-B)', 'Eka Putri Rahayu (11-A)', 'Farel Anggara (12-A)', 'Gita Nadia Permata (10-A)', 'Hadi Kurniawan (12-B)', 'Indah Lestari (11-C)'];

const rows = [
  { id: 1, student: 'Ahmad Rizki Pratama', kelas: '10-A', type: 'S', startDate: '2026-01-31', endDate: '2026-02-02', reason: 'Demam dan batuk', createdBy: 'Rina Wulandari' },
  { id: 2, student: 'Citra Permata Sari', kelas: '10-C', type: 'I', startDate: '2026-01-31', endDate: '2026-01-31', reason: 'Acara keluarga', createdBy: 'Rina Wulandari' },
  { id: 3, student: 'Farel Anggara', kelas: '12-A', type: 'S', startDate: '2026-01-30', endDate: '2026-02-01', reason: 'Rawat inap RS', createdBy: 'Dedi Kurniawan' },
  { id: 4, student: 'Putri Rahayu', kelas: '11-A', type: 'I', startDate: '2026-01-30', endDate: '2026-01-30', reason: 'Mengikuti lomba olympiade', createdBy: 'Rina Wulandari' },
  { id: 5, student: 'Bagas Setiawan', kelas: '11-A', type: 'S', startDate: '2026-01-29', endDate: '2026-01-30', reason: 'Sakit gigi, ke dokter', createdBy: 'Dedi Kurniawan' },
  { id: 6, student: 'Nadia Permata', kelas: '10-C', type: 'I', startDate: '2026-01-29', endDate: '2026-01-29', reason: 'Urusan keluarga mendesak', createdBy: 'Rina Wulandari' },
];

const columns: GridColDef[] = [
  { field: 'student', headerName: 'Siswa', flex: 1, minWidth: 180 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'type', headerName: 'Tipe', width: 90, renderCell: (p) => <Chip label={p.value === 'S' ? 'Sakit' : 'Izin'} size="small" color={p.value === 'S' ? 'info' : 'secondary'} /> },
  { field: 'startDate', headerName: 'Mulai', width: 120 },
  { field: 'endDate', headerName: 'Selesai', width: 120 },
  { field: 'reason', headerName: 'Alasan', flex: 1, minWidth: 180 },
  { field: 'createdBy', headerName: 'Dibuat Oleh', width: 150 },
  { field: 'actions', headerName: 'Aksi', width: 100, sortable: false, renderCell: () => (
    <Box><IconButton size="small"><Edit fontSize="small" /></IconButton><IconButton size="small"><Delete fontSize="small" /></IconButton></Box>
  )},
];

export default function PreAttendancePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Input Pra-Kehadiran</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah</Button>
      </Box>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[10]} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Input Pra-Kehadiran</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <Autocomplete options={studentOptions} renderInput={(params) => <TextField {...params} label="Pilih Siswa" />} />
          <FormControl fullWidth size="small"><InputLabel>Tipe</InputLabel><Select label="Tipe" defaultValue="S"><MenuItem value="S">Sakit (S)</MenuItem><MenuItem value="I">Izin (I)</MenuItem></Select></FormControl>
          <TextField label="Tanggal Mulai" type="date" defaultValue="2026-02-01" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Tanggal Selesai" type="date" defaultValue="2026-02-01" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Alasan" multiline rows={2} />
          <Button variant="outlined" startIcon={<Upload />} onClick={() => enqueueSnackbar('Dokumen berhasil diupload', { variant: 'success' })}>Upload Dokumen Pendukung</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Pra-kehadiran berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
