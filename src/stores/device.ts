/**
 * Device state management store
 *
 * Manages the selected iPhone model, orientation,
 * and device frame configuration
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DeviceModel, DeviceOrientation, DeviceState } from '@/types'
import { defaultDevice, getDeviceById } from '@/config/devices'

/**
 * Frame configuration options
 */
interface FrameConfig {
  showFrame: boolean
  showStatusBar: boolean
  showHomeIndicator: boolean
}

export const useDeviceStore = defineStore('device', () => {
  // State
  const currentDevice = ref<DeviceModel>(defaultDevice)
  const orientation = ref<DeviceOrientation>('portrait')
  const scale = ref<number>(1)
  const frameConfig = ref<FrameConfig>({
    showFrame: true,
    showStatusBar: true,
    showHomeIndicator: true,
  })

  // Getters
  const deviceState = computed<DeviceState>(() => ({
    model: currentDevice.value,
    orientation: orientation.value,
    scale: scale.value,
  }))

  const screenDimensions = computed(() => {
    const device = currentDevice.value
    if (orientation.value === 'landscape') {
      return {
        width: device.screenHeight,
        height: device.screenWidth,
      }
    }
    return {
      width: device.screenWidth,
      height: device.screenHeight,
    }
  })

  const isLandscape = computed(() => orientation.value === 'landscape')

  const hasDynamicIsland = computed(() => currentDevice.value.notchType === 'dynamic-island')

  const hasNotch = computed(() => currentDevice.value.notchType === 'notch')

  const hasHomeButton = computed(() => currentDevice.value.hasHomeButton)

  // Actions
  function setDeviceById(deviceId: string): void {
    currentDevice.value = getDeviceById(deviceId)
  }

  function setDevice(device: DeviceModel): void {
    currentDevice.value = device
  }

  function setOrientation(newOrientation: DeviceOrientation): void {
    orientation.value = newOrientation
  }

  function toggleOrientation(): void {
    orientation.value = orientation.value === 'portrait' ? 'landscape' : 'portrait'
  }

  function setScale(newScale: number): void {
    scale.value = Math.max(0.25, Math.min(2, newScale))
  }

  function toggleFrameVisibility(): void {
    frameConfig.value = {
      ...frameConfig.value,
      showFrame: !frameConfig.value.showFrame,
    }
  }

  function updateFrameConfig(config: Partial<FrameConfig>): void {
    frameConfig.value = { ...frameConfig.value, ...config }
  }

  return {
    // State
    currentDevice,
    orientation,
    scale,
    frameConfig,
    // Getters
    deviceState,
    screenDimensions,
    isLandscape,
    hasDynamicIsland,
    hasNotch,
    hasHomeButton,
    // Actions
    setDeviceById,
    setDevice,
    setOrientation,
    toggleOrientation,
    setScale,
    toggleFrameVisibility,
    updateFrameConfig,
  }
})
