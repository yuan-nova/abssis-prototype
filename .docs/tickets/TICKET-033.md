# TICKET-033: First Period Attendance Verification

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 5: Teacher Journal & Attendance Verification |
| **Dependencies** | TICKET-009 (Fingerprint logs), TICKET-020 (Class roster) |

## Description

Create visual dashboard for teachers to verify physical attendance against fingerprint data for first period class.

## Acceptance Criteria

- [ ] Dashboard shows class roster for first period
- [ ] Display fingerprint status: Scanned/Not Scanned
- [ ] Visual indicators (green checkmark, red X)
- [ ] Show scan time for present students
- [ ] Highlight students physically present but not scanned
- [ ] Highlight students scanned but not physically present
- [ ] Teacher can report discrepancies to Admin TU
- [ ] Auto-refresh every 30 seconds
- [ ] Filter by on-time vs late scans
- [ ] Print attendance sheet

## Technical Notes

- Query fingerprint logs for date and class students
- Join with class roster
- Use color coding for quick visual scan
- Implement WebSocket for real-time updates
- Cache class roster for performance
