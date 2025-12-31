<script setup>
import About from './About.vue';
import Products from './Menu.vue'
import BannerSlider from '@/components/BannerSlider.vue'
</script>

<template>
  <section id="home" class="pt-0">
    <BannerSlider />
  </section>

  <section
    id="about"
    class="max-w-7xl mx-auto px-6 text-center mt-16"
  >
    <h1 class="text-4xl font-bold mb-4 text-pink-600">
      Welcome to Bel's Kitchen
    </h1>

    <p class="text-2xl font-light mb-8 text-blue-400">
      Disini Menjual Aneka Kue
    </p>
  </section>

  <section
    id="About"
    class="scroll-mt-32 py-20 max-w-7xl mx-auto px-6"
  >
    <About />
  </section>

  <section
    id="menu"
    class="scroll-mt-32 py-20 max-w-7xl mx-auto px-6"
  >
    <Products />
  </section>
</template>
