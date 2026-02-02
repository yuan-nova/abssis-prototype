# TICKET-042: Violation Category Configuration

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 6: Discipline & Point System |
| **Dependencies** | TICKET-041 |

## Description

Admin can configure violation categories with suggested point values for consistency.

## Acceptance Criteria

- [ ] Admin can add violation categories
- [ ] Fields: name, description, default points, severity
- [ ] Categorize by severity: Light, Medium, Heavy
- [ ] Active/inactive status for categories
- [ ] List all categories with usage count
- [ ] Edit categories (points do not affect existing records)
- [ ] Cannot delete category with existing violations
- [ ] Export category list

## Technical Notes

- Create violation_categories table
- Default categories: Fighting, Smoking, Uniform, etc.
- Soft delete only if no violations reference it
