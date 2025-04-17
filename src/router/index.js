import PageNotFound from '@/views/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'Product',
          component: () => import('@/views/product/ProductPage.vue'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/product/create',
          name: 'ProductCreate',
          component: () => import('@/views/product/ProductCreatePage.vue'),
          meta: {
            requiresAuth: true
          },
        }
      ]
    },

    /**
     * Authentication
     */
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/layouts/LoginLayout.vue'),
      meta: {
        requiresAuth: false
      },
    },

    /**
     * No existing route
     */
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound,
      meta: {
        requiresAuth: true
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()

  if (store.isAuthenticated && to.name === 'Login') {
    return next('/')
  } else if (!store.isAuthenticated && to.meta.requiresAuth) {
    return next('/login')
  } else {
    return next()
  }
})

export default router
