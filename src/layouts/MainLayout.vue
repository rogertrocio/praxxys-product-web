<template>
  <div class="antialiased bg-gray-50">
    <!-- Header -->
    <MainHeader />

    <!-- Sidebar -->
    <MainSidebar />

    <main class="p-4 md:ml-64 h-auto pt-20">
      <div class="h-[calc(100vh-8rem)] mb-4">
        <RouterView />
      </div>
    </main>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/partials/MainHeader.vue'
import MainSidebar from '@/components/partials/MainSidebar.vue'
</script>
