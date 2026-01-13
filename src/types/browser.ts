/**
 * Browser-related type definitions
 *
 * Types for Safari browser state, navigation, and tabs
 */

/**
 * Browser navigation history entry
 */
export interface HistoryEntry {
  readonly url: string
  readonly title: string
  readonly timestamp: number
  readonly favicon?: string
}

/**
 * Browser tab representation
 */
export interface BrowserTab {
  readonly id: string
  readonly url: string
  readonly title: string
  readonly favicon?: string
  readonly isLoading: boolean
  readonly canGoBack: boolean
  readonly canGoForward: boolean
  readonly history: HistoryEntry[]
  readonly historyIndex: number
}

/**
 * URL bar display modes
 */
export type UrlBarMode = 'url' | 'search' | 'editing'

/**
 * Browser toolbar visibility state
 */
export type ToolbarVisibility = 'visible' | 'hidden' | 'compact'

/**
 * Safari browser configuration
 */
export interface BrowserConfig {
  readonly showToolbar: boolean
  readonly toolbarPosition: 'top' | 'bottom'
  readonly showTabBar: boolean
  readonly enableJavaScript: boolean
  readonly userAgent: string
}

/**
 * Browser viewport state
 */
export interface ViewportState {
  readonly scrollX: number
  readonly scrollY: number
  readonly zoomLevel: number
  readonly isScrolling: boolean
}

/**
 * Page load status
 */
export type LoadStatus = 'idle' | 'loading' | 'complete' | 'error'

/**
 * Error information for failed page loads
 */
export interface LoadError {
  readonly code: string
  readonly message: string
  readonly url: string
}
