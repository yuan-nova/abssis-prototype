# TICKET-026: Mid-Day Permission System

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 4: Attendance Operations (Admin TU) |
| **Dependencies** | TICKET-025, Journal module (TICKET-033) |

## Description

Handle students who need to leave school mid-day (half-day permission) and automatically update journal/attendance.

## Acceptance Criteria

- [ ] Admin TU can input mid-day permission
- [ ] Select student who was present in morning
- [ ] Input permission time and reason
- [ ] Specify which class periods student will miss
- [ ] Attendance status changes to "Permit (Half-Day)"
- [ ] Automatically marked absent in affected class journals
- [ ] Teacher notified of student early departure
- [ ] Parent WhatsApp notification sent
- [ ] Cannot give permission for students already absent
- [ ] List all mid-day permissions for today
- [ ] Print permission slip (optional)

## Technical Notes

- Create mid_day_permissions table
- Update attendance status with timestamp
- Auto-update affected class journals
- Permission time must be after morning attendance
- Include in daily attendance reports
