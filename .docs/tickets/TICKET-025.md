# TICKET-025: Pre-Attendance Input System

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 4: Attendance Operations (Admin TU) |
| **Dependencies** | TICKET-019, Configuration for school hours |

## Description

Allow Admin TU to input sick leave or permission before school hours, so students are marked accordingly without expecting fingerprint scan.

## Acceptance Criteria

- [ ] Admin TU can input sick/permit before school start time
- [ ] Select student from searchable dropdown
- [ ] Select absence type: Sick (S) or Permit (I)
- [ ] Input start date and end date (for multi-day absences)
- [ ] Add notes/reason (optional)
- [ ] Upload supporting document (PDF/image, optional)
- [ ] Record is immediately reflected in attendance
- [ ] Student marked as Sick/Permit for specified dates
- [ ] No fingerprint scan expected for these students
- [ ] WhatsApp notification sent to guardian
- [ ] List all pre-attendance records with filter
- [ ] Edit/cancel pre-attendance if within same day

## Technical Notes

- Create attendance_permits table
- Status: S (Sakit), I (Izin)
- Integrate with main attendance processing
- Check permits before marking students as Alpha
- Store document in file storage with reference
