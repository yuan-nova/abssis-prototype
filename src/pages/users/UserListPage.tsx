import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

interface User {
  id: number;
  nip: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
}

const initialRows: User[] = [
  { id: 1, nip: '196805152000121001', fullName: 'Dr. H. Bambang Sutrisno, M.Pd.', username: 'superadmin', email: 'bambang@sman1.sch.id', phone: '081234567890', role: 'Super Admin', isActive: true, lastLogin: '2026-01-31 08:12' },
  { id: 2, nip: '197203082001061002', fullName: 'Rina Wulandari, S.Pd.', username: 'rina.admin', email: 'rina@sman1.sch.id', phone: '081234567891', role: 'Admin TU', isActive: true, lastLogin: '2026-01-31 07:45' },
  { id: 3, nip: '198011252005011003', fullName: 'Agus Setiawan, S.Pd.', username: 'agus.guru', email: 'agus@sman1.sch.id', phone: '081234567892', role: 'Guru', isActive: true, lastLogin: '2026-01-30 14:22' },
  { id: 4, nip: '197506121999032004', fullName: 'Siti Nurhaliza, M.Pd.', username: 'siti.bk', email: 'siti@sman1.sch.id', phone: '081234567893', role: 'Guru BK', isActive: true, lastLogin: '2026-01-31 09:05' },
  { id: 5, nip: '196912301998021005', fullName: 'Drs. Hadi Purnomo', username: 'hadi.kepsek', email: 'hadi@sman1.sch.id', phone: '081234567894', role: 'Kepsek', isActive: true, lastLogin: '2026-01-30 10:30' },
  { id: 6, nip: '198507142008012006', fullName: 'Dewi Kartika, S.Pd.', username: 'dewi.guru', email: 'dewi@sman1.sch.id', phone: '081234567895', role: 'Guru', isActive: true, lastLogin: '2026-01-29 13:18' },
  { id: 7, nip: '199001032010011007', fullName: 'Fajar Hidayat, S.Kom.', username: 'fajar.admin', email: 'fajar@sman1.sch.id', phone: '081234567896', role: 'Admin TU', isActive: true, lastLogin: '2026-01-31 08:00' },
  { id: 8, nip: '198203172006042008', fullName: 'Lestari Handayani, M.Pd.', username: 'lestari.guru', email: 'lestari@sman1.sch.id', phone: '081234567897', role: 'Guru', isActive: false, lastLogin: '2026-01-15 09:45' },
  { id: 9, nip: '197708222003011009', fullName: 'Muhammad Ridwan, S.Pd.', username: 'ridwan.guru', email: 'ridwan@sman1.sch.id', phone: '081234567898', role: 'Guru', isActive: true, lastLogin: '2026-01-31 07:30' },
  { id: 10, nip: '198809102012012010', fullName: 'Nurul Aini, S.Psi.', username: 'nurul.bk', email: 'nurul@sman1.sch.id', phone: '081234567899', role: 'Guru BK', isActive: true, lastLogin: '2026-01-30 11:20' },
  { id: 11, nip: '199205282015011011', fullName: 'Pratama Yudi, S.Pd.', username: 'pratama.guru', email: 'pratama@sman1.sch.id', phone: '081345678901', role: 'Guru', isActive: true, lastLogin: '2026-01-29 15:40' },
  { id: 12, nip: '198106042004032012', fullName: 'Sri Wahyuni, S.Pd.', username: 'sri.admin', email: 'sri@sman1.sch.id', phone: '081345678902', role: 'Admin TU', isActive: false, lastLogin: '2025-12-20 10:15' },
  { id: 13, nip: '197402161998011013', fullName: 'Drs. Teguh Prasetyo', username: 'teguh.guru', email: 'teguh@sman1.sch.id', phone: '081345678903', role: 'Guru', isActive: true, lastLogin: '2026-01-28 08:55' },
  { id: 14, nip: '199308172018012014', fullName: 'Anisa Rahma, S.Pd.', username: 'anisa.guru', email: 'anisa@sman1.sch.id', phone: '081345678904', role: 'Guru', isActive: true, lastLogin: '2026-01-31 07:15' },
  { id: 15, nip: '198704092009011015', fullName: 'Budi Santoso, M.T.', username: 'budi.guru', email: 'budi@sman1.sch.id', phone: '081345678905', role: 'Guru', isActive: true, lastLogin: '2026-01-30 09:10' },
  { id: 16, nip: '199107112016012016', fullName: 'Citra Dewi, S.Pd.', username: 'citra.guru', email: 'citra@sman1.sch.id', phone: '081345678906', role: 'Guru', isActive: false, lastLogin: '2026-01-10 14:00' },
  { id: 17, nip: '198502232007011017', fullName: 'Eko Wijaya, S.Pd.', username: 'eko.guru', email: 'eko@sman1.sch.id', phone: '081345678907', role: 'Guru', isActive: true, lastLogin: '2026-01-31 08:30' },
  { id: 18, nip: '199406012019012018', fullName: 'Fitri Amelia, S.Pd.', username: 'fitri.guru', email: 'fitri@sman1.sch.id', phone: '081345678908', role: 'Guru', isActive: true, lastLogin: '2026-01-30 16:05' },
];

