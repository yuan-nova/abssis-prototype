import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, CheckCircle } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const years = [
  { id: 'ay-003', name: '2025/2026', start: '2025-07-14', end: '2026-06-13', isActive: true },
  { id: 'ay-002', name: '2024/2025', start: '2024-07-15', end: '2025-06-14', isActive: false },
  { id: 'ay-001', name: '2023/2024', start: '2023-07-17', end: '2024-06-15', isActive: false },
];

export default function AcademicYearPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [addOpen, setAddOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Tahun Ajaran</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>Tambah Tahun Ajaran</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {years.map((y) => (
          <Card key={y.id} sx={{ border: y.isActive ? '2px solid #1976d2' : undefined }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h6" fontWeight={700}>{y.name}</Typography>
                  {y.isActive && <Chip label="Aktif" color="primary" size="small" icon={<CheckCircle />} />}
                </Box>
                <Typography variant="body2" color="text.secondary">{y.start} s/d {y.end}</Typography>
              </Box>
              {!y.isActive && (
                <Button variant="outlined" onClick={() => { setSelected(y.id); setConfirmOpen(true); }}>Aktifkan</Button>
              )}
              <IconButton onClick={() => { setSelected(y.id); setAddOpen(true); }}><Edit /></IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selected ? 'Edit Tahun Ajaran' : 'Tambah Tahun Ajaran'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Nama" defaultValue="" placeholder="2026/2027" />
          <TextField label="Tanggal Mulai" type="date" defaultValue="2026-07-13" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Tanggal Selesai" type="date" defaultValue="2027-06-12" slotProps={{ inputLabel: { shrink: true } }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setAddOpen(false); enqueueSnackbar('Tahun ajaran berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent><Typography>Aktifkan tahun ajaran ini? Tahun ajaran sebelumnya akan dinonaktifkan.</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setConfirmOpen(false); enqueueSnackbar('Tahun ajaran berhasil diaktifkan', { variant: 'success' }); }}>Aktifkan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
