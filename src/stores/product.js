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
  const errors = ref({})
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
    clearFilter,
  }
})
