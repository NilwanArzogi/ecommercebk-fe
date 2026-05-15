<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const stats = ref(null)
const loading = ref(true)

onMounted(async () => {
  const { data } = await api.get('/admin/dashboard')
  stats.value = data
  loading.value = false
})

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

    <div v-if="loading" class="text-gray-400">Memuat...</div>

    <div v-else>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow p-5">
          <p class="text-gray-500 text-sm">Total Produk</p>
          <p class="text-3xl font-bold text-pink-600">{{ stats.total_products }}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-5">
          <p class="text-gray-500 text-sm">Total Pesanan</p>
          <p class="text-3xl font-bold text-blue-600">{{ stats.total_orders }}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-5">
          <p class="text-gray-500 text-sm">Menunggu</p>
          <p class="text-3xl font-bold text-yellow-500">{{ stats.pending_orders }}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-5">
          <p class="text-gray-500 text-sm">Total Revenue</p>
          <p class="text-2xl font-bold text-green-600">{{ formatRupiah(stats.total_revenue) }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-6 mb-6">
        <h3 class="font-semibold text-gray-700 mb-4">🏆 Produk Terlaris</h3>
        <div class="space-y-3">
          <div v-for="(p, i) in stats.top_products" :key="p.id"
            class="flex items-center gap-4">
            <span class="text-gray-400 w-5 text-sm">{{ i + 1 }}</span>
            <img :src="`http://localhost:8000/storage/${p.image}`" :alt="p.name"
              class="w-10 h-10 rounded-lg object-cover bg-gray-100" />
            <div class="flex-1">
              <p class="font-medium text-gray-800">{{ p.name }}</p>
              <p class="text-sm text-gray-400">Terjual: {{ p.sold_count }}</p>
            </div>
            <p class="text-pink-600 font-medium">{{ formatRupiah(p.price) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="font-semibold text-gray-700 mb-4">Pesanan Terbaru</h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 border-b">
              <th class="text-left py-2">ID</th>
              <th class="text-left py-2">Pelanggan</th>
              <th class="text-left py-2">Total</th>
              <th class="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in stats.recent_orders" :key="o.id" class="border-b hover:bg-gray-50">
              <td class="py-2">#{{ o.id }}</td>
              <td class="py-2">{{ o.customer_name }}</td>
              <td class="py-2">{{ formatRupiah(o.total_price) }}</td>
              <td class="py-2">
                <span :class="{
                  'bg-yellow-100 text-yellow-700': o.status === 'Menunggu',
                  'bg-blue-100 text-blue-700': o.status === 'Diproses',
                  'bg-green-100 text-green-700': o.status === 'Selesai',
                }" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ o.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>