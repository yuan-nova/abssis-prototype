import { useState } from 'react';
import { Box, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, FileDownload, Upload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const events = [
  { id: 1, date: '2026-01-01', endDate: '2026-01-01', name: 'Tahun Baru 2026', type: 'Libur Nasional', notes: '' },
  { id: 2, date: '2026-01-27', endDate: '2026-01-27', name: "Isra' Mi'raj", type: 'Libur Nasional', notes: '' },
  { id: 3, date: '2026-02-09', endDate: '2026-02-14', name: 'UTS Semester Genap', type: 'UTS', notes: 'Kelas 10, 11, 12' },
  { id: 4, date: '2026-02-19', endDate: '2026-02-19', name: 'Tahun Baru Imlek', type: 'Libur Nasional', notes: '' },
  { id: 5, date: '2026-03-20', endDate: '2026-04-03', name: 'Hari Raya Idul Fitri', type: 'Libur Nasional', notes: 'Termasuk cuti bersama' },
  { id: 6, date: '2026-04-10', endDate: '2026-04-10', name: 'Wafat Isa Al-Masih', type: 'Libur Nasional', notes: '' },
  { id: 7, date: '2026-05-01', endDate: '2026-05-01', name: 'Hari Buruh', type: 'Libur Nasional', notes: '' },
  { id: 8, date: '2026-05-14', endDate: '2026-05-14', name: 'Hari Raya Waisak', type: 'Libur Nasional', notes: '' },
  { id: 9, date: '2026-05-21', endDate: '2026-05-21', name: 'Kenaikan Isa Al-Masih', type: 'Libur Nasional', notes: '' },
  { id: 10, date: '2026-05-27', endDate: '2026-05-27', name: 'Idul Adha', type: 'Libur Nasional', notes: '' },
  { id: 11, date: '2026-06-01', endDate: '2026-06-06', name: 'UAS Semester Genap', type: 'UAS', notes: 'Semua kelas' },
  { id: 12, date: '2026-06-13', endDate: '2026-06-13', name: 'Pembagian Rapor', type: 'Kegiatan Sekolah', notes: '' },
  { id: 13, date: '2026-06-15', endDate: '2026-07-12', name: 'Libur Semester Genap', type: 'Libur Sekolah', notes: '' },
  { id: 14, date: '2026-03-05', endDate: '2026-03-07', name: 'Perkemahan Pramuka', type: 'Kegiatan Sekolah', notes: 'Kelas 10' },
  { id: 15, date: '2026-04-17', endDate: '2026-04-17', name: 'Hari Kartini', type: 'Kegiatan Sekolah', notes: 'Peringatan di sekolah' },
];

const typeColor: Record<string, 'error' | 'primary' | 'success' | 'secondary'> = { 'Libur Nasional': 'error', 'Libur Sekolah': 'error', UTS: 'primary', UAS: 'primary', 'Kegiatan Sekolah': 'success' };

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Tanggal Mulai', width: 130 },
  { field: 'endDate', headerName: 'Tanggal Selesai', width: 130 },
  { field: 'name', headerName: 'Nama Event', flex: 1, minWidth: 200 },
  { field: 'type', headerName: 'Tipe', width: 150, renderCell: (p) => <Chip label={p.value} size="small" color={typeColor[p.value as string] || 'default'} /> },
  { field: 'notes', headerName: 'Keterangan', width: 180 },
];

export default function AcademicCalendarPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Kalender Akademik</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Upload />} onClick={() => enqueueSnackbar('Hari libur nasional berhasil diimport', { variant: 'success' })}>Import Libur Nasional</Button>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport ke ICS...', { variant: 'info' })}>Export ICS</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Tambah Event</Button>
        </Box>
      </Box>
      <DataGrid rows={events} columns={columns} autoHeight pageSizeOptions={[25]} initialState={{ sorting: { sortModel: [{ field: 'date', sort: 'asc' }] }, pagination: { paginationModel: { pageSize: 25 } } }} />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Event</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Nama Event" />
          <FormControl size="small"><InputLabel>Tipe</InputLabel><Select label="Tipe"><MenuItem value="Libur Nasional">Libur Nasional</MenuItem><MenuItem value="Libur Sekolah">Libur Sekolah</MenuItem><MenuItem value="UTS">UTS</MenuItem><MenuItem value="UAS">UAS</MenuItem><MenuItem value="Kegiatan Sekolah">Kegiatan Sekolah</MenuItem></Select></FormControl>
          <TextField label="Tanggal Mulai" type="date" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Tanggal Selesai" type="date" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Keterangan" multiline rows={2} />
        </DialogContent>
        <DialogActions><Button onClick={() => setOpen(false)}>Batal</Button><Button variant="contained" onClick={() => { setOpen(false); enqueueSnackbar('Event berhasil ditambahkan', { variant: 'success' }); }}>Simpan</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
