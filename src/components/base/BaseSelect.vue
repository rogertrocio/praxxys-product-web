<template>
  <div>
    <label v-if="label" for="" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="border text-sm rounded-lg block p-3"
      :class="{
        'bg-gray-50 border-gray-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500':
          error === null,
        ' bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
          error !== null,
      }">
      <option value="" disabled>{{ optionLabel }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  optionLabel: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    required: true
  },
  error: {
    type: String,
    default: null,
  },
})

defineEmits(['update:modelValue'])
</script>
