<script setup lang="ts">
/**
 * DeviceFrame.vue
 *
 * Main wrapper component for the iPhone device emulator.
 * Provides device context to all child components via Vue's provide/inject pattern.
 * Handles scaling based on container size and applies shadow/positioning.
 *
 * @component
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { DeviceOrientation } from '@/types'
import { useDeviceConfig, provideDeviceContext } from '@/composables/useDeviceConfig'
import { getBezelThickness } from '@/config/devices'
import DeviceBezel from './DeviceBezel.vue'

// ============================================================================
// Props
// ============================================================================

interface Props {
  /** Device model ID to display. Falls back to default if invalid. */
  deviceId?: string
  /** Device orientation. Defaults to 'portrait'. */
  orientation?: DeviceOrientation
  /** Whether to auto-scale to fit container. Defaults to true. */
  autoScale?: boolean
  /** Maximum scale factor when auto-scaling. Defaults to 1. */
  maxScale?: number
  /** Whether to show device shadow. Defaults to true. */
  showShadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'portrait',
  autoScale: true,
  maxScale: 1,
  showShadow: true,
})

// ============================================================================
// Emits
// ============================================================================

const emit = defineEmits<{
  /** Emitted when scale changes */
  (e: 'scale-change', scale: number): void
  /** Emitted when device dimensions are calculated */
  (e: 'dimensions-change', dimensions: { width: number; height: number }): void
}>()

// ============================================================================
// Device Configuration
// ============================================================================

const deviceConfig = useDeviceConfig()

// Set device from prop if provided
if (props.deviceId) {
  deviceConfig.setDevice(props.deviceId)
}

// Set orientation from prop
deviceConfig.setOrientation(props.orientation)

// Watch for prop changes
watch(() => props.deviceId, (newId) => {
  if (newId) {
    deviceConfig.setDevice(newId)
  }
})

watch(() => props.orientation, (newOrientation) => {
  deviceConfig.setOrientation(newOrientation)
})

// Provide device context to child components
provideDeviceContext(deviceConfig)

// ============================================================================
// Container Sizing and Auto-Scale
// ============================================================================

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const containerHeight = ref(0)

// Calculate total frame dimensions (screen + bezel)
const frameDimensions = computed(() => {
  const device = deviceConfig.currentDevice.value
  const bezelThickness = getBezelThickness(device)
  const isPortrait = props.orientation === 'portrait'

  const screenWidth = isPortrait ? device.screenWidth : device.screenHeight
  const screenHeight = isPortrait ? device.screenHeight : device.screenWidth

  // Add bezel thickness on all sides
  const totalWidth = screenWidth + (bezelThickness * 2)
  const totalHeight = screenHeight + (bezelThickness * 2)

  return {
    width: totalWidth,
    height: totalHeight,
    screenWidth,
    screenHeight,
  }
})

// Calculate scale factor based on container size
const calculatedScale = computed(() => {
  if (!props.autoScale) {
    return 1
  }

  const { width, height } = frameDimensions.value
  const padding = 40 // Padding around device in container

  if (containerWidth.value === 0 || containerHeight.value === 0) {
    return 1
  }

  const scaleX = (containerWidth.value - padding) / width
  const scaleY = (containerHeight.value - padding) / height
  const scale = Math.min(scaleX, scaleY, props.maxScale)

  return Math.max(0.1, scale) // Minimum scale of 0.1
})

// Update device config scale when calculated scale changes
watch(calculatedScale, (newScale) => {
  deviceConfig.setScale(newScale)
  emit('scale-change', newScale)
})

// Emit dimensions when they change
watch(frameDimensions, (dims) => {
  emit('dimensions-change', { width: dims.width, height: dims.height })
})

// ============================================================================
// Resize Observer
// ============================================================================

let resizeObserver: ResizeObserver | null = null

function setupResizeObserver() {
  if (!containerRef.value) return

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      containerWidth.value = entry.contentRect.width
      containerHeight.value = entry.contentRect.height
    }
  })

  resizeObserver.observe(containerRef.value)

  // Initial size
  const rect = containerRef.value.getBoundingClientRect()
  containerWidth.value = rect.width
  containerHeight.value = rect.height
}

onMounted(() => {
  setupResizeObserver()
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

// ============================================================================
// Computed Styles
// ============================================================================

const frameStyle = computed(() => ({
  width: `${frameDimensions.value.width}px`,
  height: `${frameDimensions.value.height}px`,
  transform: `scale(${calculatedScale.value})`,
  transformOrigin: 'center center',
}))

const shadowClass = computed(() =>
  props.showShadow ? 'device-frame--with-shadow' : ''
)

const orientationClass = computed(() =>
  `device-frame--${props.orientation}`
)
</script>

<template>
  <div
    ref="containerRef"
    class="device-frame-container"
    role="img"
    :aria-label="`${deviceConfig.currentDevice.value.name} device frame`"
  >
    <div
      class="device-frame"
      :class="[shadowClass, orientationClass]"
      :style="frameStyle"
    >
      <DeviceBezel>
        <!-- Default slot for screen content -->
        <slot />
      </DeviceBezel>
    </div>
  </div>
</template>

<style scoped>
.device-frame-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
}

.device-frame {
  position: relative;
  flex-shrink: 0;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.device-frame--with-shadow {
  /* Realistic device shadow - soft and diffused */
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 12px 24px -8px rgba(0, 0, 0, 0.15),
    0 4px 8px -4px rgba(0, 0, 0, 0.1);
  border-radius: inherit;
}

.device-frame--landscape {
  /* Landscape orientation handled by dimensions swap in frameDimensions */
}

.device-frame--portrait {
  /* Portrait is the default orientation */
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .device-frame {
    transition: none;
  }
}
</style>
