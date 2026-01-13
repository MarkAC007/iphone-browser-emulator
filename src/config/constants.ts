/**
 * Application Constants
 *
 * Centralised constants for the iPhone Browser Emulator.
 * All measurements are in CSS pixels unless otherwise noted.
 *
 * @module config/constants
 */

// =============================================================================
// DEFAULT VALUES
// =============================================================================

/**
 * Default URL to load when the emulator starts.
 */
export const DEFAULT_URL = 'https://apple.com';

/**
 * Blank page URL for initial state.
 */
export const BLANK_URL = 'about:blank';

/**
 * Maximum URL length allowed in the address bar.
 */
export const MAX_URL_LENGTH = 2048;

/**
 * Navigation timeout in milliseconds.
 */
export const NAVIGATION_TIMEOUT = 30000;

// =============================================================================
// DEVICE FRAME STYLING
// =============================================================================

/**
 * Bezel styling constants for the device frame.
 */
export const BEZEL = {
  /** Bezel width in pixels around the screen */
  WIDTH: 12,
  /** Side button width */
  BUTTON_WIDTH: 4,
  /** Side button height */
  BUTTON_HEIGHT: 80,
  /** Power button height */
  POWER_BUTTON_HEIGHT: 60,
  /** Power button position from top */
  POWER_BUTTON_TOP: 120,
  /** Volume buttons position from top */
  VOLUME_BUTTONS_TOP: 180,
  /** Volume button spacing */
  VOLUME_BUTTON_GAP: 12,
  /** Shadow blur radius */
  SHADOW_BLUR: 30,
  /** Shadow offset Y */
  SHADOW_OFFSET_Y: 10,
  /** Shadow colour (with alpha) */
  SHADOW_COLOUR: 'rgba(0, 0, 0, 0.25)',
} as const;

/**
 * Dynamic Island dimensions (iPhone 14 Pro and later).
 */
export const DYNAMIC_ISLAND = {
  /** Width of the Dynamic Island pill */
  WIDTH: 126,
  /** Height of the Dynamic Island pill */
  HEIGHT: 37,
  /** Border radius */
  RADIUS: 20,
  /** Top offset from screen edge */
  TOP_OFFSET: 11,
  /** Background colour */
  COLOUR: '#000000',
} as const;

/**
 * Notch dimensions (iPhone X through iPhone 14).
 */
export const NOTCH = {
  /** Width of the notch */
  WIDTH: 209,
  /** Height of the notch */
  HEIGHT: 30,
  /** Border radius at the bottom */
  RADIUS: 20,
  /** Background colour */
  COLOUR: '#000000',
} as const;

/**
 * Home button dimensions (iPhone SE).
 */
export const HOME_BUTTON = {
  /** Diameter of the home button */
  SIZE: 54,
  /** Border width */
  BORDER_WIDTH: 4,
  /** Bottom offset from device edge */
  BOTTOM_OFFSET: 10,
} as const;

// =============================================================================
// STATUS BAR
// =============================================================================

/**
 * Status bar styling constants.
 */
export const STATUS_BAR = {
  /** Height of the status bar */
  HEIGHT: 44,
  /** Padding from edges */
  PADDING: 16,
  /** Font size for status bar text */
  FONT_SIZE: 14,
  /** Font weight */
  FONT_WEIGHT: 600,
  /** Icon size (battery, signal, etc.) */
  ICON_SIZE: 16,
  /** Gap between status items */
  GAP: 4,
} as const;

/**
 * Home indicator dimensions (bottom swipe bar).
 */
export const HOME_INDICATOR = {
  /** Width of the home indicator bar */
  WIDTH: 134,
  /** Height of the home indicator bar */
  HEIGHT: 5,
  /** Bottom offset from screen edge */
  BOTTOM_OFFSET: 8,
  /** Border radius */
  RADIUS: 3,
} as const;

// =============================================================================
// BROWSER CHROME
// =============================================================================

/**
 * Safari browser chrome styling constants.
 */
export const BROWSER_CHROME = {
  /** Height of the URL bar area */
  URL_BAR_HEIGHT: 44,
  /** Height of the bottom toolbar */
  TOOLBAR_HEIGHT: 44,
  /** Padding around elements */
  PADDING: 8,
  /** Border radius for URL input */
  INPUT_RADIUS: 12,
  /** Icon size in toolbar */
  ICON_SIZE: 24,
  /** Minimum tap target size (accessibility) */
  MIN_TAP_SIZE: 44,
} as const;

/**
 * Progress bar styling for page loading.
 */
export const PROGRESS_BAR = {
  /** Height of the loading progress bar */
  HEIGHT: 2,
  /** Animation duration in ms */
  ANIMATION_DURATION: 300,
  /** Progress bar colour */
  COLOUR: '#007AFF',
} as const;

// =============================================================================
// IFRAME SANDBOX
// =============================================================================

