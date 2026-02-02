# TICKET-005: Password Management Features

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 1: User Management & Security |
| **Dependencies** | TICKET-001, TICKET-003 |

## Description

Implement self-service password change functionality and admin password reset capability.

## Acceptance Criteria

- [ ] User can change their own password from profile page
- [ ] Current password verification required before change
- [ ] New password must meet complexity requirements
- [ ] Password confirmation field matches new password
- [ ] Admin can reset any user password
- [ ] Admin reset generates temporary password
- [ ] User forced to change password on first login after reset
- [ ] Password change audit log maintained
- [ ] Success notification shown after password change
- [ ] Email notification sent to user (if email configured)

## Technical Notes

- Implement password strength meter
- Password requirements: min 8 chars, 1 uppercase, 1 number
- Store password change history (hash only)
- Prevent password reuse (last 3 passwords)
- Generate secure random temporary passwords
