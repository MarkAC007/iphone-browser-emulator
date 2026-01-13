/**
 * Device Components
 *
 * Vue components for rendering the iPhone device frame,
 * including the bezel, screen, notch/Dynamic Island, status bar,
 * and home indicator.
 *
 * @module components/device
 */

// Main wrapper component - provides device context to children
export { default as DeviceFrame } from './DeviceFrame.vue'

// Physical device housing with buttons
export { default as DeviceBezel } from './DeviceBezel.vue'

// Screen container with safe areas
export { default as DeviceScreen } from './DeviceScreen.vue'

// iOS status bar simulation
export { default as StatusBar } from './StatusBar.vue'

// Dynamic Island (iPhone 14 Pro and later)
export { default as DynamicIsland } from './DynamicIsland.vue'

// Home indicator bar (Face ID devices)
export { default as HomeIndicator } from './HomeIndicator.vue'
