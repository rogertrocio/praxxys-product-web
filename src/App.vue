<template>
  <RouterView />
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>
