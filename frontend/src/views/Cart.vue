<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}
</script>

<template>
  <div class="min-h-screen bg-pink-50 py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-pink-600 mb-8"> Keranjang</h1>

      <div v-if="cart.items.length === 0" class="text-center py-20 text-gray-400">
        <p class="text-5xl mb-4"></p>
        <p>Keranjang kosong</p>
        <button @click="$router.push('/menu')"
          class="mt-4 bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600">
          Lihat Menu
        </button>
      </div>

      <div v-else>
        <div class="bg-white rounded-2xl shadow divide-y">
          <div v-for="item in cart.items" :key="item.id"
            class="flex items-center gap-4 p-4">
            <img :src="item.image_url || '/placeholder.jpg'" :alt="item.name"
              class="w-16 h-16 rounded-xl object-cover bg-gray-100" />
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
              <p class="text-pink-600 text-sm">{{ formatRupiah(item.price) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="cart.updateQuantity(item.id, item.quantity - 1)"
                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700">−</button>
              <span class="w-6 text-center font-medium">{{ item.quantity }}</span>
              <button @click="cart.updateQuantity(item.id, item.quantity + 1)"
                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700">+</button>
            </div>
            <p class="font-medium text-gray-800 w-24 text-right">
              {{ formatRupiah(item.price * item.quantity) }}
            </p>
            <button @click="cart.removeItem(item.id)" class="text-red-400 hover:text-red-600">✕</button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-5 mt-4">
          <div class="flex justify-between text-gray-600 mb-2">
            <span>Total item:</span>
            <span>{{ cart.totalItems }}</span>
          </div>
          <div class="flex justify-between font-bold text-pink-600 text-xl border-t pt-3">
            <span>Total Harga</span>
            <span>{{ formatRupiah(cart.totalPrice) }}</span>
          </div>
          <button @click="router.push('/checkout')"
            class="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>