# TICKET-009: Real-time Attendance Log Fetcher

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 2: Fingerprint Integration & Device Management |
| **Dependencies** | TICKET-007, TICKET-008 |

## Description

Implement continuous polling/fetching of attendance logs from all 6 devices. System should pull logs in real-time and store them in database.

## Acceptance Criteria

- [ ] Background service continuously polls all devices
- [ ] Polling interval: 30 seconds (configurable)
- [ ] New logs fetched and stored in database
- [ ] Duplicate log detection and prevention
- [ ] Match fingerprint to student record
- [ ] Store device ID, timestamp, student ID
- [ ] Handle clock sync issues between devices
- [ ] Service auto-restart on failure
- [ ] Performance: handle 600 students x 6 devices
- [ ] Log fetching errors reported to admin

## Technical Notes

- Implement as system service/daemon
- Use PULL or ADMS protocol (check SDK)
- Multi-threaded: one thread per device
- Store raw logs with processing status
- Implement transaction for data consistency
- Monitor memory usage and optimize
- Consider using Redis for caching recent logs
