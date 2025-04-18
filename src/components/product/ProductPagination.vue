<template>
  <div class="flex flex-row justify-end">
    <ul class="flex items-center -space-x-px h-10 text-base">
      <!-- Previous page -->
      <li v-for="(link, index) in props.pagination.links" :key="index">
        <div v-if="index === 0"
          class="flex items-center justify-center px-3 h-8 border rounded-s-lg border-gray-300 bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
          :class="[
            link.url !== null
            ? 'text-gray-600 cursor-pointer'
            : 'text-gray-400 cursor-not-allowed pointer-events-none'
          ]"
          v-html="link.label"
          @click="emit('updatePage', page - 1)">
        </div>

        <!-- Pages -->
        <div
          v-if="index !== 0 && props.pagination.links.length !== index + 1"
          class="flex items-center justify-center px-3 h-8 border border-gray-300 cursor-pointer"
          :class="[
            props.pagination.current_page === index
            ? 'text-teal-600 bg-teal-100'
            : 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700'
          ]"
          v-html="link.label"
          @click="emit('updatePage', index)">
        </div>

        <!-- Next page -->
        <div v-if="props.pagination.links.length === index + 1"
          class="flex items-center justify-center px-3 h-8 border rounded-e-lg border-gray-300 bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
          :class="[
            link.url !== null
            ? 'text-gray-600 cursor-pointer'
            : 'text-gray-400 cursor-not-allowed pointer-events-none'
          ]"
          v-html="link.label"
          @click="emit('updatePage', page + 1)">
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  },
  currentPage: {
    type: [String, Number],
    required: true
  }
})

const page = ref(props.currentPage)

watch(() => props.currentPage, (value) => {
  page.value = value
})

const emit = defineEmits(['updatePage'])
</script>
