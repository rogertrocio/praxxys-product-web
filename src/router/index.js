import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue'),
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
