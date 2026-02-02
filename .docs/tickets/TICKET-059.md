# TICKET-059: School Hours Configuration

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 9: Configuration & Settings Management |
| **Dependencies** | Database schema |

## Description

Configure school operational hours including attendance cutoff times.

## Acceptance Criteria

- [ ] Set school start time (e.g., 07:00)
- [ ] Set school end time (e.g., 15:00)
- [ ] Set late threshold (e.g., 07:15)
- [ ] Configure break times
- [ ] Set attendance finalization time
- [ ] Different schedules for different days (optional)
- [ ] Holiday calendar integration
- [ ] Validate time logic before saving
- [ ] Preview schedule before applying
- [ ] Audit log for configuration changes

## Technical Notes

- Store in system_settings table
- Use time data type for hours
- Validate: late_time > start_time
- Consider timezone settings
- Apply changes immediately or scheduled
