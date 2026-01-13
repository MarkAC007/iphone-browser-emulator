<script setup lang="ts">
/**
 * App.vue - Root Application Component
 *
 * The main container for the iPhone Browser Emulator.
 * Orchestrates the device frame, browser viewport, URL input bar, and controls.
 * Manages global state via Pinia stores and coordinates all child components.
 *
 * Layout:
 * - Header with prominent URL input bar
 * - DeviceFrame in centre with proper scaling
 * - ControlPanel below device
 * - Footer with device info
 */
import { ref, computed, watch, onMounted } from 'vue'
import { useNavigationStore } from '@/stores/navigation'
import { usePreferencesStore } from '@/stores/preferences'
import { getDeviceById } from '@/config/devices'
import DeviceFrame from '@/components/device/DeviceFrame.vue'
import { BrowserChrome, BrowserViewport } from '@/components/browser'
import ControlPanel from '@/components/controls/ControlPanel.vue'
import type { NavigationError } from '@/types'

// ============================================================================
// Stores
// ============================================================================

const navigationStore = useNavigationStore()
const preferencesStore = usePreferencesStore()

// ============================================================================
// State
// ============================================================================

const urlInputValue = ref('')
const urlInputFocused = ref(false)
const urlInputRef = ref<HTMLInputElement | null>(null)

// Refresh key for forcing iframe reload
const iframeKey = ref(0)

// ============================================================================
// Computed Properties
// ============================================================================

const currentDevice = computed(() => getDeviceById(preferencesStore.deviceId))

// Platform detection for keyboard shortcuts
const isMac = computed(() => typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0)

const displayUrl = computed(() => {
  if (urlInputFocused.value) {
    return urlInputValue.value
  }
  return navigationStore.currentUrl || ''
})

const currentYear = computed(() => new Date().getFullYear())

// Device info string for footer
const deviceInfoString = computed(() => {
  const device = currentDevice.value
  return `${device.name} - ${device.screenWidth} x ${device.screenHeight} @ ${device.devicePixelRatio}x`
})

// ============================================================================
// Watchers
// ============================================================================

// Sync URL input with navigation store when not focused
watch(
  () => navigationStore.currentUrl,
  (newUrl) => {
    if (!urlInputFocused.value) {
      urlInputValue.value = newUrl
    }
  }
)

// ============================================================================
// Event Handlers - URL Input
// ============================================================================

function handleUrlInputFocus() {
  urlInputFocused.value = true
  urlInputValue.value = navigationStore.currentUrl
}

function handleUrlInputBlur() {
  urlInputFocused.value = false
  urlInputValue.value = navigationStore.currentUrl
}

function handleUrlSubmit() {
  const url = urlInputValue.value.trim()
  if (url) {
    navigationStore.navigate(url)
    preferencesStore.addToUrlHistory(navigationStore.currentUrl)
    urlInputRef.value?.blur()
  }
}

function handleUrlKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleUrlSubmit()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    urlInputValue.value = navigationStore.currentUrl
    urlInputRef.value?.blur()
  }
}

// ============================================================================
// Event Handlers - Navigation
// ============================================================================

function handleNavigate(url: string) {
  navigationStore.navigate(url)
  preferencesStore.addToUrlHistory(navigationStore.currentUrl)
}

function handleBack() {
  navigationStore.goBack()
}

function handleForward() {
  navigationStore.goForward()
}

function handleRefresh() {
  // Force iframe reload by incrementing key
  iframeKey.value++
  navigationStore.refresh()
}

function handleStop() {
  navigationStore.stop()
}

// ============================================================================
// Event Handlers - Viewport
// ============================================================================

function handleLoadStart() {
  navigationStore.setProgress(10)
}

function handleLoadComplete() {
  navigationStore.onLoadComplete()
}

function handleLoadError(error: NavigationError) {
  navigationStore.onLoadError(error)
}

function handleRetry() {
  iframeKey.value++
  navigationStore.refresh()
}

// ============================================================================
// Keyboard Shortcuts
// ============================================================================

function handleKeydown(event: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? event.metaKey : event.ctrlKey

  if (modKey && event.key === 'l') {
    // Focus URL bar
    event.preventDefault()
    urlInputRef.value?.focus()
    urlInputRef.value?.select()
  } else if (modKey && event.key === 'r') {
    // Refresh
    event.preventDefault()
    handleRefresh()
  }
}

