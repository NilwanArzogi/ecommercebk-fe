<template>
  <section class="relativ w-full text-white">
    <!-- Main Hero Section -->
    <div class="relative bg-amber-400 rounded-t-[0px] md:rounded-t-[70px] pt-20 pb-32 mx-4 md:mx-8">
      
      <!-- Curved Notch - Left Bottom -->
      <div class="absolute bottom-0 left-0 w-24 h-24 md:w-56 md:h-52">
        <div class="absolute inset-0 bg-white rounded-tr-full"></div>
      </div> 
      
      <!-- Curved Notch - Right Bottom -->
      <div class="absolute bottom-0 right-0 w-24 h-24 md:w-0 md:h-0">
        <div class="absolute inset-0 bg-white rounded-tl-full"></div>
      </div>

      <!-- Background Decorative Shapes -->
      <div class="absolute left-[5%] top-[20%] w-56 h-56 bg-[#04543d]/40 rounded-3xl -rotate-12"></div>
      <div class="absolute right-[8%] bottom-[15%] w-72 h-72 bg-[#04543d]/40 rounded-full"></div>
      <div class="absolute left-[15%] bottom-[25%] w-40 h-40 bg-[#04543d]/30 rounded-2xl rotate-45"></div>

      <!-- Content -->
      <div class="max-w-5xl mx-auto text-center px-6 relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
          Level up your Storefront UI<br />
          experience with a complete Alokai<br />
          ecosystem
        </h1>

        <p class="text-gray-300 mt-8 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
          Alokai provides enterprise-grade comprehensive solutions for online stores. 
          We offer Cloud hosting, ready-made integrations with top ecommerce software vendors, 
          advanced frontend performance, and much more:
        </p>

        <!-- Buttons -->
  <div class="flex flex-wrap justify-center gap-5 mt-12">

    <!-- Tombol menuju halaman Product -->
    <router-link
      to="/products"
      class="bg-[#00d991] hover:bg-[#00c282] text-[#02371e] font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      Lihat Produk
    </router-link>

    <router-link
    to="/Product-List"
    class="bg-[#00d991] hover:bg-[#00c282] text-[#02371e] font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      Lihat Produk List
    </router-link> 
      

    <!-- <button
      class="bg-[#00d991] hover:bg-[#00c282] text-[#02371e] font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      Explore Alokai
    </button> -->

  </div>
      </div>
    </div>
  </section>
</template>