# TICKET-036: Subject & Schedule Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 5: Teacher Journal & Attendance Verification |
| **Dependencies** | TICKET-003 (Teachers), TICKET-020 (Classes) |

## Description

Manage subjects, teaching schedules, and teacher-subject-class assignments.

## Acceptance Criteria

- [ ] Create subject master data (name, code, category)
- [ ] Create weekly schedule template
- [ ] Assign teacher to subject and class
- [ ] Define periods: period number, start time, end time
- [ ] Schedule can be cloned for new semester
- [ ] Handle schedule changes/substitutions
- [ ] Teacher can view their teaching schedule
- [ ] Admin can view master schedule
- [ ] Export schedule to PDF/Excel
- [ ] Support for team teaching (multiple teachers)

## Technical Notes

- Create subjects, schedules, teacher_assignments tables
- Schedule repeats weekly
- Handle day-specific schedules
- Support for special events (exam, holiday)
