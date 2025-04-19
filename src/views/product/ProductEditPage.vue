<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

    <div class="mb-6">
      <p class="text-xl font-semibold">Edit Product</p>
      <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </div>

    <!-- Stepper -->
    <ol class="flex items-center w-full mb-10 p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white sm:text-base  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li class="flex items-center" :class="{ 'text-teal-600' : step >= 1 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{ 'border-teal-600 ' : step >= 1  }">
            <fa-icon icon="check" v-if="step > 1" />
             <span v-else>1</span>
        </span>
        Product <span class="hidden sm:inline-flex sm:ms-2">Information</span>
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="flex items-center" :class="{ 'text-teal-600' : step >= 2 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{'border-teal-600 ' : step >= 2 , 'border-gray-500' : step !== 2 }">
            <fa-icon icon="check" v-if="step > 2" />
            <span v-else>2</span>
        </span>
        Image <span class="hidden sm:inline-flex sm:ms-2">Attachment</span>
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="flex items-center" :class="{ 'text-teal-600' : step === 3 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{'border-teal-600 ' : step === 3 , 'border-gray-500' : step !== 3 }">
            3
        </span>
        Submit
      </li>
    </ol>

    <!-- Step Form -->
    <template v-if="dataLoaded">
      <StepOne
        v-if="step === 1"
        :name="model.name"
        :category_id="model.category_id"
        :description="model.description"
        @next="firstStep" />

      <StepTwo
        v-if="step === 2"
        :images="model.images"
        :old_images="model.old_images"
        @back="step = 1"
        @next="secondStep" />

      <StepThree
        v-if="step === 3"
        :date_time="model.date_time"
        @back="step = 2"
        @next="thirdStep" />
    </template>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import StepOne from '@/components/product/StepOne.vue'
import StepTwo from '@/components/product/StepTwo.vue'
import StepThree from '@/components/product/StepThree.vue'
import { useProductStore } from '@/stores/product'
import { toast } from 'vue3-toastify'
import { useRouter, useRoute } from 'vue-router'
import { useDate } from '@/composables/date'

const store = useProductStore()
const router = useRouter()
const route = useRoute()
const date = useDate()
const dataLoaded = ref(false)
const step = ref(1)
const model = ref({
  name: null,
  category_id: null,
  description: null,
  date_time: null,
  images: [],
  old_images: [],
})

onMounted(async () => {
  try {
    const product = await store.getProduct(route.params.id)

    model.value.name = product.name
    model.value.category_id = product.category_id
    model.value.description = product.description
    model.value.date_time = product.date_time
    model.value.old_images = product.images

    dataLoaded.value = true
  } catch (e) {
    console.log(e)
    dataLoaded.value = false
  }
})

const firstStep = (e) => {
  step.value = 2
  model.value.name = e.name
  model.value.category_id = e.category_id
  model.value.description = e.description
}

const secondStep = (e) => {
  step.value = 3
  console.log('step 3', e.old_images)
  model.value.images = e.images
  model.value.old_images = e.old_images
}

const thirdStep = (e) => {
  model.value.date_time = date.format(e.date_time)

  submit()
}

const submit = async () => {
  try {
    await store.updateProduct(route.params.id, model.value)
    toast.success('Product updated successfully.')
    router.push('/')
  } catch (e) {
    console.log(e)
    toast.error(`${store.errorMessage}`)
  }
}
</script>
