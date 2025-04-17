<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

    <div class="mb-6">
      <p class="text-xl font-semibold">Products</p>
      <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </div>

    <div class="flex flex-row items-center justify-between mb-10">
      <div class="flex items-center gap-3">
        <BaseInput v-model="search" placeholder="Search" class="w-96" />

        <BaseSelect v-model="category" :options="categories" option-label="Select Category"  class="w-60 "/>

        <BaseButton type="button" label="Clear Filter" class="w-auto text-teal-600 bg-white border border-gray-300 hover:bg-gray-100" />
      </div>

      <BaseButton type="button" label="Create" class="w-40 text-white bg-teal-600 hover:bg-teal-700" />
    </div>

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
          v-for="product in products"
          :key="product.id"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b border-gray-200">
          <td class="px-6 py-4">
            <img src="@/assets/image-placeholder.png" class="h-10 rounded" alt="image">
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ product.name }}</th>
          <td class="px-6 py-4">{{ product.category }}</td>
          <td class="px-6 py-4">{{ product.date_time }}</td>
          <td class="px-6 py-4 flex items-center gap-2">
            <BaseButton type="button" label="Edit" class="text-white bg-gray-600 hover:bg-gray-700" />
            <BaseButton type="button" label="Delete" class="text-white bg-red-600 hover:bg-red-700" @click="showProductDeleteConfirmDialog = true" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-row justify-end">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-teal-600 border border-teal-300 bg-teal-50 hover:bg-teal-100 hover:text-teal-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>

    <ConfirmDialog
      :visible="showProductDeleteConfirmDialog"
      message="Are you sure you want to delete Product A? This action will remove it from the product list."
      icon="triangle-exclamation"
      :loading="false"
      @close="showProductDeleteConfirmDialog = false"
      @confirm="1"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'

const showProductDeleteConfirmDialog = ref(false)
const search = ref('')
const category = ref(null)
const categories = ref([
  {
    label: 'Smartphone',
    value: 1,
  }, {
    label: 'Tablet',
    value: 2,
  }, {
    label: 'Headphone',
    value: 3,
  },
])

const products = ref([
  {
    id: 1,
    name: 'Samsung A50',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dicta?',
    category: 'Smartphone',
    date_time: '2025-01-01 13:30:00',
  }, {
    id: 2,
    name: 'Iphone 15 pro',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dicta?',
    category: 'Smartphone',
    date_time: '2025-01-01 13:30:00',
  }, {
    id: 3,
    name: 'Anker Soundcore',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dicta?',
    category: 'Bluetooth Speaker',
    date_time: '2025-01-01 13:30:00',
  }, {
    id: 4,
    name: 'Lenovo Tablet',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dicta?',
    category: 'Tablet',
    date_time: '2025-01-01 13:30:00',
  }, {
    id: 5,
    name: 'Bose Headphone',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dicta?',
    category: 'Headphone',
    date_time: '2025-01-01 13:30:00',
  }
])
</script>
