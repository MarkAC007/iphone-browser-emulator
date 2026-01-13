<script setup lang="ts">
/**
 * ThemeToggle Component
 *
 * A simple toggle button for switching between light and dark themes.
 * Shows sun icon for light mode, moon icon for dark mode.
 * Updates document class for Tailwind dark mode.
 */
import { usePreferencesStore } from '@/stores/preferences'

const preferencesStore = usePreferencesStore()

function toggleTheme() {
  preferencesStore.toggleTheme()
}
</script>

<template>
  <button
    type="button"
    class="
      relative p-2 rounded-lg
      bg-slate-200 dark:bg-slate-700
      hover:bg-slate-300 dark:hover:bg-slate-600
      transition-colors duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
    "
    :aria-label="preferencesStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="preferencesStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <!-- Sun icon (light mode) -->
    <svg
      v-if="!preferencesStore.isDarkMode"
      class="w-5 h-5 text-amber-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon icon (dark mode) -->
    <svg
      v-else
      class="w-5 h-5 text-blue-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>
