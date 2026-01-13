<script setup lang="ts">
/**
 * DeviceScreen.vue
 *
 * Container for the device screen area.
 * Renders the black screen background with proper border-radius,
 * contains the StatusBar, main content slot, and HomeIndicator.
 * Handles safe area insets for proper content positioning.
 *
 * @component
 */
import { computed } from 'vue'
import { useDeviceContext } from '@/composables/useDeviceConfig'
import StatusBar from './StatusBar.vue'
import HomeIndicator from './HomeIndicator.vue'

// ============================================================================
// Device Context
// ============================================================================

const context = useDeviceContext()

// ============================================================================
// Computed Properties
// ============================================================================

const device = computed(() => context.device.value)

// Whether to show the home indicator (only on devices without home button)
const showHomeIndicator = computed(() => !device.value.hasHomeButton)

// Safe area insets for content positioning
const safeAreaInsets = computed(() => device.value.safeAreaInsets)

// Screen dimensions
const screenDimensions = computed(() => ({
  width: device.value.screenWidth,
  height: device.value.screenHeight,
}))

// Status bar height from context
const statusBarHeight = computed(() => context.statusBarHeight.value)

// CSS custom properties for safe areas
const screenStyle = computed(() => ({
  '--safe-area-top': `${safeAreaInsets.value.top}px`,
  '--safe-area-bottom': `${safeAreaInsets.value.bottom}px`,
  '--safe-area-left': `${safeAreaInsets.value.left}px`,
  '--safe-area-right': `${safeAreaInsets.value.right}px`,
  '--status-bar-height': `${statusBarHeight.value}px`,
  '--screen-width': `${screenDimensions.value.width}px`,
  '--screen-height': `${screenDimensions.value.height}px`,
}))

// Note: notchType available via device.value.notchType if needed for conditional rendering
</script>

<template>
  <div
    class="device-screen"
    :style="screenStyle"
    role="region"
    aria-label="Device screen"
  >
    <!-- Status bar (always present, adapts to device type) -->
    <StatusBar class="device-screen__status-bar" />

    <!-- Main content area with safe area padding -->
    <div class="device-screen__content">
      <slot />
    </div>

    <!-- Home indicator (only on Face ID devices) -->
    <HomeIndicator
      v-if="showHomeIndicator"
      class="device-screen__home-indicator"
    />
  </div>
</template>

<style scoped>
.device-screen {
  position: relative;
  width: var(--screen-width);
  height: var(--screen-height);
  background-color: #000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.device-screen__status-bar {
  flex-shrink: 0;
  height: var(--status-bar-height);
}

.device-screen__content {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /*
   * Safe area padding applied to content container.
   * This ensures slotted content respects the device's safe areas.
   * Note: Top safe area is handled by status bar height.
   */
  padding-bottom: var(--safe-area-bottom);
  padding-left: var(--safe-area-left);
  padding-right: var(--safe-area-right);
}

.device-screen__home-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* Screen wake animation on mount (optional enhancement) */
@keyframes screen-wake {
  0% {
    opacity: 0;
    filter: brightness(0);
  }
  50% {
    opacity: 1;
    filter: brightness(0.5);
  }
  100% {
    opacity: 1;
    filter: brightness(1);
  }
}

.device-screen--animating {
  animation: screen-wake 0.5s ease-out forwards;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .device-screen--animating {
    animation: none;
  }
}
</style>
