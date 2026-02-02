# TICKET-044: Point Reset & Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | TICKET-039, TICKET-004 (RBAC) |

## Description

Allow authorized users to reset discipline points with proper authorization and audit trail.

## Acceptance Criteria

- [ ] Admin can reset individual student points
- [ ] Input reset reason (mandatory)
- [ ] Approval workflow for point resets
- [ ] Bulk reset for graduating class
- [ ] Semester-end partial reset option
- [ ] Keep reset history for audit
- [ ] Cannot reset points with active violations
- [ ] Principal approval required for resets
- [ ] Email notification to relevant parties

## Technical Notes

- Create point_resets table
- Archive existing points before reset
- Implement approval workflow
- Reset types: Full, Partial (percentage/fixed amount)
- Keep complete audit trail
