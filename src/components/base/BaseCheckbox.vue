<template>
  <div class="flex items-start">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked ? true : false)"
      v-bind="$attrs"
      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
    />
    <div class="ml-3 text-sm">
      <label v-if="label" for="" class="text-gray-500">{{ label }}</label>
    </div>
  </div>
</template>
<script setup>

defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  }
})

defineEmits(['update:modelValue'])
</script>
