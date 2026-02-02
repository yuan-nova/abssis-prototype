# TICKET-003: User CRUD Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 1: User Management & Security |
| **Dependencies** | TICKET-001, Database schema |

## Description

Implement complete user management functionality including Create, Read, Update, Delete (Soft Delete), and account activation/deactivation features.

## Acceptance Criteria

- [ ] Admin can create new user accounts with required fields
- [ ] Form validation for all user input fields
- [ ] List all users with pagination (50 per page)
- [ ] Search and filter users by name, NIP, role, status
- [ ] Edit user information (except NIP)
- [ ] Soft delete users (mark as deleted, not remove from database)
- [ ] Activate/deactivate user accounts
- [ ] View user details including last login, created date
- [ ] Bulk operations (activate/deactivate multiple users)
- [ ] Confirmation dialog for delete operations

## Technical Notes

- Implement soft delete with deleted_at timestamp
- Add is_active boolean flag
- Use DataTables or similar for listing with server-side processing
- Validate unique constraints (NIP, username, email)
