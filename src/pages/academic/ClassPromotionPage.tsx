import { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

const students = [
  { id: 1, nisn: '0051234001', nama: 'Ahmad Rizki Pratama', kelas: '11-A', kehadiran: 96.5, poin: 5, eligible: true },
  { id: 2, nisn: '0051234002', nama: 'Ayu Safitri', kelas: '11-A', kehadiran: 98.2, poin: 0, eligible: true },
  { id: 3, nisn: '0051234003', nama: 'Bagas Setiawan', kelas: '11-A', kehadiran: 72.1, poin: 45, eligible: false },
  { id: 4, nisn: '0051234004', nama: 'Citra Permata Sari', kelas: '11-A', kehadiran: 95.0, poin: 10, eligible: true },
  { id: 5, nisn: '0051234005', nama: 'Dimas Aditya Putra', kelas: '11-A', kehadiran: 94.3, poin: 15, eligible: true },
  { id: 6, nisn: '0051234006', nama: 'Eka Putri Rahayu', kelas: '11-B', kehadiran: 97.8, poin: 0, eligible: true },
  { id: 7, nisn: '0051234007', nama: 'Farel Anggara', kelas: '11-B', kehadiran: 89.5, poin: 25, eligible: true },
  { id: 8, nisn: '0051234008', nama: 'Gita Nadia Permata', kelas: '11-B', kehadiran: 99.0, poin: 0, eligible: true },
  { id: 9, nisn: '0051234009', nama: 'Hadi Kurniawan', kelas: '11-B', kehadiran: 65.0, poin: 60, eligible: false },
  { id: 10, nisn: '0051234010', nama: 'Indah Lestari', kelas: '11-C', kehadiran: 93.2, poin: 10, eligible: true },
  { id: 11, nisn: '0051234011', nama: 'Joko Susanto', kelas: '11-C', kehadiran: 91.0, poin: 20, eligible: true },
  { id: 12, nisn: '0051234012', nama: 'Kartika Sari', kelas: '11-C', kehadiran: 97.0, poin: 5, eligible: true },
];

const columns: GridColDef[] = [
  { field: 'nisn', headerName: 'NISN', width: 120 },
  { field: 'nama', headerName: 'Nama Siswa', flex: 1, minWidth: 180 },
  { field: 'kelas', headerName: 'Kelas Asal', width: 100 },
  { field: 'kehadiran', headerName: '% Kehadiran', width: 120, renderCell: (p) => <Chip label={`${p.value}%`} size="small" color={p.value >= 90 ? 'success' : p.value >= 75 ? 'warning' : 'error'} /> },
  { field: 'poin', headerName: 'Poin', width: 80, renderCell: (p) => <Typography color={p.value > 30 ? 'error' : 'text.primary'} fontWeight={p.value > 30 ? 700 : 400}>{p.value}</Typography> },
  { field: 'eligible', headerName: 'Layak Naik', width: 110, renderCell: (p) => <Checkbox checked={p.value} /> },
];

export default function ClassPromotionPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [grade, setGrade] = useState('');

  const steps = ['Pilih Kelas Asal', 'Review Siswa', 'Konfirmasi'];
  const eligible = students.filter((s) => s.eligible).length;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Kenaikan Kelas</Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((s) => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Pilih Tingkat Kelas Asal</Typography>
            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <InputLabel>Tingkat</InputLabel>
              <Select value={grade} onChange={(e) => setGrade(e.target.value)} label="Tingkat">
                <MenuItem value="10">Kelas 10 → Kelas 11</MenuItem>
                <MenuItem value="11">Kelas 11 → Kelas 12</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">Kelas tersedia: 10-A, 10-B, 10-C (102 siswa)</Typography>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Review Siswa ({eligible}/{students.length} layak naik)</Typography>
            <DataGrid rows={students} columns={columns} autoHeight pageSizeOptions={[25]} initialState={{ pagination: { paginationModel: { pageSize: 25 } } }} />
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Konfirmasi Kenaikan Kelas</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Paper variant="outlined" sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">Total Siswa</Typography><Typography variant="h5" fontWeight={700}>{students.length}</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">Layak Naik</Typography><Typography variant="h5" fontWeight={700} color="success.main">{eligible}</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">Tidak Layak</Typography><Typography variant="h5" fontWeight={700} color="error.main">{students.length - eligible}</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">Kelas Tujuan</Typography><Typography variant="h5" fontWeight={700}>12-A/B/C</Typography></Paper>
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)}>Kembali</Button>
          {activeStep < 2 ? (
            <Button variant="contained" onClick={() => setActiveStep((p) => p + 1)} disabled={activeStep === 0 && !grade}>Selanjutnya</Button>
          ) : (
            <Button variant="contained" color="success" onClick={() => enqueueSnackbar('Proses kenaikan kelas berhasil dilakukan', { variant: 'success' })}>Proses Kenaikan</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
