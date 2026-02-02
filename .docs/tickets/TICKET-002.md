# TICKET-002: Rate Limiting & Account Protection

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 1: User Management & Security |
| **Dependencies** | TICKET-001 |

## Description

Implement rate limiting to prevent brute force attacks. After 5 failed login attempts, temporarily block the account and send notification to admin.

## Acceptance Criteria

- [ ] System blocks login after 5 consecutive failed attempts
- [ ] Account locked for 15 minutes (configurable)
- [ ] User shown remaining attempts count
- [ ] Lock timer displayed to user
- [ ] Admin notification sent when account is locked
- [ ] Admin can manually unlock accounts
- [ ] Failed attempt counter resets after successful login
- [ ] Rate limiting applied per IP and per account

## Technical Notes

- Use middleware for rate limiting (express-rate-limit or similar)
- Store failed attempts in cache (Redis) for performance
- Implement exponential backoff for repeated violations
- Log security events to separate security log file
