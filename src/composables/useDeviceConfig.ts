import { ref, computed, readonly, provide, inject, type Ref, type ComputedRef, type InjectionKey } from 'vue'
import type { DeviceModel, DeviceOrientation, DeviceState } from '@/types'
import { useLocalStorage, STORAGE_KEYS } from './useLocalStorage'
import {
  deviceModelMap,
  deviceOptions as configDeviceOptions,
  defaultDevice,
  getBezelThickness,
  getStatusBarHeight,
  getButtonPositions,
  getDeviceColour,
  DYNAMIC_ISLAND,
  NOTCH,
  HOME_INDICATOR,
  DEFAULT_COLOUR,
  type DeviceColourId,
} from '@/config/devices'

/**
 * Device models as a Record for backwards compatibility.
 * Converts the Map from config/devices to a plain object.
 */
export const DEVICE_MODELS: Record<string, DeviceModel> = Object.fromEntries(deviceModelMap)

/**
 * Default device ID from central configuration.
 */
export const DEFAULT_DEVICE_ID = defaultDevice.id

/**
 * Composable for managing device configuration
 * Handles device model selection, orientation, and computed dimensions
 */
export function useDeviceConfig() {
  // Persisted device ID
  const storedDeviceId = useLocalStorage(STORAGE_KEYS.DEVICE_ID, DEFAULT_DEVICE_ID)
  const storedOrientation = useLocalStorage<DeviceOrientation>(STORAGE_KEYS.ORIENTATION, 'portrait')

  // Validate stored device ID
  const validDeviceId = computed(() => {
    return DEVICE_MODELS[storedDeviceId.value] ? storedDeviceId.value : DEFAULT_DEVICE_ID
  })

  // Current device model
  const currentDevice = computed<DeviceModel>(() => {
    return DEVICE_MODELS[validDeviceId.value] ?? DEVICE_MODELS[DEFAULT_DEVICE_ID]
  })

  // Current orientation
  const orientation: Ref<DeviceOrientation> = storedOrientation

  // Scale factor (can be set externally based on container size)
  const scale = ref(1)

  // Device state combining model and orientation
  const deviceState = computed<DeviceState>(() => ({
    model: currentDevice.value,
    orientation: orientation.value,
    scale: scale.value
  }))

  // Effective dimensions accounting for orientation
  const effectiveWidth: ComputedRef<number> = computed(() => {
    const device = currentDevice.value
    return orientation.value === 'portrait' ? device.screenWidth : device.screenHeight
  })

  const effectiveHeight: ComputedRef<number> = computed(() => {
    const device = currentDevice.value
    return orientation.value === 'portrait' ? device.screenHeight : device.screenWidth
  })

  // Safe area insets accounting for orientation
  const effectiveSafeAreaInsets = computed(() => {
    const insets = currentDevice.value.safeAreaInsets
    if (orientation.value === 'portrait') {
      return insets
    }
    // Rotate insets for landscape
    return {
      top: insets.left,
      bottom: insets.right,
      left: insets.top,
      right: insets.bottom
    }
  })

  /**
   * Set the current device by ID
   *
   * @param deviceId - Device model ID
   * @returns true if device was found and set, false otherwise
   */
  function setDevice(deviceId: string): boolean {
    if (DEVICE_MODELS[deviceId]) {
      storedDeviceId.value = deviceId
      return true
    }
    console.warn(`Device model "${deviceId}" not found`)
    return false
  }

  /**
   * Toggle between portrait and landscape orientation
   */
  function toggleOrientation(): void {
    orientation.value = orientation.value === 'portrait' ? 'landscape' : 'portrait'
  }

  /**
   * Set the orientation directly
   *
   * @param newOrientation - Target orientation
   */
  function setOrientation(newOrientation: DeviceOrientation): void {
    orientation.value = newOrientation
  }

  /**
   * Set the scale factor
   *
   * @param newScale - Scale factor (1 = actual size)
   */
  function setScale(newScale: number): void {
    scale.value = Math.max(0.1, Math.min(2, newScale))
  }

  /**
   * Get all available device models as options.
   * Uses the pre-configured device options from config/devices.
   */
  function getDeviceOptions(): Array<{ value: string; label: string; group?: string }> {
    return configDeviceOptions
  }

  /**
   * Check if a device ID is valid
   *
   * @param deviceId - Device ID to check
   */
  function isValidDevice(deviceId: string): boolean {
    return deviceId in DEVICE_MODELS
  }

  return {
    // State
    currentDevice,
    orientation: readonly(orientation),
    scale: readonly(scale),
    deviceState,
    effectiveWidth,
    effectiveHeight,
    effectiveSafeAreaInsets,

    // Actions
    setDevice,
    toggleOrientation,
    setOrientation,
    setScale,

    // Utilities
    getDeviceOptions,
    isValidDevice,

    // Constants
    DEVICE_MODELS,
    DEFAULT_DEVICE_ID
  }
}

