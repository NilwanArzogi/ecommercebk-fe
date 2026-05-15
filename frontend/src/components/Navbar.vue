<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'  

const cart = useCartStore() 

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    class="fixed top-4 left-1/2 -translate-x-1/2
           w-[95%] max-w-7xl z-50 backdrop-blur-md
           rounded-2xl transition-all duration-300"
    :class="scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/60 shadow-md'"
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

        <div class="flex items-center space-x-4">
          <RouterLink to="/cart" class="relative text-gray-700 hover:text-pink-500">
            🛒
            <span v-if="cart.totalItems > 0"
              class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs
                     rounded-full w-4 h-4 flex items-center justify-center">
              {{ cart.totalItems }}
            </span>
          </RouterLink>

          <RouterLink to="/admin/login"
            class="text-gray-700 hover:text-pink-500 text-sm">
            Admin
          </RouterLink>
        </div>
      </div>

    </div>
  </nav>
</template>