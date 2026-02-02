# TICKET-011: Device Configuration Management

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 2: Fingerprint Integration & Device Management |
| **Dependencies** | TICKET-007 |

## Description

Implement interface for managing device configurations including IP address, location, and device settings.

## Acceptance Criteria

- [ ] Add new device with IP, name, location
- [ ] Edit device configuration
- [ ] Test device connection before saving
- [ ] Set device as primary registration device
- [ ] Configure device timezone
- [ ] Set device working hours
- [ ] Validate IP address format
- [ ] Prevent duplicate IP addresses
- [ ] Soft delete device (keep historical data)

## Technical Notes

- Store device configs in devices table
- Validate IP reachability before save
- Implement device priority/role (primary/secondary)
- Support device grouping by location
