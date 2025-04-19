<template>
  <h3 class="text-lg font-medium leading-none text-gray-900 dark:text-white">Step 3 - Submit</h3>
  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4">
      <h3 class="font-medium">Date and Time</h3>
      <span class="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ullam.</span>
    </div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] space-y-6">
        <BaseDate
          v-model="model.date_time"
          @change="store.errors.date_time = null"
          :error="store.errors.date_time?.[0] || null"
          type="datetime-local"
          step="1"
          class="w-full" />
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4"></div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] flex items-center justify-between">
        <BaseButton
          type="button"
          label="Cancel"
          class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
          @click="router.push('/'), store.errors = {}" />

        <div class="flex justify-end gap-3">
          <BaseButton
            type="button"
            label="Previous"
            class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
            @click="emit('back')" />

          <BaseButton
            type="button"
            label="Submit"
            class="text-white bg-teal-600 hover:bg-teal-700"
            :loading="store.loading"
            :disabled="store.loading"
            @click="submit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseDate from '@/components/base/BaseDate.vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { z } from 'zod'

const props = defineProps({
  date_time: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['back', 'next'])

const router = useRouter()
const store = useProductStore()
const model = ref({
  date_time: props.date_time,
})

const schema = z.object({
  date_time: z.string({ message: 'Date and time is required.' }),
})

const submit = () => {
  const result = schema.safeParse(model.value)

  if (!result.success) {
    const formattedErrors = result.error.format()

    store.errors.date_time = formattedErrors.date_time?._errors

    return
  }

  emit('next', model.value)
}

</script>
