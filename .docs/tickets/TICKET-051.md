# TICKET-051: WhatsApp Number Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 7: WhatsApp Notification Gateway |
| **Dependencies** | TICKET-019 (Student management) |

## Description

Manage and validate parent WhatsApp numbers with bulk update capabilities.

## Acceptance Criteria

- [ ] Validate phone number format on student creation
- [ ] Indonesian mobile format: 08xx or +628xx
- [ ] Bulk import/update phone numbers from Excel
- [ ] List students with missing phone numbers
- [ ] Test send to verify number validity
- [ ] Mark numbers as invalid/blocked
- [ ] Support multiple guardian numbers (optional)
- [ ] Export phone number list for verification

## Technical Notes

- Normalize phone numbers to +628xxx format
- Regular expression validation
- Add phone_verified flag
- Track bounced/invalid numbers
- Support for alternative contact numbers
