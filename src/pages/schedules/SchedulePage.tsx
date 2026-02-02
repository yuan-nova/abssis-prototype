import { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const periods = [
  { num: 1, time: '07:00 - 07:45' }, { num: 2, time: '07:45 - 08:30' },
  { num: 3, time: '08:30 - 09:15' }, { num: 4, time: '09:30 - 10:15' },
  { num: 5, time: '10:15 - 11:00' }, { num: 6, time: '11:00 - 11:45' },
  { num: 7, time: '12:30 - 13:15' }, { num: 8, time: '13:15 - 14:00' },
];

type ScheduleCell = { subject: string; teacher: string } | null;
const schedule10A: Record<string, ScheduleCell[]> = {
  Senin: [{ subject: 'Matematika', teacher: 'Ahmad Fauzi' }, { subject: 'Matematika', teacher: 'Ahmad Fauzi' }, { subject: 'B. Indonesia', teacher: 'Maria Ulfa' }, { subject: 'B. Indonesia', teacher: 'Maria Ulfa' }, { subject: 'Fisika', teacher: 'Eko Prasetyo' }, { subject: 'Fisika', teacher: 'Eko Prasetyo' }, { subject: 'Seni Budaya', teacher: 'Putri Handayani' }, { subject: 'Seni Budaya', teacher: 'Putri Handayani' }],
  Selasa: [{ subject: 'B. Inggris', teacher: 'Dewi Lestari' }, { subject: 'B. Inggris', teacher: 'Dewi Lestari' }, { subject: 'Kimia', teacher: 'Budi Santoso' }, { subject: 'Kimia', teacher: 'Budi Santoso' }, { subject: 'Sejarah', teacher: 'Wahyu Hidayat' }, { subject: 'Sejarah', teacher: 'Wahyu Hidayat' }, { subject: 'P. Agama', teacher: 'Irfan Hakim' }, { subject: 'P. Agama', teacher: 'Irfan Hakim' }],
  Rabu: [{ subject: 'Biologi', teacher: 'Sri Wahyuni' }, { subject: 'Biologi', teacher: 'Sri Wahyuni' }, { subject: 'Matematika', teacher: 'Ahmad Fauzi' }, { subject: 'Matematika', teacher: 'Ahmad Fauzi' }, { subject: 'P. Pancasila', teacher: 'Nur Hidayah' }, { subject: 'P. Pancasila', teacher: 'Nur Hidayah' }, { subject: 'Informatika', teacher: 'Fajar Ramadhan' }, { subject: 'Informatika', teacher: 'Fajar Ramadhan' }],
  Kamis: [{ subject: 'Fisika', teacher: 'Eko Prasetyo' }, { subject: 'Fisika', teacher: 'Eko Prasetyo' }, { subject: 'B. Indonesia', teacher: 'Maria Ulfa' }, { subject: 'B. Indonesia', teacher: 'Maria Ulfa' }, { subject: 'Ekonomi', teacher: 'Nur Hidayah' }, { subject: 'Prakarya', teacher: 'Putri Handayani' }, { subject: 'Prakarya', teacher: 'Putri Handayani' }, null],
  Jumat: [{ subject: 'Penjas', teacher: 'Wahyu Hidayat' }, { subject: 'Penjas', teacher: 'Wahyu Hidayat' }, { subject: 'B. Inggris', teacher: 'Dewi Lestari' }, { subject: 'B. Inggris', teacher: 'Dewi Lestari' }, null, null, null, null],
};

export default function SchedulePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [kelas, setKelas] = useState('10-A');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Jadwal Pelajaran</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Kelas</InputLabel>
            <Select value={kelas} onChange={(e) => setKelas(e.target.value)} label="Kelas">
              {['10-A','10-B','10-C','11-A','11-B','11-C','12-A','12-B','12-C'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={() => enqueueSnackbar('Mengexport jadwal...', { variant: 'info' })}>Export</Button>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: 130 }}>Jam Ke</TableCell>
                {days.map((d) => <TableCell key={d} sx={{ fontWeight: 700, textAlign: 'center' }}>{d}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {periods.map((p, pi) => (
                <TableRow key={p.num} sx={pi === 3 || pi === 6 ? { borderTop: '2px solid #e0e0e0' } : undefined}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>Jam ke-{p.num}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.time}</Typography>
                  </TableCell>
                  {days.map((d) => {
                    const cell = schedule10A[d]?.[pi];
                    return (
                      <TableCell key={d} sx={{ textAlign: 'center', bgcolor: cell ? '#fafafa' : '#f5f5f5', minWidth: 120 }}>
                        {cell ? (
                          <>
                            <Typography variant="body2" fontWeight={600} fontSize="0.8rem">{cell.subject}</Typography>
                            <Typography variant="caption" color="text.secondary">{cell.teacher}</Typography>
                          </>
                        ) : (
                          <Typography variant="caption" color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
