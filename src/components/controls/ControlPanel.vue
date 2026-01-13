<script setup lang="ts">
/**
 * ControlPanel Component
 *
 * Settings panel displayed below the device frame.
 * Contains device selector, orientation toggle, and theme toggle.
 * Compact horizontal layout for desktop, stacks on mobile.
 */
import { computed } from 'vue'
import DeviceSelector from './DeviceSelector.vue'
import ThemeToggle from './ThemeToggle.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { getDeviceById } from '@/config/devices'

const preferencesStore = usePreferencesStore()

// Current device for info display
const currentDevice = computed(() => getDeviceById(preferencesStore.deviceId))

function handleDeviceSelect(deviceId: string) {
  preferencesStore.setDeviceId(deviceId)
}

function toggleOrientation() {
  preferencesStore.toggleOrientation()
}

// Orientation icon rotation based on current orientation
const orientationIconClass = computed(() =>
  preferencesStore.orientation === 'landscape' ? 'rotate-90' : ''
)
</script>

<template>
  <div
    class="
      flex flex-wrap items-center justify-center gap-3
      p-4
      bg-slate-100 dark:bg-slate-800
      border-t border-slate-200 dark:border-slate-700
      rounded-b-xl
    "
  >
    <!-- Device Selector -->
    <div class="flex flex-col items-center">
      <DeviceSelector
        :model-value="preferencesStore.deviceId"
        @update:model-value="handleDeviceSelect"
      />
    </div>

    <!-- Orientation Toggle -->
    <button
      type="button"
      class="
        p-2 rounded-lg
        bg-slate-200 dark:bg-slate-700
        hover:bg-slate-300 dark:hover:bg-slate-600
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      "
      :title="preferencesStore.orientation === 'portrait' ? 'Switch to landscape' : 'Switch to portrait'"
      :aria-label="preferencesStore.orientation === 'portrait' ? 'Switch to landscape' : 'Switch to portrait'"
      @click="toggleOrientation"
    >
      <!-- Phone rotation icon -->
      <svg
        :class="['w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300', orientationIconClass]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    </button>

    <!-- Theme Toggle -->
    <ThemeToggle />

    <!-- Device Info (hidden on small screens) -->
    <div
      class="
        hidden sm:flex items-center gap-2
        px-3 py-1.5
        bg-slate-200 dark:bg-slate-700
        rounded-lg
        text-xs text-slate-600 dark:text-slate-300
      "
    >
      <span class="font-medium">{{ currentDevice.name }}</span>
      <span class="text-slate-400">|</span>
      <span>{{ currentDevice.screenWidth }} x {{ currentDevice.screenHeight }}</span>
      <span class="text-slate-400">|</span>
      <span>{{ currentDevice.devicePixelRatio }}x</span>
    </div>
  </div>
</template>
