<script setup lang="ts">
/**
 * StatusBar.vue
 *
 * iOS status bar simulation component.
 * Displays time (centred or left depending on notch type),
 * and status icons (signal, WiFi, battery) on the right.
 * Adapts layout to Dynamic Island, notch, or standard devices.
 *
 * @component
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDeviceContext } from '@/composables/useDeviceConfig'
import DynamicIsland from './DynamicIsland.vue'

// ============================================================================
// Device Context
// ============================================================================

const context = useDeviceContext()

// ============================================================================
// Time Display
// ============================================================================

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

let timeInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// ============================================================================
// Computed Properties
// ============================================================================

const device = computed(() => context.device.value)
const notchType = computed(() => device.value.notchType)
const statusBarHeight = computed(() => context.statusBarHeight.value)

// Determine layout based on notch type
// - Dynamic Island: Time on left, icons on right, island in centre
// - Notch: Time on left, icons on right (notch blocks centre)
// - Standard: Time centred at top
const hasDynamicIsland = computed(() => notchType.value === 'dynamic-island')
const hasNotch = computed(() => notchType.value === 'notch')
const isStandardStatusBar = computed(() => notchType.value === 'none')

// Time should be centred only on standard (non-notch) devices
const timeCentred = computed(() => isStandardStatusBar.value)

// Status bar style with height
const statusBarStyle = computed(() => ({
  '--status-bar-height': `${statusBarHeight.value}px`,
}))

// Icon container padding to account for notch/island width
const iconContainerStyle = computed(() => {
  if (hasDynamicIsland.value) {
    // Leave space for Dynamic Island in the centre
    return { paddingLeft: '0px', paddingRight: '0px' }
  }
  return {}
})
</script>

<template>
  <div
    class="status-bar"
    :class="{
      'status-bar--dynamic-island': hasDynamicIsland,
      'status-bar--notch': hasNotch,
      'status-bar--standard': isStandardStatusBar,
    }"
    :style="statusBarStyle"
    role="status"
    aria-label="Device status bar"
  >
    <!-- Left section: Time (for notched/Dynamic Island devices) -->
    <div class="status-bar__left">
      <span
        v-if="!timeCentred"
        class="status-bar__time"
        aria-label="Current time"
      >
        {{ currentTime }}
      </span>
    </div>

    <!-- Centre section: Dynamic Island or centred time -->
    <div class="status-bar__centre">
      <DynamicIsland v-if="hasDynamicIsland" />
      <span
        v-else-if="timeCentred"
        class="status-bar__time status-bar__time--centred"
        aria-label="Current time"
      >
        {{ currentTime }}
      </span>
      <!-- Notch devices have a visual notch here (handled by CSS) -->
    </div>

    <!-- Right section: Status icons -->
    <div class="status-bar__right" :style="iconContainerStyle">
      <!-- Signal strength indicator -->
      <div class="status-bar__icon status-bar__icon--signal" aria-label="Signal strength">
        <svg viewBox="0 0 17 10" fill="currentColor" aria-hidden="true">
          <rect x="0" y="6" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="4" width="3" height="6" rx="0.5" />
          <rect x="9" y="2" width="3" height="8" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="10" rx="0.5" />
        </svg>
      </div>

      <!-- WiFi indicator -->
      <div class="status-bar__icon status-bar__icon--wifi" aria-label="WiFi connected">
        <svg viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
          <path d="M7.5 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          <path d="M4.5 7.5a4.5 4.5 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M2 5a7.5 7.5 0 0 1 11 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M0 2.5a10 10 0 0 1 15 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Battery indicator -->
      <div class="status-bar__icon status-bar__icon--battery" aria-label="Battery level">
        <svg viewBox="0 0 25 12" aria-hidden="true">
          <!-- Battery outline -->
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          />
          <!-- Battery cap -->
          <path
            d="M23 4v4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
            fill="currentColor"
            opacity="0.5"
          />
          <!-- Battery fill (green when charged) -->
          <rect x="2" y="2" width="18" height="8" rx="1" fill="#30d158" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: var(--status-bar-height);
  padding: 0 16px;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

/* Dynamic Island layout: elements pushed to edges */
.status-bar--dynamic-island {
  padding-top: 14px;
}

/* Notch layout: elements pushed to edges */
.status-bar--notch {
  padding-top: 12px;
}

/* Standard layout: time centred at top */
.status-bar--standard {
  padding-top: 4px;
}

/* Left section */
.status-bar__left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* Centre section */
.status-bar__centre {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

/* Right section */
.status-bar__right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

/* Time display */
.status-bar__time {
  font-variant-numeric: tabular-nums;
}

.status-bar__time--centred {
  text-align: center;
}

/* Status icons */
.status-bar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-bar__icon svg {
  height: 12px;
  width: auto;
}

.status-bar__icon--signal svg {
  height: 10px;
}

.status-bar__icon--wifi svg {
  height: 11px;
}

.status-bar__icon--battery svg {
  height: 12px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .status-bar {
    font-weight: 700;
  }

  .status-bar__icon svg {
    stroke-width: 2;
  }
}
</style>
