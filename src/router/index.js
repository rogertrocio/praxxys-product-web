import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/product/ProductPage.vue'),
        },
        {
          path: '/product/create',
          component: () => import('@/views/product/ProductCreatePage.vue'),
        }
      ]
    },

    /**
     * Authentication
     */
    {
      path: '/login',
      name: 'login',
      component: () => import('../layouts/LoginLayout.vue'),
    },
  ],
})

export default router
