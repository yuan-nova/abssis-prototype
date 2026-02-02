# TICKET-045: WhatsApp Gateway Setup & Integration

| Field | Value |
|---|---|
| **Type** | Technical Task |
| **Priority** | High |
| **Epic** | Epic 7: WhatsApp Notification Gateway |
| **Dependencies** | Server with Node.js runtime |

## Description

Research and implement unofficial WhatsApp Web API for sending automated messages to parents.

## Acceptance Criteria

- [ ] WhatsApp Web API library installed and configured
- [ ] QR code authentication working
- [ ] Successfully send test message
- [ ] Handle connection status (connected/disconnected)
- [ ] Auto-reconnect on disconnection
- [ ] Store session data for persistence
- [ ] Admin panel to view connection status
- [ ] Manual reconnect button
- [ ] Test message sending functionality

## Technical Notes

- Recommended: whatsapp-web.js or Baileys library
- Run as background service/daemon
- Store session in persistent storage
- Implement health check endpoint
- Handle multiple device sessions if needed
- Warning: Unofficial API may violate WhatsApp ToS
