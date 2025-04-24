import axios from "./api";

const barService = {
    async getBar() {
      const data = await axios.get("gaming/categories/")
      return data;
    },

    async getBarItem(id) {
      const data = await axios.get(`gaming/categories/${id}`)
      
      return data
    },

    async getdeleteItem(id) {
      const data = await axios.delete(`gaming/categories/${id}`)

      return data
    },

    async Postgame(bar) {
      const data = await axios.post(`gaming/categories/`, bar, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      return data
    },
}

export default barService;