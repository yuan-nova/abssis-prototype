import { Box, Typography, Button, Chip, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileDownload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const data = [
  { kelas: '10-A', persen: 96.2, hadir: 635, terlambat: 12, sakit: 5, izin: 3, alpha: 2, rank: 1 },
  { kelas: '10-B', persen: 94.8, hadir: 625, terlambat: 18, sakit: 6, izin: 4, alpha: 5, rank: 3 },
  { kelas: '10-C', persen: 93.5, hadir: 618, terlambat: 20, sakit: 8, izin: 5, alpha: 7, rank: 5 },
  { kelas: '11-A', persen: 95.5, hadir: 630, terlambat: 15, sakit: 4, izin: 3, alpha: 3, rank: 2 },
  { kelas: '11-B', persen: 93.0, hadir: 615, terlambat: 22, sakit: 7, izin: 6, alpha: 8, rank: 6 },
  { kelas: '11-C', persen: 91.2, hadir: 605, terlambat: 25, sakit: 10, izin: 8, alpha: 10, rank: 9 },
  { kelas: '12-A', persen: 94.5, hadir: 624, terlambat: 16, sakit: 6, izin: 4, alpha: 4, rank: 4 },
  { kelas: '12-B', persen: 92.8, hadir: 612, terlambat: 20, sakit: 8, izin: 5, alpha: 9, rank: 7 },
  { kelas: '12-C', persen: 92.0, hadir: 608, terlambat: 22, sakit: 9, izin: 6, alpha: 10, rank: 8 },
];

const columns: GridColDef[] = [
  { field: 'rank', headerName: '#', width: 50 },
  { field: 'kelas', headerName: 'Kelas', width: 80 },
  { field: 'persen', headerName: '% Kehadiran', width: 120, renderCell: (p) => <Chip label={`${p.value}%`} size="small" color={(p.value as number) >= 95 ? 'success' : (p.value as number) >= 93 ? 'primary' : 'warning'} /> },
  { field: 'hadir', headerName: 'Hadir', width: 80, type: 'number' },
  { field: 'terlambat', headerName: 'Terlambat', width: 90, type: 'number' },
  { field: 'sakit', headerName: 'Sakit', width: 70, type: 'number' },
  { field: 'izin', headerName: 'Izin', width: 60, type: 'number' },
  { field: 'alpha', headerName: 'Alpha', width: 70, type: 'number', renderCell: (p) => <Typography fontWeight={(p.value as number) >= 8 ? 700 : 400} color={(p.value as number) >= 8 ? 'error' : 'text.primary'}>{p.value}</Typography> },
];

export default function ClassComparisonPage() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Perbandingan Kehadiran Antar Kelas</Typography>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport perbandingan...', { variant: 'info' })}>Export</Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Persentase Kehadiran per Kelas</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.sort((a, b) => b.persen - a.persen)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="kelas" />
            <YAxis domain={[85, 100]} />
            <Tooltip />
            <Bar dataKey="persen" fill="#1976d2" name="% Kehadiran" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <DataGrid rows={data.sort((a, b) => a.rank - b.rank).map((d, i) => ({ ...d, id: i + 1 }))} columns={columns} autoHeight pageSizeOptions={[10]} />
    </Box>
  );
}
