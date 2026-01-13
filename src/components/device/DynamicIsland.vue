<script setup lang="ts">
/**
 * DynamicIsland.vue
 *
 * Renders the Dynamic Island component found on iPhone 14 Pro and later.
 * Features a pill-shaped cutout with subtle ambient animation to simulate
 * the living, breathing nature of the real Dynamic Island.
 *
 * @component
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDeviceContext } from '@/composables/useDeviceConfig'

// ============================================================================
// Props
// ============================================================================

interface Props {
  /** Whether to show the subtle ambient animation. Defaults to true. */
  animated?: boolean
  /** Whether the island is in an expanded state (for future use). */
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animated: true,
  expanded: false,
})

// ============================================================================
// Device Context
// ============================================================================

const context = useDeviceContext()
const dynamicIsland = context.dynamicIsland

// ============================================================================
// Animation State
// ============================================================================

const prefersReducedMotion = ref(false)

// Check for reduced motion preference
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches

  const handler = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches
  }

  mediaQuery.addEventListener('change', handler)

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handler)
  })
})

// ============================================================================
// Computed Properties
// ============================================================================

// Determine if animation should be active
const shouldAnimate = computed(() =>
  props.animated && !prefersReducedMotion.value
)

// Dynamic Island dimensions
const islandStyle = computed(() => ({
  '--island-width': `${dynamicIsland.width}px`,
  '--island-height': `${dynamicIsland.height}px`,
  '--island-radius': `${dynamicIsland.borderRadius}px`,
  '--island-top': `${dynamicIsland.topOffset}px`,
}))

// Expanded state styling (future enhancement)
const islandClasses = computed(() => ({
  'dynamic-island--animated': shouldAnimate.value,
  'dynamic-island--expanded': props.expanded,
}))
</script>

<template>
  <div
    class="dynamic-island"
    :class="islandClasses"
    :style="islandStyle"
    role="presentation"
    aria-hidden="true"
  >
    <!-- Inner glow effect for depth -->
    <div class="dynamic-island__glow" />

    <!-- Camera and sensor area (purely decorative) -->
    <div class="dynamic-island__sensors">
      <!-- Front camera (left side of pill) -->
      <div class="dynamic-island__camera" />
      <!-- Face ID sensors (right side, less visible) -->
      <div class="dynamic-island__face-id" />
    </div>

    <!-- Subtle ambient animation overlay -->
    <div
      v-if="shouldAnimate"
      class="dynamic-island__ambient"
    />
  </div>
</template>

<style scoped>
.dynamic-island {
  position: relative;
  width: var(--island-width);
  height: var(--island-height);
  background-color: #000;
  border-radius: var(--island-radius);
  overflow: hidden;

  /* Subtle shadow for depth */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.5),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);

  /* Smooth transitions for expanded state */
  transition:
    width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Inner glow for glass-like depth */
.dynamic-island__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 60%
  );
  pointer-events: none;
}

/* Sensor area positioning */
.dynamic-island__sensors {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  pointer-events: none;
}

/* Front camera representation */
.dynamic-island__camera {
  width: 12px;
  height: 12px;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(40, 40, 50, 1) 0%,
    rgba(20, 20, 25, 1) 50%,
    rgba(10, 10, 12, 1) 100%
  );
  border-radius: 50%;
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.5),
    0 0.5px 0 rgba(255, 255, 255, 0.05);
}

/* Face ID sensor cluster (subtle, barely visible) */
.dynamic-island__face-id {
  width: 8px;
  height: 8px;
  background: rgba(30, 30, 35, 1);
  border-radius: 50%;
  opacity: 0.6;
}

/* Ambient animation overlay */
.dynamic-island__ambient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 100%
  );
  animation: ambient-pulse 4s ease-in-out infinite;
  pointer-events: none;
}

/* Subtle ambient pulse animation */
@keyframes ambient-pulse {
  0%, 100% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
    transform: translateX(100%);
  }
}

/* Expanded state (for future Live Activities simulation) */
.dynamic-island--expanded {
  width: calc(var(--island-width) * 1.5);
  height: calc(var(--island-height) * 1.3);
}

/* Animation disabled state */
.dynamic-island:not(.dynamic-island--animated) .dynamic-island__ambient {
  display: none;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .dynamic-island {
    outline: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* Reduced motion - disable ambient animation */
@media (prefers-reduced-motion: reduce) {
  .dynamic-island__ambient {
    animation: none;
    display: none;
  }

  .dynamic-island {
    transition: none;
  }
}
</style>
