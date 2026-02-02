# TICKET-008: Centralized Fingerprint Template Sync

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 2: Fingerprint Integration & Device Management |
| **Dependencies** | TICKET-007, TICKET-019 (Student Master) |

## Description

Implement centralized fingerprint registration where template is registered at one device and automatically pushed to all 6 devices in the network.

## Acceptance Criteria

- [ ] Admin can select registration device from dropdown
- [ ] Student places finger on selected device
- [ ] Template captured and stored in central database
- [ ] Template automatically pushed to all 6 devices
- [ ] Push status shown for each device (success/failed)
- [ ] Retry mechanism for failed pushes
- [ ] Notification shown after sync completion
- [ ] Template verification on each device
- [ ] Support for up to 10 fingers per student

## Technical Notes

- Store template in database as BLOB
- Implement queue system for push operations
- Use background worker for async push
- Handle device offline scenarios
- Implement retry with exponential backoff
- Template format must match Solution X100C requirements
