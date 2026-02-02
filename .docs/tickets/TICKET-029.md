# TICKET-029: Daily Attendance Dashboard (Admin TU)

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 4: Attendance Operations (Admin TU) |
| **Dependencies** | TICKET-025, TICKET-026, TICKET-027 |

## Description

Provide Admin TU with comprehensive daily attendance overview and quick action tools.

## Acceptance Criteria

- [ ] Show today attendance summary by class
- [ ] Total Present, Late, Sick, Permit, Alpha counts
- [ ] Percentage calculations
- [ ] List of students not yet scanned (potential Alpha)
- [ ] Quick action: mark absent students
- [ ] Recent pre-attendance entries
- [ ] Recent mid-day permissions
- [ ] Recent manual corrections
- [ ] Refresh button for real-time data
- [ ] Filter by class/grade
- [ ] Export daily report

## Technical Notes

- Cache dashboard data with 5-minute TTL
- Use WebSocket for real-time updates
- Optimize queries with proper indexing
- Implement date picker for historical view
