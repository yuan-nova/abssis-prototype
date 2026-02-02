import { useState } from 'react';
import { Box, Typography, Button, Paper, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FileDownload, Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const sources = ['Kehadiran', 'Poin Disiplin', 'Jurnal Mengajar'];
const fieldsBySource: Record<string, string[]> = {
  'Kehadiran': ['Nama Siswa', 'NISN', 'Kelas', 'Tanggal', 'Status', 'Jam Scan', 'Perangkat'],
  'Poin Disiplin': ['Nama Siswa', 'Kelas', 'Tanggal', 'Kategori', 'Poin', 'Tindakan', 'Status'],
  'Jurnal Mengajar': ['Guru', 'Mata Pelajaran', 'Kelas', 'Tanggal', 'Jam Ke', 'Materi', 'Metode'],
};

const previewData = [
  ['Ahmad Rizki', '0051234001', '10-A', '2026-01-31', 'Hadir', '07:05', 'Gerbang Utama'],
  ['Ayu Safitri', '0051234002', '10-B', '2026-01-31', 'Hadir', '07:02', 'Gerbang Utama'],
  ['Bagas Setiawan', '0051234003', '11-A', '2026-01-31', 'Alpha', '-', '-'],
];

export default function CustomReportPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [source, setSource] = useState('Kehadiran');
  const [selectedFields, setSelectedFields] = useState<string[]>(fieldsBySource['Kehadiran']);

  const fields = fieldsBySource[source] || [];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Laporan Kustom</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>1. Sumber Data</Typography>
          <RadioGroup value={source} onChange={(e) => { setSource(e.target.value); setSelectedFields(fieldsBySource[e.target.value]); }}>
            {sources.map((s) => <FormControlLabel key={s} value={s} control={<Radio />} label={s} />)}
          </RadioGroup>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>2. Pilih Field</Typography>
          <FormGroup>
            {fields.map((f) => (
              <FormControlLabel key={f} control={<Checkbox checked={selectedFields.includes(f)} onChange={(e) => setSelectedFields(e.target.checked ? [...selectedFields, f] : selectedFields.filter((s) => s !== f))} size="small" />} label={f} />
            ))}
          </FormGroup>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>3. Filter</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Kelas: Semua</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Tanggal: Januari 2026</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Status: Semua</Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>Edit Filter</Button>
        </Paper>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Preview</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead><TableRow>{selectedFields.map((f) => <TableCell key={f}>{f}</TableCell>)}</TableRow></TableHead>
            <TableBody>
              {previewData.map((row, i) => (
                <TableRow key={i}>{selectedFields.map((_, fi) => <TableCell key={fi}>{row[fi]}</TableCell>)}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>Menampilkan 3 dari 623 record</Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport laporan kustom...', { variant: 'info' })}>Export</Button>
        <Button variant="outlined" startIcon={<Save />} onClick={() => enqueueSnackbar('Konfigurasi laporan berhasil disimpan', { variant: 'success' })}>Simpan Konfigurasi</Button>
      </Box>
    </Box>
  );
}
