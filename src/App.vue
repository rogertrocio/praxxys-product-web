<template>
  <div class="text-2xl font-semibold text-red-400">Hello world</div>
</template>
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>
