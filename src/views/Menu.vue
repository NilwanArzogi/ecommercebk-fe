
<template>
  <div class="p-4">
    <h1 class="text-3xl text-center  font-bold mb-6 text-pink-600">Featured Menu
</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="kue in daftarKue"
        :key="kue.id"
        class="border rounded-xl p-2 shadow hover:shadow-lg transition"
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
        <section>
        </section>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import kuelapis from '@/assets/img/kuelapis.jpg'
import Kue1 from '@/assets/img/Brownies.jpg'
import kuesus from '@/assets/img/kuesus.jpg'
import bolupandan from '@/assets/img/bolupandan.jpg'
import kuecubit from '@/assets/img/kuecubit.jpg'
import pancake from '@/assets/img/pancake.Avif'
import putu from '@/assets/img/putu.jpg'
import donat from '@/assets/img/donat.jpg'

const daftarKue = [
  { id: 1, nama: "Kue Lapis", harga: "25.000", gambar: kuelapis },
  { id: 2, nama: "Brownies", harga: "12.000", gambar: Kue1 },
  { id: 3, nama: "Kue Sus", harga: "7.000", gambar: kuesus },
  { id: 4, nama: "Bolu Pandan", harga: "10.000", gambar: bolupandan },
  { id: 5, nama: "Kue Cubit", harga: "4.000", gambar: kuecubit },
  { id: 6, nama: "Pancake", harga: "8.000", gambar: pancake },
  { id: 7, nama: "Kue Putu", harga: "6.000", gambar: putu },
  { id: 8, nama: "Donat", harga: "9.000", gambar: donat },
];
</script>
