<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>


<template>
  <nav class="fixed top-4 left-1/2 -translate-x-1/2
         w-[95%] max-w-7xl
         z-50
         bg-white/70
         backdrop-blur-md
         shadow-lg
         rounded-2xl" :class=" scrolled ? 'bg-white/80 shadow' : 'bg-transparent'">
    <div class="max-w-7xl mx-auto px-4">
      <div class="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">

        <!-- Logo -->
        <div class="text-xl font-bold">
          <a href="#">Bel's Kitchen</a>
        </div>

        <!-- Menu -->
        <div class="flex space-x-6">
          <a href="#Home" class="hover:text-gray-200">Home</a>
          <a href="#About" class="hover:text-gray-200">About</a>
          <a href="#products" class="hover:text-gray-200">Products</a>
          <a href="#Contact" class="hover:text-gray-200">Contact</a>
        </div>

      </div>
    </div>
  </nav>
</template>
