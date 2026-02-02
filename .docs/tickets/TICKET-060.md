# TICKET-060: Discipline Point Thresholds

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 9: Configuration & Settings Management |
| **Dependencies** | TICKET-039 |

## Description

Configure point values for different attendance violations and action thresholds.

## Acceptance Criteria

- [ ] Configure points for Alpha (default: 10)
- [ ] Configure points for Late (default: 5)
- [ ] Set warning thresholds (yellow, orange, red)
- [ ] Configure actions per threshold level
- [ ] Point values apply to new violations only
- [ ] Historical values preserved
- [ ] Preview impact before applying changes
- [ ] Validate point values (must be positive)
- [ ] Document reason for changes

## Technical Notes

- Version point configurations
- Store effective_date for each config
- Use appropriate config based on violation date
- Create point_config_history table
