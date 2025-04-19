import { api } from "@/boots/axios"
import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const product = ref({})
  const loading = ref(false)
  const pagination = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    links: [],
  })
  const filter = reactive({
    search: '',
    category: null,
  })
  const errors = ref({
    name: null,
    category_id: null,
    description: null,
    date_time: null,
  })
  const errorMessage = ref(null)

  const getProducts = async (page = 1) => {
    loading.value = true

    const params = {
      page,
    }

    if (filter.search !== null && filter.search !== '') params['filter[search]'] = filter.search

    if (filter.category !== null) params['filter[category]'] = filter.category

    try {
      const response = await api.get('/product', { params })
      products.value = response.data.data

      pagination.value.current_page = response.data.meta.current_page
      pagination.value.per_page = response.data.meta.per_page
      pagination.value.total = response.data.meta.total
      pagination.value.links = response.data.meta.links
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  const saveProduct = async (model) => {
    loading.value = true

    const formData = new FormData()
    formData.append('name', model.name)
    formData.append('category_id', model.category_id)
    formData.append('description', model.description)
    formData.append('date_time', model.date_time)

    if (model.images.length > 0) {
      for (const image of model.images) {
        formData.append('images[]', image)
      }
    }

    try {
      const response = await api.post('/product', formData)
      return response.data.data
    } catch (e) {
      errors.value = e.response?.data?.errors
      errorMessage.value = e.response?.data?.message || 'An error has occurred while trying to save product. Please try again.'
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    loading.value = true

    try {
      const response = await api.delete(`/product/${id}`)
      return response
    } catch (e) {
      errorMessage.value = e.response?.data?.message || 'An error has occurred while deleting the product. Please try again.'
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  const clearFilter = () => {
    filter.search = ''
    filter.category = null
  }

  return {
    products,
    product,
    loading,
    pagination,
    filter,
    errors,
    errorMessage,
    getProducts,
    saveProduct,
    deleteProduct,
    clearFilter,
  }
})
