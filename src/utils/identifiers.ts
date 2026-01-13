/**
 * Identifier generation utilities
 *
 * Provides functions for generating unique identifiers
 * used throughout the application
 */

/**
 * Generates a unique tab identifier
 *
 * Creates a random alphanumeric string suitable for
 * identifying browser tabs within the application
 *
 * @returns A unique string identifier for a tab
 */
export function generateTabId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 9)
  return `tab-${timestamp}-${randomPart}`
}

/**
 * Generates a unique session identifier
 *
 * Creates a longer random string suitable for
 * session tracking and analytics
 *
 * @returns A unique string identifier for a session
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  return `session-${timestamp}-${randomPart}`
}

/**
 * Generates a unique history entry identifier
 *
 * @returns A unique string identifier for a history entry
 */
export function generateHistoryId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 7)
  return `hist-${timestamp}-${randomPart}`
}
