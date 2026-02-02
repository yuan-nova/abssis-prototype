# TICKET-021: Academic Year Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 3: Master Data Management |
| **Dependencies** | Database schema |

## Description

Implement academic year management to support year progression and historical data separation.

## Acceptance Criteria

- [ ] Create academic year (e.g., 2025/2026)
- [ ] Set start and end dates
- [ ] Mark one year as active
- [ ] Only one active year at a time
- [ ] List all academic years
- [ ] Switch active year
- [ ] All operations use active year context
- [ ] Cannot delete year with data

## Technical Notes

- Store as year_start/year_end
- Add is_active boolean flag
- Most tables should have academic_year_id FK
- Implement year context in session/middleware
