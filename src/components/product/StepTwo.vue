<template>
  <h3 class="text-lg font-medium leading-none text-gray-900">Step 2 - Image Attachment</h3>
  <hr class="h-px my-3 bg-gray-200 border-0">

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4">
      <h3 class="font-medium">Upload Image</h3>
      <span class="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ullam.</span>
    </div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] space-y-6">
        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-teal-500"><span class="font-semibold">Click to upload</span></p>
                <p class="text-xs text-gray-500">PNG, JPG or GIF</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              multiple
              @change="(e) => uploadImage(e)"
              class="hidden" />
          </label>
        </div>
        <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>

        <div class="grid md:grid-cols-3 gap-4">
          <div v-for="(image, i) in model.images" :key="i" class="h-fit relative group rounded-lg hover:shadow-xl">
            <img class="h-auto max-w-full rounded-lg" :src="renderImage(image)" alt="Photo">
            <fa-icon
              icon="circle-xmark"
              size="xl"
              class="absolute right-0 top-0 mr-3 mt-3 text-red-400 cursor-pointer group-hover:text-red-600"
              @click="model.images.splice(i, 1)" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4"></div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] flex justify-end gap-3">

        <BaseButton
          type="button"
          label="Previous"
          class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
          @click="emit('back')" />
        <BaseButton
          type="button"
          label="Next Step"
          class="text-white bg-teal-600 hover:bg-teal-700"
          @click="nextStep" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['back', 'next'])

const errorMessage = ref(null)
const model = ref({
  images: [...props.images]
})

const imageExtensions = ref([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/apng',
  'image/avif',
])

watch(model.value.images, (val) => {
  if (val) errorMessage.value = null
}, {deep: true})

const uploadImage = (e) => {
  var files = e.target.files || e.dataTransfer.files
  if (files.length === 0) return

  for (let i = 0; i < files.length; i++) {
    if (!isImageFile(files[i])) {
      toast.error(`${files[i].name} must be an image.`)
      continue
    }

    if (!checkFileSize(files[i])) {
      toast.error(`${files[i].name} size must not be greater than 2mb.`)
      continue
    }

    model.value.images.push(files[i])
  }
}

const renderImage = (file) => {
  const src = URL.createObjectURL(file)
  return src
}

const isImageFile = (file) => {
  return imageExtensions.value.includes(file.type)
}

const checkFileSize = (file) => {
  const mb = (file.size / Math.pow(1024, 2)).toFixed(1) * 1
  return mb <= 2
}

const nextStep = () => {
  if (model.value.images.length === 0) {
    errorMessage.value = 'Add at least one (1) image.'
    toast.error(`${errorMessage.value}`)
    return false
  }

  emit('next', model.value)
}
</script>
