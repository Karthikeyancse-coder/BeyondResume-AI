// /lib/blocked-email-domains.ts
// 🔴 TODO: EXPAND THIS LIST as new disposable domains are discovered

/**
 * Disposable / throwaway email domains — blocked for ALL users
 */
export const BLOCKED_DOMAINS = [
  'mailinator.com', 'tempmail.com', 'guerrillamail.com',
  'throwaway.email', 'sharklasers.com', 'yopmail.com',
  'trashmail.com', 'fakeinbox.com', 'maildrop.cc',
  'dispostable.com', 'spamgourmet.com', 'mytemp.email',
  'temp-mail.org', 'getnada.com', 'mohmal.com',
  'guerrillamail.info', 'grr.la', 'guerrillamail.net',
  'guerrillamail.de', 'tmail.ws', 'emailondeck.com',
  'burnermail.io', 'inboxbear.com', 'mailnesia.com',
] as const;

/**
 * Personal email domains — blocked for RECRUITER registration only
 * Recruiters must use their official company email
 */
export const PERSONAL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'icloud.com', 'mail.com', 'protonmail.com',
  'zoho.com', 'yandex.com', 'gmx.com', 'live.com',
  'msn.com', 'me.com', 'inbox.com', 'fastmail.com',
  'tutanota.com', 'yahoo.co.in', 'yahoo.co.uk',
  'hotmail.co.uk', 'outlook.in', 'rediffmail.com',
] as const;

/**
 * Extract domain from an email address
 */
export function getDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

/**
 * Check if email uses a disposable/blocked domain
 */
export function isBlockedDomain(email: string): boolean {
  const domain = getDomain(email);
  return BLOCKED_DOMAINS.includes(domain as typeof BLOCKED_DOMAINS[number]);
}

/**
 * Check if email uses a personal domain (gmail, yahoo, etc.)
 * Used to block recruiter registrations with personal emails
 */
export function isPersonalDomain(email: string): boolean {
  const domain = getDomain(email);
  return PERSONAL_DOMAINS.includes(domain as typeof PERSONAL_DOMAINS[number]);
}

/**
 * Check if email domain matches the company website domain
 * e.g., sarah@techcorp.com should match https://techcorp.com
 */
export function domainMatchesWebsite(email: string, website: string): boolean {
  const emailDomain = getDomain(email);
  // Strip protocol and www from website
  const websiteDomain = website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
  return emailDomain === websiteDomain;
}