export type UseDeviceConfig = ReturnType<typeof useDeviceConfig>

// ============================================================================
// Device Context Provider/Injector for Child Components
// ============================================================================

/**
 * Device context interface for provide/inject pattern.
 * This allows child components to access device configuration without prop drilling.
 */
export interface DeviceContext {
  /** Current device model */
  device: ComputedRef<DeviceModel>
  /** Current orientation */
  orientation: Readonly<Ref<DeviceOrientation>>
  /** Current scale factor */
  scale: Readonly<Ref<number>>
  /** Selected colour variant */
  colourId: Ref<DeviceColourId>
  /** Computed bezel thickness */
  bezelThickness: ComputedRef<number>
  /** Computed status bar height */
  statusBarHeight: ComputedRef<number>
  /** Button positions for current device */
  buttonPositions: ComputedRef<ReturnType<typeof getButtonPositions>>
  /** Current colour configuration */
  colourConfig: ComputedRef<ReturnType<typeof getDeviceColour>>
  /** Dynamic Island configuration (if applicable) */
  dynamicIsland: typeof DYNAMIC_ISLAND
  /** Notch configuration (if applicable) */
  notch: typeof NOTCH
  /** Home indicator configuration */
  homeIndicator: typeof HOME_INDICATOR
}

/**
 * Injection key for device context.
 */
export const DEVICE_CONTEXT_KEY: InjectionKey<DeviceContext> = Symbol('device-context')

/**
 * Provide device context to child components.
 * Call this in the DeviceFrame component to make device config available to descendants.
 *
 * @param config - The useDeviceConfig return value
 */
export function provideDeviceContext(config: UseDeviceConfig): DeviceContext {
  const colourId = ref<DeviceColourId>(DEFAULT_COLOUR)

  const context: DeviceContext = {
    device: config.currentDevice,
    orientation: config.orientation,
    scale: config.scale,
    colourId,
    bezelThickness: computed(() => getBezelThickness(config.currentDevice.value)),
    statusBarHeight: computed(() => getStatusBarHeight(config.currentDevice.value)),
    buttonPositions: computed(() => getButtonPositions(config.currentDevice.value)),
    colourConfig: computed(() => getDeviceColour(colourId.value)),
    dynamicIsland: DYNAMIC_ISLAND,
    notch: NOTCH,
    homeIndicator: HOME_INDICATOR,
  }

  provide(DEVICE_CONTEXT_KEY, context)

  return context
}

/**
 * Inject device context in child components.
 * Throws an error if called outside of a DeviceFrame provider.
 *
 * @returns The device context
 */
export function useDeviceContext(): DeviceContext {
  const context = inject(DEVICE_CONTEXT_KEY)

  if (!context) {
    throw new Error(
      'useDeviceContext must be used within a component that provides DeviceContext. ' +
      'Ensure the component is a descendant of DeviceFrame.'
    )
  }

  return context
}

/**
 * Safely inject device context, returning undefined if not available.
 * Useful for components that may be used outside of DeviceFrame.
 *
 * @returns The device context or undefined
 */
export function useDeviceContextSafe(): DeviceContext | undefined {
  return inject(DEVICE_CONTEXT_KEY)
}
