import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Checkbox,
  Stack,
  Paper,
  Alert,
} from '@mui/material';
import {
  Fingerprint,
  Print,
  ReportProblem,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

interface Student {
  id: number;
  no: number;
  nisn: string;
  nama: string;
  scanTime: string | null;
  hadirFisik: boolean;
  keterangan: string;
}

const generateStudents = (kelas: string): Student[] => {
  const names = [
    'Aisyah Putri Ramadhani', 'Bima Aditya Pratama', 'Citra Dewi Lestari',
    'Dimas Ari Wibowo', 'Eka Safitri', 'Farel Prayoga Putra',
    'Gita Nadia Sari', 'Hendra Kurniawan', 'Indah Permatasari',
    'Joko Susilo', 'Kartika Sari Dewi', 'Lukman Hakim',
    'Mira Anggraini', 'Naufal Rizky Hidayat', 'Oktaviani Putri',
    'Putra Ramadhan', 'Qonita Azzahra', 'Rendi Saputra',
    'Salsabila Maharani', 'Teguh Prasetyo', 'Ulfa Dwi Cahyani',
    'Vino Bastian', 'Wulan Dari', 'Xavier Mahendra',
    'Yuni Rahayu',
  ];

  const seed = kelas.charCodeAt(kelas.length - 1);
  return names.map((nama, i) => {
    const hasScan = (i + seed) % 7 !== 0;
    const hour = 6 + Math.floor((i * 3 + seed) % 2);
    const minute = String(((i * 7 + seed * 3) % 55) + 1).padStart(2, '0');
    return {
      id: i + 1,
      no: i + 1,
      nisn: `00${seed}${String(i + 1).padStart(4, '0')}${String(2010 + (i % 5))}`,
      nama,
      scanTime: hasScan ? `0${hour}:${minute}` : null,
      hadirFisik: hasScan,
      keterangan: hasScan ? '' : (i % 3 === 0 ? 'Sakit' : i % 3 === 1 ? 'Izin' : 'Belum konfirmasi'),
    };
  });
};

const classes = [
  'X-IPA-1', 'X-IPA-2', 'X-IPS-1',
  'XI-IPA-1', 'XI-IPA-2', 'XI-IPS-1',
  'XII-IPA-1', 'XII-IPA-2', 'XII-IPS-1',
];

export default function VerificationPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [students, setStudents] = useState<Student[]>(generateStudents(classes[0]));

  const handleClassChange = (kelas: string) => {
    setSelectedClass(kelas);
    setStudents(generateStudents(kelas));
  };

  const handleHadirChange = (id: number, checked: boolean) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, hadirFisik: checked } : s))
    );
  };

  const scannedCount = useMemo(() => students.filter((s) => s.scanTime).length, [students]);
  const totalCount = students.length;
  const belumScan = totalCount - scannedCount;

  const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', width: 60, sortable: false },
    { field: 'nisn', headerName: 'NISN', width: 160 },
    { field: 'nama', headerName: 'Nama Siswa', flex: 1, minWidth: 200 },
    {
      field: 'scanTime',
      headerName: 'Status Scan',
      width: 180,
      renderCell: (params) =>
        params.value ? (
          <Chip
            label={`Sudah Scan ${params.value}`}
            color="success"
            size="small"
            variant="filled"
            icon={<Fingerprint />}
          />
        ) : (
          <Chip
            label="Belum Scan"
            color="error"
            size="small"
            variant="filled"
          />
        ),
    },
    {
      field: 'hadirFisik',
      headerName: 'Hadir Fisik',
      width: 110,
      renderCell: (params) => (
        <Checkbox
          checked={params.value as boolean}
          onChange={(e) => handleHadirChange(params.row.id, e.target.checked)}
        />
      ),
    },
    { field: 'keterangan', headerName: 'Keterangan', width: 180 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Fingerprint color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h4" fontWeight={700}>
            Verifikasi Kehadiran Jam Pertama
          </Typography>
        </Box>
      </Box>

      {/* Class Select */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Pilih Kelas</InputLabel>
          <Select
            value={selectedClass}
            label="Pilih Kelas"
            onChange={(e) => handleClassChange(e.target.value)}
          >
            {classes.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          Tanggal: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Stack>

      {/* Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
          <Alert severity={belumScan > 0 ? 'warning' : 'success'} sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight={600}>
              {scannedCount}/{totalCount} siswa sudah scan, {belumScan} belum scan
            </Typography>
          </Alert>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<ReportProblem />}
            onClick={() =>
              enqueueSnackbar('Laporan ketidaksesuaian berhasil dikirim ke Admin', {
                variant: 'warning',
              })
            }
          >
            Laporkan Ketidaksesuaian
          </Button>
          <Button
            variant="contained"
            startIcon={<Print />}
            onClick={() =>
              enqueueSnackbar('Daftar hadir sedang dicetak...', {
                variant: 'info',
              })
            }
          >
            Cetak Daftar Hadir
          </Button>
        </Stack>
      </Paper>

      {/* DataGrid */}
      <Box sx={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          disableRowSelectionOnClick
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'grey.50',
            },
          }}
        />
      </Box>
    </Box>
  );
}
