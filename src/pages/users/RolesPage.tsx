import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const modules = [
  'Pengguna',
  'Siswa',
  'Kelas',
  'Kehadiran',
  'Jurnal',
  'Disiplin',
  'Laporan',
  'Pengaturan',
];

const permissions = ['Lihat', 'Tambah', 'Edit', 'Hapus'];

const roles = ['Super Admin', 'Admin TU', 'Guru', 'Guru BK', 'Kepsek'] as const;

type RoleName = (typeof roles)[number];

type PermissionMap = Record<string, Record<string, boolean>>;

const roleColors: Record<RoleName, 'error' | 'primary' | 'success' | 'warning' | 'secondary'> = {
  'Super Admin': 'error',
  'Admin TU': 'primary',
  'Guru': 'success',
  'Guru BK': 'warning',
  'Kepsek': 'secondary',
};

const roleDescriptions: Record<RoleName, string> = {
  'Super Admin': 'Akses penuh ke seluruh sistem tanpa batasan',
  'Admin TU': 'Mengelola data siswa, kelas, dan kehadiran',
  'Guru': 'Mengelola jurnal pembelajaran dan kehadiran kelas',
  'Guru BK': 'Mengelola data disiplin dan konseling siswa',
  'Kepsek': 'Melihat laporan dan monitoring seluruh sistem',
};

function buildAllChecked(): PermissionMap {
  const map: PermissionMap = {};
  for (const mod of modules) {
    map[mod] = {};
    for (const perm of permissions) {
      map[mod][perm] = true;
    }
  }
  return map;
}

function buildInitialPermissions(role: RoleName): PermissionMap {
  const map: PermissionMap = {};
  for (const mod of modules) {
    map[mod] = {};
    for (const perm of permissions) {
      map[mod][perm] = false;
    }
  }

  switch (role) {
    case 'Super Admin':
      for (const mod of modules) {
        for (const perm of permissions) {
          map[mod][perm] = true;
        }
      }
      break;

    case 'Admin TU':
      // Siswa, Kelas, Kehadiran - all permissions
      for (const mod of ['Siswa', 'Kelas', 'Kehadiran']) {
        for (const perm of permissions) {
          map[mod][perm] = true;
        }
      }
      // Can view Pengguna and Laporan
      map['Pengguna']['Lihat'] = true;
      map['Laporan']['Lihat'] = true;
      break;

    case 'Guru':
      // Jurnal - all permissions
      for (const perm of permissions) {
        map['Jurnal'][perm] = true;
      }
      // Can view Kehadiran and Siswa
      map['Kehadiran']['Lihat'] = true;
      map['Kehadiran']['Tambah'] = true;
      map['Kehadiran']['Edit'] = true;
      map['Siswa']['Lihat'] = true;
      map['Kelas']['Lihat'] = true;
      break;

    case 'Guru BK':
      // Disiplin - all permissions
      for (const perm of permissions) {
        map['Disiplin'][perm] = true;
      }
      // Can view Siswa, Kehadiran, Laporan
      map['Siswa']['Lihat'] = true;
      map['Kehadiran']['Lihat'] = true;
      map['Laporan']['Lihat'] = true;
      break;

    case 'Kepsek':
      // View only for Laporan and other modules
      map['Laporan']['Lihat'] = true;
      map['Siswa']['Lihat'] = true;
      map['Kelas']['Lihat'] = true;
      map['Kehadiran']['Lihat'] = true;
      map['Jurnal']['Lihat'] = true;
      map['Disiplin']['Lihat'] = true;
      map['Pengaturan']['Lihat'] = true;
      break;
  }

  return map;
}

function buildInitialState(): Record<RoleName, PermissionMap> {
  const state: Record<string, PermissionMap> = {};
  for (const role of roles) {
    state[role] = buildInitialPermissions(role);
  }
  return state as Record<RoleName, PermissionMap>;
}

export default function RolesPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState<string | false>('Super Admin');
  const [permissionState, setPermissionState] = useState<Record<RoleName, PermissionMap>>(
    buildInitialState
  );

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePermissionChange = (role: RoleName, module: string, permission: string) => {
    if (role === 'Super Admin') return; // Super Admin is always fully checked
    setPermissionState((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role][module],
          [permission]: !prev[role][module][permission],
        },
      },
    }));
  };

  const handleSave = () => {
    enqueueSnackbar('Hak akses berhasil disimpan', { variant: 'success' });
  };

  const countPermissions = (role: RoleName): number => {
    const rolePerms = permissionState[role];
    let count = 0;
    for (const mod of modules) {
      for (const perm of permissions) {
        if (rolePerms[mod][perm]) count++;
      }
    }
    return count;
  };

  const totalPermissions = modules.length * permissions.length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Peran & Hak Akses
        </Typography>
        <Button variant="contained" onClick={handleSave}>
          Simpan Perubahan
        </Button>
      </Box>

      {/* Role Accordions */}
      {roles.map((role) => (
        <Accordion
          key={role}
          expanded={expanded === role}
          onChange={handleAccordionChange(role)}
          sx={{ mb: 1 }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
              <Chip label={role} color={ROLE_COLORS[role]} size="small" />
              <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
                {roleDescriptions[role]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {countPermissions(role)}/{totalPermissions} izin
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 700, width: 200 }}>Modul</TableCell>
                    {permissions.map((perm) => (
                      <TableCell key={perm} align="center" sx={{ fontWeight: 700 }}>
                        {perm}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules.map((mod) => (
                    <TableRow key={mod} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {mod}
                        </Typography>
                      </TableCell>
                      {permissions.map((perm) => (
                        <TableCell key={perm} align="center">
                          <Checkbox
                            size="small"
                            checked={permissionState[role][mod][perm]}
                            disabled={role === 'Super Admin'}
                            onChange={() => handlePermissionChange(role, mod, perm)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
