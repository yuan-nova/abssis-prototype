import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, ContentCopy } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const materials = [
  { id: 1, title: 'Persamaan Kuadrat - Pengantar', subject: 'Matematika', grade: '10', content: 'Definisi persamaan kuadrat ax²+bx+c=0, menentukan akar-akar persamaan dengan pemfaktoran...', author: 'Ahmad Fauzi', date: '2026-01-15' },
  { id: 2, title: 'Hukum Newton I, II, III', subject: 'Fisika', grade: '10', content: 'Pembahasan tiga hukum Newton tentang gerak, penerapan dalam kehidupan sehari-hari...', author: 'Eko Prasetyo', date: '2026-01-10' },
  { id: 3, title: 'Teks Eksposisi - Struktur dan Ciri', subject: 'B. Indonesia', grade: '11', content: 'Pengertian teks eksposisi, struktur: tesis-argumentasi-penegasan ulang, contoh analisis...', author: 'Maria Ulfa', date: '2026-01-12' },
  { id: 4, title: 'Present Perfect Tense', subject: 'B. Inggris', grade: '10', content: 'Form: S + have/has + V3, usage for experiences, recent actions, duration...', author: 'Dewi Lestari', date: '2026-01-08' },
  { id: 5, title: 'Stoikiometri Dasar', subject: 'Kimia', grade: '11', content: 'Konsep mol, massa molar, hukum kekekalan massa, perhitungan stoikiometri sederhana...', author: 'Budi Santoso', date: '2026-01-20' },
  { id: 6, title: 'Sel dan Organel', subject: 'Biologi', grade: '10', content: 'Struktur sel prokariotik dan eukariotik, fungsi organel: mitokondria, ribosom, RE...', author: 'Sri Wahyuni', date: '2026-01-18' },
  { id: 7, title: 'Turunan Fungsi Aljabar', subject: 'Matematika', grade: '11', content: 'Definisi turunan, aturan pangkat, aturan penjumlahan, aturan perkalian, aturan rantai...', author: 'Ahmad Fauzi', date: '2026-01-22' },
  { id: 8, title: 'Sejarah Kemerdekaan RI', subject: 'Sejarah', grade: '11', content: 'Proses menuju kemerdekaan, peristiwa Rengasdengklok, proklamasi 17 Agustus 1945...', author: 'Wahyu Hidayat', date: '2026-01-05' },
];

export default function MaterialBankPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const filtered = materials.filter((m) =>
    (search === '' || m.title.toLowerCase().includes(search.toLowerCase())) &&
    (filterSubject === '' || m.subject === filterSubject)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Bank Materi</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>Tambah Materi</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField label="Cari materi..." size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 250 }} />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Mata Pelajaran</InputLabel>
          <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} label="Mata Pelajaran">
            <MenuItem value="">Semua</MenuItem>
            <MenuItem value="Matematika">Matematika</MenuItem>
            <MenuItem value="Fisika">Fisika</MenuItem>
            <MenuItem value="Kimia">Kimia</MenuItem>
            <MenuItem value="Biologi">Biologi</MenuItem>
            <MenuItem value="B. Indonesia">B. Indonesia</MenuItem>
            <MenuItem value="B. Inggris">B. Inggris</MenuItem>
            <MenuItem value="Sejarah">Sejarah</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        {filtered.map((m) => (
          <Card key={m.id}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>{m.title}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                <Chip label={m.subject} size="small" color="primary" variant="outlined" />
                <Chip label={`Kelas ${m.grade}`} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.content}</Typography>
              <Typography variant="caption" color="text.secondary">{m.author} | {m.date}</Typography>
              <Box sx={{ mt: 1.5 }}>
                <Button size="small" startIcon={<ContentCopy />} onClick={() => enqueueSnackbar('Materi disalin ke jurnal', { variant: 'success' })}>Gunakan</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Materi Baru</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Judul Materi" />
          <FormControl size="small"><InputLabel>Mata Pelajaran</InputLabel><Select label="Mata Pelajaran"><MenuItem value="MTK">Matematika</MenuItem><MenuItem value="FIS">Fisika</MenuItem><MenuItem value="KIM">Kimia</MenuItem></Select></FormControl>
          <FormControl size="small"><InputLabel>Tingkat Kelas</InputLabel><Select label="Tingkat Kelas"><MenuItem value="10">10</MenuItem><MenuItem value="11">11</MenuItem><MenuItem value="12">12</MenuItem></Select></FormControl>
          <TextField label="Konten Materi" multiline rows={5} />
          <TextField label="Tags" placeholder="Pisahkan dengan koma" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={() => { setAddOpen(false); enqueueSnackbar('Materi berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
