# TICKET-048: Discipline Point Notification Messages

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 7: WhatsApp Notification Gateway |
| **Dependencies** | TICKET-046, TICKET-039 |

## Description

Send WhatsApp notifications when discipline points are added or adjusted.

## Acceptance Criteria

- [ ] Notification sent when points added (auto or manual)
- [ ] Notification sent when points adjusted/removed
- [ ] Message includes: point value, reason, running total
- [ ] Include violation details for manual violations
- [ ] Warning message when total exceeds threshold
- [ ] Different templates for addition vs adjustment
- [ ] Include action required (if any)
- [ ] Link to digital guidebook (optional)

## Technical Notes

- Trigger on discipline_points insert/update
- Check if significant threshold crossed
- Include counseling appointment info if needed
- Use urgent priority for high point violations
