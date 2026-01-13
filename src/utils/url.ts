/**
 * URL Utilities
 *
 * Helper functions for URL validation, normalisation, and manipulation.
 */

/**
 * Normalise a URL by adding protocol if missing
 */
export function normaliseUrl(url: string): string {
  const trimmed = url.trim()

  if (!trimmed) return ''

  // Already has protocol
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  // Add HTTPS by default
  return `https://${trimmed}`
}

/**
 * Validate a URL string
 */
export function isValidUrl(url: string): boolean {
  try {
    const normalised = normaliseUrl(url)
    if (!normalised) return false

    const parsed = new URL(normalised)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Extract hostname from URL
 */
export function getHostname(url: string): string {
  try {
    return new URL(normaliseUrl(url)).hostname
  } catch {
    return url
  }
}

/**
 * Extract display-friendly domain from URL
 */
export function getDisplayDomain(url: string): string {
  const hostname = getHostname(url)
  // Remove www. prefix for cleaner display
  return hostname.replace(/^www\./i, '')
}

/**
 * Check if URL uses HTTPS
 */
export function isSecureUrl(url: string): boolean {
  try {
    return new URL(normaliseUrl(url)).protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Check if URL is a localhost address
 */
export function isLocalhostUrl(url: string): boolean {
  try {
    const hostname = new URL(normaliseUrl(url)).hostname
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.endsWith('.local')
    )
  } catch {
    return false
  }
}

/**
 * Get favicon URL for a domain
 */
export function getFaviconUrl(url: string): string {
  try {
    const { origin } = new URL(normaliseUrl(url))
    return `${origin}/favicon.ico`
  } catch {
    return ''
  }
}

/**
 * Get Google favicon proxy URL (more reliable)
 */
export function getGoogleFaviconUrl(url: string, size: number = 32): string {
  const domain = getDisplayDomain(url)
  if (!domain) return ''
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`
}

/**
 * Parse URL into components
 */
export interface ParsedUrl {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  origin: string
  isSecure: boolean
}

export function parseUrl(url: string): ParsedUrl | null {
  try {
    const parsed = new URL(normaliseUrl(url))
    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      origin: parsed.origin,
      isSecure: parsed.protocol === 'https:'
    }
  } catch {
    return null
  }
}

/**
 * Truncate URL for display, keeping the domain visible
 */
export function truncateUrl(url: string, maxLength: number = 50): string {
  if (url.length <= maxLength) return url

  const domain = getDisplayDomain(url)
  if (domain.length >= maxLength - 3) {
    return domain.substring(0, maxLength - 3) + '...'
  }

  const remaining = maxLength - domain.length - 3
  const parsed = parseUrl(url)
  if (!parsed) return url.substring(0, maxLength - 3) + '...'

  const path = parsed.pathname + parsed.search
  if (path.length > remaining) {
    return domain + path.substring(0, remaining) + '...'
  }

  return domain + path
}
