<template>
  <RouterView />
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>
