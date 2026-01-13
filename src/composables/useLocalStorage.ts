import { ref, watch, onUnmounted, getCurrentInstance, type Ref } from 'vue'

// Re-export STORAGE_KEYS from central config
export { STORAGE_KEYS } from '@/config/constants'

/**
 * Composable for persisting data in localStorage with reactive synchronisation
 *
 * @template T - The type of value to store
 * @param key - localStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Reactive ref that syncs with localStorage
 *
 * @example
 * ```typescript
 * const theme = useLocalStorage('theme', 'light')
 * theme.value = 'dark' // Automatically persisted
 * ```
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const storedValue = read<T>(key)
  const data = ref<T>(storedValue ?? defaultValue) as Ref<T>

  // Watch for changes and persist
  watch(
    data,
    (newValue) => {
      write(key, newValue)
    },
    { deep: true }
  )

  // Listen for storage events from other tabs/windows
  if (typeof window !== 'undefined') {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          data.value = JSON.parse(event.newValue)
        } catch {
          // If parsing fails, use the raw value
          data.value = event.newValue as unknown as T
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Clean up listener on unmount if in component context
    if (getCurrentInstance()) {
      onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange)
      })
    }
  }

  return data
}

/**
 * Read a value from localStorage
 *
 * @template T - The expected type of the stored value
 * @param key - localStorage key
 * @returns The parsed value or null if not found/invalid
 */
export function read<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) return null
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

/**
 * Write a value to localStorage
 *
 * @template T - The type of value to store
 * @param key - localStorage key
 * @param value - Value to store (will be JSON serialised)
 * @returns true if successful, false otherwise
 */
export function write<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Failed to write to localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Remove a value from localStorage
 *
 * @param key - localStorage key to remove
 */
export function remove(key: string): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Failed to remove localStorage key "${key}":`, error)
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.clear()
  } catch (error) {
    console.warn('Failed to clear localStorage:', error)
  }
}

/**
 * Get all localStorage keys matching a prefix
 *
 * @param prefix - Key prefix to match
 * @returns Array of matching keys
 */
export function getKeys(prefix?: string): string[] {
  if (typeof window === 'undefined') return []

  const keys: string[] = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (key !== null) {
      if (!prefix || key.startsWith(prefix)) {
        keys.push(key)
      }
    }
  }
  return keys
}

// StorageKey type derived from the central config
import type { STORAGE_KEYS as StorageKeysType } from '@/config/constants'
export type StorageKey = (typeof StorageKeysType)[keyof typeof StorageKeysType]
