import { useState } from 'react';
import { Box, Typography, Button, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Backup, Restore, CloudUpload, CloudDownload, Schedule, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const backupHistory = [
  { id: 1, date: '2026-01-28 02:00', type: 'Otomatis', size: '245 MB', status: 'Berhasil', includes: 'Full Database' },
  { id: 2, date: '2026-01-27 02:00', type: 'Otomatis', size: '244 MB', status: 'Berhasil', includes: 'Full Database' },
  { id: 3, date: '2026-01-26 02:00', type: 'Otomatis', size: '243 MB', status: 'Berhasil', includes: 'Full Database' },
  { id: 4, date: '2026-01-25 14:30', type: 'Manual', size: '180 MB', status: 'Berhasil', includes: 'Data Siswa + Kehadiran' },
  { id: 5, date: '2026-01-25 02:00', type: 'Otomatis', size: '242 MB', status: 'Gagal', includes: 'Full Database' },
  { id: 6, date: '2026-01-24 02:00', type: 'Otomatis', size: '241 MB', status: 'Berhasil', includes: 'Full Database' },
  { id: 7, date: '2026-01-20 10:00', type: 'Manual', size: '240 MB', status: 'Berhasil', includes: 'Full Database' },
  { id: 8, date: '2026-01-15 02:00', type: 'Otomatis', size: '238 MB', status: 'Berhasil', includes: 'Full Database' },
];

const statusColor: Record<string, 'success' | 'error'> = { 'Berhasil': 'success', 'Gagal': 'error' };

export default function BackupRestorePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [backupProgress, setBackupProgress] = useState(false);

  const handleBackup = () => {
    setBackupProgress(true);
    setTimeout(() => {
      setBackupProgress(false);
      enqueueSnackbar('Backup berhasil dibuat: backup_20260128_manual.sql (245 MB)', { variant: 'success' });
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Backup & Restore</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Backup sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" fontWeight={600}>Backup Terakhir</Typography>
          <Typography variant="h5" fontWeight={700} color="success.main">28 Jan 2026</Typography>
          <Typography variant="body2" color="text.secondary">02:00 - Otomatis - 245 MB</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <CloudUpload sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
          <Typography variant="h6" fontWeight={600}>Total Backup</Typography>
          <Typography variant="h5" fontWeight={700}>24</Typography>
          <Typography variant="body2" color="text.secondary">Termasuk 3 backup manual</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Schedule sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h6" fontWeight={600}>Jadwal Berikutnya</Typography>
          <Typography variant="h5" fontWeight={700}>29 Jan 02:00</Typography>
          <Typography variant="body2" color="text.secondary">Backup otomatis harian</Typography>
        </Paper>
      </Box>

      {backupProgress && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Membuat backup...</Typography>
          <LinearProgress />
        </Paper>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Aksi Cepat</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<Backup />} onClick={handleBackup} disabled={backupProgress}>Backup Sekarang</Button>
          <Button variant="outlined" startIcon={<Restore />} onClick={() => setRestoreOpen(true)}>Restore dari Backup</Button>
          <Button variant="outlined" startIcon={<CloudDownload />} onClick={() => enqueueSnackbar('Download backup terakhir dimulai...', { variant: 'info' })}>Download Backup Terakhir</Button>
          <Button variant="outlined" startIcon={<CloudUpload />} onClick={() => enqueueSnackbar('Fitur upload backup akan segera tersedia', { variant: 'info' })}>Upload Backup</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Riwayat Backup</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Ukuran</TableCell>
                <TableCell>Konten</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backupHistory.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.date}</TableCell>
                  <TableCell><Chip label={b.type} size="small" variant="outlined" color={b.type === 'Manual' ? 'primary' : 'default'} /></TableCell>
                  <TableCell>{b.size}</TableCell>
                  <TableCell>{b.includes}</TableCell>
                  <TableCell><Chip label={b.status} size="small" color={statusColor[b.status]} /></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button size="small" onClick={() => enqueueSnackbar(`Download backup ${b.date} dimulai`, { variant: 'info' })} disabled={b.status === 'Gagal'}>Download</Button>
                      <Button size="small" color="error" onClick={() => enqueueSnackbar(`Backup ${b.date} dihapus`, { variant: 'warning' })}><Delete fontSize="small" /></Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pengaturan Backup Otomatis</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Aktifkan backup otomatis" />
          <FormControl size="small">
            <InputLabel>Frekuensi</InputLabel>
            <Select defaultValue="daily" label="Frekuensi">
              <MenuItem value="daily">Harian</MenuItem>
              <MenuItem value="weekly">Mingguan</MenuItem>
              <MenuItem value="monthly">Bulanan</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Jam backup" type="time" defaultValue="02:00" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Simpan backup terakhir (jumlah)" type="number" defaultValue={30} />
          <FormControlLabel control={<Switch defaultChecked />} label="Kompres backup (gzip)" />
          <FormControlLabel control={<Switch />} label="Upload ke cloud storage" />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" startIcon={<Backup />} onClick={() => enqueueSnackbar('Pengaturan backup otomatis disimpan', { variant: 'success' })}>Simpan Pengaturan</Button>
        </Box>
      </Paper>

      <Dialog open={restoreOpen} onClose={() => setRestoreOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Restore dari Backup</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            Peringatan: Proses restore akan menimpa data saat ini. Pastikan Anda sudah membuat backup terbaru sebelum melanjutkan.
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Pilih Backup</InputLabel>
            <Select defaultValue="" label="Pilih Backup">
              {backupHistory.filter((b) => b.status === 'Berhasil').map((b) => (
                <MenuItem key={b.id} value={b.id}>{b.date} - {b.type} ({b.size})</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel control={<Switch />} label="Saya memahami risiko dan ingin melanjutkan" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestoreOpen(false)}>Batal</Button>
          <Button variant="contained" color="warning" onClick={() => { setRestoreOpen(false); enqueueSnackbar('Proses restore dimulai. Sistem akan restart dalam beberapa menit.', { variant: 'warning' }); }}>Restore</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
