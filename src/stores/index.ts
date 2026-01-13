/**
 * Pinia store exports
 *
 * Central export point for all application stores.
 * Import stores from here rather than individual files.
 */

export { useDeviceStore } from './device'
export { useBrowserStore } from './browser'
export { useNavigationStore, type NavigationStore } from './navigation'
export { usePreferencesStore, type PreferencesStore } from './preferences'
