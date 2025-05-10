import axios from "./api";

const omborCategoryService = {
    async getOmborCategory() {
      const data = await axios.get("bar/categories/")
      return data;
    },

    async getOmborCategoryId(id) {
      const data = await axios.get(`bar/categories/${id}/`)
      
      return data
    },

    async deleteOmborCategoryId(id) {
      const data = await axios.delete(`bar/categories/${id}/`)

      return data
    },

    async postOmborCategory(omborCategory) {
      const data = await axios.post(`bar/categories/`, omborCategory)

      return data
    },
}

export default omborCategoryService;