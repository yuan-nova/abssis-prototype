# TICKET-039: Automated Discipline Point Calculation

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | Attendance module complete |

## Description

Automatically calculate and add discipline points based on attendance status: Alpha +10 points, Late +5 points.

## Acceptance Criteria

- [ ] System automatically adds points when attendance finalized
- [ ] Alpha (A) = +10 points per occurrence
- [ ] Late (T) = +5 points per occurrence
- [ ] Points added at end of school day (configurable time)
- [ ] Points linked to specific attendance record
- [ ] Record includes date, type, points, auto-generated flag
- [ ] Parent WhatsApp notification when points added
- [ ] Cannot manually delete auto-generated points
- [ ] Points visible in student profile
- [ ] Running total calculated automatically

## Technical Notes

- Create discipline_points table
- Fields: student_id, date, type, points, reason, is_auto, attendance_id
- Run batch job at configurable end-of-day time
- Check if points already added to prevent duplicates
- Create trigger or scheduled task
