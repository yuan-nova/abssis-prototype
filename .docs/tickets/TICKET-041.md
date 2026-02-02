# TICKET-041: Manual Violation Input (Guru BK)

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | TICKET-039 |

## Description

Allow Guru BK to manually input behavioral violations and assign discipline points.

## Acceptance Criteria

- [ ] Guru BK can input violation for any student
- [ ] Select violation category from dropdown
- [ ] Categories: user-defined via configuration
- [ ] Input custom point value
- [ ] Add detailed description/notes
- [ ] Add date of violation
- [ ] Upload evidence (photo/document, optional)
- [ ] Input action taken (counseling, warning, etc.)
- [ ] Points immediately added to student total
- [ ] Parent WhatsApp notification sent
- [ ] View all violations by student
- [ ] Edit violation within 24 hours
- [ ] Cannot delete violations, only mark as void

## Technical Notes

- Use same discipline_points table, is_auto=false
- Create violation_categories config table
- Store evidence files in secure storage
- Add void flag instead of deletion
- Include created_by user reference
