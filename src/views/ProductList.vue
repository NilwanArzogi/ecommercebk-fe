<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Product List</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="p-4 border rounded-lg shadow"
      >
        <img :src="product.image" alt="" class="w-full h-32 object-cover rounded" />
        <h2 class="text-lg font-semibold mt-2">{{ product.name }}</h2>
        <p class="text-gray-600">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [
        { id: 1, name: "Kue Lapis", price: "Rp 15.000", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Roti Coklat", price: "Rp 10.000", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Bolu Pandan", price: "Rp 20.000", image: "https://via.placeholder.com/150" },
      ]
    };
  }
};
</script>

<style scoped>
</style>
