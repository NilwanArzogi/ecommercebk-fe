<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const orders = ref([])
const selectedOrder = ref(null)

onMounted(async () => {
  const { data } = await api.get('/admin/orders')
  orders.value = data
})

async function updateStatus(order, status) {
  await api.patch(`/admin/orders/${order.id}/status`, { status })
  order.status = status
}

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}

const statusOptions = ['Menunggu', 'Diproses', 'Selesai']
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Kelola Pesanan</h2>

    <div class="bg-white rounded-xl shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr class="text-gray-500">
            <th class="text-left px-4 py-3">ID</th>
            <th class="text-left px-4 py-3">Pelanggan</th>
            <th class="text-left px-4 py-3">No. HP</th>
            <th class="text-left px-4 py-3">Total</th>
            <th class="text-left px-4 py-3">Pembayaran</th>
            <th class="text-left px-4 py-3">Status</th>
            <th class="text-left px-4 py-3">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3">#{{ o.id }}</td>
            <td class="px-4 py-3 font-medium">{{ o.customer_name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ o.customer_phone }}</td>
            <td class="px-4 py-3 text-pink-600">{{ formatRupiah(o.total_price) }}</td>
            <td class="px-4 py-3 capitalize">{{ o.payment_method }}</td>
            <td class="px-4 py-3">
              <select :value="o.status" @change="updateStatus(o, $event.target.value)"
                class="border rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                :class="{
                  'text-yellow-700 bg-yellow-50': o.status === 'Menunggu',
                  'text-blue-700 bg-blue-50': o.status === 'Diproses',
                  'text-green-700 bg-green-50': o.status === 'Selesai',
                }">
                <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <button @click="selectedOrder = o" class="text-blue-500 hover:underline text-xs">
                Lihat
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedOrder" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 class="font-bold text-lg mb-4">Detail Pesanan #{{ selectedOrder.id }}</h3>
        <div class="space-y-2 text-sm mb-4">
          <p><span class="text-gray-500">Nama:</span> {{ selectedOrder.customer_name }}</p>
          <p><span class="text-gray-500">HP:</span> {{ selectedOrder.customer_phone }}</p>
          <p><span class="text-gray-500">Alamat:</span> {{ selectedOrder.customer_address || '-' }}</p>
          <p><span class="text-gray-500">Pembayaran:</span> {{ selectedOrder.payment_method }}</p>
          <p><span class="text-gray-500">Catatan:</span> {{ selectedOrder.notes || '-' }}</p>
        </div>
        <div class="border-t pt-4">
          <p class="font-medium text-gray-700 mb-2">Item Pesanan:</p>
          <div v-for="item in selectedOrder.items" :key="item.id"
            class="flex justify-between text-sm py-1">
            <span>{{ item.product?.name }} × {{ item.quantity }}</span>
            <span>{{ formatRupiah(item.subtotal) }}</span>
          </div>
          <div class="flex justify-between font-bold text-pink-600 border-t pt-2 mt-2">
            <span>Total</span>
            <span>{{ formatRupiah(selectedOrder.total_price) }}</span>
          </div>
        </div>
        <button @click="selectedOrder = null"
          class="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>