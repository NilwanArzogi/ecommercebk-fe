import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // USER ROUTES
    { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
    { path: '/menu', name: 'Menu', component: () => import('@/views/Menu.vue') },
    { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
    { path: '/cart', name: 'Cart', component: () => import('@/views/Cart.vue') },
    { path: '/checkout', name: 'Checkout', component: () => import('@/views/Checkout.vue') },

    // ADMIN ROUTES
    { path: '/admin/login', name: 'AdminLogin', component: () => import('@/views/admin/AdminLogin.vue') },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard.vue') },
        { path: 'products', name: 'AdminProducts', component: () => import('@/views/admin/Products.vue') },
        { path: 'orders', name: 'AdminOrders', component: () => import('@/views/admin/Orders.vue') },
        { path: 'banners', name: 'AdminBanners', component: () => import('@/views/admin/Banners.vue') },
      ]
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Guard admin route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('admin_token')
    if (!token) return next('/admin/login')
  }
  next()
})

export default router