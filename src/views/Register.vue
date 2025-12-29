<script setup>
import { ref } from 'vue'
import { register } from '@/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const submit = () => {
  const res = register({
    name: name.value,
    email: email.value,
    password: password.value
  })

  if (!res.success) {
    error.value = res.message
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-40">
    <h2 class="text-2xl font-bold mb-4">Register</h2>

    <input v-model="name" placeholder="Nama" class="input" />
    <input v-model="email" placeholder="Email" class="input" />
    <input v-model="password" type="password" placeholder="Password" class="input" />

    <p class="text-red-500">{{ error }}</p>

    <button @click="submit" class="btn">Register</button>
  </div>
</template>
