<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

    <div class="mb-6">
      <p class="text-xl font-semibold">Create Product</p>
      <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </div>

    <!-- Stepper -->
    <ol class="flex items-center w-full mb-10 p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white sm:text-base  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li class="flex items-center" :class="{ 'text-teal-600' : activeStep >= 1 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{ 'border-teal-600 ' : activeStep >= 1  }">
            <fa-icon icon="check" v-if="activeStep > 1" />
             <span v-else>1</span>
        </span>
        Product <span class="hidden sm:inline-flex sm:ms-2">Information</span>
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="flex items-center" :class="{ 'text-teal-600' : activeStep >= 2 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{'border-teal-600 ' : activeStep >= 2 , 'border-gray-500' : activeStep !== 2 }">
            <fa-icon icon="check" v-if="activeStep > 2" />
            <span v-else>2</span>
        </span>
        Image <span class="hidden sm:inline-flex sm:ms-2">Attachment</span>
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="flex items-center" :class="{ 'text-teal-600' : activeStep === 3 }">
        <span
          class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
          :class="{'border-teal-600 ' : activeStep === 3 , 'border-gray-500' : activeStep !== 3 }">
            3
        </span>
        Submit
      </li>
    </ol>

    <!-- Step Form -->
     <StepOne v-if="activeStep === 1" />

     <StepTwo v-if="activeStep === 2" />

     <StepThree v-if="activeStep === 3" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import StepOne from '@/components/product/StepOne.vue'
import StepTwo from '@/components/product/StepTwo.vue';
import StepThree from '@/components/product/StepThree.vue';

const activeStep = ref(3)
</script>
