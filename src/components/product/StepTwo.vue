<template>
  <h3 class="text-lg font-medium leading-none text-gray-900 dark:text-white">Step 2 - Image Attachment</h3>
  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4">
      <h3 class="font-medium">Upload Image</h3>
      <span class="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ullam.</span>
    </div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] space-y-6">
        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
              </div>
              <input id="dropzone-file" type="file" accept="image/*" multiple @change="(event) => handleFileUpload(event)" class="hidden" />
          </label>
      </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(src, i) in imageSrc" :key="i">
            <img class="relative h-auto max-w-full border rounded-lg hover:shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-110" :src="src" alt="Photo">
            <fa-icon icon="circle-xmark" size="xl" class="absolute right-0 top-0"/>
          </div>
          <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4"></div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] flex justify-end gap-3">

        <BaseButton type="button" label="Previous" class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100" />
        <BaseButton type="button" label="Next Step" class="text-white bg-teal-600 hover:bg-teal-700" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

const model = ref({
  name: null,
  category_id: null,
  description: null,
})

const imageSrc = ref([])
const selectedFiles = ref([])

const handleFileUpload = (e) => {
  var files = e.target.files || e.dataTransfer.files
  if (!files.length > 0) return

  for (let i = 0; i < files.length; i++) {
    selectedFiles.value.push(files[i])
    const src = URL.createObjectURL(files[i])
    imageSrc.value.push(src)
  }

}
</script>
