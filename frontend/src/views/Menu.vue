<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

const cart = useCartStore()
const router = useRouter()
const products = ref([])
const search = ref('')
const loading = ref(true)

onMounted(async () => {
  const { data } = await api.get('/products')
  products.value = data
  loading.value = false
})

const filtered = computed(() =>
  products.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function addToCart(product) {
  cart.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image ? `http://localhost:8000/storage/${product.image}` : null,
  })
}

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}
</script>

<template>
  <div class="p-4 pt-28">
    <h1 class="text-3xl text-center font-bold mb-4 text-pink-600">Menu</h1>

    <div class="max-w-md mx-auto mb-6">
      <input v-model="search" type="text" placeholder=" Cari kue..."
        class="w-full border border-pink-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none shadow-sm" />
    </div>

    <button v-if="cart.totalItems > 0" @click="router.push('/cart')"
      class="fixed bottom-6 right-6 bg-pink-500 text-white px-5 py-3 rounded-2xl shadow-xl hover:bg-pink-600 transition z-40 flex items-center gap-2">
       <span class="font-semibold">{{ cart.totalItems }}</span> item
      <span class="font-bold">{{ 'Rp ' + Number(cart.totalPrice).toLocaleString('id-ID') }}</span>
    </button>

    <div v-if="loading" class="text-center py-10 text-gray-400">Memuat produk...</div>

    <div v-else-if="filtered.length === 0" class="text-center py-10 text-gray-400">
      Produk tidak ditemukan
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
      <div v-for="p in filtered" :key="p.id"
        class="border rounded-xl p-2 shadow hover:shadow-lg transition bg-white">
        <img :src="p.image ? `http://localhost:8000/storage/${p.image}` : '/placeholder.jpg'"
          :alt="p.name" class="w-full h-52 object-cover rounded-lg mb-3" />
        <h2 class="font-semibold text-lg">{{ p.name }}</h2>
        <p class="text-sm text-pink-600 font-medium mb-2">{{ formatRupiah(p.price) }}</p>
        <p class="text-xs text-gray-400 mb-3">Stok: {{ p.stock }}</p>
        <button @click="addToCart(p)"
          :disabled="p.stock === 0"
          class="w-full px-4 py-2 bg-stone-500 text-white rounded-lg hover:bg-pink-600 transition disabled:opacity-40">
          {{ p.stock === 0 ? 'Habis' : '+ Keranjang' }}
        </button>
      </div>
    </div>
  </div>
</template>