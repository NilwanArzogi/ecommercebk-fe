import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/products.vue";
import ProductList from "../views/ProductList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/", component: Products },
    // { path: "/products", component: Products },
    { path: "/product-list", component: ProductList },
  ],
});

export default router;
