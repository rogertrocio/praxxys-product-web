<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

    <div class="mb-6">
      <p class="text-xl font-semibold">Videos</p>
      <span class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, modi.</span>
    </div>

    <div class="flex flex-row items-start">
      <div class="w-2/12 p-4">
        <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
          <li v-for="(video, index) in videos" :key="index">
            <div
              @click="selectedVideo = video"
              class="inline-flex items-center px-4 py-3 rounded-lg  w-full"
              :class="[
                selectedVideo?.src === video.src
                ? 'text-white bg-teal-600'
                : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
              ]">
              {{ video.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="w-10/12 flex flex-col items-center p-4">
        <VideoPlayer :source="selectedVideo"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'

const selectedVideo = ref({
    name: 'Video 1',
    src: `${import.meta.env.VITE_VIDEO_URL}/video-1.mp4`,
    type: 'video/mp4',
  })

const videos = ref([
  {
    name: 'Video 1',
    src: `${import.meta.env.VITE_VIDEO_URL}/video-1.mp4`,
    type: 'video/mp4',
  }, {
    name: 'Video 2',
    src: `${import.meta.env.VITE_VIDEO_URL}/video-2.mp4`,
    type: 'video/mp4',
  }, {
    name: 'Video 3',
    src: `${import.meta.env.VITE_VIDEO_URL}/video-3.mp4`,
    type: 'video/mp4',
  }
])
</script>
