export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'H' | 'T' | 'S' | 'I' | 'A';
  scanTime: string | null;
  deviceId: string | null;
  isManualCorrection: boolean;
}

export const attendanceRecords: AttendanceRecord[] = [
  // === Kelas X-A ===
  { id: 'att-001', studentId: 'stu-001', studentName: 'Ahmad Rizky Pratama', classId: 'cls-10a', className: 'X-A', date: '2026-01-31', status: 'H', scanTime: '06:42:15', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-002', studentId: 'stu-002', studentName: 'Siti Nurhaliza', classId: 'cls-10a', className: 'X-A', date: '2026-01-31', status: 'H', scanTime: '06:48:30', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-003', studentId: 'stu-003', studentName: 'Muhammad Farhan Alfarizi', classId: 'cls-10a', className: 'X-A', date: '2026-01-31', status: 'T', scanTime: '07:18:45', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-004', studentId: 'stu-004', studentName: 'Dinda Ayu Lestari', classId: 'cls-10a', className: 'X-A', date: '2026-01-31', status: 'H', scanTime: '06:50:22', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-005', studentId: 'stu-032', studentName: 'Cantika Maharani', classId: 'cls-10a', className: 'X-A', date: '2026-01-31', status: 'S', scanTime: null, deviceId: null, isManualCorrection: false },

  // === Kelas X-B ===
  { id: 'att-006', studentId: 'stu-005', studentName: 'Rafi Aditya Nugroho', classId: 'cls-10b', className: 'X-B', date: '2026-01-31', status: 'H', scanTime: '06:35:10', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-007', studentId: 'stu-006', studentName: 'Anisa Putri Ramadhani', classId: 'cls-10b', className: 'X-B', date: '2026-01-31', status: 'H', scanTime: '06:40:55', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-008', studentId: 'stu-007', studentName: 'Bayu Eka Saputra', classId: 'cls-10b', className: 'X-B', date: '2026-01-31', status: 'H', scanTime: '06:52:18', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-009', studentId: 'stu-034', studentName: 'Keisha Amira', classId: 'cls-10b', className: 'X-B', date: '2026-01-31', status: 'I', scanTime: null, deviceId: null, isManualCorrection: false },

  // === Kelas X-C ===
  { id: 'att-010', studentId: 'stu-008', studentName: 'Nadia Safitri', classId: 'cls-10c', className: 'X-C', date: '2026-01-31', status: 'H', scanTime: '06:38:42', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-011', studentId: 'stu-009', studentName: 'Rizal Firmansyah', classId: 'cls-10c', className: 'X-C', date: '2026-01-31', status: 'H', scanTime: '06:45:30', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-012', studentId: 'stu-010', studentName: 'Zahra Amelia Putri', classId: 'cls-10c', className: 'X-C', date: '2026-01-31', status: 'T', scanTime: '07:22:08', deviceId: 'dev-002', isManualCorrection: false },

  // === Kelas XI-A ===
  { id: 'att-013', studentId: 'stu-011', studentName: 'Fadhil Mahendra', classId: 'cls-11a', className: 'XI-A', date: '2026-01-31', status: 'H', scanTime: '06:30:05', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-014', studentId: 'stu-012', studentName: 'Aulia Rahma Sari', classId: 'cls-11a', className: 'XI-A', date: '2026-01-31', status: 'H', scanTime: '06:33:20', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-015', studentId: 'stu-013', studentName: 'Galih Prasetyo Wibowo', classId: 'cls-11a', className: 'XI-A', date: '2026-01-31', status: 'A', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-016', studentId: 'stu-014', studentName: 'Putri Maharani', classId: 'cls-11a', className: 'XI-A', date: '2026-01-31', status: 'H', scanTime: '06:47:15', deviceId: 'dev-002', isManualCorrection: false },

  // === Kelas XI-B ===
  { id: 'att-017', studentId: 'stu-015', studentName: 'Ilham Maulana', classId: 'cls-11b', className: 'XI-B', date: '2026-01-31', status: 'H', scanTime: '06:28:40', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-018', studentId: 'stu-016', studentName: 'Aisyah Nur Fadilah', classId: 'cls-11b', className: 'XI-B', date: '2026-01-31', status: 'H', scanTime: '06:31:55', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-019', studentId: 'stu-017', studentName: 'Kevin Dwi Cahyono', classId: 'cls-11b', className: 'XI-B', date: '2026-01-31', status: 'T', scanTime: '07:15:30', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-020', studentId: 'stu-033', studentName: 'Daffa Athallah', classId: 'cls-11b', className: 'XI-B', date: '2026-01-31', status: 'H', scanTime: '06:55:12', deviceId: 'dev-002', isManualCorrection: false },

  // === Kelas XI-C ===
  { id: 'att-021', studentId: 'stu-018', studentName: 'Nabila Zahra Azzahra', classId: 'cls-11c', className: 'XI-C', date: '2026-01-31', status: 'H', scanTime: '06:36:08', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-022', studentId: 'stu-019', studentName: 'Dimas Arya Putra', classId: 'cls-11c', className: 'XI-C', date: '2026-01-31', status: 'A', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-023', studentId: 'stu-020', studentName: 'Tasya Kamila', classId: 'cls-11c', className: 'XI-C', date: '2026-01-31', status: 'H', scanTime: '06:44:50', deviceId: 'dev-001', isManualCorrection: false },

  // === Kelas XII-A ===
  { id: 'att-024', studentId: 'stu-021', studentName: 'Andi Wijaya Kusuma', classId: 'cls-12a', className: 'XII-A', date: '2026-01-31', status: 'H', scanTime: '06:25:18', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-025', studentId: 'stu-022', studentName: 'Luthfia Azzahra', classId: 'cls-12a', className: 'XII-A', date: '2026-01-31', status: 'H', scanTime: '06:29:35', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-026', studentId: 'stu-023', studentName: 'Bagus Setiawan', classId: 'cls-12a', className: 'XII-A', date: '2026-01-31', status: 'H', scanTime: '06:32:42', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-027', studentId: 'stu-024', studentName: 'Indah Permata Sari', classId: 'cls-12a', className: 'XII-A', date: '2026-01-31', status: 'H', scanTime: '06:38:10', deviceId: 'dev-001', isManualCorrection: true },

  // === Kelas XII-B ===
  { id: 'att-028', studentId: 'stu-025', studentName: 'Haris Munandar', classId: 'cls-12b', className: 'XII-B', date: '2026-01-31', status: 'H', scanTime: '06:27:05', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-029', studentId: 'stu-026', studentName: 'Dewi Anggraini', classId: 'cls-12b', className: 'XII-B', date: '2026-01-31', status: 'H', scanTime: '06:34:22', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-030', studentId: 'stu-027', studentName: 'Yusuf Ramadhan', classId: 'cls-12b', className: 'XII-B', date: '2026-01-31', status: 'S', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-031', studentId: 'stu-035', studentName: 'Raditya Putra Pratama', classId: 'cls-12b', className: 'XII-B', date: '2026-01-31', status: 'H', scanTime: '06:41:38', deviceId: 'dev-001', isManualCorrection: false },

  // === Kelas XII-C ===
  { id: 'att-032', studentId: 'stu-028', studentName: 'Salma Khairunnisa', classId: 'cls-12c', className: 'XII-C', date: '2026-01-31', status: 'H', scanTime: '06:26:50', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-033', studentId: 'stu-029', studentName: 'Farel Prayoga', classId: 'cls-12c', className: 'XII-C', date: '2026-01-31', status: 'T', scanTime: '07:20:15', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-034', studentId: 'stu-030', studentName: 'Mega Silvia Putri', classId: 'cls-12c', className: 'XII-C', date: '2026-01-31', status: 'H', scanTime: '06:43:28', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-035', studentId: 'stu-031', studentName: 'Rangga Aditya', classId: 'cls-12c', className: 'XII-C', date: '2026-01-31', status: 'H', scanTime: '06:37:55', deviceId: 'dev-001', isManualCorrection: false },

  // === Additional records for volume (earlier in the week) ===
  { id: 'att-036', studentId: 'stu-001', studentName: 'Ahmad Rizky Pratama', classId: 'cls-10a', className: 'X-A', date: '2026-01-30', status: 'H', scanTime: '06:40:10', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-037', studentId: 'stu-002', studentName: 'Siti Nurhaliza', classId: 'cls-10a', className: 'X-A', date: '2026-01-30', status: 'H', scanTime: '06:45:20', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-038', studentId: 'stu-003', studentName: 'Muhammad Farhan Alfarizi', classId: 'cls-10a', className: 'X-A', date: '2026-01-30', status: 'H', scanTime: '06:50:05', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-039', studentId: 'stu-011', studentName: 'Fadhil Mahendra', classId: 'cls-11a', className: 'XI-A', date: '2026-01-30', status: 'T', scanTime: '07:12:30', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-040', studentId: 'stu-015', studentName: 'Ilham Maulana', classId: 'cls-11b', className: 'XI-B', date: '2026-01-30', status: 'H', scanTime: '06:30:15', deviceId: 'dev-001', isManualCorrection: false },

  { id: 'att-041', studentId: 'stu-021', studentName: 'Andi Wijaya Kusuma', classId: 'cls-12a', className: 'XII-A', date: '2026-01-29', status: 'H', scanTime: '06:28:40', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-042', studentId: 'stu-022', studentName: 'Luthfia Azzahra', classId: 'cls-12a', className: 'XII-A', date: '2026-01-29', status: 'A', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-043', studentId: 'stu-005', studentName: 'Rafi Aditya Nugroho', classId: 'cls-10b', className: 'X-B', date: '2026-01-29', status: 'H', scanTime: '06:38:20', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-044', studentId: 'stu-008', studentName: 'Nadia Safitri', classId: 'cls-10c', className: 'X-C', date: '2026-01-29', status: 'H', scanTime: '06:42:55', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-045', studentId: 'stu-013', studentName: 'Galih Prasetyo Wibowo', classId: 'cls-11a', className: 'XI-A', date: '2026-01-29', status: 'T', scanTime: '07:25:10', deviceId: 'dev-001', isManualCorrection: false },

  { id: 'att-046', studentId: 'stu-018', studentName: 'Nabila Zahra Azzahra', classId: 'cls-11c', className: 'XI-C', date: '2026-01-28', status: 'H', scanTime: '06:35:50', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-047', studentId: 'stu-025', studentName: 'Haris Munandar', classId: 'cls-12b', className: 'XII-B', date: '2026-01-28', status: 'H', scanTime: '06:30:30', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-048', studentId: 'stu-028', studentName: 'Salma Khairunnisa', classId: 'cls-12c', className: 'XII-C', date: '2026-01-28', status: 'I', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-049', studentId: 'stu-009', studentName: 'Rizal Firmansyah', classId: 'cls-10c', className: 'X-C', date: '2026-01-28', status: 'H', scanTime: '06:44:15', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-050', studentId: 'stu-029', studentName: 'Farel Prayoga', classId: 'cls-12c', className: 'XII-C', date: '2026-01-28', status: 'A', scanTime: null, deviceId: null, isManualCorrection: false },

  { id: 'att-051', studentId: 'stu-019', studentName: 'Dimas Arya Putra', classId: 'cls-11c', className: 'XI-C', date: '2026-01-27', status: 'T', scanTime: '07:10:20', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-052', studentId: 'stu-004', studentName: 'Dinda Ayu Lestari', classId: 'cls-10a', className: 'X-A', date: '2026-01-27', status: 'H', scanTime: '06:48:33', deviceId: 'dev-001', isManualCorrection: false },
  { id: 'att-053', studentId: 'stu-016', studentName: 'Aisyah Nur Fadilah', classId: 'cls-11b', className: 'XI-B', date: '2026-01-27', status: 'S', scanTime: null, deviceId: null, isManualCorrection: false },
  { id: 'att-054', studentId: 'stu-030', studentName: 'Mega Silvia Putri', classId: 'cls-12c', className: 'XII-C', date: '2026-01-27', status: 'H', scanTime: '06:39:45', deviceId: 'dev-002', isManualCorrection: false },
  { id: 'att-055', studentId: 'stu-023', studentName: 'Bagus Setiawan', classId: 'cls-12a', className: 'XII-A', date: '2026-01-27', status: 'H', scanTime: '06:33:15', deviceId: 'dev-001', isManualCorrection: false },
];
