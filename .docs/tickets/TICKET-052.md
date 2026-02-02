# TICKET-052: Monthly & Semester Attendance Reports

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | High |
| **Epic** | Epic 8: Reporting System |
| **Dependencies** | Attendance data complete |

## Description

Generate attendance recap reports with statistics by student, class, and period.

## Acceptance Criteria

- [ ] Generate monthly attendance report by class
- [ ] Generate semester attendance report
- [ ] Show per-student breakdown: H, T, S, I, A counts
- [ ] Calculate attendance percentage
- [ ] Summary statistics per class
- [ ] Filter by date range, class, grade
- [ ] Export to Excel with formatting
- [ ] Export to PDF with school header
- [ ] Include charts/graphs (optional)
- [ ] Schedule automated monthly reports
- [ ] Email reports to stakeholders

## Technical Notes

- Aggregate attendance data efficiently
- Use Excel library (ExcelJS, XLSX) for export
- PDF generation using template engine
- Cache report data for large datasets
- Implement background job for scheduled reports
