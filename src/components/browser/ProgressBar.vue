<script setup lang="ts">
/**
 * ProgressBar.vue
 * iOS-authentic thin blue loading progress indicator
 * Animates smoothly and fades out on completion
 */

import { computed, watch, ref } from 'vue'

interface Props {
  /** Current progress value (0-100) */
  progress: number
  /** Whether loading is in progress */
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  isLoading: false
})

// Track visibility state for fade-out animation
const isVisible = ref(false)
const displayProgress = ref(0)

// Smooth progress animation
watch(
  () => props.progress,
  (newProgress) => {
    displayProgress.value = newProgress
  }
)

// Handle visibility based on loading state
watch(
  () => props.isLoading,
  (loading) => {
    if (loading) {
      isVisible.value = true
      displayProgress.value = props.progress
    } else {
      // Keep visible briefly after load completes for smooth fade
      setTimeout(() => {
        isVisible.value = false
      }, 300)
    }
  },
  { immediate: true }
)

const progressStyle = computed(() => ({
  width: `${displayProgress.value}%`
}))

const barClasses = computed(() => [
  'progress-bar',
  {
    'progress-bar--visible': isVisible.value,
    'progress-bar--complete': !props.isLoading && displayProgress.value >= 100
  }
])
</script>

<template>
  <div :class="barClasses">
    <div
      class="progress-bar__fill"
      :style="progressStyle"
    />
  </div>
</template>

<style scoped>
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: transparent;
  overflow: hidden;
  z-index: 50;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.progress-bar--visible {
  opacity: 1;
}

.progress-bar--complete {
  opacity: 0;
  transition: opacity 0.5s ease-out 0.2s;
}

.progress-bar__fill {
  height: 100%;
  /* iOS Safari blue */
  background: linear-gradient(
    90deg,
    #007aff 0%,
    #5ac8fa 50%,
    #007aff 100%
  );
  background-size: 200% 100%;
  border-radius: 0 1px 1px 0;
  transition: width 0.2s ease-out;
  animation: shimmer 1.5s ease-in-out infinite;
  box-shadow: 0 0 4px rgba(0, 122, 255, 0.4);
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .progress-bar__fill {
    animation: none;
    background: #007aff;
  }

  .progress-bar,
  .progress-bar__fill {
    transition: none;
  }
}
</style>
