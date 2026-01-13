/**
 * Browser state management store
 *
 * Manages Safari browser state including navigation,
 * loading status, and viewport configuration
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NavigationState, NavigationEntry, NavigationError } from '@/types'

/**
 * URL bar display modes
 */
export type UrlBarMode = 'url' | 'search' | 'editing'

/**
 * Toolbar visibility states
 */
export type ToolbarVisibility = 'visible' | 'hidden' | 'compact'

/**
 * Viewport state for scroll and zoom tracking
 */
interface ViewportState {
  scrollX: number
  scrollY: number
  zoomLevel: number
  isScrolling: boolean
}

export const useBrowserStore = defineStore('browser', () => {
  // Navigation state
  const navigationState = ref<NavigationState>({
    currentUrl: 'about:blank',
    history: [],
    historyIndex: -1,
    isLoading: false,
    loadProgress: 0,
    error: null,
    canGoBack: false,
    canGoForward: false,
  })

  // UI state
  const toolbarVisibility = ref<ToolbarVisibility>('visible')
  const urlBarMode = ref<UrlBarMode>('url')
  const viewport = ref<ViewportState>({
    scrollX: 0,
    scrollY: 0,
    zoomLevel: 1,
    isScrolling: false,
  })

  // Getters
  const currentUrl = computed(() => navigationState.value.currentUrl)
  const isLoading = computed(() => navigationState.value.isLoading)
  const loadProgress = computed(() => navigationState.value.loadProgress)
  const canGoBack = computed(() => navigationState.value.canGoBack)
  const canGoForward = computed(() => navigationState.value.canGoForward)
  const currentError = computed(() => navigationState.value.error)
  const history = computed(() => navigationState.value.history)

  const currentEntry = computed<NavigationEntry | null>(() => {
    const { history, historyIndex } = navigationState.value
    if (historyIndex >= 0 && historyIndex < history.length) {
      return history[historyIndex]
    }
    return null
  })

  const currentTitle = computed(() => currentEntry.value?.title ?? '')

  // Actions
  function navigate(url: string, options?: { replace?: boolean }): void {
    const state = navigationState.value
    const entry: NavigationEntry = {
      url,
      timestamp: Date.now(),
    }

    if (options?.replace && state.historyIndex >= 0) {
      // Replace current entry
      state.history[state.historyIndex] = entry
    } else {
      // Add new entry, truncating forward history
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push(entry)
      state.historyIndex = state.history.length - 1
    }

    state.currentUrl = url
    state.isLoading = true
    state.loadProgress = 0
    state.error = null
    state.canGoBack = state.historyIndex > 0
    state.canGoForward = false
  }

  function goBack(): void {
    const state = navigationState.value
    if (state.historyIndex > 0) {
      state.historyIndex -= 1
      state.currentUrl = state.history[state.historyIndex].url
      state.canGoBack = state.historyIndex > 0
      state.canGoForward = true
      state.isLoading = true
      state.loadProgress = 0
      state.error = null
    }
  }

  function goForward(): void {
    const state = navigationState.value
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex += 1
      state.currentUrl = state.history[state.historyIndex].url
      state.canGoBack = true
      state.canGoForward = state.historyIndex < state.history.length - 1
      state.isLoading = true
      state.loadProgress = 0
      state.error = null
    }
  }

  function reload(): void {
    const state = navigationState.value
    state.isLoading = true
    state.loadProgress = 0
    state.error = null
  }

  function stopLoading(): void {
    navigationState.value.isLoading = false
  }

  function setLoadProgress(progress: number): void {
    navigationState.value.loadProgress = Math.max(0, Math.min(100, progress))
  }

  function setLoadComplete(title?: string): void {
    const state = navigationState.value
    state.isLoading = false
    state.loadProgress = 100

    // Update current history entry with title
    if (title && state.historyIndex >= 0) {
      state.history[state.historyIndex] = {
        ...state.history[state.historyIndex],
        title,
      }
    }
  }

  function setLoadError(error: NavigationError): void {
    const state = navigationState.value
    state.isLoading = false
    state.error = error
  }

  function clearError(): void {
    navigationState.value.error = null
  }

  function updateTitle(title: string): void {
    const state = navigationState.value
    if (state.historyIndex >= 0) {
      state.history[state.historyIndex] = {
        ...state.history[state.historyIndex],
        title,
      }
    }
  }

  function updateFavicon(favicon: string): void {
    const state = navigationState.value
    if (state.historyIndex >= 0) {
      state.history[state.historyIndex] = {
        ...state.history[state.historyIndex],
        favicon,
      }
    }
  }

  function setToolbarVisibility(visibility: ToolbarVisibility): void {
    toolbarVisibility.value = visibility
  }

  function setUrlBarMode(mode: UrlBarMode): void {
    urlBarMode.value = mode
  }

  function updateViewport(state: Partial<ViewportState>): void {
    viewport.value = { ...viewport.value, ...state }
  }

  function reset(): void {
    navigationState.value = {
      currentUrl: 'about:blank',
      history: [],
      historyIndex: -1,
      isLoading: false,
      loadProgress: 0,
      error: null,
      canGoBack: false,
      canGoForward: false,
    }
  }

  return {
    // State
    navigationState,
    toolbarVisibility,
    urlBarMode,
    viewport,
    // Getters
    currentUrl,
    currentTitle,
    currentEntry,
    isLoading,
    loadProgress,
    canGoBack,
    canGoForward,
    currentError,
    history,
    // Actions
    navigate,
    goBack,
    goForward,
    reload,
    stopLoading,
    setLoadProgress,
    setLoadComplete,
    setLoadError,
    clearError,
    updateTitle,
    updateFavicon,
    setToolbarVisibility,
    setUrlBarMode,
    updateViewport,
    reset,
  }
})
