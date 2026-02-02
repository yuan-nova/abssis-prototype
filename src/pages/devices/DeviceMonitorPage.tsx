import { useState } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Paper, Chip, Divider,
} from '@mui/material';
import {
  Refresh as RefreshIcon, Sync as SyncIcon, RestartAlt as RestartIcon,
  Router as RouterIcon, FiberManualRecord as DotIcon,
  DevicesOther as DevicesIcon, CheckCircle as OnlineIcon,
  Cancel as OfflineIcon, Storage as StorageIcon, Article as LogIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

interface Device {
  id: number;
  name: string;
  ip: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  templateCount: number;
  todayLogs: number;
  uptime: string;
  responseTime: string;
}

const mockDevices: Device[] = [
  { id: 1, name: 'Device Gerbang Utama', ip: '192.168.1.101', location: 'Gerbang Utama', status: 'online', lastSync: '2026-02-01 07:45:00', templateCount: 600, todayLogs: 245, uptime: '15 hari 3 jam', responseTime: '12ms' },
  { id: 2, name: 'Device Gerbang Belakang', ip: '192.168.1.102', location: 'Gerbang Belakang', status: 'online', lastSync: '2026-02-01 07:44:30', templateCount: 600, todayLogs: 198, uptime: '15 hari 3 jam', responseTime: '15ms' },
  { id: 3, name: 'Device Gedung A Lt.1', ip: '192.168.1.103', location: 'Gedung A Lantai 1', status: 'online', lastSync: '2026-02-01 07:43:15', templateCount: 600, todayLogs: 312, uptime: '10 hari 7 jam', responseTime: '18ms' },
  { id: 4, name: 'Device Gedung A Lt.2', ip: '192.168.1.104', location: 'Gedung A Lantai 2', status: 'warning', lastSync: '2026-02-01 06:30:00', templateCount: 598, todayLogs: 156, uptime: '3 hari 12 jam', responseTime: '245ms' },
  { id: 5, name: 'Device Gedung B Lt.1', ip: '192.168.1.105', location: 'Gedung B Lantai 1', status: 'online', lastSync: '2026-02-01 07:45:10', templateCount: 600, todayLogs: 287, uptime: '15 hari 3 jam', responseTime: '14ms' },
  { id: 6, name: 'Device Gedung B Lt.2', ip: '192.168.1.106', location: 'Gedung B Lantai 2', status: 'offline', lastSync: '2026-01-31 16:20:00', templateCount: 602, todayLogs: 47, uptime: '-', responseTime: '-' },
];

const statusConfig = {
  online: { color: '#4caf50', label: 'Online', bgColor: 'rgba(76,175,80,0.08)' },
  offline: { color: '#f44336', label: 'Offline', bgColor: 'rgba(244,67,54,0.08)' },
  warning: { color: '#ff9800', label: 'Warning', bgColor: 'rgba(255,152,0,0.08)' },
};

export default function DeviceMonitorPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [devices] = useState<Device[]>(mockDevices);

  const onlineCount = devices.filter((d) => d.status === 'online').length;
  const offlineCount = devices.filter((d) => d.status === 'offline').length;
  const warningCount = devices.filter((d) => d.status === 'warning').length;
  const totalTemplates = devices.reduce((sum, d) => sum + d.templateCount, 0);
  const totalLogs = devices.reduce((sum, d) => sum + d.todayLogs, 0);

  const handleSync = (device: Device) => {
    enqueueSnackbar(`Sinkronisasi ${device.name} dimulai...`, { variant: 'info' });
  };

  const handleRestart = (device: Device) => {
    enqueueSnackbar(`Perintah restart dikirim ke ${device.name}`, { variant: 'warning' });
  };

  const stats = [
    { icon: <OnlineIcon sx={{ color: '#4caf50', fontSize: 24 }} />, bg: 'rgba(76,175,80,0.1)', value: onlineCount, label: 'Online' },
    { icon: <OfflineIcon sx={{ color: '#f44336', fontSize: 24 }} />, bg: 'rgba(244,67,54,0.1)', value: offlineCount, label: 'Offline' },
    { icon: <DevicesIcon sx={{ color: '#ff9800', fontSize: 24 }} />, bg: 'rgba(255,152,0,0.1)', value: warningCount, label: 'Warning' },
    { icon: <StorageIcon sx={{ color: '#1976d2', fontSize: 24 }} />, bg: 'rgba(25,118,210,0.1)', value: totalTemplates.toLocaleString('id-ID'), label: 'Total Template' },
    { icon: <LogIcon sx={{ color: '#009688', fontSize: 24 }} />, bg: 'rgba(0,150,136,0.1)', value: totalLogs.toLocaleString('id-ID'), label: 'Log Hari Ini' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Monitor Perangkat</Typography>
          <Typography variant="subtitle2" sx={{ mt: 0.5 }}>Pemantauan status perangkat fingerprint secara real-time</Typography>
        </Box>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={() => enqueueSnackbar('Data perangkat berhasil diperbarui', { variant: 'success' })}>Refresh</Button>
      </Box>

      <Paper sx={{ p: 2.5, mb: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }, gap: 2 }}>
          {stats.map((s) => (
            <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 1.5, bgcolor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{s.value}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.label}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 2.5 }}>
        {devices.map((device) => {
          const status = statusConfig[device.status];
          return (
            <Card key={device.id} sx={{ borderLeft: `4px solid ${status.color}`, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: status.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <RouterIcon sx={{ color: status.color, fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{device.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{device.ip}</Typography>
                    </Box>
                  </Box>
                  <Chip icon={<DotIcon sx={{ fontSize: 12, color: `${status.color} !important` }} />} label={status.label} size="small"
                    sx={{ bgcolor: status.bgColor, color: status.color, fontWeight: 600, fontSize: '0.75rem', height: 26, '& .MuiChip-icon': { ml: 0.5 } }} />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Lokasi</Typography>
                    <Typography variant="body2" fontWeight={500}>{device.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Last Sync</Typography>
                    <Typography variant="body2" fontWeight={500}>{device.lastSync}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 1, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>{device.templateCount}</Typography>
                    <Typography variant="caption" color="text.secondary">Template</Typography>
                  </Box>
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 1, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>{device.todayLogs}</Typography>
                    <Typography variant="caption" color="text.secondary">Log Hari Ini</Typography>
                  </Box>
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{device.uptime}</Typography>
                    <Typography variant="caption" color="text.secondary">Uptime</Typography>
                  </Box>
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{device.responseTime}</Typography>
                    <Typography variant="caption" color="text.secondary">Response Time</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<SyncIcon />} onClick={() => handleSync(device)} fullWidth disabled={device.status === 'offline'}>Sinkronisasi</Button>
                  <Button variant="outlined" size="small" color="warning" startIcon={<RestartIcon />} onClick={() => handleRestart(device)} fullWidth disabled={device.status === 'offline'}>Restart</Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
