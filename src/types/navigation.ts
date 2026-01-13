/**
 * Navigation State Types
 *
 * Defines interfaces for browser navigation state, history management,
 * and error handling within the iPhone browser emulator.
 *
 * @module types/navigation
 */

/**
 * Types of navigation errors that can occur.
 *
 * - `cors`: Cross-Origin Resource Sharing policy blocked the request
 * - `invalid-url`: The URL format is invalid or malformed
 * - `network`: Network connectivity or DNS resolution failure
 * - `blocked`: Content blocked by sandbox policy or security rules
 * - `timeout`: Request timed out
 * - `ssl`: SSL/TLS certificate error
 * - `unknown`: Unclassified error
 */
export type NavigationErrorType =
  | 'cors'
  | 'invalid-url'
  | 'network'
  | 'blocked'
  | 'timeout'
  | 'ssl'
  | 'unknown';

/**
 * Represents an error that occurred during navigation.
 */
export interface NavigationError {
  /** Type of error that occurred */
  type: NavigationErrorType;

  /** Human-readable error message */
  message: string;

  /** Original URL that caused the error */
  url?: string;

  /** Timestamp when the error occurred */
  timestamp?: number;

  /** Whether the error is recoverable (can retry) */
  recoverable?: boolean;

  /** Original error object if available */
  originalError?: Error;
}

/**
 * Represents a single entry in the navigation history.
 */
export interface NavigationEntry {
  /** Full URL of the page */
  url: string;

  /** Page title (from document.title, may be undefined initially) */
  title?: string;

  /** Timestamp when the page was visited (Unix epoch milliseconds) */
  timestamp: number;

  /** Favicon URL if available */
  favicon?: string;

  /** Scroll position to restore when navigating back */
  scrollPosition?: {
    x: number;
    y: number;
  };
}

/**
 * Complete navigation state for the browser.
 *
 * @example
 * ```typescript
 * const initialState: NavigationState = {
 *   currentUrl: 'about:blank',
 *   history: [],
 *   historyIndex: -1,
 *   isLoading: false,
 *   loadProgress: 0,
 *   error: null,
 *   canGoBack: false,
 *   canGoForward: false
 * };
 * ```
 */
export interface NavigationState {
  /** Currently displayed URL */
  currentUrl: string;

  /** Complete navigation history */
  history: NavigationEntry[];

  /** Current position in the history array (-1 if empty) */
  historyIndex: number;

  /** Whether a page is currently loading */
  isLoading: boolean;

  /**
   * Page load progress (0-100).
   * 0 = not started, 100 = complete
   */
  loadProgress: number;

  /** Current navigation error, if any */
  error: NavigationError | null;

  /** Whether back navigation is available */
  canGoBack: boolean;

  /** Whether forward navigation is available */
  canGoForward: boolean;
}

/**
 * Actions that can modify navigation state.
 */
export type NavigationAction =
  | { type: 'NAVIGATE'; payload: { url: string; replace?: boolean } }
  | { type: 'GO_BACK' }
  | { type: 'GO_FORWARD' }
  | { type: 'RELOAD' }
  | { type: 'STOP' }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean; progress?: number } }
  | { type: 'SET_PROGRESS'; payload: { progress: number } }
  | { type: 'SET_ERROR'; payload: NavigationError }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_TITLE'; payload: { title: string } }
  | { type: 'UPDATE_FAVICON'; payload: { favicon: string } }
  | { type: 'RESET' };

/**
 * Simple navigation action types for UI controls.
 */
export type SimpleNavigationAction = 'navigate' | 'back' | 'forward' | 'refresh' | 'stop';

/**
 * URL validation result.
 */
export interface UrlValidationResult {
  /** Whether the URL is valid */
  isValid: boolean;

  /** Normalised URL (with protocol added if missing) */
  normalisedUrl: string;

  /** Error message if invalid */
  error?: string;
}

/**
 * Navigation request options.
 */
export interface NavigationOptions {
  /** Replace current history entry instead of adding new one */
  replace?: boolean;

  /** Force reload even if URL matches current */
  force?: boolean;

  /** Custom referrer policy */
  referrerPolicy?: ReferrerPolicy;

  /** Timeout in milliseconds */
  timeout?: number;
}

/**
 * Navigation history container for backward compatibility.
 */
export interface NavigationHistory {
  /** Array of visited URLs */
  entries: string[];

  /** Current position in the history */
  currentIndex: number;
}
