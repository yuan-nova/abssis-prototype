# TICKET-020: Class Management System

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 3: Master Data Management |
| **Dependencies** | TICKET-003 (User Management), TICKET-019 |

## Description

Implement class management including grade levels, sections, homeroom teacher assignment, and class capacity.

## Acceptance Criteria

- [ ] Create class with grade (1-12) and section (A, B, C, etc.)
- [ ] Assign homeroom teacher (wali kelas)
- [ ] Set class capacity (max students)
- [ ] Academic year association
- [ ] List all classes with student count
- [ ] View class roster
- [ ] Edit class information
- [ ] Transfer student between classes
- [ ] Warning when class reaches capacity
- [ ] Prevent deletion if students assigned

## Technical Notes

- Create classes table with grade, section, year
- Foreign key to teachers for homeroom
- Unique constraint: grade + section + year
- Implement class capacity validation
