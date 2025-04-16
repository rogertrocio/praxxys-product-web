<template>
  <div>
    <label v-if="label" for="">{{ label }}</label>
    <div class="relative w-full">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"/>
        <fa-icon :icon="['far', icon ]" class="absolute right-0 top-4 px-4 cursor-pointer text-gray-700" @click="showPassword = !showPassword" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)
const icon = ref('eye-slash')
const type = ref('password')

watch(() => showPassword.value, (val) => {
  if (val) {
    icon.value = 'eye'
    type.value = 'text'
  } else {
    icon.value = 'eye-slash'
    type.value = 'password'
  }
})
</script>
