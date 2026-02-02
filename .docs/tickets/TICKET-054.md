# TICKET-054: Discipline Violation Rankings

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 8: Reporting System |
| **Dependencies** | TICKET-039, TICKET-041 |

## Description

Generate top violators report for BK intervention and administrative action.

## Acceptance Criteria

- [ ] List students ranked by total discipline points
- [ ] Configurable top N (default: 20)
- [ ] Filter by date range, class, grade
- [ ] Show breakdown by violation category
- [ ] Include student details (name, class, photo)
- [ ] Show most recent violations
- [ ] Flag students exceeding threshold
- [ ] Export to Excel and PDF
- [ ] Include recommended actions
- [ ] Weekly automated report to BK and Principal

## Technical Notes

- Aggregate points by student
- Join with violation categories
- Sort by total points descending
- Include trend indicators (increasing/decreasing)
- Format report for easy review
