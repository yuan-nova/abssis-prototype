import { Box, Typography, Button, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FileDownload, NotificationsActive } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const stats = [
  { label: 'Total Jurnal Bulan Ini', value: '245', color: '#1976d2' },
  { label: 'Tingkat Kelengkapan', value: '87.5%', color: '#388e3c' },
  { label: 'Guru Belum Lengkap', value: '3', color: '#f57c00' },
  { label: 'Rata-rata Pengisian/Hari', value: '12.5', color: '#00796b' },
];

const rows = [
  { id: 1, guru: 'Ahmad Fauzi, S.Pd., M.Si.', totalJadwal: 24, terisi: 24, belum: 0, persen: 100 },
  { id: 2, guru: 'Sri Wahyuni, S.Pd.', totalJadwal: 20, terisi: 20, belum: 0, persen: 100 },
  { id: 3, guru: 'Budi Santoso, S.Pd.', totalJadwal: 22, terisi: 20, belum: 2, persen: 90.9 },
  { id: 4, guru: 'Dewi Lestari, S.Pd., M.Pd.', totalJadwal: 18, terisi: 18, belum: 0, persen: 100 },
  { id: 5, guru: 'Eko Prasetyo, S.Pd.', totalJadwal: 24, terisi: 22, belum: 2, persen: 91.7 },
  { id: 6, guru: 'Nur Hidayah, S.Pd.', totalJadwal: 16, terisi: 16, belum: 0, persen: 100 },
  { id: 7, guru: 'Irfan Hakim, S.Pd.', totalJadwal: 20, terisi: 15, belum: 5, persen: 75.0 },
  { id: 8, guru: 'Maria Ulfa, S.Pd., M.Hum.', totalJadwal: 22, terisi: 22, belum: 0, persen: 100 },
  { id: 9, guru: 'Fajar Ramadhan, S.Pd.', totalJadwal: 18, terisi: 16, belum: 2, persen: 88.9 },
  { id: 10, guru: 'Putri Handayani, S.Pd.', totalJadwal: 14, terisi: 14, belum: 0, persen: 100 },
  { id: 11, guru: 'Wahyu Hidayat, S.Pd.', totalJadwal: 20, terisi: 18, belum: 2, persen: 90.0 },
  { id: 12, guru: 'Agus Setiawan, S.Pd., M.Si.', totalJadwal: 16, terisi: 16, belum: 0, persen: 100 },
];

const columns: GridColDef[] = [
  { field: 'guru', headerName: 'Nama Guru', flex: 1, minWidth: 200 },
  { field: 'totalJadwal', headerName: 'Total Jadwal', width: 110, type: 'number' },
  { field: 'terisi', headerName: 'Terisi', width: 80, type: 'number' },
  { field: 'belum', headerName: 'Belum', width: 80, type: 'number', renderCell: (p) => <Typography color={p.value > 0 ? 'error' : 'text.primary'} fontWeight={p.value > 0 ? 700 : 400}>{p.value}</Typography> },
  { field: 'persen', headerName: '% Kelengkapan', width: 160, renderCell: (p) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
      <LinearProgress variant="determinate" value={p.value as number} sx={{ flex: 1, height: 8, borderRadius: 4 }} color={p.value === 100 ? 'success' : (p.value as number) >= 90 ? 'primary' : 'warning'} />
      <Typography variant="caption" fontWeight={600}>{p.value}%</Typography>
    </Box>
  )},
  { field: 'status', headerName: 'Status', width: 110, renderCell: (p) => {
    return <Chip label={p.row?.persen === 100 ? 'Lengkap' : 'Belum'} size="small" color={p.row?.persen === 100 ? 'success' : 'warning'} />;
  }},
];

export default function JournalStatsPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Statistik Jurnal Mengajar</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<NotificationsActive />} onClick={() => enqueueSnackbar('Pengingat dikirim ke 3 guru yang belum lengkap', { variant: 'info' })}>Kirim Pengingat</Button>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={() => enqueueSnackbar('Mengexport statistik jurnal...', { variant: 'info' })}>Export</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography>
              <Typography variant="body2" color="text.secondary">{s.label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Kelengkapan per Guru</Typography>
      <DataGrid rows={rows} columns={columns} autoHeight pageSizeOptions={[25]} />
    </Box>
  );
}
