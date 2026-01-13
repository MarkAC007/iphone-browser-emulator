import { ref, computed, readonly } from 'vue'
import type { NavigationState, NavigationError, NavigationHistory } from '@/types/navigation'

/**
 * Composable for managing browser navigation state
 * Handles URL history, loading states, and navigation actions
 */
export function useNavigation() {
  // Navigation history
  const history = ref<NavigationHistory>({
    entries: [],
    currentIndex: -1
  })

  // Current state
  const currentUrl = ref('')
  const isLoading = ref(false)
  const loadProgress = ref(0)
  const error = ref<NavigationError | null>(null)

  // Computed properties
  const canGoBack = computed(() => history.value.currentIndex > 0)
  const canGoForward = computed(() =>
    history.value.currentIndex < history.value.entries.length - 1
  )

  /**
   * Convert simple history entries to NavigationEntry format
   */
  const historyEntries = computed(() =>
    history.value.entries.map((url) => ({
      url,
      timestamp: Date.now()
    }))
  )

  const state = computed<NavigationState>(() => ({
    currentUrl: currentUrl.value,
    history: historyEntries.value,
    historyIndex: history.value.currentIndex,
    isLoading: isLoading.value,
    canGoBack: canGoBack.value,
    canGoForward: canGoForward.value,
    loadProgress: loadProgress.value,
    error: error.value
  }))

  /**
   * Validates and normalises a URL
   */
  function normaliseUrl(url: string): string {
    let normalised = url.trim()

    // Add protocol if missing
    if (!/^https?:\/\//i.test(normalised)) {
      normalised = `https://${normalised}`
    }

    return normalised
  }

  /**
   * Validates a URL string
   */
  function isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(normaliseUrl(url))
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }

  /**
   * Navigate to a new URL
   */
  function navigate(url: string): void {
    const normalisedUrl = normaliseUrl(url)

    if (!isValidUrl(url)) {
      error.value = {
        type: 'invalid-url',
        message: 'Please enter a valid URL (e.g., https://example.com)'
      }
      return
    }

    // Clear any existing error
    error.value = null

    // Start loading
    isLoading.value = true
    loadProgress.value = 0

    // Update current URL
    currentUrl.value = normalisedUrl

    // Add to history (truncate forward history if navigating from middle)
    const newEntries = history.value.entries.slice(0, history.value.currentIndex + 1)
    newEntries.push(normalisedUrl)
    history.value = {
      entries: newEntries,
      currentIndex: newEntries.length - 1
    }
  }

  /**
   * Go back in history
   */
  function goBack(): void {
    if (!canGoBack.value) return

    history.value.currentIndex--
    currentUrl.value = history.value.entries[history.value.currentIndex]
    error.value = null
    isLoading.value = true
    loadProgress.value = 0
  }

  /**
   * Go forward in history
   */
  function goForward(): void {
    if (!canGoForward.value) return

    history.value.currentIndex++
    currentUrl.value = history.value.entries[history.value.currentIndex]
    error.value = null
    isLoading.value = true
    loadProgress.value = 0
  }

  /**
   * Refresh current page
   */
  function refresh(): void {
    if (!currentUrl.value) return

    error.value = null
    isLoading.value = true
    loadProgress.value = 0
  }

  /**
   * Stop loading
   */
  function stop(): void {
    isLoading.value = false
    loadProgress.value = 100
  }

  /**
   * Set loading progress (0-100)
   */
  function setProgress(progress: number): void {
    loadProgress.value = Math.max(0, Math.min(100, progress))
  }

  /**
   * Mark loading as complete
   */
  function onLoadComplete(): void {
    isLoading.value = false
    loadProgress.value = 100
    error.value = null
  }

  /**
   * Handle load error
   */
  function onLoadError(err: NavigationError): void {
    isLoading.value = false
    loadProgress.value = 0
    error.value = err
  }

  /**
   * Clear navigation state
   */
  function clear(): void {
    history.value = { entries: [], currentIndex: -1 }
    currentUrl.value = ''
    isLoading.value = false
    loadProgress.value = 0
    error.value = null
  }

  /**
   * Check if a URL uses HTTPS
   */
  function isSecure(url: string): boolean {
    try {
      return new URL(url).protocol === 'https:'
    } catch {
      return false
    }
  }

  /**
   * Extract hostname from URL
   */
  function getHostname(url: string): string {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return {
    // State
    state: readonly(state),
    currentUrl: readonly(currentUrl),
    isLoading: readonly(isLoading),
    loadProgress: readonly(loadProgress),
    error: readonly(error),
    canGoBack,
    canGoForward,
    history: readonly(history),

    // Actions
    navigate,
    goBack,
    goForward,
    refresh,
    stop,
    setProgress,
    onLoadComplete,
    onLoadError,
    clear,

    // Utilities
    isValidUrl,
    normaliseUrl,
    isSecure,
    getHostname
  }
}

export type UseNavigation = ReturnType<typeof useNavigation>