const roleColors: Record<string, 'error' | 'primary' | 'success' | 'warning' | 'secondary'> = {
  'Super Admin': 'error',
  'Admin TU': 'primary',
  'Guru': 'success',
  'Guru BK': 'warning',
  'Kepsek': 'secondary',
};

const roles = ['Super Admin', 'Admin TU', 'Guru', 'Guru BK', 'Kepsek'];

const emptyForm: User = {
  id: 0,
  nip: '',
  fullName: '',
  username: '',
  email: '',
  phone: '',
  role: 'Guru',
  isActive: true,
  lastLogin: '',
};

export default function UserListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<User[]>(initialRows);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(emptyForm);
  const [formData, setFormData] = useState<User & { password?: string }>(emptyForm);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        !search ||
        row.fullName.toLowerCase().includes(search.toLowerCase()) ||
        row.nip.includes(search) ||
        row.username.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'Semua' || row.role === roleFilter;
      const matchesStatus =
        statusFilter === 'Semua' ||
        (statusFilter === 'Aktif' && row.isActive) ||
        (statusFilter === 'Tidak Aktif' && !row.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [rows, search, roleFilter, statusFilter]);

  const handleAddOpen = () => {
    setFormData({ ...emptyForm, password: '' });
    setAddOpen(true);
  };

  const handleEditOpen = (user: User) => {
    setSelectedUser(user);
    setFormData({ ...user });
    setEditOpen(true);
  };

  const handleDeleteOpen = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleSaveAdd = () => {
    const newUser: User = {
      ...formData,
      id: Math.max(...rows.map((r) => r.id)) + 1,
      lastLogin: '-',
    };
    setRows((prev) => [...prev, newUser]);
    setAddOpen(false);
    enqueueSnackbar('Pengguna berhasil disimpan', { variant: 'success' });
  };

  const handleSaveEdit = () => {
    setRows((prev) =>
      prev.map((r) => (r.id === formData.id ? { ...formData } : r))
    );
    setEditOpen(false);
    enqueueSnackbar('Pengguna berhasil disimpan', { variant: 'success' });
  };

  const handleDelete = () => {
    setRows((prev) => prev.filter((r) => r.id !== selectedUser.id));
    setDeleteOpen(false);
    enqueueSnackbar('Pengguna berhasil dihapus', { variant: 'success' });
  };

  const columns: GridColDef[] = [
    { field: 'nip', headerName: 'NIP', width: 180 },
    { field: 'fullName', headerName: 'Nama Lengkap', flex: 1, minWidth: 200 },
    { field: 'username', headerName: 'Username', width: 140 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={roleColors[params.value as string] || 'default'}
          size="small"
          variant="filled"
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Aktif' : 'Tidak Aktif'}
          color={params.value ? 'success' : 'error'}
          size="small"
          variant="filled"
        />
      ),
    },
    { field: 'lastLogin', headerName: 'Login Terakhir', width: 160 },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEditOpen(params.row as User)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteOpen(params.row as User)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const renderFormDialog = (
    open: boolean,
    onClose: () => void,
    onSave: () => void,
    title: string,
    isCreate: boolean
  ) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="NIP"
            fullWidth
            value={formData.nip}
            onChange={(e) => setFormData((prev) => ({ ...prev, nip: e.target.value }))}
          />
          <TextField
            label="Username"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          />
          <TextField
            label="Nama Lengkap"
            fullWidth
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
          <TextField
            label="No. Telepon"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              label="Role"
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isCreate && (
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={formData.password || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
            }
            label="Status Aktif"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={onSave}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Manajemen Pengguna
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddOpen}>
          Tambah Pengguna
        </Button>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <TextField
          size="small"
          placeholder="Cari pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            label="Role"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="Semua">Semua Role</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="Semua">Semua Status</MenuItem>
            <MenuItem value="Aktif">Aktif</MenuItem>
            <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* DataGrid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
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

      {/* Add Dialog */}
      {renderFormDialog(addOpen, () => setAddOpen(false), handleSaveAdd, 'Tambah Pengguna Baru', true)}

      {/* Edit Dialog */}
      {renderFormDialog(editOpen, () => setEditOpen(false), handleSaveEdit, 'Edit Pengguna', false)}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus pengguna{' '}
            <strong>{selectedUser.fullName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteOpen(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
