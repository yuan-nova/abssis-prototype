import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
} from '@mui/material';
import {
  Refresh,
  FileDownload,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  AccessTime,
  LocalHospital,
  EventNote,
  Cancel,
  HelpOutline,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

interface SummaryCard {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const summaryCards: SummaryCard[] = [
  { label: 'Hadir', value: 520, color: '#388e3c', icon: <CheckCircle /> },
  { label: 'Terlambat', value: 35, color: '#f57c00', icon: <AccessTime /> },
  { label: 'Sakit', value: 18, color: '#0288d1', icon: <LocalHospital /> },
  { label: 'Izin', value: 12, color: '#00796b', icon: <EventNote /> },
  { label: 'Alpha', value: 8, color: '#d32f2f', icon: <Cancel /> },
  { label: 'Belum Scan', value: 30, color: '#757575', icon: <HelpOutline /> },
];

const totalStudents = summaryCards.reduce((s, c) => s + c.value, 0);
const attendanceRate = ((summaryCards[0].value + summaryCards[1].value) / totalStudents * 100).toFixed(1);

interface ClassBreakdown {
  id: number;
  kelas: string;
  hadir: number;
  terlambat: number;
  sakit: number;
  izin: number;
  alpha: number;
  persen: string;
}

const classBreakdownData: ClassBreakdown[] = [
  { id: 1, kelas: 'X-A', hadir: 60, terlambat: 4, sakit: 2, izin: 1, alpha: 1, persen: '94.1%' },
  { id: 2, kelas: 'X-B', hadir: 58, terlambat: 5, sakit: 3, izin: 1, alpha: 0, persen: '94.0%' },
  { id: 3, kelas: 'X-C', hadir: 57, terlambat: 3, sakit: 2, izin: 2, alpha: 1, persen: '92.3%' },
  { id: 4, kelas: 'XI-IPA 1', hadir: 59, terlambat: 4, sakit: 1, izin: 1, alpha: 1, persen: '95.5%' },
  { id: 5, kelas: 'XI-IPA 2', hadir: 56, terlambat: 5, sakit: 2, izin: 2, alpha: 1, persen: '92.4%' },
  { id: 6, kelas: 'XI-IPS', hadir: 58, terlambat: 3, sakit: 2, izin: 1, alpha: 2, persen: '92.4%' },
  { id: 7, kelas: 'XII-IPA 1', hadir: 60, terlambat: 4, sakit: 2, izin: 1, alpha: 0, persen: '95.5%' },
  { id: 8, kelas: 'XII-IPA 2', hadir: 55, terlambat: 4, sakit: 3, izin: 2, alpha: 1, persen: '90.8%' },
  { id: 9, kelas: 'XII-IPS', hadir: 57, terlambat: 3, sakit: 1, izin: 1, alpha: 1, persen: '95.2%' },
];

interface UnscannedStudent {
  id: number;
  nama: string;
  kelas: string;
  statusTerakhir: string;
}

const unscannedStudents: UnscannedStudent[] = [
  { id: 1, nama: 'Aisyah Putri Rahayu', kelas: 'X-A', statusTerakhir: 'Hadir kemarin' },
  { id: 2, nama: 'Bima Arya Kusuma', kelas: 'X-B', statusTerakhir: 'Hadir kemarin' },
  { id: 3, nama: 'Candra Dewi Lestari', kelas: 'X-C', statusTerakhir: 'Sakit (2 hari)' },
  { id: 4, nama: 'Daffa Rizky Pratama', kelas: 'XI-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 5, nama: 'Elsa Maharani', kelas: 'XI-IPA 2', statusTerakhir: 'Izin kemarin' },
  { id: 6, nama: 'Fadhil Muhammad', kelas: 'XI-IPS', statusTerakhir: 'Alpha kemarin' },
  { id: 7, nama: 'Gita Nuraini', kelas: 'XII-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 8, nama: 'Hafiz Ramadhan', kelas: 'XII-IPA 2', statusTerakhir: 'Hadir kemarin' },
  { id: 9, nama: 'Intan Permata Sari', kelas: 'XII-IPS', statusTerakhir: 'Terlambat kemarin' },
  { id: 10, nama: 'Joko Susanto', kelas: 'X-A', statusTerakhir: 'Hadir kemarin' },
  { id: 11, nama: 'Kartika Sari Dewi', kelas: 'X-B', statusTerakhir: 'Hadir kemarin' },
  { id: 12, nama: 'Lukman Hakim', kelas: 'XI-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 13, nama: 'Melati Anggraini', kelas: 'XI-IPA 2', statusTerakhir: 'Sakit (3 hari)' },
  { id: 14, nama: 'Nadia Fitri', kelas: 'XI-IPS', statusTerakhir: 'Hadir kemarin' },
  { id: 15, nama: 'Omar Farhan', kelas: 'XII-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 16, nama: 'Putri Ayu Wulandari', kelas: 'XII-IPA 2', statusTerakhir: 'Hadir kemarin' },
  { id: 17, nama: 'Qori Rahmawati', kelas: 'XII-IPS', statusTerakhir: 'Hadir kemarin' },
  { id: 18, nama: 'Rizal Fadilah', kelas: 'X-A', statusTerakhir: 'Hadir kemarin' },
  { id: 19, nama: 'Salsabila Azzahra', kelas: 'X-C', statusTerakhir: 'Terlambat kemarin' },
  { id: 20, nama: 'Teguh Prasetyo', kelas: 'XI-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 21, nama: 'Ulfa Hidayati', kelas: 'XI-IPS', statusTerakhir: 'Hadir kemarin' },
  { id: 22, nama: 'Vina Anggraeni', kelas: 'XII-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 23, nama: 'Wahyu Setiawan', kelas: 'XII-IPA 2', statusTerakhir: 'Alpha kemarin' },
  { id: 24, nama: 'Yoga Pratama', kelas: 'XII-IPS', statusTerakhir: 'Hadir kemarin' },
  { id: 25, nama: 'Zahra Aulia', kelas: 'X-B', statusTerakhir: 'Hadir kemarin' },
  { id: 26, nama: 'Ananda Putra', kelas: 'X-C', statusTerakhir: 'Hadir kemarin' },
  { id: 27, nama: 'Bayu Aditya', kelas: 'XI-IPA 2', statusTerakhir: 'Izin kemarin' },
  { id: 28, nama: 'Cantika Maharani', kelas: 'XI-IPS', statusTerakhir: 'Hadir kemarin' },
  { id: 29, nama: 'Dimas Ardiansyah', kelas: 'XII-IPA 1', statusTerakhir: 'Hadir kemarin' },
  { id: 30, nama: 'Eka Safitri', kelas: 'XII-IPS', statusTerakhir: 'Hadir kemarin' },
];

const grades = ['Semua Tingkat', 'X', 'XI', 'XII'];
const allClasses = ['Semua Kelas', 'X-A', 'X-B', 'X-C', 'XI-IPA 1', 'XI-IPA 2', 'XI-IPS', 'XII-IPA 1', 'XII-IPA 2', 'XII-IPS'];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AttendanceDashboardPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = useState('2026-02-01');
  const [gradeFilter, setGradeFilter] = useState('Semua Tingkat');
  const [classFilter, setClassFilter] = useState('Semua Kelas');
  const [expanded, setExpanded] = useState(false);

  const filteredClasses = useMemo(() => {
    return classBreakdownData.filter((row) => {
      const matchesGrade =
        gradeFilter === 'Semua Tingkat' ||
        row.kelas.startsWith(gradeFilter);
      const matchesClass =
        classFilter === 'Semua Kelas' || row.kelas === classFilter;
      return matchesGrade && matchesClass;
    });
  }, [gradeFilter, classFilter]);

  const filteredUnscanned = useMemo(() => {
    return unscannedStudents.filter((s) => {
      const matchesGrade =
        gradeFilter === 'Semua Tingkat' ||
        s.kelas.startsWith(gradeFilter);
      const matchesClass =
        classFilter === 'Semua Kelas' || s.kelas === classFilter;
      return matchesGrade && matchesClass;
    });
  }, [gradeFilter, classFilter]);

  const availableClasses = useMemo(() => {
    if (gradeFilter === 'Semua Tingkat') return allClasses;
    return ['Semua Kelas', ...allClasses.filter((c) => c !== 'Semua Kelas' && c.startsWith(gradeFilter))];
  }, [gradeFilter]);

  const handleRefresh = () => {
    enqueueSnackbar('Data kehadiran berhasil diperbarui', { variant: 'info' });
  };

  const handleExport = () => {
    enqueueSnackbar('Laporan harian berhasil diekspor', { variant: 'success' });
  };

  const unscannedColumns: GridColDef[] = [
    { field: 'nama', headerName: 'Nama', flex: 1, minWidth: 220 },
    { field: 'kelas', headerName: 'Kelas', width: 130 },
    {
      field: 'statusTerakhir',
      headerName: 'Status Terakhir',
      width: 200,
      renderCell: (params) => {
        const val = params.value as string;
        let color: 'success' | 'warning' | 'info' | 'error' | 'default' = 'default';
        if (val.includes('Hadir')) color = 'success';
        else if (val.includes('Terlambat')) color = 'warning';
        else if (val.includes('Sakit')) color = 'info';
        else if (val.includes('Izin')) color = 'default';
        else if (val.includes('Alpha')) color = 'error';
        return <Chip label={val} color={color} size="small" variant="outlined" />;
      },
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          Dashboard Kehadiran
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="date"
            size="small"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ width: 180 }}
          />
          <Button variant="outlined" startIcon={<Refresh />} onClick={handleRefresh}>
            Refresh
          </Button>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 2, mb: 3 }}>
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ borderLeft: `4px solid ${card.color}` }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ color: card.color }}>
                    {card.value}
                  </Typography>
                </Box>
                <Box sx={{ color: card.color, opacity: 0.5 }}>
                  {card.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Attendance Rate Bar */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">Tingkat Kehadiran</Typography>
          <Typography variant="h5" fontWeight={700} color="success.main">
            {attendanceRate}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={parseFloat(attendanceRate)}
          sx={{
            height: 16,
            borderRadius: 8,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 8,
              bgcolor: parseFloat(attendanceRate) >= 90 ? 'success.main' : parseFloat(attendanceRate) >= 75 ? 'warning.main' : 'error.main',
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {summaryCards[0].value + summaryCards[1].value} siswa hadir dari {totalStudents} total siswa
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Tanggal: {selectedDate}
          </Typography>
        </Stack>
      </Paper>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Tingkat</InputLabel>
          <Select
            value={gradeFilter}
            label="Tingkat"
            onChange={(e) => {
              setGradeFilter(e.target.value);
              setClassFilter('Semua Kelas');
            }}
          >
            {grades.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Kelas</InputLabel>
          <Select
            value={classFilter}
            label="Kelas"
            onChange={(e) => setClassFilter(e.target.value)}
          >
            {availableClasses.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" startIcon={<FileDownload />} onClick={handleExport}>
          Export Laporan Harian
        </Button>
      </Stack>

      {/* Per-class breakdown table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Kelas</TableCell>
              <TableCell align="center">Hadir</TableCell>
              <TableCell align="center">Terlambat</TableCell>
              <TableCell align="center">Sakit</TableCell>
              <TableCell align="center">Izin</TableCell>
              <TableCell align="center">Alpha</TableCell>
              <TableCell align="center">% Kehadiran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClasses.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.kelas}</TableCell>
                <TableCell align="center">
                  <Chip label={row.hadir} size="small" sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 600 }} />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.terlambat} size="small" sx={{ bgcolor: '#fff3e0', color: '#f57c00', fontWeight: 600 }} />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.sakit} size="small" sx={{ bgcolor: '#e3f2fd', color: '#0288d1', fontWeight: 600 }} />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.izin} size="small" sx={{ bgcolor: '#e0f2f1', color: '#00796b', fontWeight: 600 }} />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.alpha} size="small" sx={{ bgcolor: row.alpha > 0 ? '#ffebee' : '#f5f5f5', color: row.alpha > 0 ? '#d32f2f' : '#757575', fontWeight: 600 }} />
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={
                      parseFloat(row.persen) >= 95
                        ? 'success.main'
                        : parseFloat(row.persen) >= 90
                          ? 'warning.main'
                          : 'error.main'
                    }
                  >
                    {row.persen}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Siswa Belum Scan expandable section */}
      <Paper sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'grey.50' },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <HelpOutline color="action" />
            <Typography variant="h6">
              Siswa Belum Scan ({filteredUnscanned.length})
            </Typography>
          </Stack>
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ px: 2, pb: 2 }}>
            <DataGrid
              rows={filteredUnscanned}
              columns={unscannedColumns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: 'grey.50',
                },
              }}
            />
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
