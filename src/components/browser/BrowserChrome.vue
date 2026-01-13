<script setup lang="ts">
/**
 * BrowserChrome.vue
 * Safari-style URL bar and navigation controls
 * Features iOS-authentic styling with blur background and rounded input
 */

import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  /** Current URL being displayed */
  currentUrl?: string
  /** Whether a page is currently loading */
  isLoading?: boolean
  /** Whether back navigation is available */
  canGoBack?: boolean
  /** Whether forward navigation is available */
  canGoForward?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentUrl: '',
  isLoading: false,
  canGoBack: false,
  canGoForward: false
})

const emit = defineEmits<{
  /** Navigate to a new URL */
  navigate: [url: string]
  /** Go back in history */
  back: []
  /** Go forward in history */
  forward: []
  /** Refresh the current page */
  refresh: []
  /** Stop loading */
  stop: []
}>()

// Input state
const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const isFocused = ref(false)

// Sync input value with current URL when not focused
watch(
  () => props.currentUrl,
  (newUrl) => {
    if (!isFocused.value) {
      inputValue.value = newUrl
    }
  },
  { immediate: true }
)

// Computed properties
const isSecure = computed(() => {
  try {
    return new URL(props.currentUrl).protocol === 'https:'
  } catch {
    return false
  }
})

const displayUrl = computed(() => {
  if (isFocused.value) {
    return inputValue.value
  }

  // When not focused, show a cleaner version of the URL
  try {
    const url = new URL(props.currentUrl)
    // Remove protocol and trailing slash for cleaner display
    let display = url.hostname + url.pathname
    if (display.endsWith('/')) {
      display = display.slice(0, -1)
    }
    if (url.search) {
      display += url.search
    }
    return display
  } catch {
    return props.currentUrl || ''
  }
})

const placeholder = computed(() => {
  return isFocused.value ? 'Enter URL...' : 'Search or enter website name'
})

// Event handlers
function handleFocus(): void {
  isFocused.value = true
  // Restore full URL for editing
  inputValue.value = props.currentUrl
  // Select all text for easy replacement
  nextTick(() => {
    inputRef.value?.select()
  })
}

function handleBlur(): void {
  isFocused.value = false
  // Reset to current URL
  inputValue.value = props.currentUrl
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitUrl()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    inputRef.value?.blur()
  }
}

function submitUrl(): void {
  const url = inputValue.value.trim()
  if (url) {
    emit('navigate', url)
    inputRef.value?.blur()
  }
}

function handleBack(): void {
  if (props.canGoBack) {
    emit('back')
  }
}

function handleForward(): void {
  if (props.canGoForward) {
    emit('forward')
  }
}

function handleRefreshOrStop(): void {
  if (props.isLoading) {
    emit('stop')
  } else {
    emit('refresh')
  }
}

function handleShare(): void {
  // Decorative - could be enhanced to open share sheet
  if (navigator.share && props.currentUrl) {
    navigator.share({
      url: props.currentUrl
    }).catch(() => {
      // User cancelled or share failed - ignore
    })
  }
}
</script>

