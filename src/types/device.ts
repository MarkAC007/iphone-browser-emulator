/**
 * Device Model Types
 *
 * Defines interfaces for iPhone device models used in the browser emulator.
 * These types capture the physical and display characteristics needed to
 * accurately render the device frame and browser viewport.
 *
 * @module types/device
 */

/**
 * Type of notch/cutout on the device display.
 *
 * - `dynamic-island`: Pill-shaped cutout (iPhone 14 Pro and later)
 * - `notch`: Traditional notch (iPhone X through iPhone 14)
 * - `none`: No notch (iPhone SE, older models)
 */
export type NotchType = 'dynamic-island' | 'notch' | 'none';

/**
 * Safe area insets define the margins from the edge of the screen
 * where content should not be placed due to hardware elements
 * (notch, home indicator, rounded corners).
 */
export interface SafeAreaInsets {
  /** Top inset in CSS pixels (accounts for notch/Dynamic Island) */
  top: number;
  /** Bottom inset in CSS pixels (accounts for home indicator) */
  bottom: number;
  /** Left inset in CSS pixels (typically 0 for portrait) */
  left: number;
  /** Right inset in CSS pixels (typically 0 for portrait) */
  right: number;
}

/**
 * Represents the physical and display characteristics of an iPhone model.
 *
 * All dimensions are in CSS pixels (logical pixels), not physical pixels.
 * Physical pixels = CSS pixels * devicePixelRatio.
 *
 * @example
 * ```typescript
 * const iPhone15Pro: DeviceModel = {
 *   id: 'iphone-15-pro',
 *   name: 'iPhone 15 Pro',
 *   screenWidth: 393,
 *   screenHeight: 852,
 *   devicePixelRatio: 3,
 *   bezelRadius: 55,
 *   notchType: 'dynamic-island',
 *   hasHomeButton: false,
 *   safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 }
 * };
 * ```
 */
export interface DeviceModel {
  /** Unique identifier for the device model (kebab-case) */
  id: string;

  /** Human-readable display name */
  name: string;

  /** Screen width in CSS pixels (logical resolution) */
  screenWidth: number;

  /** Screen height in CSS pixels (logical resolution) */
  screenHeight: number;

  /** Device pixel ratio (physical pixels per CSS pixel) */
  devicePixelRatio: number;

  /** Corner radius for the device bezel in CSS pixels */
  bezelRadius: number;

  /** Type of notch or cutout on the display */
  notchType: NotchType;

  /** Whether the device has a physical home button */
  hasHomeButton: boolean;

  /** Safe area insets for content positioning */
  safeAreaInsets: SafeAreaInsets;
}

/**
 * Device orientation for the emulator.
 * Currently supports portrait mode only in Phase 1.
 */
export type DeviceOrientation = 'portrait' | 'landscape';

/**
 * Device state including the model and current orientation.
 */
export interface DeviceState {
  /** Currently selected device model */
  model: DeviceModel;

  /** Current device orientation */
  orientation: DeviceOrientation;

  /** Scale factor for rendering (1 = actual size) */
  scale: number;
}

/**
 * Device selector options for the UI dropdown.
 */
export interface DeviceOption {
  /** Device model ID */
  value: string;

  /** Display label for the dropdown */
  label: string;

  /** Optional grouping category */
  group?: string;
}
