# TICKET-027: Manual Attendance Override

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 4: Attendance Operations (Admin TU) |
| **Dependencies** | TICKET-009 (Attendance logs), TICKET-039 (Points) |

## Description

Allow Admin TU to manually correct attendance for cases like forgotten fingerprint scan, device malfunction, or student arriving after device turned off.

## Acceptance Criteria

- [ ] Admin TU can search student and date for correction
- [ ] View current attendance status
- [ ] Change status: Present (H), Late (T), Sick (S), Permit (I), Alpha (A)
- [ ] Input correction reason (mandatory)
- [ ] Input time manually if marking Present/Late
- [ ] View original fingerprint data (if exists)
- [ ] Correction logged with admin name and timestamp
- [ ] Previous value stored for audit trail
- [ ] Automatically recalculate discipline points
- [ ] WhatsApp update notification sent if status changes
- [ ] Cannot correct attendance older than 7 days (configurable)
- [ ] Supervisor approval for bulk corrections

## Technical Notes

- Store original and corrected values
- Create attendance_corrections table for audit
- Trigger point recalculation on save
- Implement approval workflow for sensitive corrections
- Flag corrected records in reports
