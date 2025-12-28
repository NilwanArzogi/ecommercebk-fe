<script setup>
import HeroSection from "@/components/HeroSection.vue";
import Products from "./products.vue";
</script>

<template>
 <section
    id="home"
    class="pt-32 max-w-7xl mx-auto px-6"
  >
    <h1 class="text-4xl font-bold mb-4 text-pink-600">
      Welcome to Toko Kue!
    </h1>

    <p class="text-2xl font-light mb-8 text-blue-400">
      Disini Menjual Aneka Kue
    </p>

    <HeroSection />
  </section>

  <!-- PRODUCTS -->
  <section
    id="products"
    class="scroll-mt-32 py-20 max-w-7xl mx-auto px-6"
  >
    <Products />
  </section>
</template>