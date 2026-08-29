/**
 * Removal of the Google Analytics cookies a page can actually reach.
 *
 * `_ga` and `_ga_*` are first-party and written without HttpOnly, so a
 * withdrawal can clear them from script. They may have been set on the exact
 * host or on any registrable parent of it, and a cookie is only deleted by an
 * expiry written for the same domain — hence the candidate list.
 */

function deleteCookieForDomain(name: string, domain?: string): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Max-Age=0; Path=/${domainPart}; SameSite=Lax${secure}`;
}

export function candidateCookieDomains(hostname: string): string[] {
  if (!hostname || hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return [];
  }

  const parts = hostname.split(".");
  const domains = new Set<string>();
  for (let index = 0; index <= Math.max(0, parts.length - 2); index += 1) {
    const domain = parts.slice(index).join(".");
    domains.add(domain);
    domains.add(`.${domain}`);
  }
  return Array.from(domains);
}

export function removeGoogleAnalyticsCookies(): void {
  const gaCookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of gaCookieNames) {
    deleteCookieForDomain(name);
    for (const domain of candidateCookieDomains(window.location.hostname)) {
      deleteCookieForDomain(name, domain);
    }
  }
}
