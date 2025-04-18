import { api } from "@/boots/axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCommonStore = defineStore('common', () => {
  const categories = ref([])

  const getCategories = async () => {
    try {
      const response = await api.get('/common/category')

      categories.value = response.data.data.map((category) => {
        return {
          label: category.name,
          value: category.id,
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    categories,
    getCategories,
  }
})
