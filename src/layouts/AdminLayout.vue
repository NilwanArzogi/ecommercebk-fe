<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-64 bg-white shadow-md flex flex-col">
      <div class="p-6 border-b">
        <h1 class="text-xl font-bold text-pink-600"> Bel's Kitchen</h1>
        <p class="text-sm text-gray-500">Admin Panel</p>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <RouterLink to="/admin/dashboard"
          class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
          active-class="bg-pink-100 text-pink-600 font-medium">
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/products"
          class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
          active-class="bg-pink-100 text-pink-600 font-medium">
          Produk
        </RouterLink>
        <RouterLink to="/admin/orders"
          class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
          active-class="bg-pink-100 text-pink-600 font-medium">
          Pesanan
        </RouterLink>
        <RouterLink to="/admin/banners"
          class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition"
          active-class="bg-pink-100 text-pink-600 font-medium">
          Banner
        </RouterLink>
      </nav>
      <div class="p-4 border-t">
        <p class="text-sm text-gray-600 mb-2">{{ auth.admin?.name }}</p>
        <button @click="handleLogout"
          class="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm">
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>