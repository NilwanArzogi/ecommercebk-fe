
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-pink-600">Daftar Kue</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="kue in daftarKue"
        :key="kue.id"
        class="border rounded-xl p-4 shadow hover:shadow-lg transition"
      >
        <img
          :src="kue.gambar"
          alt="kue"
          class="w-full h-52 object-cover rounded-lg mb-3"
        />

        <h2 class="font-semibold text-lg">{{ kue.nama }}</h2>
        <p class="text-sm text-gray-700 mb-2">Rp {{ kue.harga }}</p>

        <button
          class="px-4 py-2 bg-stone-500 text-white rounded-lg hover:bg-pink-600"
        >
          Beli
        </button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import keu2 from '@/assets/img/keu2.jpg'
import Kue1 from '@/assets/img/Kue1.jpg'
import kue3 from '@/assets/img/kue3.jpg'
import kue4 from '@/assets/img/kue4.jpg'
import kue5 from '@/assets/img/kue5.jpg'

const daftarKue = [
  { id: 1, nama: "Kue Lapis", harga: "5.000", gambar: keu2 },
  { id: 2, nama: "Brownies", harga: "12.000", gambar: Kue1 },
  { id: 3, nama: "Kue Sus", harga: "7.000", gambar: kue3 },
  { id: 4, nama: "Bolu Pandan", harga: "10.000", gambar: kue4 },
  { id: 5, nama: "Kue Cubit", harga: "4.000", gambar: kue5 },
  { id: 6, nama: "Pancake", harga: "8.000", gambar: "https://via.placeholder.com/150" },
  { id: 7, nama: "Kue Putu", harga: "6.000", gambar: "https://via.placeholder.com/150" },
  { id: 8, nama: "Donat", harga: "9.000", gambar: "https://via.placeholder.com/150" },
];
</script>

<style scoped>
</style>
