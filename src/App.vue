<template>
  <navbar />
  <home />
  <router-view />
</template>



<script setup>
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';

</script>

<style>
/* optional */
</style>
