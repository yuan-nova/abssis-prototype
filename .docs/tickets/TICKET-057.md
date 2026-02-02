# TICKET-057: Custom Report Builder

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Low |
| **Epic** | Epic 8: Reporting System |
| **Dependencies** | All data modules complete |

## Description

Allow admin to create custom reports with selected fields and filters.

## Acceptance Criteria

- [ ] Admin can select data source (attendance, points, journal)
- [ ] Choose fields to include in report
- [ ] Apply filters (date, class, status, etc.)
- [ ] Group by selected dimensions
- [ ] Add calculated fields (counts, sums, averages)
- [ ] Preview report before export
- [ ] Export to Excel, CSV, PDF
- [ ] Save report configuration for reuse
- [ ] Schedule recurring reports

## Technical Notes

- Implement query builder interface
- Dynamic SQL generation with safety checks
- Store report configurations
- Implement permission checks for data access
- Rate limit custom queries for performance
