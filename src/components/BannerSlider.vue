<template>
  <div class="relative w-full h-195 overflow-hidden">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-800"
      :class="current === index ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="slide.image"
        class="w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-black/40 flex items-center px-8">
        <div class="text-white">
          <h2 class="text-3xl font-bold">{{ slide.title }}</h2>
          <p class="mt-2">{{ slide.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import banner1 from '@/assets/img/banner1.jpg'
import banner2 from '@/assets/img/banner2.png'

const current = ref(0)

const slides = [
  {
    image: banner1,
    title: 'Diskon 20%',
    desc: 'Kue spesial akhir tahun'
  },
  {
    image: banner2,
    title: 'Promo Akhir Tahun',
    desc: 'Hanya ada di bulan Desember'
  }
]

onMounted(() => {
  setInterval(() => {
    current.value = (current.value + 1) % slides.length
  }, 3000)
})
</script>
