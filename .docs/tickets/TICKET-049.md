# TICKET-049: Message Template Configuration

| Field | Value |
|---|---|
| **Type** | Story |
| **Priority** | Medium |
| **Epic** | Epic 7: WhatsApp Notification Gateway |
| **Dependencies** | TICKET-047, TICKET-048 |

## Description

Admin interface to configure WhatsApp message templates for different notification types.

## Acceptance Criteria

- [ ] List all message templates by type
- [ ] Edit template content
- [ ] Preview template with sample data
- [ ] Support template variables (placeholders)
- [ ] Available variables documented
- [ ] Validate template before saving
- [ ] Restore default templates option
- [ ] Multi-language support (Indonesian, English)
- [ ] Character count display (WhatsApp limit)
- [ ] Test send template to admin number

## Technical Notes

- Create message_templates table
- Template types: ALPHA, LATE, SICK, PERMIT, MIDDAY, POINTS_ADD, POINTS_ADJUST
- Use template engine for variable replacement
- Validate all required variables present
- Keep version history of templates
