import { Box, Card, CardContent, Typography, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { School, CheckCircle, DeviceHub, Warning, Circle, Edit, Gavel, Login } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Siswa', value: '623', icon: <School />, color: '#1976d2', bg: '#e3f2fd' },
  { label: 'Kehadiran Hari Ini', value: '95.2%', icon: <CheckCircle />, color: '#388e3c', bg: '#e8f5e9' },
  { label: 'Perangkat Online', value: '5 / 6', icon: <DeviceHub />, color: '#00796b', bg: '#e0f2f1' },
  { label: 'Poin Pelanggaran Bulan Ini', value: '145', icon: <Warning />, color: '#f57c00', bg: '#fff3e0' },
];

const chartData = [
  { day: 'Senin', Hadir: 580, Terlambat: 22, Sakit: 10, Izin: 6, Alpha: 5 },
  { day: 'Selasa', Hadir: 575, Terlambat: 28, Sakit: 8, Izin: 7, Alpha: 5 },
  { day: 'Rabu', Hadir: 590, Terlambat: 15, Sakit: 9, Izin: 4, Alpha: 5 },
  { day: 'Kamis', Hadir: 585, Terlambat: 20, Sakit: 7, Izin: 5, Alpha: 6 },
  { day: 'Jumat', Hadir: 592, Terlambat: 18, Sakit: 5, Izin: 3, Alpha: 5 },
];

const devices = [
  { name: 'Gerbang Utama', status: 'online' }, { name: 'Gerbang Belakang', status: 'online' },
  { name: 'Gedung A Lt.1', status: 'online' }, { name: 'Gedung A Lt.2', status: 'warning' },
  { name: 'Gedung B Lt.1', status: 'online' }, { name: 'Gedung B Lt.2', status: 'offline' },
];

const belumAbsen = [
  { nama: 'Rizki Pratama', kelas: '10-A' }, { nama: 'Ayu Safitri', kelas: '10-B' },
  { nama: 'Dimas Aditya', kelas: '11-A' }, { nama: 'Putri Rahayu', kelas: '11-C' },
  { nama: 'Bagas Setiawan', kelas: '12-A' }, { nama: 'Nadia Permata', kelas: '10-C' },
  { nama: 'Farel Anggara', kelas: '11-B' }, { nama: 'Sinta Dewi', kelas: '12-B' },
];

const activities = [
  { text: 'Rina Wulandari mengkoreksi kehadiran Ahmad Rizki', time: '08:45', icon: <Edit fontSize="small" /> },
  { text: 'Ratna Sari mencatat pelanggaran seragam Dimas Aditya', time: '08:30', icon: <Gavel fontSize="small" /> },
  { text: 'Ahmad Fauzi mengisi jurnal Matematika 10-A Jam ke-1', time: '08:15', icon: <CheckCircle fontSize="small" /> },
  { text: 'Dedi Kurniawan menginput izin sakit Putri Rahayu', time: '07:55', icon: <Warning fontSize="small" /> },
  { text: 'Dr. H. Bambang Sutrisno login ke sistem', time: '07:30', icon: <Login fontSize="small" /> },
];

const statusColor: Record<string, string> = { online: '#4caf50', offline: '#f44336', warning: '#ff9800' };

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Dashboard</Typography>

      {/* Stats Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Charts + Devices Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Kehadiran Minggu Ini</Typography>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Hadir" fill="#4caf50" stackId="a" />
              <Bar dataKey="Terlambat" fill="#ff9800" stackId="a" />
              <Bar dataKey="Sakit" fill="#2196f3" stackId="a" />
              <Bar dataKey="Izin" fill="#00bcd4" stackId="a" />
              <Bar dataKey="Alpha" fill="#f44336" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Status Perangkat</Typography>
          {devices.map((d) => (
            <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, borderBottom: '1px solid #f0f0f0' }}>
              <Circle sx={{ fontSize: 12, color: statusColor[d.status] }} />
              <Typography variant="body2" sx={{ flex: 1 }}>{d.name}</Typography>
              <Chip label={d.status} size="small" sx={{ bgcolor: statusColor[d.status] + '20', color: statusColor[d.status], fontWeight: 600, textTransform: 'capitalize' }} />
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Bottom Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Siswa Belum Absen</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead><TableRow><TableCell>Nama</TableCell><TableCell>Kelas</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
              <TableBody>
                {belumAbsen.map((s) => (
                  <TableRow key={s.nama}><TableCell>{s.nama}</TableCell><TableCell>{s.kelas}</TableCell><TableCell><Chip label="Belum Scan" size="small" color="warning" /></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Aktivitas Terkini</Typography>
          <List dense>
            {activities.map((a, i) => (
              <ListItem key={i} sx={{ px: 0 }}>
                <ListItemAvatar><Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>{a.icon}</Avatar></ListItemAvatar>
                <ListItemText primary={a.text} secondary={a.time} primaryTypographyProps={{ fontSize: '0.82rem' }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
