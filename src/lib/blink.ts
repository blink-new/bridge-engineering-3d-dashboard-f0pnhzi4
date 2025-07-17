import { createClient } from '@blinkdotnew/sdk';

export const blink = createClient({
  projectId: 'bridge-engineering-3d-dashboard-f0pnhzi4',
  authRequired: false // Allow anonymous access for multi-PC usage
});