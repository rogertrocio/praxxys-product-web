<template>
  <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0" aria-label="Sidenav" id="drawer-navigation">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white">
      <ul class="space-y-2">
        <li v-for="(navigation, index) in navigations" :key="index">
          <RouterLink
            :to="navigation.link"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
            {{ navigation.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const navigations = ref([
  {
    name: 'Products',
    link: '/',
  },
  {
    name: 'Create Product',
    link: '#',
  }
])
</script>
