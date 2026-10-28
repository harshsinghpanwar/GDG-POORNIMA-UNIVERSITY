/**
 * 3.2 Community channels (use exactly these, nothing else)
 * • Official community page: https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/
 * • WhatsApp group: https://chat.whatsapp.com/BUzm2aq56HJHVmyiuzGIpJ
 * • Instagram: https://instagram.com/gdg.poornima
 * • LinkedIn: https://www.linkedin.com/company/gdg-poornima/
 *   (VERIFY: the official page header links https://www.linkedin.com/company/gdg-poornima-university/ instead. Use the first URL, keep a code comment in config/community.ts, and list this in the README's "Open items for organizers".)
 * • Telegram: https://t.me/gdgpoornima
 * • No contact email, no interest form and no other channels are published. Do not create any.
 */

export interface CommunityChannels {
  officialCommunityPage: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}

export const COMMUNITY_CHANNELS: CommunityChannels = {
  officialCommunityPage: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
  whatsapp: 'https://chat.whatsapp.com/BUzm2aq56HJHVmyiuzGIpJ',
  instagram: 'https://instagram.com/gdg.poornima',
  // VERIFY: the official page header links https://www.linkedin.com/company/gdg-poornima-university/ instead.
  // Use the first URL (https://www.linkedin.com/company/gdg-poornima/), keep a code comment in config/community.ts, and list this in the README's "Open items for organizers".
  linkedin: 'https://www.linkedin.com/company/gdg-poornima/',
  telegram: 'https://t.me/gdgpoornima'
};

export default COMMUNITY_CHANNELS;
