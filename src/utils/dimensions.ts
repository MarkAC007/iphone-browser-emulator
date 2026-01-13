/**
 * Dimension Utilities
 *
 * Helper functions for calculating device dimensions and scaling.
 */

import type { DeviceModel, DeviceOrientation } from '@/types/device'
import { BEZEL, BREAKPOINTS, SCALE_FACTORS } from '@/config/constants'

/**
 * Calculate the full device frame dimensions including bezel
 */
export interface DeviceDimensions {
  /** Screen width (content area) */
  screenWidth: number
  /** Screen height (content area) */
  screenHeight: number
  /** Total frame width including bezel */
  frameWidth: number
  /** Total frame height including bezel */
  frameHeight: number
  /** Bezel width on each side */
  bezelWidth: number
}

export function getDeviceDimensions(
  device: DeviceModel,
  orientation: DeviceOrientation = 'portrait'
): DeviceDimensions {
  const screenWidth = orientation === 'portrait' ? device.screenWidth : device.screenHeight
  const screenHeight = orientation === 'portrait' ? device.screenHeight : device.screenWidth

  return {
    screenWidth,
    screenHeight,
    frameWidth: screenWidth + BEZEL.WIDTH * 2,
    frameHeight: screenHeight + BEZEL.WIDTH * 2,
    bezelWidth: BEZEL.WIDTH
  }
}

/**
 * Calculate scale factor to fit device within container
 */
export function calculateScaleFactor(
  deviceWidth: number,
  deviceHeight: number,
  containerWidth: number,
  containerHeight: number,
  padding: number = 40
): number {
  const availableWidth = containerWidth - padding * 2
  const availableHeight = containerHeight - padding * 2

  const scaleX = availableWidth / deviceWidth
  const scaleY = availableHeight / deviceHeight

  // Use the smaller scale to ensure device fits
  return Math.min(scaleX, scaleY, 1) // Cap at 1 to prevent upscaling
}

/**
 * Get responsive scale factor based on viewport width
 */
export function getResponsiveScale(viewportWidth: number): number {
  if (viewportWidth < BREAKPOINTS.MOBILE) {
    return SCALE_FACTORS.MOBILE
  } else if (viewportWidth < BREAKPOINTS.TABLET) {
    return SCALE_FACTORS.TABLET
  }
  return SCALE_FACTORS.DESKTOP
}

/**
 * Calculate viewport dimensions for iframe content scaling
 */
export interface ViewportDimensions {
  /** Width of the browser viewport area */
  viewportWidth: number
  /** Height of the browser viewport area */
  viewportHeight: number
  /** Scale to apply to iframe content */
  contentScale: number
}

export function calculateViewportDimensions(
  device: DeviceModel,
  orientation: DeviceOrientation,
  browserChromeHeight: number = 88 // URL bar + toolbar
): ViewportDimensions {
  const dims = getDeviceDimensions(device, orientation)
  const safeAreaTop = device.safeAreaInsets.top
  const safeAreaBottom = device.safeAreaInsets.bottom

  const viewportWidth = dims.screenWidth
  const viewportHeight = dims.screenHeight - safeAreaTop - safeAreaBottom - browserChromeHeight

  return {
    viewportWidth,
    viewportHeight,
    contentScale: 1 // Content is rendered at 1:1 scale within the viewport
  }
}

/**
 * Calculate CSS transform for device scaling
 */
export function getScaleTransform(scale: number): string {
  return `scale(${scale})`
}

/**
 * Calculate origin point for scaling transform
 */
export function getTransformOrigin(
  horizontal: 'left' | 'center' | 'right' = 'center',
  vertical: 'top' | 'center' | 'bottom' = 'top'
): string {
  return `${horizontal} ${vertical}`
}

/**
 * Check if device should be displayed in compact mode
 */
export function isCompactMode(viewportWidth: number): boolean {
  return viewportWidth < BREAKPOINTS.TABLET
}

/**
 * Get aspect ratio for a device
 */
export function getAspectRatio(device: DeviceModel, orientation: DeviceOrientation): number {
  const { screenWidth, screenHeight } = getDeviceDimensions(device, orientation)
  return screenWidth / screenHeight
}

/**
 * Format dimensions as display string
 */
export function formatDimensions(width: number, height: number): string {
  return `${width} x ${height}`
}

/**
 * Get device info string for footer display
 */
export function getDeviceInfoString(device: DeviceModel): string {
  return `${device.name} - ${formatDimensions(device.screenWidth, device.screenHeight)} @ ${device.devicePixelRatio}x`
}
