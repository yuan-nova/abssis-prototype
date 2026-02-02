# TICKET-004: Role-Based Access Control (RBAC)

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 1: User Management & Security |
| **Dependencies** | TICKET-003 |

## Description

Implement role-based access control with 5 predefined roles: Super Admin, Admin TU, Guru, Guru BK, and Kepsek. Each role should have specific permissions for accessing system features.

## Acceptance Criteria

- [ ] System has 5 roles: Super Admin, Admin TU, Guru, Guru BK, Kepsek
- [ ] Role permissions defined and stored in database
- [ ] Middleware checks user permissions before accessing routes
- [ ] UI elements hidden/shown based on user role
- [ ] Super Admin has full access to all features
- [ ] Admin TU can manage students, attendance, corrections
- [ ] Guru can access journal and student attendance
- [ ] Guru BK can manage discipline points and violations
- [ ] Kepsek has read-only access to all reports
- [ ] Unauthorized access returns 403 Forbidden
- [ ] Role assignment during user creation/editing

## Technical Notes

- Create roles and permissions tables
- Implement middleware for route protection
- Use ACL library or custom implementation
- Cache permissions in session for performance

### Permission Matrix

| Role | Permissions |
|---|---|
| Super Admin | All permissions |
| Admin TU | Students (CRUD), Attendance (CRUD), Manual Corrections |
| Guru | Journal (CRUD), View Student Attendance |
| Guru BK | Discipline Points (CRUD), Violations (CRUD) |
| Kepsek | View All Reports, View Dashboards |
