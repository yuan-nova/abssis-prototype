import { useState } from 'react';
import { Box, Typography, Button, Paper, Autocomplete, TextField, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PictureAsPdf, Print } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const studentOptions = ['Ahmad Rizki Pratama (10-A)', 'Ayu Safitri (10-B)', 'Bagas Setiawan (11-A)', 'Citra Permata (10-C)', 'Dimas Aditya (11-B)', 'Hadi Kurniawan (12-B)'];

export default function StudentReportCardPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Rapor Siswa</Typography>
        <Button variant="outlined" onClick={() => enqueueSnackbar('Generating rapor untuk seluruh kelas...', { variant: 'info' })}>Generate Seluruh Kelas</Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Autocomplete options={studentOptions} value={selected} onChange={(_, v) => setSelected(v)} renderInput={(params) => <TextField {...params} label="Pilih Siswa" />} sx={{ maxWidth: 400 }} />
      </Box>

      {selected && (
        <Paper sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>LAPORAN KEHADIRAN & DISIPLIN</Typography>
            <Typography variant="body2" color="text.secondary">SMA Negeri 1 Kota Bandung | Tahun Ajaran 2025/2026</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 3 }}>
            <Typography variant="body2"><strong>Nama:</strong> Ahmad Rizki Pratama</Typography>
            <Typography variant="body2"><strong>NISN:</strong> 0051234001</Typography>
            <Typography variant="body2"><strong>Kelas:</strong> 10-A</Typography>
            <Typography variant="body2"><strong>Wali Kelas:</strong> Ahmad Fauzi, S.Pd., M.Si.</Typography>
          </Box>

          <Typography variant="h6" sx={{ mb: 1 }}>Rekap Kehadiran (Januari 2026)</Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead><TableRow><TableCell>Hadir</TableCell><TableCell>Terlambat</TableCell><TableCell>Sakit</TableCell><TableCell>Izin</TableCell><TableCell>Alpha</TableCell><TableCell>% Kehadiran</TableCell></TableRow></TableHead>
              <TableBody><TableRow><TableCell>19</TableCell><TableCell>2</TableCell><TableCell>1</TableCell><TableCell>0</TableCell><TableCell>0</TableCell><TableCell><strong>95.5%</strong></TableCell></TableRow></TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mb: 1 }}>Rekap Poin Disiplin</Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead><TableRow><TableCell>Tanggal</TableCell><TableCell>Tipe</TableCell><TableCell>Poin</TableCell><TableCell>Keterangan</TableCell></TableRow></TableHead>
              <TableBody>
                <TableRow><TableCell>15 Jan 2026</TableCell><TableCell>Terlambat</TableCell><TableCell>+5</TableCell><TableCell>Terlambat 10 menit</TableCell></TableRow>
                <TableRow><TableCell colSpan={2}><strong>Total Poin</strong></TableCell><TableCell colSpan={2}><strong>5</strong></TableCell></TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mb: 1 }}>Catatan Guru BK</Typography>
          <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#fafafa' }}>
            <Typography variant="body2">Siswa menunjukkan perilaku yang baik. Keterlambatan bersifat sesekali dan sudah diperbaiki. Tidak ada catatan pelanggaran serius.</Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<PictureAsPdf />} onClick={() => enqueueSnackbar('Mengexport rapor ke PDF...', { variant: 'info' })}>Export PDF</Button>
            <Button variant="outlined" startIcon={<Print />} onClick={() => enqueueSnackbar('Mencetak rapor...', { variant: 'info' })}>Cetak</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
