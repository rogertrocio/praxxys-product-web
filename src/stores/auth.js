import { defineStore } from "pinia"
import { computed, ref } from "vue"
import cookies from "@/boots/cookies"
import { api } from "@/boots/axios"

export const useAuthStore = defineStore('auth', () => {
  const user = ref(
    cookies.get('praxxys-user') !== null || cookies.get('praxxys-user') !== undefined
    ? cookies.get('praxxys-user')
    : null
  )
  const token = ref(
    cookies.get('praxxys-token') !== null || cookies.get('praxxys-token') !== undefined
    ? cookies.get('praxxys-token')
    : null
  )
  const errors = ref({
    username: null,
    password: null,
  })
  const errorMessage = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => token.value !== null && token.value !== undefined)

  const login = async (model) => {
    loading.value = true

    try {
      const response = await api.post('/auth/login', model)
      cookies.set('praxxys-user', response.data.data.user, { sameSite: 'Lax' })
      cookies.set('praxxys-token', response.data.data.token, { sameSite: 'Lax' })
      return response.data.data
    } catch (e) {
      errorMessage.value = e.response?.data?.message || 'An error has occurred while trying to login. Please try again.'
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      const response = await api.post('/auth/logout')
      cookies.remove('praxxys-user')
      cookies.remove('praxxys-token')
      return response
    } catch (e) {
      errorMessage.value = e.response?.data?.message || 'An error has occurred while trying to logout. Please try again.'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    errors,
    errorMessage,
    isAuthenticated,
    login,
    logout,
  }
})
