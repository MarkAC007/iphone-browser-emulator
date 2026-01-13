/**
 * Composables index
 *
 * Re-exports all composables for convenient importing.
 * Import composables from here rather than individual files.
 *
 * @example
 * ```typescript
 * import { useNavigation, useDeviceConfig, useViewport } from '@/composables'
 * ```
 */

// Navigation composable
export { useNavigation, type UseNavigation } from './useNavigation'

// Device configuration composable with context provider/injector
export {
  useDeviceConfig,
  type UseDeviceConfig,
  DEVICE_MODELS,
  DEFAULT_DEVICE_ID,
  // Context provider/injector exports
  type DeviceContext,
  DEVICE_CONTEXT_KEY,
  provideDeviceContext,
  useDeviceContext,
  useDeviceContextSafe
} from './useDeviceConfig'

// Viewport calculations composable
export {
  useViewport,
  type UseViewport,
  type ScaleResult,
  type ViewportDimensions,
  type ContainerDimensions
} from './useViewport'

// Local storage utilities
export {
  useLocalStorage,
  read,
  write,
  remove,
  clear,
  getKeys,
  STORAGE_KEYS,
  type StorageKey
} from './useLocalStorage'
