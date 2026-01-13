<script setup lang="ts">
/**
 * ErrorOverlay.vue
 * Displays user-friendly error messages for various load failures
 * Provides retry and "open in new tab" options
 */

import { computed } from 'vue'
import type { NavigationError } from '@/types/navigation'

interface Props {
  /** Error object containing type and message */
  error: NavigationError | null
  /** The URL that failed to load */
  url?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  /** Retry loading the current URL */
  retry: []
  /** Open URL in a new browser tab */
  openInNewTab: []
  /** Dismiss the error overlay */
  dismiss: []
}>()

interface ErrorConfig {
  icon: string
  title: string
  description: string
  showOpenInNewTab: boolean
}

const errorConfigs: Record<NavigationError['type'], ErrorConfig> = {
  cors: {
    icon: '🔒',
    title: 'Content Blocked',
    description: 'This website prevents embedding in other pages for security reasons. This is a common protection used by many websites.',
    showOpenInNewTab: true
  },
  'invalid-url': {
    icon: '🔗',
    title: 'Invalid URL',
    description: 'The address you entered doesn\'t appear to be a valid website URL. Please check the spelling and try again.',
    showOpenInNewTab: false
  },
  network: {
    icon: '📡',
    title: 'Connection Failed',
    description: 'Unable to reach this website. Please check your internet connection and ensure the website is available.',
    showOpenInNewTab: true
  },
  blocked: {
    icon: '🚫',
    title: 'Access Denied',
    description: 'This website has blocked access from embedded browsers. You can try opening it directly in a new tab.',
    showOpenInNewTab: true
  },
  timeout: {
    icon: '⏱️',
    title: 'Request Timed Out',
    description: 'The page took too long to load. Please check your connection and try again.',
    showOpenInNewTab: true
  },
  ssl: {
    icon: '🔐',
    title: 'Security Error',
    description: 'There was a problem with the site\'s security certificate. The connection may not be secure.',
    showOpenInNewTab: true
  },
  unknown: {
    icon: '⚠️',
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred whilst loading this page. Please try again.',
    showOpenInNewTab: true
  }
}

const config = computed<ErrorConfig>(() => {
  if (!props.error) {
    return errorConfigs.unknown
  }
  return errorConfigs[props.error.type] || errorConfigs.unknown
})

const customMessage = computed(() => {
  // Use custom message if provided, otherwise use default description
  return props.error?.message || config.value.description
})

function handleRetry(): void {
  emit('retry')
}

function handleOpenInNewTab(): void {
  if (props.url) {
    window.open(props.url, '_blank', 'noopener,noreferrer')
  }
  emit('openInNewTab')
}

function handleDismiss(): void {
  emit('dismiss')
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="error"
      class="error-overlay"
      role="alert"
      aria-live="assertive"
    >
      <div class="error-overlay__content">
        <!-- Icon -->
        <div class="error-overlay__icon" aria-hidden="true">
          {{ config.icon }}
        </div>

        <!-- Title -->
        <h2 class="error-overlay__title">
          {{ config.title }}
        </h2>

        <!-- Description -->
        <p class="error-overlay__description">
          {{ customMessage }}
        </p>

        <!-- URL display -->
        <p v-if="url" class="error-overlay__url">
          <span class="error-overlay__url-label">URL:</span>
          <code class="error-overlay__url-value">{{ url }}</code>
        </p>

        <!-- Actions -->
        <div class="error-overlay__actions">
          <button
            class="error-overlay__btn error-overlay__btn--primary"
            @click="handleRetry"
          >
            <svg
              class="error-overlay__btn-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-9.835a.75.75 0 00-.75.75v2.43l-.31-.31A7 7 0 003.77 7.598a.75.75 0 001.449.39 5.5 5.5 0 019.201-2.466l.312.311h-2.433a.75.75 0 000 1.5h4.243a.75.75 0 00.75-.75V2.34a.75.75 0 00-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
            Try Again
          </button>

          <button
            v-if="config.showOpenInNewTab && url"
            class="error-overlay__btn error-overlay__btn--secondary"
            @click="handleOpenInNewTab"
          >
            <svg
              class="error-overlay__btn-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clip-rule="evenodd"
              />
            </svg>
            Open in New Tab
          </button>
        </div>

        <!-- Dismiss button -->
        <button
          class="error-overlay__dismiss"
          @click="handleDismiss"
          aria-label="Dismiss error"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.error-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 40;
  padding: 1rem;
}

.error-overlay__content {
  position: relative;
  max-width: 320px;
  text-align: center;
  padding: 1.5rem;
}

.error-overlay__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.error-overlay__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1c1c1e;
  margin: 0 0 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
}

.error-overlay__description {
  font-size: 0.875rem;
  color: #6e6e73;
  line-height: 1.5;
  margin: 0 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
}

.error-overlay__url {
  font-size: 0.75rem;
  color: #8e8e93;
  margin: 0 0 1.25rem;
  word-break: break-all;
}

.error-overlay__url-label {
  display: block;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.error-overlay__url-value {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.error-overlay__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.error-overlay__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  min-height: 44px;
}

.error-overlay__btn--primary {
  background-color: #007aff;
  color: white;
}

.error-overlay__btn--primary:hover {
  background-color: #0056cc;
}

.error-overlay__btn--primary:active {
  transform: scale(0.98);
}

.error-overlay__btn--secondary {
  background-color: rgba(0, 122, 255, 0.1);
  color: #007aff;
}

.error-overlay__btn--secondary:hover {
  background-color: rgba(0, 122, 255, 0.15);
}

.error-overlay__btn--secondary:active {
  transform: scale(0.98);
}

.error-overlay__btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.error-overlay__dismiss {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #8e8e93;
  transition: all 0.15s ease;
}

.error-overlay__dismiss:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1c1c1e;
}

.error-overlay__dismiss svg {
  width: 1rem;
  height: 1rem;
}

/* Transition */
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
  .error-overlay {
    background-color: rgba(28, 28, 30, 0.95);
  }

  .error-overlay__title {
    color: #ffffff;
  }

  .error-overlay__description {
    color: #aeaeb2;
  }

  .error-overlay__url {
    color: #8e8e93;
  }

  .error-overlay__url-value {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .error-overlay__dismiss {
    background: rgba(255, 255, 255, 0.1);
    color: #aeaeb2;
  }

  .error-overlay__dismiss:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .error-overlay__btn {
    transition: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