<template>
  <div class="browser-chrome">
    <!-- Navigation buttons (left) -->
    <div class="browser-chrome__nav">
      <button
        class="browser-chrome__nav-btn"
        :class="{ 'browser-chrome__nav-btn--disabled': !canGoBack }"
        :disabled="!canGoBack"
        :aria-disabled="!canGoBack"
        aria-label="Go back"
        @click="handleBack"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        class="browser-chrome__nav-btn"
        :class="{ 'browser-chrome__nav-btn--disabled': !canGoForward }"
        :disabled="!canGoForward"
        :aria-disabled="!canGoForward"
        aria-label="Go forward"
        @click="handleForward"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- URL bar (centre) -->
    <div
      class="browser-chrome__url-bar"
      :class="{ 'browser-chrome__url-bar--focused': isFocused }"
    >
      <!-- Security indicator -->
      <div class="browser-chrome__security" aria-hidden="true">
        <!-- Lock icon (secure) -->
        <svg
          v-if="isSecure && currentUrl"
          class="browser-chrome__security-icon browser-chrome__security-icon--secure"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
            clip-rule="evenodd"
          />
        </svg>
        <!-- Unlock icon (insecure) -->
        <svg
          v-else-if="currentUrl && !isFocused"
          class="browser-chrome__security-icon browser-chrome__security-icon--insecure"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            d="M11.5 1A3.5 3.5 0 0 0 8 4.5V7H2.5A1.5 1.5 0 0 0 1 8.5v5A1.5 1.5 0 0 0 2.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 9.5 7V4.5a2 2 0 1 1 4 0v1.75a.75.75 0 0 0 1.5 0V4.5A3.5 3.5 0 0 0 11.5 1Z"
          />
        </svg>
        <!-- Search icon (empty/focused) -->
        <svg
          v-else
          class="browser-chrome__security-icon browser-chrome__security-icon--search"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Input field -->
      <input
        ref="inputRef"
        type="text"
        class="browser-chrome__input"
        :value="isFocused ? inputValue : displayUrl"
        :placeholder="placeholder"
        autocomplete="url"
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        enterkeyhint="go"
        inputmode="url"
        aria-label="URL address bar"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeydown"
      >

      <!-- Refresh/Stop button -->
      <button
        v-if="currentUrl && !isFocused"
        class="browser-chrome__action-btn"
        :aria-label="isLoading ? 'Stop loading' : 'Refresh page'"
        @click="handleRefreshOrStop"
      >
        <!-- Stop icon (X) -->
        <svg
          v-if="isLoading"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
          />
        </svg>
        <!-- Refresh icon -->
        <svg
          v-else
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Right actions -->
    <div class="browser-chrome__actions">
      <button
        class="browser-chrome__share-btn"
        aria-label="Share"
        @click="handleShare"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.474l6.733-3.367A2.52 2.52 0 0 1 13 4.5Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.browser-chrome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(247, 247, 247, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  min-height: 44px;
}

/* Navigation buttons */
.browser-chrome__nav {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.browser-chrome__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #007aff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.browser-chrome__nav-btn:hover:not(:disabled) {
  background: rgba(0, 122, 255, 0.1);
}

.browser-chrome__nav-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.browser-chrome__nav-btn--disabled {
  color: #c7c7cc;
  cursor: not-allowed;
}

.browser-chrome__nav-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* URL bar */
.browser-chrome__url-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
  height: 2.25rem;
  padding: 0 0.75rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  transition: all 0.2s ease;
}

.browser-chrome__url-bar--focused {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
}

/* Security indicator */
.browser-chrome__security {
  flex-shrink: 0;
}

.browser-chrome__security-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.browser-chrome__security-icon--secure {
  color: #34c759;
}

.browser-chrome__security-icon--insecure {
  color: #8e8e93;
}

.browser-chrome__security-icon--search {
  color: #8e8e93;
}

/* Input field */
.browser-chrome__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
  color: #1c1c1e;
  text-align: center;
  text-overflow: ellipsis;
  outline: none;
}

.browser-chrome__input::placeholder {
  color: #8e8e93;
}

.browser-chrome__url-bar--focused .browser-chrome__input {
  text-align: left;
}

/* Action button (refresh/stop) */
.browser-chrome__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #8e8e93;
  cursor: pointer;
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.browser-chrome__action-btn:hover {
  color: #007aff;
}

.browser-chrome__action-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Right actions */
.browser-chrome__actions {
  display: flex;
  align-items: center;
}

.browser-chrome__share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #007aff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.browser-chrome__share-btn:hover {
  background: rgba(0, 122, 255, 0.1);
}

.browser-chrome__share-btn:active {
  transform: scale(0.95);
}

.browser-chrome__share-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .browser-chrome {
    background: rgba(44, 44, 46, 0.85);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .browser-chrome__nav-btn--disabled {
    color: #48484a;
  }

  .browser-chrome__url-bar {
    background: rgba(255, 255, 255, 0.1);
  }

  .browser-chrome__url-bar--focused {
    background: rgba(58, 58, 60, 0.9);
  }

  .browser-chrome__input {
    color: #ffffff;
  }

  .browser-chrome__input::placeholder {
    color: #98989d;
  }

  .browser-chrome__security-icon--secure {
    color: #30d158;
  }

  .browser-chrome__security-icon--insecure,
  .browser-chrome__security-icon--search {
    color: #98989d;
  }

  .browser-chrome__action-btn {
    color: #98989d;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .browser-chrome__nav-btn,
  .browser-chrome__url-bar,
  .browser-chrome__action-btn,
  .browser-chrome__share-btn {
    transition: none;
  }
}
</style>
