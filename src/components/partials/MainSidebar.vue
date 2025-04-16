<template>
  <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0" aria-label="Sidenav" id="drawer-navigation">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white">
      <div class="flex flex-col items-center gap-4 pb-5 mb-4 border-b border-gray-200">
        <img class="w-16 h-16 rounded-full" :src="avatar" alt="Default avatar">
        <div class="text-center">
          <div class="font-medium text-gray-700">John Doe</div>
          <div class="text-sm text-gray-600">johndoe@praxxys.com</div>
        </div>
      </div>
      <ul class="space-y-2">
        <li v-for="(navigation, index) in navigations" :key="index">
          <RouterLink
            :to="navigation.link"
            class="flex items-center gap-3 p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
            <fa-icon :icon="['fas', navigation.icon]" size="lg" class="text-gray-500" />
            {{ navigation.name }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full bg-white z-20">
        <div class="w-full p-2 text-base font-medium text-red-500 bg-red-50 rounded-lg space-x-3 cursor-pointer">
          <fa-icon :icon="['fas', 'door-open']"/>
          <span>Sign out</span>
        </div>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import avatar from '@/assets/avatar-male.png'

const navigations = ref([
  {
    name: 'Products',
    link: '/',
    icon: 'box'
  },
  {
    name: 'Create Product',
    link: '#',
    icon: 'plus'
  }
])
</script>
