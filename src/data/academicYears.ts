export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const academicYears: AcademicYear[] = [
  {
    id: 'ay-001',
    name: '2023/2024',
    startDate: '2023-07-17',
    endDate: '2024-06-15',
    isActive: false,
  },
  {
    id: 'ay-002',
    name: '2024/2025',
    startDate: '2024-07-15',
    endDate: '2025-06-14',
    isActive: false,
  },
  {
    id: 'ay-003',
    name: '2025/2026',
    startDate: '2025-07-14',
    endDate: '2026-06-13',
    isActive: true,
  },
];
