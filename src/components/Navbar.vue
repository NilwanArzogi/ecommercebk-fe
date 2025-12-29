<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    class="fixed top-4 left-1/2 -translate-x-1/2
           w-[95%] max-w-7xl
           z-50
           backdrop-blur-md
           rounded-2xl
           transition-all duration-300"
    :class="scrolled
      ? 'bg-white/90 shadow-lg'
      : 'bg-white/60 shadow-md'"
  >
    <div class="h-20 px-6 flex items-center justify-between">

      <RouterLink to="/" class="text-xl font-bold text-pink-600">
        Bel's Kitchen
      </RouterLink>

      <div class="flex items-center space-x-8">

        <div class="hidden md:flex space-x-6 text-gray-700">
          <a href="#home" class="hover:text-pink-500">Home</a>
          <a href="#about" class="hover:text-pink-500">About</a>
          <a href="#menu" class="hover:text-pink-500">Menu</a>
          <a href="#contact" class="hover:text-pink-500">Contact</a>
        </div>

        <!-- AUTH -->
        <div class="flex items-center space-x-4">
          <RouterLink
            to="/login"
            class="text-gray-700 hover:text-pink-500  "
          >
            Login
          </RouterLink>

          <RouterLink
            to="/register"
            class="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
          >
            Register
          </RouterLink>
        </div>

      </div>
    </div>
  </nav>
</template>
