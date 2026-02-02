export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  totalTemplates: number;
  todayLogs: number;
  uptime: string;
  responseTime: number;
}

export const devices: Device[] = [
  {
    id: 'dev-001',
    name: 'FP-GerbangUtama',
    ipAddress: '192.168.1.101',
    location: 'Gerbang Utama',
    status: 'online',
    lastSync: '2026-01-31T07:00:00',
    totalTemplates: 623,
    todayLogs: 287,
    uptime: '15 hari 8 jam',
    responseTime: 45,
  },
  {
    id: 'dev-002',
    name: 'FP-GerbangBelakang',
    ipAddress: '192.168.1.102',
    location: 'Gerbang Belakang',
    status: 'online',
    lastSync: '2026-01-31T07:00:00',
    totalTemplates: 623,
    todayLogs: 142,
    uptime: '15 hari 8 jam',
    responseTime: 52,
  },
  {
    id: 'dev-003',
    name: 'FP-LobbyAdmin',
    ipAddress: '192.168.1.103',
    location: 'Lobby Gedung Admin',
    status: 'online',
    lastSync: '2026-01-31T07:00:00',
    totalTemplates: 623,
    todayLogs: 95,
    uptime: '10 hari 3 jam',
    responseTime: 38,
  },
  {
    id: 'dev-004',
    name: 'FP-GedungB',
    ipAddress: '192.168.1.104',
    location: 'Gedung B Lantai 1',
    status: 'online',
    lastSync: '2026-01-31T07:00:00',
    totalTemplates: 623,
    todayLogs: 68,
    uptime: '7 hari 12 jam',
    responseTime: 41,
  },
  {
    id: 'dev-005',
    name: 'FP-Perpustakaan',
    ipAddress: '192.168.1.105',
    location: 'Perpustakaan',
    status: 'online',
    lastSync: '2026-01-31T06:55:00',
    totalTemplates: 623,
    todayLogs: 35,
    uptime: '22 hari 1 jam',
    responseTime: 60,
  },
  {
    id: 'dev-006',
    name: 'FP-LabKomputer',
    ipAddress: '192.168.1.106',
    location: 'Lab Komputer',
    status: 'offline',
    lastSync: '2026-01-30T16:30:00',
    totalTemplates: 620,
    todayLogs: 0,
    uptime: '0 hari 0 jam',
    responseTime: 0,
  },
];
