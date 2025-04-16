<template>
  <div>
    <label v-if="label" for="" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="border rounded-lg block p-2.5"
      :class="{
        'bg-gray-50 border-gray-300 text-gray-900 focus:ring-teal-600 focus:border-teal-600':
          error === null,
        ' bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
          error !== null,
      }"/>
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: null,
  },
})

defineEmits(['update:modelValue'])
</script>
