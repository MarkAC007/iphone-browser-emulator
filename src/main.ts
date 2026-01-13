/**
 * Application entry point
 *
 * Initialises the Vue 3 application with Pinia state management
 * and mounts it to the DOM
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'

// Create the Vue application instance
const app = createApp(App)

// Create and install Pinia for state management
const pinia = createPinia()
app.use(pinia)

// Mount the application to the DOM
app.mount('#app')
