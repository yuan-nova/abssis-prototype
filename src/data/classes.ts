export interface SchoolClass {
  id: string;
  grade: 10 | 11 | 12;
  section: 'A' | 'B' | 'C';
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  capacity: number;
  studentCount: number;
  academicYearId: string;
}

export const classes: SchoolClass[] = [
  {
    id: 'cls-10a',
    grade: 10,
    section: 'A',
    homeroomTeacherId: 'usr-005',
    homeroomTeacherName: 'Ahmad Fauzi, S.Pd., M.Si.',
    capacity: 36,
    studentCount: 34,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-10b',
    grade: 10,
    section: 'B',
    homeroomTeacherId: 'usr-006',
    homeroomTeacherName: 'Sri Wahyuni, S.Pd.',
    capacity: 36,
    studentCount: 35,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-10c',
    grade: 10,
    section: 'C',
    homeroomTeacherId: 'usr-007',
    homeroomTeacherName: 'Budi Santoso, S.Pd.',
    capacity: 36,
    studentCount: 33,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-11a',
    grade: 11,
    section: 'A',
    homeroomTeacherId: 'usr-008',
    homeroomTeacherName: 'Dewi Lestari, S.Pd., M.Pd.',
    capacity: 36,
    studentCount: 35,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-11b',
    grade: 11,
    section: 'B',
    homeroomTeacherId: 'usr-009',
    homeroomTeacherName: 'Eko Prasetyo, S.Pd.',
    capacity: 36,
    studentCount: 34,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-11c',
    grade: 11,
    section: 'C',
    homeroomTeacherId: 'usr-010',
    homeroomTeacherName: 'Nur Hidayah, S.Pd.',
    capacity: 36,
    studentCount: 32,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-12a',
    grade: 12,
    section: 'A',
    homeroomTeacherId: 'usr-011',
    homeroomTeacherName: 'Irfan Hakim, S.Pd.',
    capacity: 36,
    studentCount: 34,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-12b',
    grade: 12,
    section: 'B',
    homeroomTeacherId: 'usr-015',
    homeroomTeacherName: 'Maria Ulfa, S.Pd., M.Hum.',
    capacity: 36,
    studentCount: 35,
    academicYearId: 'ay-003',
  },
  {
    id: 'cls-12c',
    grade: 12,
    section: 'C',
    homeroomTeacherId: 'usr-014',
    homeroomTeacherName: 'Fajar Ramadhan, S.Pd.',
    capacity: 36,
    studentCount: 33,
    academicYearId: 'ay-003',
  },
];
