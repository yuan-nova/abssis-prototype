# TICKET-062: Academic Calendar Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 9: Configuration & Settings Management |
| **Dependencies** | TICKET-021 (Academic year) |

## Description

Manage school calendar including holidays, exam periods, and special events.

## Acceptance Criteria

- [ ] Add holidays and special days
- [ ] Mark exam periods (mid-term, final)
- [ ] School events calendar
- [ ] Import national holidays automatically
- [ ] Different attendance rules for special days
- [ ] Calendar view (monthly, yearly)
- [ ] Export calendar to ICS format
- [ ] Recurring events support
- [ ] Color coding by event type
- [ ] Event notifications to teachers

## Technical Notes

- Create calendar_events table
- Types: holiday, exam, event, special_schedule
- Check calendar before processing attendance
- Integration with government holiday API
- Support for multi-day events
