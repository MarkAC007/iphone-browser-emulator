import { ref, computed, readonly, type CSSProperties } from 'vue'
import type { DeviceModel, DeviceOrientation } from '@/types'

/**
 * Result of scale calculation
 */
export interface ScaleResult {
  /** Calculated scale factor */
  scale: number
  /** Scaled width in pixels */
  scaledWidth: number
  /** Scaled height in pixels */
  scaledHeight: number
  /** Whether the device fits the container at scale 1 */
  fitsContainer: boolean
}

/**
 * Viewport dimensions with metadata
 */
export interface ViewportDimensions {
  /** Width in CSS pixels */
  width: number
  /** Height in CSS pixels */
  height: number
  /** Current scale factor */
  scale: number
  /** Scaled width in pixels */
  scaledWidth: number
  /** Scaled height in pixels */
  scaledHeight: number
}

/**
 * Container dimensions
 */
export interface ContainerDimensions {
  width: number
  height: number
}

/**
 * Composable for viewport calculations and iframe styling
 * Handles responsive scaling of the device frame within a container
 */
export function useViewport() {
  // Container dimensions (should be set by parent component)
  const containerWidth = ref(0)
  const containerHeight = ref(0)

  // Device dimensions (should be set from device config)
  const deviceWidth = ref(393)
  const deviceHeight = ref(852)

  // Orientation
  const orientation = ref<DeviceOrientation>('portrait')

  // Padding/margin around the device
  const padding = ref(20)

  // Auto-fit mode
  const autoFit = ref(true)

  // Manual scale override (when autoFit is false)
  const manualScale = ref(1)

  /**
   * Calculate the optimal scale factor to fit device within container
   *
   * @param containerW - Container width in pixels
   * @param containerH - Container height in pixels
   * @param deviceW - Device width in CSS pixels
   * @param deviceH - Device height in CSS pixels
   * @param paddingPx - Padding around the device
   * @returns Scale calculation result
   */
  function calculateScale(
    containerW: number,
    containerH: number,
    deviceW: number,
    deviceH: number,
    paddingPx = 20
  ): ScaleResult {
    // Available space after padding
    const availableWidth = Math.max(0, containerW - paddingPx * 2)
    const availableHeight = Math.max(0, containerH - paddingPx * 2)

    // Prevent division by zero
    if (deviceW <= 0 || deviceH <= 0 || availableWidth <= 0 || availableHeight <= 0) {
      return {
        scale: 1,
        scaledWidth: deviceW,
        scaledHeight: deviceH,
        fitsContainer: false
      }
    }

    // Calculate scale to fit width and height
    const scaleX = availableWidth / deviceW
    const scaleY = availableHeight / deviceH

    // Use the smaller scale to ensure both dimensions fit
    const scale = Math.min(scaleX, scaleY, 1) // Cap at 1 to avoid upscaling

    return {
      scale,
      scaledWidth: deviceW * scale,
      scaledHeight: deviceH * scale,
      fitsContainer: scaleX >= 1 && scaleY >= 1
    }
  }

  /**
   * Effective device dimensions accounting for orientation
   */
  const effectiveDeviceDimensions = computed(() => {
    const w = orientation.value === 'portrait' ? deviceWidth.value : deviceHeight.value
    const h = orientation.value === 'portrait' ? deviceHeight.value : deviceWidth.value
    return { width: w, height: h }
  })

  /**
   * Current scale factor (auto-calculated or manual)
   */
  const currentScale = computed(() => {
    if (!autoFit.value) {
      return manualScale.value
    }

    const result = calculateScale(
      containerWidth.value,
      containerHeight.value,
      effectiveDeviceDimensions.value.width,
      effectiveDeviceDimensions.value.height,
      padding.value
    )

    return result.scale
  })

  /**
   * Viewport dimensions with current scaling
   */
  const viewportDimensions = computed<ViewportDimensions>(() => {
    const dims = effectiveDeviceDimensions.value
    const scale = currentScale.value
    return {
      width: dims.width,
      height: dims.height,
      scale,
      scaledWidth: dims.width * scale,
      scaledHeight: dims.height * scale
    }
  })

  /**
   * CSS styles for the iframe element
   */
  const iframeStyles = computed<CSSProperties>(() => {
    const dims = viewportDimensions.value
    return {
      width: `${dims.width}px`,
      height: `${dims.height}px`,
      transform: `scale(${dims.scale})`,
      transformOrigin: 'top left',
      border: 'none',
      overflow: 'hidden'
    }
  })

  /**
   * CSS styles for the device container wrapper
   * This container holds the iframe and maintains the scaled size
   */
  const deviceContainerStyles = computed<CSSProperties>(() => {
    const dims = viewportDimensions.value
    return {
      width: `${dims.scaledWidth}px`,
      height: `${dims.scaledHeight}px`,
      overflow: 'hidden',
      position: 'relative'
    }
  })

  /**
   * CSS styles for the outer wrapper that centres the device
   */
  const wrapperStyles = computed<CSSProperties>(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: `${padding.value}px`
  }))

  /**
   * Update container dimensions
   *
   * @param width - Container width in pixels
   * @param height - Container height in pixels
   */
  function setContainerDimensions(width: number, height: number): void {
    containerWidth.value = Math.max(0, width)
    containerHeight.value = Math.max(0, height)
  }

  /**
   * Update device dimensions
   *
   * @param width - Device width in CSS pixels
   * @param height - Device height in CSS pixels
   */
  function setDeviceDimensions(width: number, height: number): void {
    deviceWidth.value = Math.max(1, width)
    deviceHeight.value = Math.max(1, height)
  }

  /**
   * Set device from a DeviceModel object
   *
   * @param device - Device model
   */
  function setDeviceFromModel(device: DeviceModel): void {
    setDeviceDimensions(device.screenWidth, device.screenHeight)
  }

  /**
   * Set orientation
   *
   * @param newOrientation - Target orientation
   */
  function setOrientation(newOrientation: DeviceOrientation): void {
    orientation.value = newOrientation
  }

  /**
   * Toggle auto-fit mode
   */
  function toggleAutoFit(): void {
    autoFit.value = !autoFit.value
  }

  /**
   * Set manual scale (disables auto-fit)
   *
   * @param scale - Scale factor (0.1 to 2)
   */
  function setManualScale(scale: number): void {
    manualScale.value = Math.max(0.1, Math.min(2, scale))
    autoFit.value = false
  }

  /**
   * Enable auto-fit mode
   */
  function enableAutoFit(): void {
    autoFit.value = true
  }

  /**
   * Set padding around the device
   *
   * @param px - Padding in pixels
   */
  function setPadding(px: number): void {
    padding.value = Math.max(0, px)
  }

  /**
   * Create a ResizeObserver callback for container resizing
   * Use with a ResizeObserver or @vueuse/core's useResizeObserver
   *
   * @example
   * ```typescript
   * const containerRef = ref<HTMLElement>()
   * const { onContainerResize } = useViewport()
   * useResizeObserver(containerRef, onContainerResize)
   * ```
   */
  function onContainerResize(entries: ResizeObserverEntry[]): void {
    const entry = entries[0]
    if (entry) {
      const { width, height } = entry.contentRect
      setContainerDimensions(width, height)
    }
  }

  return {
    // State (readonly where appropriate)
    containerWidth: readonly(containerWidth),
    containerHeight: readonly(containerHeight),
    deviceWidth: readonly(deviceWidth),
    deviceHeight: readonly(deviceHeight),
    orientation: readonly(orientation),
    padding: readonly(padding),
    autoFit: readonly(autoFit),
    currentScale,
    viewportDimensions,

    // Computed styles
    iframeStyles,
    deviceContainerStyles,
    wrapperStyles,

    // Actions
    setContainerDimensions,
    setDeviceDimensions,
    setDeviceFromModel,
    setOrientation,
    setManualScale,
    enableAutoFit,
    toggleAutoFit,
    setPadding,
    onContainerResize,

    // Utility function
    calculateScale
  }
}

export type UseViewport = ReturnType<typeof useViewport>
