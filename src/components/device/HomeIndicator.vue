<script setup lang="ts">
/**
 * HomeIndicator.vue
 *
 * Renders the home indicator bar found at the bottom of iPhone screens
 * on devices without a physical home button (iPhone X and later).
 * This is the horizontal pill-shaped gesture affordance used for
 * navigation and multitasking.
 *
 * @component
 */
import { computed } from 'vue'
import { useDeviceContext } from '@/composables/useDeviceConfig'

// ============================================================================
// Props
// ============================================================================

interface Props {
  /** Light or dark colour variant. Defaults to 'light' (white/grey). */
  variant?: 'light' | 'dark'
  /** Whether to auto-hide after a delay. Defaults to false. */
  autoHide?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  autoHide: false,
})

// ============================================================================
// Device Context
// ============================================================================

const context = useDeviceContext()
const homeIndicator = context.homeIndicator

// ============================================================================
// Computed Properties
// ============================================================================

// Home indicator dimensions and position
const indicatorStyle = computed(() => ({
  '--indicator-width': `${homeIndicator.width}px`,
  '--indicator-height': `${homeIndicator.height}px`,
  '--indicator-radius': `${homeIndicator.borderRadius}px`,
  '--indicator-bottom': `${homeIndicator.bottomOffset}px`,
}))

// Colour based on variant
const indicatorColour = computed(() =>
  props.variant === 'light'
    ? 'rgba(255, 255, 255, 0.6)'
    : 'rgba(0, 0, 0, 0.4)'
)

// Classes for styling variants
const indicatorClasses = computed(() => ({
  'home-indicator--light': props.variant === 'light',
  'home-indicator--dark': props.variant === 'dark',
  'home-indicator--auto-hide': props.autoHide,
}))
</script>

<template>
  <div
    class="home-indicator"
    :class="indicatorClasses"
    :style="indicatorStyle"
    role="presentation"
    aria-hidden="true"
  >
    <div
      class="home-indicator__bar"
      :style="{ backgroundColor: indicatorColour }"
    />
  </div>
</template>

<style scoped>
.home-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(var(--indicator-height) + var(--indicator-bottom) * 2);
  padding-bottom: var(--indicator-bottom);
  pointer-events: none;
}

.home-indicator__bar {
  width: var(--indicator-width);
  height: var(--indicator-height);
  border-radius: var(--indicator-radius);

  /* Subtle shadow for depth */
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);

  /* Smooth transition for colour changes */
  transition: opacity 0.15s ease-out;
}

/* Light variant - white/grey indicator (for dark backgrounds) */
.home-indicator--light .home-indicator__bar {
  background-color: rgba(255, 255, 255, 0.6);
}

/* Dark variant - dark indicator (for light backgrounds) */
.home-indicator--dark .home-indicator__bar {
  background-color: rgba(0, 0, 0, 0.4);
}

/* Auto-hide behaviour (simulates iOS behaviour) */
.home-indicator--auto-hide .home-indicator__bar {
  opacity: 1;
  animation: auto-hide 3s ease-out forwards;
}

@keyframes auto-hide {
  0%, 80% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

/* High contrast mode - make indicator more visible */
@media (prefers-contrast: high) {
  .home-indicator--light .home-indicator__bar {
    background-color: rgba(255, 255, 255, 0.9);
  }

  .home-indicator--dark .home-indicator__bar {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

/* Reduced motion - disable auto-hide animation */
@media (prefers-reduced-motion: reduce) {
  .home-indicator--auto-hide .home-indicator__bar {
    animation: none;
    opacity: 0.5;
  }
}
</style>
