<template>
  <div v-if="props.visible" class="fixed flex justify-center items-center w-full h-screen top-0 right-0 left-0 z-50 bg-black/50">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm">
        <button
          @click="emit('close')"
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
          <fa-icon icon="close" size="xl"/>
        </button>
        <div class="p-4 md:p-5 text-center">
            <fa-icon :icon="props.icon" class="text-[48px] mt-6" :class="[props.iconColor]" />
            <p class="text-xl my-4 font-semibold text-gray-800">{{ props.title }}</p>
            <div class="mb-10 font-normal text-gray-600" v-html="props.message"></div>

            <div class="flex items-center justify-center gap-3">
              <BaseButton
                type="button"
                :label="props.cancelLabel"
                class="flex-1 text-gray-600"
                :class="[props.cancelColor]"
                @click="emit('close')" />
              <BaseButton
                type="button"
                :label="props.confirmLabel"
                class="flex-1"
                :loading="props.loading"
                :disabled="props.loading"
                :class="[props.confirmColor]"
                @click="emit('confirm')" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from '../base/BaseButton.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: 'This is message.',
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    required: false,
    default: 'circle-exclamation',
  },
  iconColor: {
    type: String,
    required: false,
    default: 'text-red-400',
  },
  confirmLabel: {
    type: String,
    required: false,
    default: 'Confirm',
  },
  confirmColor: {
    type: String,
    required: false,
    default: 'text-white bg-red-600 hover:bg-red-700',
  },
  cancelLabel: {
    type: String,
    required: false,
    default: 'Cancel',
  },
  cancelColor: {
    type: String,
    required: false,
    default: 'bg-white border border-gray-300 hover:bg-gray-100'
  }
})

const emit = defineEmits(['close', 'confirm'])
</script>
