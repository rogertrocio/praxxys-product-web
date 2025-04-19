<template>
  <div class="text-xl font-medium mb-6">{{ props.source.name }}</div>
  <video
    ref="videoRef"
    class="video-js"
    width="700px"
    height="400px" />
</template>
<script setup>
import videojs from 'video.js'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  source: {
    type: Object,
    required: true,
  }
})

const player = ref(null)
const videoRef = ref(null)

watch(() => props.source, (value) => {
  if (player.value) player.value.src({...value})
}, { deep: true })

onMounted(() => {
  play()
})

onBeforeUnmount(() => {
  if (player.value)  player.value.dispose()
})

const play = () => {
  player.value = videojs(
    videoRef.value,
    {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: props.source.src,
          type: props.source.type,
        }
      ],
    }, () => {
      player.value.log('ready')
  })
}
</script>
