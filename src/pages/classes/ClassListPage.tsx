import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add, Edit, Visibility } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const classData = [
  { id: 'cls-10a', grade: 10, section: 'A', teacher: 'Ahmad Fauzi, S.Pd., M.Si.', count: 34, capacity: 36 },
  { id: 'cls-10b', grade: 10, section: 'B', teacher: 'Sri Wahyuni, S.Pd.', count: 35, capacity: 36 },
  { id: 'cls-10c', grade: 10, section: 'C', teacher: 'Budi Santoso, S.Pd.', count: 33, capacity: 36 },
  { id: 'cls-11a', grade: 11, section: 'A', teacher: 'Dewi Lestari, S.Pd., M.Pd.', count: 35, capacity: 36 },
  { id: 'cls-11b', grade: 11, section: 'B', teacher: 'Eko Prasetyo, S.Pd.', count: 34, capacity: 36 },
  { id: 'cls-11c', grade: 11, section: 'C', teacher: 'Nur Hidayah, S.Pd.', count: 32, capacity: 36 },
  { id: 'cls-12a', grade: 12, section: 'A', teacher: 'Irfan Hakim, S.Pd.', count: 34, capacity: 36 },
  { id: 'cls-12b', grade: 12, section: 'B', teacher: 'Maria Ulfa, S.Pd., M.Hum.', count: 35, capacity: 36 },
  { id: 'cls-12c', grade: 12, section: 'C', teacher: 'Fajar Ramadhan, S.Pd.', count: 33, capacity: 36 },
];

const rosterStudents = [
  { no: 1, nisn: '0051234001', nama: 'Ahmad Rizki Pratama', gender: 'L', status: 'Aktif' },
  { no: 2, nisn: '0051234002', nama: 'Ayu Safitri', gender: 'P', status: 'Aktif' },
  { no: 3, nisn: '0051234003', nama: 'Bagas Setiawan', gender: 'L', status: 'Aktif' },
  { no: 4, nisn: '0051234004', nama: 'Citra Permata Sari', gender: 'P', status: 'Aktif' },
  { no: 5, nisn: '0051234005', nama: 'Dimas Aditya Putra', gender: 'L', status: 'Aktif' },
  { no: 6, nisn: '0051234006', nama: 'Eka Putri Rahayu', gender: 'P', status: 'Aktif' },
  { no: 7, nisn: '0051234007', nama: 'Farel Anggara', gender: 'L', status: 'Aktif' },
  { no: 8, nisn: '0051234008', nama: 'Gita Nadia Permata', gender: 'P', status: 'Aktif' },
];

export default function ClassListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [addOpen, setAddOpen] = useState(false);
  const [rosterOpen, setRosterOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof classData[0] | null>(null);

  const grades = [10, 11, 12];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Data Kelas</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>Tambah Kelas</Button>
      </Box>

      {grades.map((grade) => (
        <Box key={grade} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5, color: 'text.secondary' }}>Kelas {grade}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            {classData.filter((c) => c.grade === grade).map((cls) => (
              <Card key={cls.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>Kelas {cls.grade}-{cls.section}</Typography>
                    <Chip label={`${cls.count}/${cls.capacity}`} size="small" color={cls.count >= cls.capacity ? 'error' : 'primary'} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Wali Kelas: {cls.teacher}</Typography>
                  <LinearProgress variant="determinate" value={(cls.count / cls.capacity) * 100} sx={{ mb: 2, height: 8, borderRadius: 4 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<Visibility />} onClick={() => { setSelectedClass(cls); setRosterOpen(true); }}>Roster</Button>
                    <IconButton size="small" onClick={() => { setSelectedClass(cls); setAddOpen(true); }}><Edit fontSize="small" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {/* Add/Edit Dialog */}
      <Dialog open={addOpen} onClose={() => { setAddOpen(false); setSelectedClass(null); }} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <FormControl fullWidth size="small"><InputLabel>Tingkat</InputLabel><Select label="Tingkat" defaultValue={selectedClass?.grade || ''}><MenuItem value={10}>10</MenuItem><MenuItem value={11}>11</MenuItem><MenuItem value={12}>12</MenuItem></Select></FormControl>
          <FormControl fullWidth size="small"><InputLabel>Rombel</InputLabel><Select label="Rombel" defaultValue={selectedClass?.section || ''}><MenuItem value="A">A</MenuItem><MenuItem value="B">B</MenuItem><MenuItem value="C">C</MenuItem><MenuItem value="D">D</MenuItem></Select></FormControl>
          <FormControl fullWidth size="small"><InputLabel>Wali Kelas</InputLabel><Select label="Wali Kelas" defaultValue=""><MenuItem value="usr-005">Ahmad Fauzi, S.Pd.</MenuItem><MenuItem value="usr-006">Sri Wahyuni, S.Pd.</MenuItem><MenuItem value="usr-007">Budi Santoso, S.Pd.</MenuItem></Select></FormControl>
          <TextField label="Kapasitas" type="number" defaultValue={selectedClass?.capacity || 36} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddOpen(false); setSelectedClass(null); }}>Batal</Button>
          <Button variant="contained" onClick={() => { setAddOpen(false); setSelectedClass(null); enqueueSnackbar('Kelas berhasil disimpan', { variant: 'success' }); }}>Simpan</Button>
        </DialogActions>
      </Dialog>

      {/* Roster Dialog */}
      <Dialog open={rosterOpen} onClose={() => setRosterOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Roster Kelas {selectedClass?.grade}-{selectedClass?.section}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Wali Kelas: {selectedClass?.teacher} | Jumlah: {selectedClass?.count}/{selectedClass?.capacity}</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead><TableRow><TableCell>No</TableCell><TableCell>NISN</TableCell><TableCell>Nama</TableCell><TableCell>JK</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
              <TableBody>
                {rosterStudents.map((s) => (
                  <TableRow key={s.no}><TableCell>{s.no}</TableCell><TableCell>{s.nisn}</TableCell><TableCell>{s.nama}</TableCell><TableCell>{s.gender}</TableCell><TableCell><Chip label={s.status} size="small" color="success" /></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => enqueueSnackbar('Transfer siswa akan segera tersedia', { variant: 'info' })}>Transfer Siswa</Button>
          <Button onClick={() => enqueueSnackbar('Mencetak roster...', { variant: 'info' })}>Cetak</Button>
          <Button onClick={() => setRosterOpen(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
