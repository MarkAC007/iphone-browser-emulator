<script setup lang="ts">
/**
 * DeviceSelector Component
 *
 * A dropdown component for selecting iPhone device models.
 * Displays device name and dimensions, grouped by generation.
 */
import { computed } from 'vue'
import { deviceOptions, getDeviceById } from '@/config/devices'
import type { DeviceOption } from '@/types/device'

interface Props {
  /** Currently selected device ID */
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [deviceId: string]
  select: [deviceId: string]
}>()

// Get grouped options for optgroup display
const groupedOptions = computed(() => {
  const groups = new Map<string, DeviceOption[]>()

  for (const option of deviceOptions) {
    const group = option.group ?? 'Other'
    if (!groups.has(group)) {
      groups.set(group, [])
    }
    groups.get(group)!.push(option)
  }

  return groups
})

// Get current device info for display
const currentDevice = computed(() => getDeviceById(props.modelValue))

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const deviceId = target.value
  emit('update:modelValue', deviceId)
  emit('select', deviceId)
}
</script>

<template>
  <div class="relative">
    <label
      for="device-selector"
      class="sr-only"
    >
      Select device model
    </label>

    <select
      id="device-selector"
      :value="modelValue"
      class="
        appearance-none
        w-full min-w-[200px]
        px-4 py-2 pr-10
        bg-slate-200 dark:bg-slate-700
        text-slate-900 dark:text-white
        rounded-lg
        border border-transparent
        hover:bg-slate-300 dark:hover:bg-slate-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
        cursor-pointer
        text-sm font-medium
        transition-colors duration-200
      "
      @change="handleChange"
    >
      <optgroup
        v-for="[groupName, options] in groupedOptions"
        :key="groupName"
        :label="groupName"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </optgroup>
    </select>

    <!-- Dropdown chevron icon -->
    <div
      class="
        absolute right-3 top-1/2 -translate-y-1/2
        pointer-events-none
        text-slate-500 dark:text-slate-400
      "
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>

  <!-- Optional: Show current device dimensions below dropdown -->
  <p
    v-if="currentDevice"
    class="mt-1 text-xs text-slate-500 dark:text-slate-400 text-center"
  >
    {{ currentDevice.screenWidth }} x {{ currentDevice.screenHeight }} @ {{ currentDevice.devicePixelRatio }}x
  </p>
</template>
