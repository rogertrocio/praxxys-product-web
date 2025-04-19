<template>
  <h3 class="text-lg font-medium leading-none text-gray-900 dark:text-white">Step 1 - Product Information</h3>
  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4">
      <h3 class="font-medium">Product Details</h3>
      <span class="text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ullam.</span>
    </div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] space-y-6">
        <BaseInput
          v-model="model.name"
          @keydown="storeProduct.errors.name = null"
          :error="storeProduct.errors.name?.[0] || null"
          label="Name"
          placeholder="Name"
          class="w-full" />

        <BaseSelect
          v-model="model.category_id"
          :options="storeCommon.categories"
          @change="storeProduct.errors.category_id = null"
          :error="storeProduct.errors.category_id?.[0] || null"
          label="Category"
          option-label="Select Category"
          class="w-full" />

        <BaseHtmlEditor
          v-model="model.description"
          @keydown="storeProduct.errors.description = null"
          :error="storeProduct.errors.description?.[0] || null"
          label="Description" />
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="w-3/12 pr-4 py-4"></div>
    <div class="w-9/12 flex py-4 justify-center">
      <div class="w-[700px] flex justify-end gap-3">
        <BaseButton
          type="button"
          label="Cancel"
          class="text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
          @click="router.push('/'), storeProduct.errors = {}" />
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
import { onMounted, ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseHtmlEditor from '@/components/base/BaseHtmlEditor.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common'
import { useProductStore } from '@/stores/product'
import { z } from 'zod'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  category_id: {
    type: [String, Number],
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['next'])

const router = useRouter()
const storeCommon = useCommonStore()
const storeProduct = useProductStore()

const model = ref({
  name: props.name,
  category_id: props.category_id,
  description: props.description
})

const schema = z.object({
  name: z.string({ message: 'Name is required.' })
    .min(2, { message:  'Name must be at aleast 2 characters.'})
    .max(150, { message:  'Name may not be greater than 150 characters.'})
    .refine((val) => val.trim().length > 0, { message: 'Name is required.' }),
  category_id: z.union([z.string(), z.number()], { message: 'Category is required.' }),
  description: z.nullable(
    z.string()
      .min(3, { message:  'Description must be at aleast 3 characters.'})
  ),
})

onMounted(() => {
  storeCommon.getCategories()
})

const nextStep = () => {
  const result = schema.safeParse(model.value)

  if (!result.success) {
    const formattedErrors = result.error.format()

    storeProduct.errors.name = formattedErrors.name?._errors
    storeProduct.errors.category_id = formattedErrors.category_id?._errors
    storeProduct.errors.description = formattedErrors.description?._errors

    return
  }

  emit('next', model.value)
}
</script>
