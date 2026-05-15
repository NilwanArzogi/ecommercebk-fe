<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

const cart = useCartStore()
const router = useRouter()
const loading = ref(false)
const success = ref(false)

const form = ref({
  customer_name: '',
  customer_phone: '',
  customer_address: '',
  payment_method: 'transfer',
  notes: '',
})

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}

async function handleCheckout() {
  loading.value = true
  try {
    await api.post('/orders', {
      ...form.value,
      items: cart.items.map(i => ({ product_id: i.id, quantity: i.quantity })),
    })
    cart.clearCart()
    success.value = true
  } catch (e) {
    alert(e.response?.data?.message || 'Gagal membuat pesanan')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-pink-50 py-24 px-6">
    <div class="max-w-2xl mx-auto">
      <div v-if="success" class="bg-white rounded-2xl shadow p-10 text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-green-600 mb-2">Pesanan Berhasil!</h2>
        <p class="text-gray-500 mb-6">Terima kasih! Pesanan kamu sedang kami proses.</p>
        <button @click="router.push('/')"
          class="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600">
          Kembali ke Beranda
        </button>
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold text-pink-600 mb-8">Checkout</h1>

        <!-- Ringkasan -->
        <div class="bg-white rounded-2xl shadow p-5 mb-5">
          <h2 class="font-semibold text-gray-700 mb-3">Ringkasan Pesanan</h2>
          <div v-for="item in cart.items" :key="item.id" class="flex justify-between text-sm py-1">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>{{ formatRupiah(item.price * item.quantity) }}</span>
          </div>
          <div class="flex justify-between font-bold text-pink-600 border-t pt-2 mt-2">
            <span>Total</span>
            <span>{{ formatRupiah(cart.totalPrice) }}</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-5 space-y-4">
          <h2 class="font-semibold text-gray-700">Data Pemesan</h2>
          <input v-model="form.customer_name" placeholder="Nama lengkap *"
            class="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none" />
          <input v-model="form.customer_phone" placeholder="Nomor HP / WhatsApp *"
            class="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none" />
          <textarea v-model="form.customer_address" placeholder="Alamat pengiriman"
            class="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none" rows="3" />

          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</p>
            <div class="grid grid-cols-3 gap-3">
              <label v-for="m in ['transfer', 'cod', 'ewallet']" :key="m"
                class="cursor-pointer border-2 rounded-xl p-3 text-center text-sm transition"
                :class="form.payment_method === m
                  ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold'
                  : 'border-gray-200 hover:border-pink-300'">
                <input v-model="form.payment_method" type="radio" :value="m" class="sr-only" />
                <span v-if="m === 'transfer'">Transfer</span>
                <span v-else-if="m === 'cod'">COD</span>
                <span v-else>E-Wallet</span>
              </label>
            </div>
          </div>

          <textarea v-model="form.notes" placeholder="Catatan tambahan (opsional)"
            class="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none" rows="2" />

          <button @click="handleCheckout" :disabled="loading || !form.customer_name || !form.customer_phone"
            class="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 disabled:opacity-50 transition">
            {{ loading ? 'Memproses...' : `Pesan Sekarang — ${formatRupiah(cart.totalPrice)}` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>