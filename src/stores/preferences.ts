import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { DeviceOrientation } from '@/types/device'
import { useLocalStorage, STORAGE_KEYS } from '@/composables/useLocalStorage'
import type { Theme } from '@/config/constants'

/**
 * User preferences store
 *
 * Manages user preferences including theme, device selection,
 * and orientation. Preferences are persisted to localStorage.
 *
 * @example
 * ```typescript
 * const preferencesStore = usePreferencesStore()
 * preferencesStore.setTheme('dark')
 * preferencesStore.setDeviceId('iphone-15-pro')
 * ```
 */
export const usePreferencesStore = defineStore('preferences', () => {
  // Persisted preferences
  const deviceId = useLocalStorage(STORAGE_KEYS.DEVICE_ID, 'iphone-15-pro')
  const orientation = useLocalStorage<DeviceOrientation>(STORAGE_KEYS.ORIENTATION, 'portrait')
  const theme = useLocalStorage<Theme>(STORAGE_KEYS.THEME, 'system')
  const urlHistory = useLocalStorage<string[]>(STORAGE_KEYS.URL_HISTORY, [])

  // Resolved theme (system preference resolved to actual theme)
  const resolvedTheme = ref<'light' | 'dark'>('light')

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateResolvedTheme = () => {
      if (theme.value === 'system') {
        resolvedTheme.value = mediaQuery.matches ? 'dark' : 'light'
      } else {
        resolvedTheme.value = theme.value
      }
    }

    // Initial resolution
    updateResolvedTheme()

    // Watch for system theme changes
    mediaQuery.addEventListener('change', updateResolvedTheme)

    // Watch for theme preference changes
    watch(theme, updateResolvedTheme)
  }

  // Is dark mode active
  const isDarkMode = computed(() => resolvedTheme.value === 'dark')

  /**
   * Set the theme preference
   */
  function setTheme(newTheme: Theme): void {
    theme.value = newTheme
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme(): void {
    // If using system, switch to explicit opposite
    if (theme.value === 'system') {
      theme.value = resolvedTheme.value === 'dark' ? 'light' : 'dark'
    } else {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
  }

  /**
   * Set the device ID
   */
  function setDeviceId(id: string): void {
    deviceId.value = id
  }

  /**
   * Set the orientation
   */
  function setOrientation(newOrientation: DeviceOrientation): void {
    orientation.value = newOrientation
  }

  /**
   * Toggle orientation between portrait and landscape
   */
  function toggleOrientation(): void {
    orientation.value = orientation.value === 'portrait' ? 'landscape' : 'portrait'
  }

  /**
   * Add a URL to history
   */
  function addToUrlHistory(url: string): void {
    if (!url) return

    // Remove if already exists (we'll add to front)
    const filtered = urlHistory.value.filter((u) => u !== url)

    // Add to front
    urlHistory.value = [url, ...filtered].slice(0, 50) // Keep last 50 entries
  }

  /**
   * Clear URL history
   */
  function clearUrlHistory(): void {
    urlHistory.value = []
  }

  /**
   * Remove a specific URL from history
   */
  function removeFromUrlHistory(url: string): void {
    urlHistory.value = urlHistory.value.filter((u) => u !== url)
  }

  /**
   * Get recent URLs (limited)
   */
  const recentUrls = computed(() => urlHistory.value.slice(0, 10))

  /**
   * Apply theme to document
   */
  function applyThemeToDocument(): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    if (isDarkMode.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Watch resolved theme and apply to document
  watch(
    resolvedTheme,
    () => {
      applyThemeToDocument()
    },
    { immediate: true }
  )

  return {
    // State
    deviceId,
    orientation,
    theme,
    resolvedTheme,
    isDarkMode,
    urlHistory,
    recentUrls,

    // Actions
    setTheme,
    toggleTheme,
    setDeviceId,
    setOrientation,
    toggleOrientation,
    addToUrlHistory,
    clearUrlHistory,
    removeFromUrlHistory,
    applyThemeToDocument
  }
})

export type PreferencesStore = ReturnType<typeof usePreferencesStore>
