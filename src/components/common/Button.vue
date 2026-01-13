<script setup lang="ts">
/**
 * Button Component
 *
 * A versatile button component with multiple variants and sizes.
 * Supports icons, loading state, and full customisation.
 */
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  /** Button variant: 'primary' | 'secondary' | 'ghost' | 'danger' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Button size: 'sm' | 'md' | 'lg' */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Whether the button should take full width */
  fullWidth?: boolean
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Optional icon position */
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
  iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}

const baseClasses = `
  inline-flex items-center justify-center gap-2
  font-medium rounded-lg
  transition-all duration-200 ease-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`

const variantClasses = {
  primary: `
    bg-blue-500 text-white
    hover:bg-blue-600 active:bg-blue-700
    focus-visible:ring-blue-500
    dark:bg-blue-600 dark:hover:bg-blue-500
  `,
  secondary: `
    bg-slate-200 text-slate-900
    hover:bg-slate-300 active:bg-slate-400
    focus-visible:ring-slate-500
    dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600
  `,
  ghost: `
    bg-transparent text-slate-700
    hover:bg-slate-100 active:bg-slate-200
    focus-visible:ring-slate-500
    dark:text-slate-300 dark:hover:bg-slate-800
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600 active:bg-red-700
    focus-visible:ring-red-500
  `
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="[
      baseClasses,
      variantClasses[props.variant],
      sizeClasses[props.size],
      { 'w-full': props.fullWidth }
    ]"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <LoadingSpinner
      v-if="props.loading"
      size="sm"
      :colour="props.variant === 'primary' || props.variant === 'danger' ? 'text-white' : 'text-current'"
    />

    <!-- Left icon slot -->
    <slot
      v-if="!props.loading && props.iconPosition === 'left'"
      name="icon"
    />

    <!-- Button text -->
    <span :class="{ 'opacity-0': props.loading && !$slots['icon'] }">
      <slot />
    </span>

    <!-- Right icon slot -->
    <slot
      v-if="!props.loading && props.iconPosition === 'right'"
      name="icon"
    />
  </button>
</template>