onMounted(() => {
  // Apply theme on mount
  preferencesStore.applyThemeToDocument()

  // Add global keyboard listener
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="app"
    :class="{ 'dark': preferencesStore.isDarkMode }"
  >
    <!-- Header with URL Input -->
    <header class="app__header">
      <div class="app__header-content">
        <!-- Logo/Title -->
        <div class="app__branding">
          <svg
            class="app__logo"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect
              x="5"
              y="2"
              width="14"
              height="20"
              rx="3"
              ry="3"
            />
            <line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
            />
          </svg>
          <h1 class="app__title">iPhone Browser Emulator</h1>
        </div>

        <!-- URL Input Bar -->
        <div class="app__url-bar-container">
          <div
            class="app__url-bar"
            :class="{ 'app__url-bar--focused': urlInputFocused }"
          >
            <!-- Globe/Lock Icon -->
            <div class="app__url-icon">
              <svg
                v-if="navigationStore.isCurrentSecure"
                class="app__url-icon-svg app__url-icon-svg--secure"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="app__url-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <!-- Input Field -->
            <input
              ref="urlInputRef"
              type="url"
              class="app__url-input"
              :value="displayUrl"
              placeholder="Enter URL to preview (e.g., apple.com)"
              autocomplete="url"
              autocapitalize="off"
              autocorrect="off"
              spellcheck="false"
              @input="urlInputValue = ($event.target as HTMLInputElement).value"
              @focus="handleUrlInputFocus"
              @blur="handleUrlInputBlur"
              @keydown="handleUrlKeydown"
            >

            <!-- Go Button -->
            <button
              type="button"
              class="app__url-go-btn"
              :disabled="!urlInputValue.trim()"
              @click="handleUrlSubmit"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Keyboard shortcut hint -->
          <p class="app__url-hint">
            Press <kbd>{{ isMac ? '⌘' : 'Ctrl' }}</kbd> + <kbd>L</kbd> to focus
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="app__main">
      <div class="app__device-wrapper">
        <!-- Device Frame -->
        <DeviceFrame
          :device-id="preferencesStore.deviceId"
          :orientation="preferencesStore.orientation"
          :auto-scale="true"
          :max-scale="1"
          :show-shadow="true"
        >
          <!-- Browser Chrome (URL bar inside device) -->
          <BrowserChrome
            :current-url="navigationStore.currentUrl"
            :is-loading="navigationStore.isLoading"
            :can-go-back="navigationStore.canGoBack"
            :can-go-forward="navigationStore.canGoForward"
            @navigate="handleNavigate"
            @back="handleBack"
            @forward="handleForward"
            @refresh="handleRefresh"
            @stop="handleStop"
          />

          <!-- Browser Viewport (iframe) -->
          <BrowserViewport
            :key="iframeKey"
            :url="navigationStore.currentUrl"
            :progress="navigationStore.loadProgress"
            :is-loading="navigationStore.isLoading"
            :error="navigationStore.error"
            @load-start="handleLoadStart"
            @load-complete="handleLoadComplete"
            @load-error="handleLoadError"
            @retry="handleRetry"
          />
        </DeviceFrame>
      </div>

      <!-- Control Panel -->
      <div class="app__controls">
        <ControlPanel />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app__footer">
      <div class="app__footer-content">
        <p class="app__footer-device">
          {{ deviceInfoString }}
        </p>
        <a
          href="https://github.com/MarkAC007/iphone-browser-emulator"
          target="_blank"
          rel="noopener noreferrer"
          class="app__footer-github"
        >
          <svg
            class="app__footer-github-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>
        <p class="app__footer-credits">
          Open Source &bull; MIT Licence &bull; Built with Vue 3 + TypeScript
        </p>
        <p class="app__footer-copyright">
          &copy; {{ currentYear }} iPhone Browser Emulator
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
}

/* Dark mode override */
.app.dark {
  background: linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #1f2937 100%);
}

/* Header */
.app__header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.app__header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .app__header-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.app__branding {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app__logo {
  width: 2rem;
  height: 2rem;
  color: #007aff;
}

.app__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
}

/* URL Bar Container */
.app__url-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 600px;
}

.app__url-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.app__url-bar:hover {
  background: rgba(255, 255, 255, 0.15);
}

.app__url-bar--focused {
  background: rgba(255, 255, 255, 0.2);
  border-color: #007aff;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
}

.app__url-icon {
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.app__url-icon-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #8e8e93;
}

.app__url-icon-svg--secure {
  color: #30d158;
}

.app__url-input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
}

.app__url-input::placeholder {
  color: #8e8e93;
}

.app__url-go-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
  padding: 0;
  background: #007aff;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.app__url-go-btn:hover:not(:disabled) {
  background: #0066cc;
}

.app__url-go-btn:disabled {
  background: rgba(0, 122, 255, 0.4);
  cursor: not-allowed;
}

.app__url-go-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.app__url-hint {
  font-size: 0.75rem;
  color: #8e8e93;
  margin: 0;
}

.app__url-hint kbd {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.75rem;
}

/* Main Content */
.app__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
}

.app__device-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  min-height: 400px;
}

.app__controls {
  width: 100%;
  max-width: 600px;
}

/* Footer */
.app__footer {
  padding: 1rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.app__footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.app__footer-device {
  font-size: 0.875rem;
  color: #007aff;
  margin: 0;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 122, 255, 0.1);
  border-radius: 999px;
}

.app__footer-credits,
.app__footer-copyright {
  font-size: 0.75rem;
  color: #8e8e93;
  margin: 0;
}

.app__footer-github {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.app__footer-github:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.app__footer-github:active {
  transform: translateY(0);
}

.app__footer-github-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app__header {
    padding: 1rem;
  }

  .app__title {
    font-size: 1rem;
  }

  .app__main {
    padding: 1rem;
  }

  .app__footer-content {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .app__url-bar,
  .app__url-go-btn,
  .app__footer-github {
    transition: none;
  }

  .app__footer-github:hover {
    transform: none;
  }
}
</style>