/**
 * Iframe sandbox permissions for the browser viewport.
 * These control what the loaded content can do.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox
 */
export const IFRAME_SANDBOX = [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
  'allow-presentation',
  'allow-downloads',
] as const;

/**
 * Iframe sandbox as a space-separated string.
 */
export const IFRAME_SANDBOX_STRING = IFRAME_SANDBOX.join(' ');

/**
 * Iframe feature policy / permissions policy.
 */
export const IFRAME_ALLOW = [
  'accelerometer',
  'autoplay',
  'clipboard-write',
  'encrypted-media',
  'gyroscope',
  'picture-in-picture',
  'fullscreen',
] as const;

/**
 * Iframe allow attribute as a string.
 */
export const IFRAME_ALLOW_STRING = IFRAME_ALLOW.join('; ');

// =============================================================================
// STORAGE
// =============================================================================

/**
 * Local storage keys for persisting user preferences.
 */
export const STORAGE_KEYS = {
  /** Selected device ID */
  DEVICE_ID: 'ibe-device-id',
  /** Theme preference */
  THEME: 'ibe-theme',
  /** Device orientation */
  ORIENTATION: 'ibe-orientation',
  /** URL history */
  URL_HISTORY: 'ibe-url-history',
  /** Scale preference */
  SCALE: 'ibe-scale',
  /** Last visited URL */
  LAST_URL: 'ibe-last-url',
} as const;

/**
 * Maximum URL history entries to store.
 */
export const MAX_URL_HISTORY = 50;

/**
 * Maximum bookmark entries to store.
 */
export const MAX_BOOKMARKS = 100;

// =============================================================================
// ANIMATIONS
// =============================================================================

/**
 * Animation durations in milliseconds.
 */
export const ANIMATION = {
  /** Duration for device orientation change */
  ORIENTATION_CHANGE: 500,
  /** Duration for device model switch */
  DEVICE_SWITCH: 300,
  /** Duration for theme transition */
  THEME_TRANSITION: 200,
  /** Duration for micro-interactions */
  MICRO: 150,
  /** Duration for loading state changes */
  LOADING: 200,
  /** Duration for error display */
  ERROR: 300,
} as const;

/**
 * Easing functions for animations.
 */
export const EASING = {
  /** Standard ease for most transitions */
  STANDARD: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Ease out for elements entering */
  EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
  /** Ease in for elements leaving */
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Sharp for quick transitions */
  SHARP: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// =============================================================================
// RESPONSIVE DESIGN
// =============================================================================

/**
 * Breakpoints for responsive scaling.
 */
export const BREAKPOINTS = {
  /** Mobile breakpoint */
  MOBILE: 768,
  /** Tablet breakpoint */
  TABLET: 1024,
  /** Desktop breakpoint */
  DESKTOP: 1200,
  /** Large desktop breakpoint */
  LARGE: 1440,
} as const;

/**
 * Default scale factors for different viewport sizes.
 */
export const SCALE_FACTORS = {
  /** Scale on mobile screens */
  MOBILE: 0.5,
  /** Scale on tablet screens */
  TABLET: 0.75,
  /** Scale on desktop screens */
  DESKTOP: 1.0,
  /** Maximum allowed scale */
  MAX: 1.5,
  /** Minimum allowed scale */
  MIN: 0.25,
} as const;

// =============================================================================
// THEME
// =============================================================================

/**
 * Theme values.
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Default theme preference.
 */
export const DEFAULT_THEME: Theme = 'system';

/**
 * Theme colours for light mode.
 */
export const LIGHT_THEME = {
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  accent: '#007AFF',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
} as const;

/**
 * Theme colours for dark mode.
 */
export const DARK_THEME = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  accent: '#0A84FF',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
} as const;

// =============================================================================
// ERROR MESSAGES
// =============================================================================

/**
 * User-facing error messages.
 */
export const ERROR_MESSAGES = {
  CORS: 'This website cannot be displayed due to security restrictions (CORS).',
  INVALID_URL: 'Please enter a valid URL.',
  NETWORK: 'Unable to connect. Please check your internet connection.',
  BLOCKED: 'This content has been blocked.',
  TIMEOUT: 'The page took too long to load.',
  SSL: 'There was a problem with the security certificate.',
  UNKNOWN: 'An unexpected error occurred.',
} as const;

// =============================================================================
// KEYBOARD SHORTCUTS
// =============================================================================

/**
 * Keyboard shortcuts for the application.
 */
export const SHORTCUTS = {
  /** Focus URL bar */
  FOCUS_URL: 'Mod+L',
  /** Refresh page */
  REFRESH: 'Mod+R',
  /** Go back */
  BACK: 'Mod+[',
  /** Go forward */
  FORWARD: 'Mod+]',
  /** Toggle device selector */
  DEVICE_SELECTOR: 'Mod+D',
  /** Toggle theme */
  TOGGLE_THEME: 'Mod+Shift+T',
} as const;
