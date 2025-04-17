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
        <BaseDate v-model="model.date_time" type="datetime-local" step="1" class="w-full" />
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4"></div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] flex justify-end gap-3">
        <BaseButton type="button" label="Previous" class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100" />
        <BaseButton type="button" label="Submit" class="text-white bg-teal-600 hover:bg-teal-700" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseDate from '@/components/base/BaseDate.vue';

const model = ref({
  name: null,
  category_id: null,
  description: null,
  date_time: null,
})
</script>
