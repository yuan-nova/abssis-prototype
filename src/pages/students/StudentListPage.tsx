import { useState, useMemo } from 'react';
import {
  Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Chip, IconButton, Tooltip, Tab, Tabs, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import {
  Add, FileUpload, FileDownload, Visibility, Edit, Delete, Search, School,
  CheckCircle, Warning, Person,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
interface Student {
  id: number;
  nisn: string;
  nama: string;
  kelas: string;
  jenisKelamin: 'L' | 'P';
  tanggalLahir: string;
  alamat: string;
  namaWali: string;
  noWaWali: string;
  status: 'Aktif' | 'Lulus' | 'Pindah' | 'Dikeluarkan';
}

const initialStudents: Student[] = [
  { id: 1, nisn: '0012345001', nama: 'Ahmad Rizki Pratama', kelas: '10-A', jenisKelamin: 'L', tanggalLahir: '2009-03-15', alamat: 'Jl. Merdeka No. 10, Bandung', namaWali: 'Budi Pratama', noWaWali: '081234567001', status: 'Aktif' },
  { id: 2, nisn: '0012345002', nama: 'Siti Nurhaliza', kelas: '10-A', jenisKelamin: 'P', tanggalLahir: '2009-07-22', alamat: 'Jl. Sudirman No. 5, Bandung', namaWali: 'Hasan Nurhaliza', noWaWali: '081234567002', status: 'Aktif' },
  { id: 3, nisn: '0012345003', nama: 'Muhammad Farhan', kelas: '10-B', jenisKelamin: 'L', tanggalLahir: '2009-01-08', alamat: 'Jl. Asia Afrika No. 3, Bandung', namaWali: 'Agus Farhan', noWaWali: '081234567003', status: 'Aktif' },
  { id: 4, nisn: '0012345004', nama: 'Dewi Anggraini', kelas: '10-B', jenisKelamin: 'P', tanggalLahir: '2009-11-30', alamat: 'Jl. Braga No. 12, Bandung', namaWali: 'Suyanto Anggraini', noWaWali: '081234567004', status: 'Aktif' },
  { id: 5, nisn: '0012345005', nama: 'Rizky Ramadhan', kelas: '10-C', jenisKelamin: 'L', tanggalLahir: '2009-06-17', alamat: 'Jl. Dago No. 8, Bandung', namaWali: 'Dedi Ramadhan', noWaWali: '081234567005', status: 'Aktif' },
  { id: 6, nisn: '0012345006', nama: 'Putri Wulandari', kelas: '10-C', jenisKelamin: 'P', tanggalLahir: '2009-04-25', alamat: 'Jl. Cihampelas No. 20, Bandung', namaWali: 'Wahyu Wulandari', noWaWali: '081234567006', status: 'Aktif' },
  { id: 7, nisn: '0012345007', nama: 'Andi Saputra', kelas: '11-A', jenisKelamin: 'L', tanggalLahir: '2008-09-12', alamat: 'Jl. Setiabudi No. 15, Bandung', namaWali: 'Suryadi Saputra', noWaWali: '081234567007', status: 'Aktif' },
  { id: 8, nisn: '0012345008', nama: 'Rina Marlina', kelas: '11-A', jenisKelamin: 'P', tanggalLahir: '2008-02-28', alamat: 'Jl. Pasteur No. 7, Bandung', namaWali: 'Joko Marlina', noWaWali: '081234567008', status: 'Aktif' },
  { id: 9, nisn: '0012345009', nama: 'Fajar Nugroho', kelas: '11-B', jenisKelamin: 'L', tanggalLahir: '2008-12-05', alamat: 'Jl. Dipatiukur No. 22, Bandung', namaWali: 'Nugroho Sr.', noWaWali: '081234567009', status: 'Aktif' },
  { id: 10, nisn: '0012345010', nama: 'Maya Sari', kelas: '11-B', jenisKelamin: 'P', tanggalLahir: '2008-05-19', alamat: 'Jl. Ganesha No. 1, Bandung', namaWali: 'Herman Sari', noWaWali: '081234567010', status: 'Aktif' },
  { id: 11, nisn: '0012345011', nama: 'Dimas Prayoga', kelas: '11-C', jenisKelamin: 'L', tanggalLahir: '2008-08-14', alamat: 'Jl. Buah Batu No. 9, Bandung', namaWali: 'Teguh Prayoga', noWaWali: '081234567011', status: 'Aktif' },
  { id: 12, nisn: '0012345012', nama: 'Lestari Handayani', kelas: '11-C', jenisKelamin: 'P', tanggalLahir: '2008-10-01', alamat: 'Jl. Soekarno Hatta No. 30, Bandung', namaWali: 'Bambang Handayani', noWaWali: '081234567012', status: 'Aktif' },
  { id: 13, nisn: '0012345013', nama: 'Bayu Aditya', kelas: '12-A', jenisKelamin: 'L', tanggalLahir: '2007-03-21', alamat: 'Jl. Terusan Jakarta No. 4, Bandung', namaWali: 'Eko Aditya', noWaWali: '081234567013', status: 'Aktif' },
  { id: 14, nisn: '0012345014', nama: 'Anisa Fitriani', kelas: '12-A', jenisKelamin: 'P', tanggalLahir: '2007-07-09', alamat: 'Jl. Gatot Subroto No. 11, Bandung', namaWali: 'Irwan Fitriani', noWaWali: '081234567014', status: 'Aktif' },
  { id: 15, nisn: '0012345015', nama: 'Hendra Gunawan', kelas: '12-B', jenisKelamin: 'L', tanggalLahir: '2007-01-16', alamat: 'Jl. Ir. H. Juanda No. 18, Bandung', namaWali: 'Gunawan Sr.', noWaWali: '081234567015', status: 'Aktif' },
  { id: 16, nisn: '0012345016', nama: 'Nadia Permata', kelas: '12-B', jenisKelamin: 'P', tanggalLahir: '2007-11-02', alamat: 'Jl. Dr. Djunjunan No. 6, Bandung', namaWali: 'Arief Permata', noWaWali: '081234567016', status: 'Aktif' },
  { id: 17, nisn: '0012345017', nama: 'Ilham Maulana', kelas: '12-C', jenisKelamin: 'L', tanggalLahir: '2007-06-28', alamat: 'Jl. Cibaduyut No. 25, Bandung', namaWali: 'Andi Maulana', noWaWali: '081234567017', status: 'Aktif' },
  { id: 18, nisn: '0012345018', nama: 'Sari Dewi Lestari', kelas: '12-C', jenisKelamin: 'P', tanggalLahir: '2007-04-13', alamat: 'Jl. Kopo No. 14, Bandung', namaWali: 'Widodo Lestari', noWaWali: '081234567018', status: 'Aktif' },
  { id: 19, nisn: '0012345019', nama: 'Rendi Saputra', kelas: '10-A', jenisKelamin: 'L', tanggalLahir: '2009-08-07', alamat: 'Jl. Lengkong No. 3, Bandung', namaWali: 'Saputra Sr.', noWaWali: '081234567019', status: 'Aktif' },
  { id: 20, nisn: '0012345020', nama: 'Wulan Maharani', kelas: '10-A', jenisKelamin: 'P', tanggalLahir: '2009-02-14', alamat: 'Jl. Cikapayang No. 17, Bandung', namaWali: 'Harjo Maharani', noWaWali: '081234567020', status: 'Aktif' },
  { id: 21, nisn: '0012345021', nama: 'Dani Firmansyah', kelas: '10-B', jenisKelamin: 'L', tanggalLahir: '2009-10-20', alamat: 'Jl. Supratman No. 8, Bandung', namaWali: 'Firmansyah Sr.', noWaWali: '081234567021', status: 'Aktif' },
  { id: 22, nisn: '0012345022', nama: 'Intan Permatasari', kelas: '10-C', jenisKelamin: 'P', tanggalLahir: '2009-05-11', alamat: 'Jl. Veteran No. 21, Bandung', namaWali: 'Rudi Permatasari', noWaWali: '081234567022', status: 'Aktif' },
  { id: 23, nisn: '0012345023', nama: 'Galih Prasetyo', kelas: '11-A', jenisKelamin: 'L', tanggalLahir: '2008-07-03', alamat: 'Jl. Pajajaran No. 19, Bandung', namaWali: 'Prasetyo Sr.', noWaWali: '081234567023', status: 'Aktif' },
  { id: 24, nisn: '0012345024', nama: 'Fitri Handayani', kelas: '11-B', jenisKelamin: 'P', tanggalLahir: '2008-09-26', alamat: 'Jl. Riau No. 5, Bandung', namaWali: 'Handayani Sr.', noWaWali: '081234567024', status: 'Aktif' },
  { id: 25, nisn: '0012345025', nama: 'Yusuf Hakim', kelas: '11-C', jenisKelamin: 'L', tanggalLahir: '2008-01-31', alamat: 'Jl. Lembong No. 12, Bandung', namaWali: 'Hakim Sr.', noWaWali: '081234567025', status: 'Aktif' },
  { id: 26, nisn: '0012345026', nama: 'Larasati Putri', kelas: '12-A', jenisKelamin: 'P', tanggalLahir: '2007-12-18', alamat: 'Jl. Banda No. 7, Bandung', namaWali: 'Susanto Putri', noWaWali: '081234567026', status: 'Lulus' },
  { id: 27, nisn: '0012345027', nama: 'Bagus Setiawan', kelas: '12-B', jenisKelamin: 'L', tanggalLahir: '2007-02-09', alamat: 'Jl. Naripan No. 23, Bandung', namaWali: 'Setiawan Sr.', noWaWali: '081234567027', status: 'Lulus' },
  { id: 28, nisn: '0012345028', nama: 'Kartika Sari', kelas: '12-C', jenisKelamin: 'P', tanggalLahir: '2007-08-04', alamat: 'Jl. Wastukencana No. 16, Bandung', namaWali: 'Haryanto Sari', noWaWali: '081234567028', status: 'Lulus' },
  { id: 29, nisn: '0012345029', nama: 'Eko Prasetyo', kelas: '10-A', jenisKelamin: 'L', tanggalLahir: '2009-09-15', alamat: 'Jl. ABC No. 2, Bandung', namaWali: 'Prasetyo Eko', noWaWali: '081234567029', status: 'Aktif' },
  { id: 30, nisn: '0012345030', nama: 'Nur Aini', kelas: '10-B', jenisKelamin: 'P', tanggalLahir: '2009-04-07', alamat: 'Jl. Kebon Kawung No. 9, Bandung', namaWali: 'Mulyadi Aini', noWaWali: '081234567030', status: 'Aktif' },
  { id: 31, nisn: '0012345031', nama: 'Arif Hidayat', kelas: '11-A', jenisKelamin: 'L', tanggalLahir: '2008-06-22', alamat: 'Jl. Trunojoyo No. 4, Bandung', namaWali: 'Hidayat Sr.', noWaWali: '081234567031', status: 'Aktif' },
  { id: 32, nisn: '0012345032', nama: 'Dina Rahmawati', kelas: '11-B', jenisKelamin: 'P', tanggalLahir: '2008-11-10', alamat: 'Jl. Aceh No. 13, Bandung', namaWali: 'Rahmawati Sr.', noWaWali: '081234567032', status: 'Aktif' },
];

const allClasses = ['10-A', '10-B', '10-C', '11-A', '11-B', '11-C', '12-A', '12-B', '12-C'];

const emptyStudent: Omit<Student, 'id'> = {
  nisn: '', nama: '', kelas: '10-A', jenisKelamin: 'L',
  tanggalLahir: '', alamat: '', namaWali: '', noWaWali: '', status: 'Aktif',
};

// Mock view-tab data
const mockRiwayatKelas = [
  { tahun: '2025/2026', kelas: '10-A', waliKelas: 'Drs. Suherman' },
];
const mockKehadiran = { hadir: 180, sakit: 5, izin: 3, alfa: 2 };
const mockPoinDisiplin = [
  { id: 1, tanggal: '2025-09-10', pelanggaran: 'Terlambat masuk', poin: 5 },
  { id: 2, tanggal: '2025-10-02', pelanggaran: 'Tidak memakai atribut lengkap', poin: 10 },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export default function StudentListPage() {
  const { enqueueSnackbar } = useSnackbar();

  // Data state
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');

  // Dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Omit<Student, 'id'>>(emptyStudent);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [viewTab, setViewTab] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  // Filtered data
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = search === '' ||
        s.nama.toLowerCase().includes(search.toLowerCase()) ||
        s.nisn.includes(search);
      const matchKelas = filterKelas === '' || s.kelas === filterKelas;
      const matchStatus = filterStatus === '' || s.status === filterStatus;
      const matchGender = filterGender === '' || s.jenisKelamin === filterGender;
      return matchSearch && matchKelas && matchStatus && matchGender;
    });
  }, [students, search, filterKelas, filterStatus, filterGender]);

  // Handlers
  const handleAdd = () => {
    setEditingStudent(null);
    setFormData(emptyStudent);
    setFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      nisn: student.nisn, nama: student.nama, kelas: student.kelas,
      jenisKelamin: student.jenisKelamin, tanggalLahir: student.tanggalLahir,
      alamat: student.alamat, namaWali: student.namaWali, noWaWali: student.noWaWali,
      status: student.status,
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => s.id === editingStudent.id ? { ...s, ...formData } : s)
      );
      enqueueSnackbar('Data siswa berhasil diperbarui', { variant: 'success' });
    } else {
      const newId = Math.max(...students.map((s) => s.id)) + 1;
      setStudents((prev) => [...prev, { id: newId, ...formData }]);
      enqueueSnackbar('Siswa baru berhasil ditambahkan', { variant: 'success' });
    }
    setFormOpen(false);
  };

  const handleView = (student: Student) => {
    setViewStudent(student);
    setViewTab(0);
    setViewOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      setStudents((prev) => prev.filter((s) => s.id !== deletingStudent.id));
      enqueueSnackbar(`Data siswa "${deletingStudent.nama}" berhasil dihapus`, { variant: 'success' });
    }
    setDeleteOpen(false);
    setDeletingStudent(null);
  };

  const handleImport = () => enqueueSnackbar('Import Excel dimulai. File sedang diproses...', { variant: 'info' });
  const handleExport = () => enqueueSnackbar('Export Excel berhasil. File akan segera terunduh.', { variant: 'success' });

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: 'nisn', headerName: 'NISN', width: 130 },
    { field: 'nama', headerName: 'Nama', flex: 1, minWidth: 200 },
    { field: 'kelas', headerName: 'Kelas', width: 100 },
    {
      field: 'jenisKelamin', headerName: 'Jenis Kelamin', width: 120,
      renderCell: (params) => params.value === 'L' ? 'Laki-laki' : 'Perempuan',
    },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => {
        const color = params.value === 'Aktif' ? 'success' : params.value === 'Lulus' ? 'info' : 'default';
        return <Chip label={params.value} color={color as any} size="small" />;
      },
    },
    { field: 'noWaWali', headerName: 'No. WA Wali', width: 140 },
    {
      field: 'aksi', headerName: 'Aksi', width: 150, sortable: false, filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Lihat">
            <IconButton size="small" color="info" onClick={() => handleView(params.row)}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hapus">
            <IconButton size="small" color="error" onClick={() => { setDeletingStudent(params.row); setDeleteOpen(true); }}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Data Siswa</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            Tambah Siswa
          </Button>
          <Button variant="outlined" startIcon={<FileUpload />} onClick={handleImport}>
            Import Excel
          </Button>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExport}>
            Export Excel
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Cari nama atau NISN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{ startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} /> }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Kelas</InputLabel>
            <Select value={filterKelas} label="Kelas" onChange={(e) => setFilterKelas(e.target.value)}>
              <MenuItem value="">Semua</MenuItem>
              {allClasses.map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value="">Semua</MenuItem>
              <MenuItem value="Aktif">Aktif</MenuItem>
              <MenuItem value="Lulus">Lulus</MenuItem>
              <MenuItem value="Pindah">Pindah</MenuItem>
              <MenuItem value="Dikeluarkan">Dikeluarkan</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Gender</InputLabel>
            <Select value={filterGender} label="Gender" onChange={(e) => setFilterGender(e.target.value)}>
              <MenuItem value="">Semua</MenuItem>
              <MenuItem value="L">Laki-laki</MenuItem>
              <MenuItem value="P">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Data Grid */}
      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingStudent ? 'Edit Siswa' : 'Tambah Siswa Baru'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="NISN" value={formData.nisn} onChange={(e) => setFormData({ ...formData, nisn: e.target.value })} fullWidth />
            <TextField label="Nama Lengkap" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} fullWidth />
            <TextField label="Tanggal Lahir" type="date" value={formData.tanggalLahir} onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} />
            <FormControl fullWidth>
              <InputLabel>Jenis Kelamin</InputLabel>
              <Select value={formData.jenisKelamin} label="Jenis Kelamin" onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}>
                <MenuItem value="L">Laki-laki</MenuItem>
                <MenuItem value="P">Perempuan</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Alamat" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} fullWidth multiline rows={2} />
            <TextField label="Nama Wali" value={formData.namaWali} onChange={(e) => setFormData({ ...formData, namaWali: e.target.value })} fullWidth />
            <TextField label="No. WA Wali" value={formData.noWaWali} onChange={(e) => setFormData({ ...formData, noWaWali: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Kelas</InputLabel>
              <Select value={formData.kelas} label="Kelas" onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}>
                {allClasses.map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} label="Status" onChange={(e) => setFormData({ ...formData, status: e.target.value as Student['status'] })}>
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Lulus">Lulus</MenuItem>
                <MenuItem value="Pindah">Pindah</MenuItem>
                <MenuItem value="Dikeluarkan">Dikeluarkan</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleSave}>Simpan</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person /> Detail Siswa - {viewStudent?.nama}
        </DialogTitle>
        <DialogContent>
          <Tabs value={viewTab} onChange={(_, v) => setViewTab(v)}>
            <Tab label="Data Pribadi" />
            <Tab label="Riwayat Kelas" />
            <Tab label="Kehadiran" />
            <Tab label="Poin Disiplin" />
          </Tabs>

          {/* Tab 0 - Data Pribadi */}
          <TabPanel value={viewTab} index={0}>
            {viewStudent && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {([
                  ['NISN', viewStudent.nisn],
                  ['Nama Lengkap', viewStudent.nama],
                  ['Kelas', viewStudent.kelas],
                  ['Jenis Kelamin', viewStudent.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'],
                  ['Tanggal Lahir', viewStudent.tanggalLahir],
                  ['Alamat', viewStudent.alamat],
                  ['Nama Wali', viewStudent.namaWali],
                  ['No. WA Wali', viewStudent.noWaWali],
                  ['Status', viewStudent.status],
                ] as [string, string][]).map(([label, value]) => (
                  <Box key={label}>
                    <Typography variant="caption" color="text.secondary">{label}</Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </TabPanel>

          {/* Tab 1 - Riwayat Kelas */}
          <TabPanel value={viewTab} index={1}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tahun Ajaran</TableCell>
                    <TableCell>Kelas</TableCell>
                    <TableCell>Wali Kelas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockRiwayatKelas.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.tahun}</TableCell>
                      <TableCell><Chip label={r.kelas} size="small" color="primary" /></TableCell>
                      <TableCell>{r.waliKelas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Tab 2 - Kehadiran */}
          <TabPanel value={viewTab} index={2}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
              {([
                ['Hadir', mockKehadiran.hadir, 'success'],
                ['Sakit', mockKehadiran.sakit, 'warning'],
                ['Izin', mockKehadiran.izin, 'info'],
                ['Alfa', mockKehadiran.alfa, 'error'],
              ] as [string, number, string][]).map(([label, count, color]) => (
                <Card key={label}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color={`${color}.main`}>{count}</Typography>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </TabPanel>

          {/* Tab 3 - Poin Disiplin */}
          <TabPanel value={viewTab} index={3}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Pelanggaran</TableCell>
                    <TableCell align="right">Poin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPoinDisiplin.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.tanggal}</TableCell>
                      <TableCell>{p.pelanggaran}</TableCell>
                      <TableCell align="right">
                        <Chip label={p.poin} color="error" size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}><strong>Total Poin</strong></TableCell>
                    <TableCell align="right">
                      <Chip label={mockPoinDisiplin.reduce((a, b) => a + b.poin, 0)} color="error" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus data siswa <strong>{deletingStudent?.nama}</strong> (NISN: {deletingStudent?.nisn})?
            Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Hapus</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
