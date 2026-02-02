# TICKET-047: Attendance Notification Messages

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 7: WhatsApp Notification Gateway |
| **Dependencies** | TICKET-046, Attendance modules |

## Description

Automatically send WhatsApp notifications to parents about student attendance status.

## Acceptance Criteria

- [ ] Notification sent when student marked Alpha
- [ ] Notification sent when student late
- [ ] Notification sent for pre-attendance (sick/permit)
- [ ] Notification sent for mid-day permission
- [ ] Message includes: student name, date, time, status
- [ ] Different message templates per notification type
- [ ] Message in Indonesian language
- [ ] Include school contact information
- [ ] Notification sent only once per event
- [ ] Check parent WhatsApp number exists before queuing
- [ ] Log all sent notifications

## Technical Notes

- Trigger notification after attendance finalized
- Use message templates from configuration
- Validate phone number format before sending
- Create notification_log table
- Support template variables: {nama}, {tanggal}, {status}, etc.
