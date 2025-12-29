<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-20">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-6 text-center text-pink-600">
        Login
      </h1>

      <form class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border px-4 py-2 rounded-lg"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border px-4 py-2 rounded-lg"
        />

        <button
          class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Login
        </button>
      </form>

      <p class="text-center mt-4 text-sm">
        Belum punya akun?
        <RouterLink to="/register" class="text-pink-600">
          Register
        </RouterLink>
      </p>
    </div>
  </div>
</template>
