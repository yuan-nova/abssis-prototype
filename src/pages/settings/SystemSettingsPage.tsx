import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Switch, FormControlLabel, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Save, RestartAlt } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function SystemSettingsPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Pengaturan Sistem</Typography>
        <Button variant="outlined" color="warning" startIcon={<RestartAlt />} onClick={() => setResetOpen(true)}>Reset ke Default</Button>
      </Box>

      <Paper>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
          <Tab label="Umum" /><Tab label="Kehadiran" /><Tab label="Disiplin" /><Tab label="Notifikasi" /><Tab label="Laporan" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tab} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField label="Nama Sekolah" defaultValue="SMA Negeri 1 Kota Bandung" />
              <TextField label="Alamat" defaultValue="Jl. Belitung No. 8, Bandung 40113" multiline rows={2} />
              <TextField label="Telepon" defaultValue="(022) 4206394" />
              <TextField label="Email" defaultValue="info@sman1bandung.sch.id" />
              <TextField label="Tahun Ajaran Aktif" defaultValue="2025/2026" disabled />
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField label="Interval Polling Perangkat (detik)" type="number" defaultValue={60} />
              <TextField label="Toleransi Scan (menit)" type="number" defaultValue={5} />
              <TextField label="Window Deteksi Duplikat (menit)" type="number" defaultValue={30} />
              <FormControlLabel control={<Switch defaultChecked />} label="Deteksi scan duplikat" />
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="Kalkulasi poin otomatis" />
              <TextField label="Masa berlaku poin (bulan)" type="number" defaultValue={12} />
              <FormControlLabel control={<Switch />} label="Reset poin tiap semester" />
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <FormControlLabel control={<Switch defaultChecked />} label="Notifikasi WhatsApp aktif" />
              <TextField label="Batas pesan harian" type="number" defaultValue={500} />
              <Box sx={{ display: 'flex', gap: 2 }}><TextField label="Jam Tenang Mulai" type="time" defaultValue="21:00" slotProps={{ inputLabel: { shrink: true } }} /><TextField label="Selesai" type="time" defaultValue="06:00" slotProps={{ inputLabel: { shrink: true } }} /></Box>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField label="Format default export" defaultValue="Excel" />
              <FormControlLabel control={<Switch defaultChecked />} label="Auto-generate laporan harian" />
              <FormControlLabel control={<Switch />} label="Sertakan header sekolah di laporan" />
            </Box>
          </TabPanel>

          <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Pengaturan berhasil disimpan', { variant: 'success' })}>Simpan</Button>
        </Box>
      </Paper>

      <Dialog open={resetOpen} onClose={() => setResetOpen(false)}>
        <DialogTitle>Reset ke Default</DialogTitle>
        <DialogContent><Typography>Semua pengaturan akan dikembalikan ke nilai default. Lanjutkan?</Typography></DialogContent>
        <DialogActions><Button onClick={() => setResetOpen(false)}>Batal</Button><Button variant="contained" color="warning" onClick={() => { setResetOpen(false); enqueueSnackbar('Pengaturan dikembalikan ke default', { variant: 'info' }); }}>Reset</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
