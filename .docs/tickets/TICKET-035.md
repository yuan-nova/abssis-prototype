# TICKET-035: Automatic Absentee Detection

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 5: Teacher Journal & Attendance Verification |
| **Dependencies** | TICKET-034, TICKET-026 (Mid-day permission), TICKET-039 (Points) |

## Description

Automatically detect students who were present in morning but marked absent in subsequent periods (skipping class).

## Acceptance Criteria

- [ ] System compares morning fingerprint vs period attendance
- [ ] Detect students present in morning but absent mid-day
- [ ] Generate "potential skip" alert
- [ ] Alert shown to teacher when filling journal
- [ ] Alert sent to Admin TU and Guru BK
- [ ] Teacher can confirm skip or mark as mid-day permission
- [ ] Confirmed skips automatically add discipline points
- [ ] List all skip incidents for the day
- [ ] Weekly skip report to BK
- [ ] Parent WhatsApp notification for confirmed skips

## Technical Notes

- Compare fingerprint logs with journal attendance
- Run detection after each journal submission
- Create skip_incidents table
- Integrate with mid-day permission system
- Points auto-added only after confirmation
