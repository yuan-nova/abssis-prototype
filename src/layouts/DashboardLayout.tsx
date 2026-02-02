import { useState } from 'react';
import { Outlet, Link, useLocation } from '@tanstack/react-router';
import {
  Box, Drawer, AppBar, Toolbar, Typography, IconButton, Avatar,
  List, ListItemButton, ListItemIcon, ListItemText, Collapse,
  Divider, Menu, MenuItem, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon, ChevronLeft,
  Dashboard, People, Security, History,
  School, Class as ClassIcon, CalendarMonth, MenuBook, Schedule,
  DeviceHub, Settings, Fingerprint,
  BarChart as BarChartIcon, EventNote, ExitToApp, Edit, HistoryToggleOff,
  FactCheck, MenuBookOutlined, Warning, LibraryBooks,
  Gavel, ReportProblem, Category, RestartAlt,
  WhatsApp, Send, Mail, Description, ContactPhone,
  Assessment, CompareArrows, Person, QueryStats, CalendarToday as CalendarTodayIcon,
  Timer, Tune, SettingsApplications, EventAvailable, Notifications, DeleteSweep, Backup,
  ExpandLess, ExpandMore, Logout, AccountCircle, BuildCircle,
} from '@mui/icons-material';

const DRAWER_WIDTH = 270;

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navSections: NavSection[] = [
  {
    title: 'DASHBOARD',
    items: [
      { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ],
  },
  {
    title: 'MANAJEMEN PENGGUNA',
    items: [
      { label: 'Daftar Pengguna', icon: <People />, path: '/users' },
      { label: 'Peran & Hak Akses', icon: <Security />, path: '/roles' },
      { label: 'Log Audit', icon: <History />, path: '/audit-logs' },
    ],
  },
  {
    title: 'MASTER DATA',
    items: [
      { label: 'Data Siswa', icon: <School />, path: '/students' },
      { label: 'Data Kelas', icon: <ClassIcon />, path: '/classes' },
      { label: 'Tahun Ajaran', icon: <CalendarMonth />, path: '/academic-years' },
      { label: 'Kenaikan Kelas', icon: <BuildCircle />, path: '/class-promotion' },
      { label: 'Mata Pelajaran', icon: <MenuBook />, path: '/subjects' },
      { label: 'Jadwal Pelajaran', icon: <Schedule />, path: '/schedules' },
      { label: 'Arsip Data', icon: <DeleteSweep />, path: '/data-archive' },
    ],
  },
  {
    title: 'PERANGKAT',
    items: [
      { label: 'Monitor Perangkat', icon: <DeviceHub />, path: '/devices' },
      { label: 'Konfigurasi Perangkat', icon: <Settings />, path: '/devices/config' },
      { label: 'Sinkronisasi Sidik Jari', icon: <Fingerprint />, path: '/devices/sync' },
    ],
  },
  {
    title: 'KEHADIRAN',
    items: [
      { label: 'Dashboard Kehadiran', icon: <BarChartIcon />, path: '/attendance' },
      { label: 'Input Pra-Kehadiran', icon: <EventNote />, path: '/attendance/pre-input' },
      { label: 'Izin Tengah Hari', icon: <ExitToApp />, path: '/attendance/mid-day' },
      { label: 'Koreksi Kehadiran', icon: <Edit />, path: '/attendance/corrections' },
      { label: 'Riwayat Koreksi', icon: <HistoryToggleOff />, path: '/attendance/correction-history' },
    ],
  },
  {
    title: 'JURNAL MENGAJAR',
    items: [
      { label: 'Verifikasi Jam Pertama', icon: <FactCheck />, path: '/journal/verification' },
      { label: 'Input Jurnal', icon: <MenuBookOutlined />, path: '/journal/input' },
      { label: 'Deteksi Bolos', icon: <Warning />, path: '/journal/absentees' },
      { label: 'Statistik Jurnal', icon: <BarChartIcon />, path: '/journal/stats' },
      { label: 'Bank Materi', icon: <LibraryBooks />, path: '/journal/materials' },
    ],
  },
  {
    title: 'DISIPLIN & POIN',
    items: [
      { label: 'Dashboard BK', icon: <Gavel />, path: '/discipline' },
      { label: 'Input Pelanggaran', icon: <ReportProblem />, path: '/discipline/violations' },
      { label: 'Kategori Pelanggaran', icon: <Category />, path: '/discipline/categories' },
      { label: 'Reset Poin', icon: <RestartAlt />, path: '/discipline/reset' },
    ],
  },
  {
    title: 'WHATSAPP',
    items: [
      { label: 'Gateway Status', icon: <WhatsApp />, path: '/whatsapp' },
      { label: 'Antrian Pesan', icon: <Send />, path: '/whatsapp/queue' },
      { label: 'Template Pesan', icon: <Mail />, path: '/whatsapp/templates' },
      { label: 'Log Notifikasi', icon: <Description />, path: '/whatsapp/logs' },
      { label: 'Kelola Nomor WA', icon: <ContactPhone />, path: '/whatsapp/numbers' },
    ],
  },
  {
    title: 'LAPORAN',
    items: [
      { label: 'Rekap Kehadiran', icon: <Assessment />, path: '/reports/attendance' },
      { label: 'Laporan Jurnal', icon: <MenuBook />, path: '/reports/journal' },
      { label: 'Ranking Pelanggaran', icon: <ReportProblem />, path: '/reports/discipline' },
      { label: 'Perbandingan Kelas', icon: <CompareArrows />, path: '/reports/class-comparison' },
      { label: 'Rapor Siswa', icon: <Person />, path: '/reports/student-card' },
      { label: 'Laporan Kustom', icon: <QueryStats />, path: '/reports/custom' },
      { label: 'Jadwal Laporan', icon: <CalendarTodayIcon />, path: '/reports/schedule' },
    ],
  },
  {
    title: 'PENGATURAN',
    items: [
      { label: 'Jam Sekolah', icon: <Timer />, path: '/settings/school-hours' },
      { label: 'Ambang Batas Poin', icon: <Tune />, path: '/settings/point-thresholds' },
      { label: 'Pengaturan Sistem', icon: <SettingsApplications />, path: '/settings/system' },
      { label: 'Kalender Akademik', icon: <EventAvailable />, path: '/settings/calendar' },
      { label: 'Konfigurasi Notifikasi', icon: <Notifications />, path: '/settings/notifications' },
      { label: 'Retensi Data', icon: <DeleteSweep />, path: '/settings/data-retention' },
      { label: 'Backup & Restore', icon: <Backup />, path: '/settings/backup' },
    ],
  },
];

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(navSections.map((s) => [s.title, true]))
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.5 }}>
        <Fingerprint sx={{ color: 'primary.main', fontSize: 28 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main', lineHeight: 1.2 }}>
            ABSSIS
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
            Sistem Absensi Terintegrasi
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      <Divider />

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => toggleSection(section.title)}
              sx={{ px: 2, py: 0.5, minHeight: 32 }}
            >
              <Typography variant="overline" sx={{ flex: 1, fontSize: '0.65rem', fontWeight: 700, color: 'text.secondary' }}>
                {section.title}
              </Typography>
              {expandedSections[section.title] ? <ExpandLess sx={{ fontSize: 16, color: 'text.secondary' }} /> : <ExpandMore sx={{ fontSize: 16, color: 'text.secondary' }} />}
            </ListItemButton>
            <Collapse in={expandedSections[section.title]} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                {section.items.map((item) => (
                  <ListItemButton
                    key={item.path}
                    component={Link}
                    to={item.path}
                    selected={isActive(item.path)}
                    onClick={() => isMobile && setDrawerOpen(false)}
                    sx={{ py: 0.6, minHeight: 36 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: isActive(item.path) ? 600 : 400 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ p: 1.5, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          ABSSIS v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: '56px !important' }}>
          <IconButton edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 1, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
            SMA Negeri 1 Kota Bandung
          </Typography>
          <Tooltip title="Profil">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.85rem' }}>SA</Avatar>
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">Dr. H. Bambang Sutrisno</Typography>
              <Typography variant="caption" color="text.secondary">Super Admin</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => setAnchorEl(null)}>
              <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
              Profil Saya
            </MenuItem>
            <MenuItem component={Link} to="/login" onClick={() => setAnchorEl(null)}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
              Keluar
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer variant="permanent" open sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}>
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: '80px',
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
