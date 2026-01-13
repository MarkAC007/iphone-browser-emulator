<script setup lang="ts">
/**
 * DeviceBezel.vue
 *
 * Renders the physical iPhone device housing (bezel).
 * Includes realistic rounded corners, titanium/aluminium gradient finish,
 * and decorative physical buttons (power, volume, silent switch).
 *
 * @component
 */
import { computed } from 'vue'
import { useDeviceContext } from '@/composables/useDeviceConfig'
import DeviceScreen from './DeviceScreen.vue'

// ============================================================================
// Device Context
// ============================================================================

const context = useDeviceContext()

// ============================================================================
// Computed Properties
// ============================================================================

const device = computed(() => context.device.value)
const colourConfig = computed(() => context.colourConfig.value)
const buttonPositions = computed(() => context.buttonPositions.value)
const bezelThickness = computed(() => context.bezelThickness.value)

// Screen corner radius (slightly smaller than bezel to create inset effect)
const screenRadius = computed(() => {
  const bezelRadius = device.value.bezelRadius
  if (bezelRadius === 0) return 0
  return Math.max(0, bezelRadius - 4)
})

// Bezel styles with gradient background
const bezelStyle = computed(() => ({
  '--bezel-radius': `${device.value.bezelRadius}px`,
  '--screen-radius': `${screenRadius.value}px`,
  '--bezel-thickness': `${bezelThickness.value}px`,
  '--bezel-gradient': colourConfig.value.bezelGradient,
  '--button-colour': colourConfig.value.buttonColour,
}))

// Calculate button positions as CSS values
const powerButtonStyle = computed(() => ({
  top: `${buttonPositions.value.power.top}%`,
  height: `${buttonPositions.value.power.height}%`,
}))

const volumeUpStyle = computed(() => ({
  top: `${buttonPositions.value.volumeUp.top}%`,
  height: `${buttonPositions.value.volumeUp.height}%`,
}))

const volumeDownStyle = computed(() => ({
  top: `${buttonPositions.value.volumeDown.top}%`,
  height: `${buttonPositions.value.volumeDown.height}%`,
}))

const silentSwitchStyle = computed(() => ({
  top: `${buttonPositions.value.silentSwitch.top}%`,
  height: `${buttonPositions.value.silentSwitch.height}%`,
}))

// Determine if this is a home button device (different bezel styling)
const isHomeButtonDevice = computed(() => device.value.hasHomeButton)
</script>

<template>
  <div
    class="device-bezel"
    :class="{ 'device-bezel--home-button': isHomeButtonDevice }"
    :style="bezelStyle"
  >
    <!-- Left side buttons -->
    <div class="device-bezel__buttons device-bezel__buttons--left">
      <!-- Silent/Mute switch -->
      <div
        class="device-bezel__button device-bezel__button--silent-switch"
        :style="silentSwitchStyle"
        aria-hidden="true"
      />
      <!-- Volume Up -->
      <div
        class="device-bezel__button device-bezel__button--volume-up"
        :style="volumeUpStyle"
        aria-hidden="true"
      />
      <!-- Volume Down -->
      <div
        class="device-bezel__button device-bezel__button--volume-down"
        :style="volumeDownStyle"
        aria-hidden="true"
      />
    </div>

    <!-- Right side buttons -->
    <div class="device-bezel__buttons device-bezel__buttons--right">
      <!-- Power/Side button -->
      <div
        class="device-bezel__button device-bezel__button--power"
        :style="powerButtonStyle"
        aria-hidden="true"
      />
    </div>

    <!-- Screen area -->
    <div class="device-bezel__screen-container">
      <DeviceScreen>
        <slot />
      </DeviceScreen>
    </div>

    <!-- Subtle highlight for 3D effect -->
    <div class="device-bezel__highlight" aria-hidden="true" />
  </div>
</template>

<style scoped>
.device-bezel {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bezel-gradient);
  border-radius: var(--bezel-radius);
  padding: var(--bezel-thickness);
  box-sizing: border-box;

  /* Subtle inner shadow for depth */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

/* Home button devices have larger bezels at top/bottom */
.device-bezel--home-button {
  padding-top: calc(var(--bezel-thickness) * 4);
  padding-bottom: calc(var(--bezel-thickness) * 4);
}

.device-bezel__screen-container {
  width: 100%;
  height: 100%;
  border-radius: var(--screen-radius);
  overflow: hidden;
  background: #000;
}

/* Button container positioning */
.device-bezel__buttons {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  pointer-events: none;
}

.device-bezel__buttons--left {
  left: -4px;
}

.device-bezel__buttons--right {
  right: -4px;
}

/* Individual button styling */
.device-bezel__button {
  position: absolute;
  width: 4px;
  background: var(--button-colour);
  border-radius: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

/* Left side buttons extend from the left */
.device-bezel__buttons--left .device-bezel__button {
  left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Right side button extends from the right */
.device-bezel__buttons--right .device-bezel__button {
  right: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Silent switch is smaller/thinner */
.device-bezel__button--silent-switch {
  width: 3px;
}

/* Highlight overlay for 3D effect */
.device-bezel__highlight {
  position: absolute;
  inset: 0;
  border-radius: var(--bezel-radius);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  pointer-events: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .device-bezel {
    outline: 2px solid currentColor;
  }
}
</style>
