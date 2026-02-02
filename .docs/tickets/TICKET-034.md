# TICKET-034: Digital Teaching Journal System

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 5: Teacher Journal & Attendance Verification |
| **Dependencies** | TICKET-020 (Classes), Subject master data |

## Description

Implement e-journal where teachers record class attendance, teaching materials, and activities for each teaching hour.

## Acceptance Criteria

- [ ] Teacher selects subject, class, and period
- [ ] View student list for selected class
- [ ] Mark attendance for each student: Present/Absent
- [ ] Input teaching material/topic (required)
- [ ] Input teaching methods used
- [ ] Input homework/assignments given
- [ ] Add notes or observations
- [ ] Submit journal entry with timestamp
- [ ] Cannot submit duplicate journal for same period
- [ ] View own journal history
- [ ] Edit journal within same day (before midnight)
- [ ] Copy previous lesson material as template
- [ ] Validation: material minimum 20 characters

## Technical Notes

- Create teaching_journals table
- Fields: teacher_id, class_id, subject_id, period, date, material, attendance_json
- Store attendance as JSON array or separate table
- Implement rich text editor for material input
- Add unique constraint on teacher+class+subject+period+date
