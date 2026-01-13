/**
 * Browser configuration defaults
 *
 * Contains default settings for the Safari browser emulation
 * including user agent strings and toolbar preferences
 */
import type { BrowserConfig } from '@/types'

/**
 * Safari user agent strings for different iOS versions
 *
 * These match the actual user agents sent by Safari on iOS devices
 */
export const USER_AGENTS = {
  'ios-17': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'ios-16': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  'ios-15': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
} as const

/**
 * Default browser configuration
 */
export const DEFAULT_BROWSER_CONFIG: BrowserConfig = {
  showToolbar: true,
  toolbarPosition: 'bottom',
  showTabBar: true,
  enableJavaScript: true,
  userAgent: USER_AGENTS['ios-17'],
}

/**
 * Common homepage URLs for quick access
 */
export const HOMEPAGE_OPTIONS = [
  { name: 'Apple', url: 'https://www.apple.com' },
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'Blank', url: 'about:blank' },
] as const

/**
 * Default search engine configuration
 */
export const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    searchUrl: 'https://www.google.com/search?q=',
    suggestUrl: 'https://suggestqueries.google.com/complete/search?client=safari&q=',
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    searchUrl: 'https://duckduckgo.com/?q=',
    suggestUrl: 'https://ac.duckduckgo.com/ac/?q=',
  },
  bing: {
    name: 'Bing',
    searchUrl: 'https://www.bing.com/search?q=',
    suggestUrl: 'https://api.bing.com/osjson.aspx?query=',
  },
} as const

/**
 * Default search engine
 */
export const DEFAULT_SEARCH_ENGINE = 'google'

/**
 * Safari toolbar button identifiers
 */
export const TOOLBAR_BUTTONS = [
  'back',
  'forward',
  'share',
  'bookmarks',
  'tabs',
] as const

export type ToolbarButton = (typeof TOOLBAR_BUTTONS)[number]
