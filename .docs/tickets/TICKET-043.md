# TICKET-043: BK Dashboard & Digital Guidebook

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | TICKET-039, TICKET-041 |

## Description

Comprehensive dashboard for Guru BK showing top violators, statistics, and digital student guidebook (buku saku).

## Acceptance Criteria

- [ ] Show total points added this week/month
- [ ] List top 10 students by total points
- [ ] List students exceeding point threshold
- [ ] Breakdown by violation category
- [ ] Trend chart: points over time
- [ ] Filter by class, grade, date range
- [ ] Digital guidebook: view student complete violation history
- [ ] Guidebook shows: all violations, dates, points, actions taken
- [ ] Print guidebook per student
- [ ] Quick search student by name/NISN
- [ ] Export statistics to Excel/PDF

## Technical Notes

- Aggregate queries optimized with indexes
- Cache dashboard data (15 min TTL)
- Use charting library (Chart.js)
- Generate PDF using template engine
