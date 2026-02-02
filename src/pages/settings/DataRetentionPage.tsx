import { Box, Typography, Button, Paper, TextField, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, FormControlLabel } from '@mui/material';
import { Save, DeleteSweep, Warning } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const retentionPolicies = [
  { category: 'Data Kehadiran', retention: '5 tahun', autoDelete: true, lastCleanup: '2026-01-01', records: '1,245,000' },
  { category: 'Log Audit', retention: '3 tahun', autoDelete: true, lastCleanup: '2026-01-01', records: '89,340' },
  { category: 'Jurnal Mengajar', retention: '5 tahun', autoDelete: false, lastCleanup: '-', records: '34,200' },
  { category: 'Data Pelanggaran', retention: '3 tahun', autoDelete: true, lastCleanup: '2025-12-15', records: '12,450' },
  { category: 'Log Notifikasi WA', retention: '1 tahun', autoDelete: true, lastCleanup: '2026-01-15', records: '456,780' },
  { category: 'Data Siswa Lulus', retention: '10 tahun', autoDelete: false, lastCleanup: '-', records: '8,900' },
  { category: 'Backup Database', retention: '6 bulan', autoDelete: true, lastCleanup: '2026-01-20', records: '24' },
  { category: 'File Temporary', retention: '30 hari', autoDelete: true, lastCleanup: '2026-01-28', records: '1,230' },
];

const archiveSummary = [
  { year: '2023/2024', students: 620, attendance: '245,000', journals: '12,400', violations: '3,200', status: 'Diarsipkan' },
  { year: '2024/2025', students: 615, attendance: '312,000', journals: '14,800', violations: '4,100', status: 'Diarsipkan' },
  { year: '2025/2026', students: 623, attendance: '156,000', journals: '7,000', violations: '2,150', status: 'Aktif' },
];

export default function DataRetentionPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Retensi Data</Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Warning color="warning" />
          <Typography variant="subtitle1" fontWeight={600}>Peringatan Penyimpanan</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Total penggunaan database: <strong>2.4 GB</strong> dari <strong>10 GB</strong> (24%).
          Direkomendasikan untuk membersihkan data temporary dan log lama secara berkala.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Kebijakan Retensi</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Kategori Data</TableCell>
                <TableCell>Masa Retensi</TableCell>
                <TableCell>Auto-Delete</TableCell>
                <TableCell>Terakhir Dibersihkan</TableCell>
                <TableCell>Jumlah Record</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {retentionPolicies.map((p) => (
                <TableRow key={p.category}>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.retention}</TableCell>
                  <TableCell><Switch defaultChecked={p.autoDelete} size="small" /></TableCell>
                  <TableCell>{p.lastCleanup}</TableCell>
                  <TableCell>{p.records}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<DeleteSweep />} color="error" onClick={() => enqueueSnackbar(`Pembersihan data ${p.category} dijadwalkan`, { variant: 'info' })}>
                      Bersihkan
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Arsip Per Tahun Ajaran</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tahun Ajaran</TableCell>
                <TableCell>Siswa</TableCell>
                <TableCell>Kehadiran</TableCell>
                <TableCell>Jurnal</TableCell>
                <TableCell>Pelanggaran</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {archiveSummary.map((a) => (
                <TableRow key={a.year}>
                  <TableCell sx={{ fontWeight: 600 }}>{a.year}</TableCell>
                  <TableCell>{a.students}</TableCell>
                  <TableCell>{a.attendance}</TableCell>
                  <TableCell>{a.journals}</TableCell>
                  <TableCell>{a.violations}</TableCell>
                  <TableCell><Chip label={a.status} size="small" color={a.status === 'Aktif' ? 'success' : 'default'} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pengaturan Umum</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Peringatan penggunaan disk (%)" type="number" defaultValue={80} />
          <TextField label="Jadwal auto-cleanup (cron)" defaultValue="0 2 * * 0" helperText="Default: Setiap Minggu jam 02:00" />
          <FormControlLabel control={<Switch defaultChecked />} label="Kirim notifikasi sebelum auto-delete" />
          <FormControlLabel control={<Switch defaultChecked />} label="Simpan backup sebelum delete" />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Kebijakan retensi berhasil disimpan', { variant: 'success' })}>Simpan Kebijakan</Button>
        <Button variant="outlined" color="error" startIcon={<DeleteSweep />} onClick={() => enqueueSnackbar('Pembersihan manual untuk semua kategori dijadwalkan', { variant: 'info' })}>Bersihkan Semua Expired</Button>
      </Box>
    </Box>
  );
}
