<script setup lang="ts">
/**
 * BrowserViewport.vue
 * Sandboxed iframe container for displaying web content
 * Handles loading states, errors, and iframe communication
 */

import { ref, computed, watch, onUnmounted } from 'vue'
import type { NavigationError, NavigationErrorType } from '@/types/navigation'
import ProgressBar from './ProgressBar.vue'
import ErrorOverlay from './ErrorOverlay.vue'

interface Props {
  /** URL to display in the viewport */
  url: string
  /** Current loading progress (0-100) */
  progress?: number
  /** Whether currently loading */
  isLoading?: boolean
  /** Navigation error if any */
  error?: NavigationError | null
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  isLoading: false,
  error: null
})

const emit = defineEmits<{
  /** Fired when iframe starts loading */
  loadStart: []
  /** Fired when iframe finishes loading */
  loadComplete: []
  /** Fired when iframe fails to load */
  loadError: [error: NavigationError]
  /** Request to retry loading */
  retry: []
}>()

// Element refs
const iframeRef = ref<HTMLIFrameElement | null>(null)

// Internal loading state (for initial render detection)
const internalLoading = ref(false)
const showSpinner = ref(false)
let spinnerTimeout: number | null = null
let loadTimeout: number | null = null

// Sandbox policy - allows reasonable functionality whilst maintaining security
const sandboxPolicy = computed(() => [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
  'allow-presentation'
].join(' '))

// Check if we have a valid URL to display
const hasUrl = computed(() => {
  return props.url && props.url.length > 0 && props.url !== 'about:blank'
})

// Whether to show the loading overlay
const showLoadingOverlay = computed(() => {
  return internalLoading.value && showSpinner.value && !props.error
})

// Handle URL changes
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl && newUrl !== 'about:blank') {
      startLoading()
    }
  }
)

// Handle external loading state changes
watch(
  () => props.isLoading,
  (loading) => {
    if (loading) {
      startLoading()
    } else {
      stopLoading()
    }
  }
)

function startLoading(): void {
  internalLoading.value = true
  emit('loadStart')

  // Clear any existing timeouts
  if (spinnerTimeout) clearTimeout(spinnerTimeout)
  if (loadTimeout) clearTimeout(loadTimeout)

  // Show spinner after a short delay (avoid flash for fast loads)
  spinnerTimeout = window.setTimeout(() => {
    if (internalLoading.value) {
      showSpinner.value = true
    }
  }, 300)

  // Set a reasonable load timeout (30 seconds)
  loadTimeout = window.setTimeout(() => {
    if (internalLoading.value) {
      handleLoadError('timeout', 'The page took too long to load')
    }
  }, 30000)
}

function stopLoading(): void {
  internalLoading.value = false
  showSpinner.value = false

  if (spinnerTimeout) {
    clearTimeout(spinnerTimeout)
    spinnerTimeout = null
  }
  if (loadTimeout) {
    clearTimeout(loadTimeout)
    loadTimeout = null
  }
}

function handleIframeLoad(): void {
  stopLoading()
  emit('loadComplete')
}

function handleIframeError(): void {
  handleLoadError('network', 'Failed to load the page')
}

function handleLoadError(type: NavigationErrorType, message: string): void {
  stopLoading()

  const error: NavigationError = {
    type,
    message,
    url: props.url,
    timestamp: Date.now(),
    recoverable: type !== 'invalid-url'
  }

  emit('loadError', error)
}

function handleRetry(): void {
  emit('retry')
}

function handleOpenInNewTab(): void {
  if (props.url) {
    window.open(props.url, '_blank', 'noopener,noreferrer')
  }
}

function handleDismissError(): void {
  // Just dismiss the error overlay
}

// Cleanup on unmount
onUnmounted(() => {
  if (spinnerTimeout) clearTimeout(spinnerTimeout)
  if (loadTimeout) clearTimeout(loadTimeout)
})
</script>

<template>
  <div class="browser-viewport">
    <!-- Progress bar -->
    <ProgressBar
      :progress="props.progress ?? 0"
      :is-loading="props.isLoading || internalLoading"
    />

    <!-- Iframe container -->
    <div class="browser-viewport__container">
      <!-- Empty state -->
      <div
        v-if="!hasUrl && !error"
        class="browser-viewport__empty"
      >
        <div class="browser-viewport__empty-content">
          <svg
            class="browser-viewport__empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <p class="browser-viewport__empty-text">
            Enter a URL above to preview
          </p>
        </div>
      </div>

      <!-- Iframe -->
      <iframe
        v-if="hasUrl"
        ref="iframeRef"
        :src="url"
        :sandbox="sandboxPolicy"
        class="browser-viewport__iframe"
        :class="{ 'browser-viewport__iframe--loading': showLoadingOverlay }"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
        referrerpolicy="no-referrer-when-downgrade"
        loading="eager"
        @load="handleIframeLoad"
        @error="handleIframeError"
      />

      <!-- Loading overlay -->
      <Transition name="fade">
        <div
          v-if="showLoadingOverlay"
          class="browser-viewport__loading"
        >
          <div class="browser-viewport__spinner" aria-label="Loading">
            <svg
              class="browser-viewport__spinner-svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="browser-viewport__spinner-track"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="browser-viewport__spinner-head"
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <p class="browser-viewport__loading-text">
            Loading...
          </p>
        </div>
      </Transition>

      <!-- Error overlay -->
      <ErrorOverlay
        :error="props.error ?? null"
        :url="props.url"
        @retry="handleRetry"
        @open-in-new-tab="handleOpenInNewTab"
        @dismiss="handleDismissError"
      />
    </div>
  </div>
</template>

<style scoped>
.browser-viewport {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow: hidden;
}

.browser-viewport__container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
}

.browser-viewport__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #ffffff;
  transition: opacity 0.2s ease;
}

.browser-viewport__iframe--loading {
  opacity: 0.3;
}

/* Empty state */
.browser-viewport__empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
}

.browser-viewport__empty-content {
  text-align: center;
  padding: 2rem;
}

.browser-viewport__empty-icon {
  width: 4rem;
  height: 4rem;
  color: #c7c7cc;
  margin: 0 auto 1rem;
}

.browser-viewport__empty-text {
  font-size: 0.9375rem;
  color: #8e8e93;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
}

/* Loading overlay */
.browser-viewport__loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 20;
}

.browser-viewport__spinner {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.75rem;
}

.browser-viewport__spinner-svg {
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;
}

.browser-viewport__spinner-track {
  opacity: 0.2;
  color: #007aff;
}

.browser-viewport__spinner-head {
  color: #007aff;
}

.browser-viewport__loading-text {
  font-size: 0.875rem;
  color: #8e8e93;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .browser-viewport {
    background-color: #1c1c1e;
  }

  .browser-viewport__iframe {
    background-color: #1c1c1e;
  }

  .browser-viewport__empty {
    background-color: #2c2c2e;
  }

  .browser-viewport__empty-icon {
    color: #48484a;
  }

  .browser-viewport__empty-text {
    color: #98989d;
  }

  .browser-viewport__loading {
    background-color: rgba(28, 28, 30, 0.9);
  }

  .browser-viewport__loading-text {
    color: #98989d;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .browser-viewport__spinner-svg {
    animation: none;
  }

  .browser-viewport__iframe {
    transition: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
