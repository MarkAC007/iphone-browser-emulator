/**
 * iPhone Device Model Configurations
 *
 * Contains accurate specifications for each supported iPhone model.
 * Dimensions are in CSS pixels (logical pixels).
 *
 * @module config/devices
 */

import type { DeviceModel, DeviceOption } from '../types';

/**
 * iPhone 15 Pro Max - Largest current iPhone
 *
 * Features: Dynamic Island, ProMotion 120Hz display, titanium frame
 * Released: September 2023
 */
export const iPhone15ProMax: DeviceModel = {
  id: 'iphone-15-pro-max',
  name: 'iPhone 15 Pro Max',
  screenWidth: 430,
  screenHeight: 932,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 15 Pro - Flagship model (default)
 *
 * Features: Dynamic Island, ProMotion 120Hz display, titanium frame
 * Released: September 2023
 */
export const iPhone15Pro: DeviceModel = {
  id: 'iphone-15-pro',
  name: 'iPhone 15 Pro',
  screenWidth: 393,
  screenHeight: 852,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 15 Plus - Larger standard model
 *
 * Features: Dynamic Island, Super Retina XDR display
 * Released: September 2023
 */
export const iPhone15Plus: DeviceModel = {
  id: 'iphone-15-plus',
  name: 'iPhone 15 Plus',
  screenWidth: 430,
  screenHeight: 932,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 15 - Standard model
 *
 * Features: Dynamic Island, Super Retina XDR display
 * Released: September 2023
 */
export const iPhone15: DeviceModel = {
  id: 'iphone-15',
  name: 'iPhone 15',
  screenWidth: 393,
  screenHeight: 852,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 14 Pro Max - Previous generation flagship
 *
 * Features: Dynamic Island, ProMotion 120Hz display
 * Released: September 2022
 */
export const iPhone14ProMax: DeviceModel = {
  id: 'iphone-14-pro-max',
  name: 'iPhone 14 Pro Max',
  screenWidth: 430,
  screenHeight: 932,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 14 Pro - Previous generation Pro
 *
 * Features: First iPhone with Dynamic Island
 * Released: September 2022
 */
export const iPhone14Pro: DeviceModel = {
  id: 'iphone-14-pro',
  name: 'iPhone 14 Pro',
  screenWidth: 393,
  screenHeight: 852,
  devicePixelRatio: 3,
  bezelRadius: 55,
  notchType: 'dynamic-island',
  hasHomeButton: false,
  safeAreaInsets: { top: 59, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 14 Plus - Larger standard model with notch
 *
 * Features: Traditional notch, 6.7" display
 * Released: September 2022
 */
export const iPhone14Plus: DeviceModel = {
  id: 'iphone-14-plus',
  name: 'iPhone 14 Plus',
  screenWidth: 428,
  screenHeight: 926,
  devicePixelRatio: 3,
  bezelRadius: 47.33,
  notchType: 'notch',
  hasHomeButton: false,
  safeAreaInsets: { top: 47, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 14 - Standard model with notch
 *
 * Features: Traditional notch design, A15 Bionic chip
 * Released: September 2022
 */
export const iPhone14: DeviceModel = {
  id: 'iphone-14',
  name: 'iPhone 14',
  screenWidth: 390,
  screenHeight: 844,
  devicePixelRatio: 3,
  bezelRadius: 47.33,
  notchType: 'notch',
  hasHomeButton: false,
  safeAreaInsets: { top: 47, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 13 Pro Max - Older Pro Max model
 *
 * Features: Traditional notch, ProMotion display
 * Released: September 2021
 */
export const iPhone13ProMax: DeviceModel = {
  id: 'iphone-13-pro-max',
  name: 'iPhone 13 Pro Max',
  screenWidth: 428,
  screenHeight: 926,
  devicePixelRatio: 3,
  bezelRadius: 47.33,
  notchType: 'notch',
  hasHomeButton: false,
  safeAreaInsets: { top: 47, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 13 - Previous generation standard
 *
 * Features: Smaller notch than iPhone 12, A15 Bionic
 * Released: September 2021
 */
export const iPhone13: DeviceModel = {
  id: 'iphone-13',
  name: 'iPhone 13',
  screenWidth: 390,
  screenHeight: 844,
  devicePixelRatio: 3,
  bezelRadius: 47.33,
  notchType: 'notch',
  hasHomeButton: false,
  safeAreaInsets: { top: 47, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone 12 - First flat-edge modern iPhone
 *
 * Features: Ceramic Shield front, 5G support
 * Released: October 2020
 */
export const iPhone12: DeviceModel = {
  id: 'iphone-12',
  name: 'iPhone 12',
  screenWidth: 390,
  screenHeight: 844,
  devicePixelRatio: 3,
  bezelRadius: 47.33,
  notchType: 'notch',
  hasHomeButton: false,
  safeAreaInsets: { top: 47, bottom: 34, left: 0, right: 0 },
};

/**
 * iPhone SE (3rd generation) - Compact model with home button
 *
 * Features: Touch ID, A15 Bionic chip, classic design
 * Released: March 2022
 */
export const iPhoneSE: DeviceModel = {
  id: 'iphone-se',
  name: 'iPhone SE',
  screenWidth: 375,
  screenHeight: 667,
  devicePixelRatio: 2,
  bezelRadius: 0,
  notchType: 'none',
  hasHomeButton: true,
  safeAreaInsets: { top: 20, bottom: 0, left: 0, right: 0 },
};

/**
 * All available device models, ordered by release date (newest first).
 */
export const deviceModels: DeviceModel[] = [
  // iPhone 15 series
  iPhone15ProMax,
  iPhone15Pro,
  iPhone15Plus,
  iPhone15,
  // iPhone 14 series
  iPhone14ProMax,
  iPhone14Pro,
  iPhone14Plus,
  iPhone14,
  // iPhone 13 series
  iPhone13ProMax,
  iPhone13,
  // Older models
  iPhone12,
  iPhoneSE,
];

/**
 * Device lookup map for quick access by ID.
 */
export const deviceModelMap: Map<string, DeviceModel> = new Map(
  deviceModels.map((device) => [device.id, device])
);

/**
 * Get a device model by ID, with fallback to default.
 *
 * @param id - Device identifier (e.g., 'iphone-15-pro')
 * @returns The device model or iPhone15Pro if not found
 */
export function getDeviceById(id: string): DeviceModel {
  return deviceModelMap.get(id) ?? iPhone15Pro;
}

/**
 * Check if a device ID is valid.
 *
 * @param id - Device identifier to check
 * @returns True if the device exists in the presets
 */
export function isValidDeviceId(id: string): boolean {
  return deviceModelMap.has(id);
}

/**
 * Default device model for initial state.
 */
export const defaultDevice: DeviceModel = iPhone15Pro;

/**
 * Device options for selector dropdown, grouped by generation.
 */
export const deviceOptions: DeviceOption[] = [
  // iPhone 15 series
  { value: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max (430 x 932)', group: 'iPhone 15' },
  { value: 'iphone-15-pro', label: 'iPhone 15 Pro (393 x 852)', group: 'iPhone 15' },
  { value: 'iphone-15-plus', label: 'iPhone 15 Plus (430 x 932)', group: 'iPhone 15' },
  { value: 'iphone-15', label: 'iPhone 15 (393 x 852)', group: 'iPhone 15' },
  // iPhone 14 series
  { value: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max (430 x 932)', group: 'iPhone 14' },
  { value: 'iphone-14-pro', label: 'iPhone 14 Pro (393 x 852)', group: 'iPhone 14' },
  { value: 'iphone-14-plus', label: 'iPhone 14 Plus (428 x 926)', group: 'iPhone 14' },
  { value: 'iphone-14', label: 'iPhone 14 (390 x 844)', group: 'iPhone 14' },
  // Older models
  { value: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max (428 x 926)', group: 'Older Models' },
  { value: 'iphone-13', label: 'iPhone 13 (390 x 844)', group: 'Older Models' },
  { value: 'iphone-12', label: 'iPhone 12 (390 x 844)', group: 'Older Models' },
  { value: 'iphone-se', label: 'iPhone SE (375 x 667)', group: 'Classic' },
];

/**
 * Get device options filtered by notch type.
 *
 * @param notchType - The notch type to filter by
 * @returns Array of device options matching the notch type
 */
export function getDevicesByNotchType(
  notchType: DeviceModel['notchType']
): DeviceModel[] {
  return deviceModels.filter((device) => device.notchType === notchType);
}

/**
 * Get device options grouped by their group property.
 *
 * @returns Map of group name to device options
 */
export function getGroupedDeviceOptions(): Map<string, DeviceOption[]> {
  const grouped = new Map<string, DeviceOption[]>();

  for (const option of deviceOptions) {
    const group = option.group ?? 'Other';
    const existing = grouped.get(group) ?? [];
    existing.push(option);
    grouped.set(group, existing);
  }

  return grouped;
}

// ============================================================================
// Physical Device Constants (for rendering device frame components)
// ============================================================================

/**
 * Physical button positions for device bezel rendering.
 * Values represent percentage positions along the device edge.
 */
export interface DeviceButtonPositions {
  power: { top: number; height: number };
  volumeUp: { top: number; height: number };
  volumeDown: { top: number; height: number };
  silentSwitch: { top: number; height: number };
}

/**
 * Standard button positions for Face ID devices (iPhone X and later).
 */
export const FACE_ID_BUTTON_POSITIONS: DeviceButtonPositions = {
  power: { top: 18, height: 8 },
  volumeUp: { top: 18, height: 5 },
  volumeDown: { top: 25, height: 5 },
  silentSwitch: { top: 12, height: 3 },
};

/**
 * Button positions for Touch ID devices (iPhone SE).
 */
export const TOUCH_ID_BUTTON_POSITIONS: DeviceButtonPositions = {
  power: { top: 15, height: 6 },
  volumeUp: { top: 18, height: 5 },
  volumeDown: { top: 25, height: 5 },
  silentSwitch: { top: 10, height: 3 },
};

/**
 * Get button positions for a device model.
 */
export function getButtonPositions(device: DeviceModel): DeviceButtonPositions {
  return device.hasHomeButton ? TOUCH_ID_BUTTON_POSITIONS : FACE_ID_BUTTON_POSITIONS;
}

/**
 * Dynamic Island dimensions for supported devices (iPhone 14 Pro and later).
 * All values in CSS pixels.
 */
export const DYNAMIC_ISLAND = {
  width: 126,
  height: 37,
  borderRadius: 19,
  topOffset: 11,
} as const;

/**
 * Notch dimensions for devices with traditional notch.
 * All values in CSS pixels.
 */
export const NOTCH = {
  width: 162,
  height: 32,
  borderRadius: 20,
  topOffset: 0,
} as const;

/**
 * Home indicator dimensions (for devices without home button).
 * All values in CSS pixels.
 */
export const HOME_INDICATOR = {
  width: 134,
  height: 5,
  borderRadius: 3,
  bottomOffset: 8,
} as const;

/**
 * Status bar heights for different device types.
 * All values in CSS pixels.
 */
export const STATUS_BAR_HEIGHT = {
  dynamicIsland: 54,
  notch: 44,
  standard: 20,
} as const;

/**
 * Get status bar height for a device.
 */
export function getStatusBarHeight(device: DeviceModel): number {
  if (device.notchType === 'dynamic-island') {
    return STATUS_BAR_HEIGHT.dynamicIsland;
  }
  if (device.notchType === 'notch') {
    return STATUS_BAR_HEIGHT.notch;
  }
  return STATUS_BAR_HEIGHT.standard;
}

/**
 * Bezel thickness values for different device types.
 * All values in CSS pixels.
 */
export const BEZEL_THICKNESS = {
  faceId: 12,
  touchId: 16,
  seSides: 4,
} as const;

/**
 * Get bezel thickness for a device.
 */
export function getBezelThickness(device: DeviceModel): number {
  return device.hasHomeButton ? BEZEL_THICKNESS.touchId : BEZEL_THICKNESS.faceId;
}

/**
 * Device colour variants for bezel rendering.
 * Gradients suggest realistic titanium/aluminium finishes.
 */
export const DEVICE_COLOURS = {
  'space-black': {
    name: 'Space Black',
    bezelGradient: 'linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 50%, #1d1d1f 100%)',
    buttonColour: '#3d3d3f',
  },
  'silver': {
    name: 'Silver',
    bezelGradient: 'linear-gradient(135deg, #e3e3e8 0%, #f5f5f7 50%, #e3e3e8 100%)',
    buttonColour: '#d1d1d6',
  },
  'gold': {
    name: 'Gold',
    bezelGradient: 'linear-gradient(135deg, #f5e6d3 0%, #fdf8f3 50%, #f5e6d3 100%)',
    buttonColour: '#e5d4c3',
  },
  'deep-purple': {
    name: 'Deep Purple',
    bezelGradient: 'linear-gradient(135deg, #4d4255 0%, #5d526a 50%, #4d4255 100%)',
    buttonColour: '#5d526a',
  },
  'blue': {
    name: 'Blue',
    bezelGradient: 'linear-gradient(135deg, #a7c1d9 0%, #b8d0e6 50%, #a7c1d9 100%)',
    buttonColour: '#97b1c9',
  },
  'natural-titanium': {
    name: 'Natural Titanium',
    bezelGradient: 'linear-gradient(135deg, #9a9a9c 0%, #b8b8ba 50%, #9a9a9c 100%)',
    buttonColour: '#8a8a8c',
  },
  'blue-titanium': {
    name: 'Blue Titanium',
    bezelGradient: 'linear-gradient(135deg, #3d4753 0%, #4d5763 50%, #3d4753 100%)',
    buttonColour: '#4d5763',
  },
  'white-titanium': {
    name: 'White Titanium',
    bezelGradient: 'linear-gradient(135deg, #f0f0f2 0%, #fafafa 50%, #f0f0f2 100%)',
    buttonColour: '#e0e0e2',
  },
  'black-titanium': {
    name: 'Black Titanium',
    bezelGradient: 'linear-gradient(135deg, #1f1f21 0%, #2f2f31 50%, #1f1f21 100%)',
    buttonColour: '#3f3f41',
  },
} as const;

export type DeviceColourId = keyof typeof DEVICE_COLOURS;

/**
 * Default colour for new devices.
 */
export const DEFAULT_COLOUR: DeviceColourId = 'space-black';

/**
 * Get colour configuration by ID.
 */
export function getDeviceColour(colourId: DeviceColourId) {
  return DEVICE_COLOURS[colourId] ?? DEVICE_COLOURS[DEFAULT_COLOUR];
}
