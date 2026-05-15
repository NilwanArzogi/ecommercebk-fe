<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const products = ref([])
const showModal = ref(false)
const editingProduct = ref(null)
const form = ref({ name: '', description: '', price: '', stock: '', category: '', is_active: true })
const imageFile = ref(null)
const loading = ref(false)

async function fetchProducts() {
  const { data } = await api.get('/admin/products')
  products.value = data
}

onMounted(fetchProducts)

function openAdd() {
  editingProduct.value = null
  form.value = { name: '', description: '', price: '', stock: '', category: '', is_active: true }
  imageFile.value = null
  showModal.value = true
}

function openEdit(p) {
  editingProduct.value = p
  form.value = { name: p.name, description: p.description, price: p.price, stock: p.stock, category: p.category, is_active: p.is_active }
  imageFile.value = null
  showModal.value = true
}

async function handleSave() {
  loading.value = true
  const fd = new FormData()
  Object.entries(form.value).forEach(([k, v]) => fd.append(k, v))
  if (imageFile.value) fd.append('image', imageFile.value)

  try {
    if (editingProduct.value) {
      await api.post(`/admin/products/${editingProduct.value.id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      await api.post('/admin/products', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    showModal.value = false
    fetchProducts()
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('Hapus produk ini?')) return
  await api.delete(`/admin/products/${id}`)
  fetchProducts()
}

function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID')
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Kelola Produk</h2>
      <button @click="openAdd"
        class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
        + Tambah Produk
      </button>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr class="text-gray-500">
            <th class="text-left px-4 py-3">Produk</th>
            <th class="text-left px-4 py-3">Kategori</th>
            <th class="text-left px-4 py-3">Harga</th>
            <th class="text-left px-4 py-3">Stok</th>
            <th class="text-left px-4 py-3">Terjual</th>
            <th class="text-left px-4 py-3">Status</th>
            <th class="text-left px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-3 flex items-center gap-3">
              <img v-if="p.image" :src="`http://localhost:8000/storage/${p.image}`"
                class="w-10 h-10 rounded-lg object-cover bg-gray-100" />
              <span class="font-medium">{{ p.name }}</span>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ p.category || '-' }}</td>
            <td class="px-4 py-3 text-pink-600">{{ formatRupiah(p.price) }}</td>
            <td class="px-4 py-3">{{ p.stock }}</td>
            <td class="px-4 py-3">{{ p.sold_count }}</td>
            <td class="px-4 py-3">
              <span :class="p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="px-2 py-1 rounded-full text-xs font-medium">
                {{ p.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <button @click="openEdit(p)" class="text-blue-500 hover:underline mr-3">Edit</button>
              <button @click="handleDelete(p.id)" class="text-red-500 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          {{ editingProduct ? 'Edit Produk' : 'Tambah Produk' }}
        </h3>
        <div class="space-y-3">
          <input v-model="form.name" placeholder="Nama produk"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          <textarea v-model="form.description" placeholder="Deskripsi"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" rows="3" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.price" type="number" placeholder="Harga"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
            <input v-model="form.stock" type="number" placeholder="Stok"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          </div>
          <input v-model="form.category" placeholder="Kategori (opsional)"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          <div>
            <label class="block text-sm text-gray-600 mb-1">Foto Produk</label>
            <input type="file" accept="image/*" @change="e => imageFile = e.target.files[0]"
              class="w-full text-sm text-gray-500" />
          </div>
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input v-model="form.is_active" type="checkbox" class="rounded" />
            Produk aktif
          </label>
        </div>
        <div class="flex gap-3 mt-5">
          <button @click="showModal = false"
            class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
            Batal
          </button>
          <button @click="handleSave" :disabled="loading"
            class="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50">
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>