/**
 * Configuration exports
 *
 * Central export point for all application configuration.
 * Import configuration values from here rather than individual files.
 *
 * Note: Some constants (DYNAMIC_ISLAND, NOTCH, HOME_INDICATOR) exist in both
 * devices.ts and constants.ts with different naming conventions. We export
 * the devices.ts versions as the canonical device-related constants.
 *
 * @module config
 */

// Device configurations (all exports)
export * from './devices';

// Browser configurations (all exports)
export * from './browser';

// Constants - exclude duplicates that are already in devices.ts
export {
  // Default values
  DEFAULT_URL,
  BLANK_URL,
  MAX_URL_LENGTH,
  NAVIGATION_TIMEOUT,
  // Bezel styling
  BEZEL,
  // Home button (not in devices.ts)
  HOME_BUTTON,
  // Status bar
  STATUS_BAR,
  // Browser chrome
  BROWSER_CHROME,
  PROGRESS_BAR,
  // Iframe sandbox
  IFRAME_SANDBOX,
  IFRAME_SANDBOX_STRING,
  IFRAME_ALLOW,
  IFRAME_ALLOW_STRING,
  // Storage
  STORAGE_KEYS,
  MAX_URL_HISTORY,
  MAX_BOOKMARKS,
  // Animations
  ANIMATION,
  EASING,
  // Responsive design
  BREAKPOINTS,
  SCALE_FACTORS,
  // Theme
  DEFAULT_THEME,
  LIGHT_THEME,
  DARK_THEME,
  ERROR_MESSAGES,
  SHORTCUTS,
} from './constants';

// Re-export Theme type
export type { Theme } from './constants';
