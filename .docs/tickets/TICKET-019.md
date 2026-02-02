# TICKET-019: Student Master Data CRUD

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Critical |
| **Epic** | Epic 3: Master Data Management |
| **Dependencies** | Database schema, File storage setup |

## Description

Implement comprehensive student data management with complete profile including NISN, photo, guardian WhatsApp number, and class history.

## Acceptance Criteria

- [ ] Create new student with required fields
- [ ] Fields: NISN, Full Name, Birth Date, Gender, Address
- [ ] Guardian Name, Guardian WhatsApp Number
- [ ] Current Class (dropdown: grade, section)
- [ ] Student Photo upload (JPG/PNG, max 2MB)
- [ ] Photo preview and crop functionality
- [ ] Admission Date, Student Status (Active/Inactive/Graduated)
- [ ] List students with pagination, search, filter
- [ ] Edit student information
- [ ] Soft delete student
- [ ] View student complete profile and history
- [ ] Export student list to Excel
- [ ] Import students from Excel template

## Technical Notes

- NISN must be unique, indexed
- Validate Indonesian phone number format for WA
- Store photo in file system or cloud storage
- Create thumbnails (100x100, 300x300)
- Implement image optimization/compression
- Create Excel import template with validation
