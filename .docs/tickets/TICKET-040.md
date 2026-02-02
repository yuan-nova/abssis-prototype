# TICKET-040: Smart Point Rollback System

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | TICKET-039, TICKET-027 (Attendance correction) |

## Description

Automatically reduce/remove discipline points when Admin TU corrects attendance status.

## Acceptance Criteria

- [ ] When attendance corrected from Alpha to Present: remove +10 points
- [ ] When attendance corrected from Late to Present: remove +5 points
- [ ] When attendance corrected from Present to Alpha: add +10 points
- [ ] Log point adjustment with correction reference
- [ ] Show correction reason in point history
- [ ] Cannot rollback manually-added BK points
- [ ] Adjustment notification to parent WhatsApp
- [ ] Prevent point adjustment for old corrections (>30 days)
- [ ] Admin approval required for bulk adjustments

## Technical Notes

- Check is_auto flag before rollback
- Link to attendance_correction_id
- Create point_adjustments table for audit
- Recalculate running total after adjustment
- Use database transaction for consistency
