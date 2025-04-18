<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

    <div class="mb-6">
      <p class="text-xl font-semibold">Products</p>
      <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </div>

    <div class="flex flex-row items-center justify-between mb-10">
      <div class="flex items-center gap-3">
        <BaseInput
          v-model="storeProduct.filter.search"
          placeholder="Search"
          class="w-96" />

        <BaseSelect
          v-model="storeProduct.filter.category"
          :options="storeCommon.categories"
          option-label="Select Category"
          class="w-60 " />

        <BaseButton
          type="button"
          label="Clear Filter"
          class="w-auto text-teal-600 bg-white border border-gray-300 hover:bg-gray-100"
          @click="storeProduct.clearFilter" />
      </div>

      <BaseButton type="button" label="Create" class="w-40 text-white bg-teal-600 hover:bg-teal-700" />
    </div>

    <template v-if="storeProduct.products.length > 0">
      <table class="w-full text-sm text-left text-gray-500 mb-6">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 w-30"></th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Date and Time</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in storeProduct.products"
            :key="product.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b border-gray-200">
            <td class="px-6 py-4">
              <div
                class="w-14 h-10 bg-cover bg-center bg-no-repeat bg-gray-500 rounded"
                :style="{ backgroundImage:  product.images.length > 0 ? `url(${product.images[0].url})` : `url(${ImagePlaceholder})` }">
              </div>
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.category.name }}</td>
            <td class="px-6 py-4">{{ product.date_time }}</td>
            <td class="px-6 py-4 flex items-center gap-2">
              <BaseButton type="button" label="Edit" class="text-white bg-gray-600 hover:bg-gray-700" />
              <BaseButton
                type="button"
                label="Delete"
                class="text-white bg-red-600 hover:bg-red-700"
                @click="showProductDeleteConfirmDialog = true, selectedProduct = product" />
            </td>
          </tr>
        </tbody>
      </table>

      <ProductPagination
        :pagination="storeProduct.pagination"
        :current-page="currentPage"
        @update-page="onPageChange" />
    </template>

    <NoResultsFound v-else />

    <ConfirmDialog
      :visible="showProductDeleteConfirmDialog"
      title="Delete Product"
      message="Are you sure you want to delete Product A? This action will remove it from the product list."
      icon="triangle-exclamation"
      :loading="false"
      @close="showProductDeleteConfirmDialog = false"
      @confirm="confirmDelete"/>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import ImagePlaceholder from '@/assets/image-placeholder.png'
import ProductPagination from '@/components/product/ProductPagination.vue'
import NoResultsFound from '@/components/partials/NoResultsFound.vue'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import { useProductStore } from '@/stores/product'
import { useCommonStore } from '@/stores/common'
import { debounce } from 'lodash'
import { toast } from 'vue3-toastify'

const storeProduct = useProductStore()
const storeCommon  = useCommonStore()
const selectedProduct = ref({})
const showProductDeleteConfirmDialog = ref(false)
const currentPage = ref(1)

watch(() => storeProduct.filter.search, debounce(() => {
  currentPage.value = 1
  storeProduct.getProducts()
}, 500))
watch(() => storeProduct.filter.category, () => {
  currentPage.value = 1
  storeProduct.getProducts()
})

onMounted(() => {
  storeProduct.getProducts()
  storeCommon.getCategories()
})

const onPageChange = (e) => {
  currentPage.value = e
  storeProduct.getProducts(currentPage.value)
}

const confirmDelete = async () => {
  try {
    storeProduct.deleteProduct(selectedProduct.value.id)

    toast.success(`${selectedProduct.value.name} deleted successfully.`)
    selectedProduct.value = {}
    showProductDeleteConfirmDialog.value = false
    currentPage.value = (storeProduct.products.length === 1 && currentPage.value !== 1) ? currentPage.value - 1 : currentPage.value

    storeProduct.getProducts(currentPage.value)
  } catch (e) {
    toast.error(`${storeProduct.errorMessage}`)
  }
}
</script>
