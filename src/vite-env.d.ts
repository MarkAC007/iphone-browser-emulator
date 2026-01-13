/// <reference types="vite/client" />

/**
 * Type declarations for Vite environment
 *
 * Ensures TypeScript recognises .vue files and Vite-specific
 * features throughout the application
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

/**
 * Environment variable type definitions
 *
 * Add any custom environment variables used in the application here
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Add additional environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
