<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const banners = ref([])
const showModal = ref(false)
const editingBanner = ref(null)
const form = ref({ title: '', description: '', is_active: true, order: 0 })
const imageFile = ref(null)
const loading = ref(false)

async function fetchBanners() {
  const { data } = await api.get('/admin/banners')
  banners.value = data
}

onMounted(fetchBanners)

function openAdd() {
  editingBanner.value = null
  form.value = { title: '', description: '', is_active: true, order: 0 }
  imageFile.value = null
  showModal.value = true
}

function openEdit(b) {
  editingBanner.value = b
  form.value = { title: b.title, description: b.description, is_active: b.is_active, order: b.order }
  showModal.value = true
}

async function handleSave() {
  loading.value = true
  const fd = new FormData()
  Object.entries(form.value).forEach(([k, v]) => fd.append(k, v))
  if (imageFile.value) fd.append('image', imageFile.value)
  try {
    if (editingBanner.value) {
      await api.post(`/admin/banners/${editingBanner.value.id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      await api.post('/admin/banners', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }
    showModal.value = false
    fetchBanners()
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('Hapus banner ini?')) return
  await api.delete(`/admin/banners/${id}`)
  fetchBanners()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Kelola Banner Promo</h2>
      <button @click="openAdd"
        class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
        + Tambah Banner
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="b in banners" :key="b.id"
        class="bg-white rounded-xl shadow overflow-hidden">
        <img :src="`http://localhost:8000/storage/${b.image}`"
          class="w-full h-40 object-cover" />
        <div class="p-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-800">{{ b.title }}</h3>
            <span :class="b.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
              class="text-xs px-2 py-1 rounded-full">
              {{ b.is_active ? 'Aktif' : 'Nonaktif' }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ b.description }}</p>
          <div class="flex gap-2 mt-3">
            <button @click="openEdit(b)"
              class="flex-1 border border-blue-400 text-blue-600 py-1 rounded-lg text-sm hover:bg-blue-50">
              Edit
            </button>
            <button @click="handleDelete(b.id)"
              class="flex-1 border border-red-400 text-red-600 py-1 rounded-lg text-sm hover:bg-red-50">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">{{ editingBanner ? 'Edit Banner' : 'Tambah Banner' }}</h3>
        <div class="space-y-3">
          <input v-model="form.title" placeholder="Judul banner"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          <input v-model="form.description" placeholder="Deskripsi promo"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          <input v-model="form.order" type="number" placeholder="Urutan"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none" />
          <div>
            <label class="block text-sm text-gray-600 mb-1">Gambar Banner</label>
            <input type="file" accept="image/*" @change="e => imageFile = e.target.files[0]"
              class="w-full text-sm text-gray-500" />
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="form.is_active" type="checkbox" /> Banner aktif
          </label>
        </div>
        <div class="flex gap-3 mt-5">
          <button @click="showModal = false"
            class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg">Batal</button>
          <button @click="handleSave" :disabled="loading"
            class="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50">
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>