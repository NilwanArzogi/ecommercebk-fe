<template>
  <div class="min-h-screen flex items-center justify-center pt-20">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-6 text-center text-pink-600">
        Register
      </h1>

      <form class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full border px-4 py-2 rounded-lg"
        />

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
          Register
        </button>
      </form>

      <p class="text-center mt-4 text-sm">
        Sudah punya akun?
        <RouterLink to="/login" class="text-pink-600">
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
</script>
