<template>
  <div>
    <label v-if="label" for="" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3">
      <option value="" disabled>{{ optionLabel }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
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
  }
})

defineEmits(['update:modelValue'])
</script>
