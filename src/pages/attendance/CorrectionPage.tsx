import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

const studentOptions = ['Ahmad Rizki Pratama (10-A)', 'Ayu Safitri (10-B)', 'Bagas Setiawan (11-A)', 'Citra Permata Sari (10-C)', 'Dimas Aditya Putra (11-B)', 'Eka Putri Rahayu (11-A)'];

export default function CorrectionPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [searched, setSearched] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Koreksi Kehadiran</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Cari Data Kehadiran</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
          <Autocomplete options={studentOptions} renderInput={(params) => <TextField {...params} label="Pilih Siswa" size="small" />} />
          <TextField label="Tanggal" type="date" defaultValue="2026-01-31" size="small" slotProps={{ inputLabel: { shrink: true } }} />
          <Button variant="contained" onClick={() => setSearched(true)}>Cari</Button>
        </Box>
      </Paper>

      {searched && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Data Kehadiran</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Nama Siswa</Typography>
              <Typography fontWeight={600}>Ahmad Rizki Pratama</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Kelas</Typography>
              <Typography fontWeight={600}>10-A</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Tanggal</Typography>
              <Typography fontWeight={600}>31 Januari 2026</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Status Saat Ini</Typography>
              <Chip label="Alpha (A)" color="error" size="small" />
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            Data asli sidik jari: Tidak ada scan pada tanggal tersebut. Terakhir scan 30 Januari 2026 pukul 07:05 di Gerbang Utama.
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status Baru</InputLabel>
              <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} label="Status Baru">
                <MenuItem value="H">Hadir (H)</MenuItem>
                <MenuItem value="T">Terlambat (T)</MenuItem>
                <MenuItem value="S">Sakit (S)</MenuItem>
                <MenuItem value="I">Izin (I)</MenuItem>
                <MenuItem value="A">Alpha (A)</MenuItem>
              </Select>
            </FormControl>

            {(newStatus === 'H' || newStatus === 'T') && (
              <TextField label="Waktu Manual" type="time" defaultValue="07:10" size="small" slotProps={{ inputLabel: { shrink: true } }} />
            )}

            <TextField label="Alasan Koreksi" multiline rows={3} placeholder="Wajib diisi - jelaskan alasan koreksi" />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={() => enqueueSnackbar('Koreksi kehadiran berhasil disimpan', { variant: 'success' })}>Simpan Koreksi</Button>
              <Button variant="outlined" onClick={() => setSearched(false)}>Batal</Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
