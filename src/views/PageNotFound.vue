<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img :src="PageNotFoundImage" class="w-[500px] m-0" alt="">
    <RouterLink to="/" class="text-teal-700 space-x-4">
      <fa-icon icon="home" />
      <span>Back to Home Page</span>
    </RouterLink>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import PageNotFoundImage from '@/assets/404-page-not-found.png'
</script>
