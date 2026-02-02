import { lazy } from 'react';
import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router';
import DashboardLayout from './layouts/DashboardLayout';

const rootRoute = createRootRoute({
  component: DashboardLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => { throw redirect({ to: '/dashboard' }); },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazy(() => import('./pages/LoginPage')),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: lazy(() => import('./pages/DashboardPage')),
});

// === User Management ===
const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: lazy(() => import('./pages/users/UserListPage')),
});

const rolesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roles',
  component: lazy(() => import('./pages/users/RolesPage')),
});

const auditLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/audit-logs',
  component: lazy(() => import('./pages/users/AuditLogPage')),
});

// === Master Data ===
const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/students',
  component: lazy(() => import('./pages/students/StudentListPage')),
});

const classesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/classes',
  component: lazy(() => import('./pages/classes/ClassListPage')),
});

const academicYearsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic-years',
  component: lazy(() => import('./pages/academic/AcademicYearPage')),
});

const classPromotionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/class-promotion',
  component: lazy(() => import('./pages/academic/ClassPromotionPage')),
});

const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subjects',
  component: lazy(() => import('./pages/subjects/SubjectListPage')),
});

const schedulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schedules',
  component: lazy(() => import('./pages/schedules/SchedulePage')),
});

const dataArchiveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/data-archive',
  component: lazy(() => import('./pages/academic/DataArchivePage')),
});

// === Device Management ===
const devicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devices',
  component: lazy(() => import('./pages/devices/DeviceMonitorPage')),
});

const devicesConfigRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devices/config',
  component: lazy(() => import('./pages/devices/DeviceConfigPage')),
});

const devicesSyncRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devices/sync',
  component: lazy(() => import('./pages/devices/FingerprintSyncPage')),
});

// === Attendance ===
const attendanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attendance',
  component: lazy(() => import('./pages/attendance/AttendanceDashboardPage')),
});

const attendancePreInputRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attendance/pre-input',
  component: lazy(() => import('./pages/attendance/PreAttendancePage')),
});

const attendanceMidDayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attendance/mid-day',
  component: lazy(() => import('./pages/attendance/MidDayPermissionPage')),
});

const attendanceCorrectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attendance/corrections',
  component: lazy(() => import('./pages/attendance/CorrectionPage')),
});

const attendanceCorrectionHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attendance/correction-history',
  component: lazy(() => import('./pages/attendance/CorrectionHistoryPage')),
});

// === Journal ===
const journalVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal/verification',
  component: lazy(() => import('./pages/journal/VerificationPage')),
});

const journalInputRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal/input',
  component: lazy(() => import('./pages/journal/JournalInputPage')),
});

const journalAbsenteesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal/absentees',
  component: lazy(() => import('./pages/journal/AbsenteeDetectionPage')),
});

const journalStatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal/stats',
  component: lazy(() => import('./pages/journal/JournalStatsPage')),
});

const journalMaterialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal/materials',
  component: lazy(() => import('./pages/journal/MaterialBankPage')),
});

// === Discipline ===
const disciplineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discipline',
  component: lazy(() => import('./pages/discipline/BKDashboardPage')),
});

const disciplineViolationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discipline/violations',
  component: lazy(() => import('./pages/discipline/ViolationInputPage')),
});

const disciplineCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discipline/categories',
  component: lazy(() => import('./pages/discipline/ViolationCategoriesPage')),
});

const disciplineResetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discipline/reset',
  component: lazy(() => import('./pages/discipline/PointResetPage')),
});

// === WhatsApp ===
const whatsappRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp',
  component: lazy(() => import('./pages/whatsapp/GatewayStatusPage')),
});

const whatsappQueueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp/queue',
  component: lazy(() => import('./pages/whatsapp/MessageQueuePage')),
});

const whatsappTemplatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp/templates',
  component: lazy(() => import('./pages/whatsapp/MessageTemplatePage')),
});

const whatsappLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp/logs',
  component: lazy(() => import('./pages/whatsapp/NotificationLogPage')),
});

const whatsappNumbersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp/numbers',
  component: lazy(() => import('./pages/whatsapp/WANumberPage')),
});

// === Reports ===
const reportsAttendanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/attendance',
  component: lazy(() => import('./pages/reports/AttendanceReportPage')),
});

const reportsJournalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/journal',
  component: lazy(() => import('./pages/reports/JournalReportPage')),
});

const reportsDisciplineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/discipline',
  component: lazy(() => import('./pages/reports/DisciplineRankingPage')),
});

const reportsClassComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/class-comparison',
  component: lazy(() => import('./pages/reports/ClassComparisonPage')),
});

const reportsStudentCardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/student-card',
  component: lazy(() => import('./pages/reports/StudentReportCardPage')),
});

const reportsCustomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/custom',
  component: lazy(() => import('./pages/reports/CustomReportPage')),
});

const reportsScheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/schedule',
  component: lazy(() => import('./pages/reports/ReportSchedulePage')),
});

// === Settings ===
const settingsSchoolHoursRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/school-hours',
  component: lazy(() => import('./pages/settings/SchoolHoursPage')),
});

const settingsPointThresholdsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/point-thresholds',
  component: lazy(() => import('./pages/settings/PointThresholdsPage')),
});

const settingsSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/system',
  component: lazy(() => import('./pages/settings/SystemSettingsPage')),
});

const settingsCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/calendar',
  component: lazy(() => import('./pages/settings/AcademicCalendarPage')),
});

const settingsNotificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/notifications',
  component: lazy(() => import('./pages/settings/NotificationConfigPage')),
});

const settingsDataRetentionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/data-retention',
  component: lazy(() => import('./pages/settings/DataRetentionPage')),
});

const settingsBackupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/backup',
  component: lazy(() => import('./pages/settings/BackupRestorePage')),
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  usersRoute, rolesRoute, auditLogsRoute,
  studentsRoute, classesRoute, academicYearsRoute, classPromotionRoute,
  subjectsRoute, schedulesRoute, dataArchiveRoute,
  devicesRoute, devicesConfigRoute, devicesSyncRoute,
  attendanceRoute, attendancePreInputRoute, attendanceMidDayRoute,
  attendanceCorrectionsRoute, attendanceCorrectionHistoryRoute,
  journalVerificationRoute, journalInputRoute, journalAbsenteesRoute,
  journalStatsRoute, journalMaterialsRoute,
  disciplineRoute, disciplineViolationsRoute, disciplineCategoriesRoute, disciplineResetRoute,
  whatsappRoute, whatsappQueueRoute, whatsappTemplatesRoute, whatsappLogsRoute, whatsappNumbersRoute,
  reportsAttendanceRoute, reportsJournalRoute, reportsDisciplineRoute,
  reportsClassComparisonRoute, reportsStudentCardRoute, reportsCustomRoute, reportsScheduleRoute,
  settingsSchoolHoursRoute, settingsPointThresholdsRoute, settingsSystemRoute,
  settingsCalendarRoute, settingsNotificationsRoute, settingsDataRetentionRoute, settingsBackupRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
