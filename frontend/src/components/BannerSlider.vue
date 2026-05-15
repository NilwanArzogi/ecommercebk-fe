<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const current = ref(0)
const slides = ref([])

onMounted(async () => {
  try {
    const { data } = await api.get('/banners')
    slides.value = data
  } catch {
    
  }

  setInterval(() => {
    if (slides.value.length > 0)
      current.value = (current.value + 1) % slides.value.length
  }, 3000)
})
</script>

<template>
  <div class="relative w-full h-[500px] overflow-hidden bg-gray-200">
    <div v-for="(slide, index) in slides" :key="index"
      class="absolute inset-0 transition-opacity duration-800"
      :class="current === index ? 'opacity-100' : 'opacity-0'">
      <img :src="`http://localhost:8000/storage/${slide.image}`"
        class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 flex items-center px-8">
        <div class="text-white">
          <h2 class="text-3xl font-bold">{{ slide.title }}</h2>
          <p class="mt-2">{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <!-- Fallback jika belum ada banner -->
    <div v-if="slides.length === 0" class="flex items-center justify-center h-full">
      <p class="text-gray-500">Loading banner...</p>
    </div>
  </div>
</template>