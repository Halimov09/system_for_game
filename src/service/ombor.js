import axios from "./api";

const omborService = {
    async getOmbor() {
      const data = await axios.get("bar/products/")
      return data;
    },

    async getOmborId(id) {
      const data = await axios.get(`bar/products/${id}/`)
      
      return data
    },

    async deleteOmborId(id) {
      const data = await axios.delete(`bar/products/${id}/`)

      return data
    },

    async putOmborId(id, updatedData) {
      const data = await axios.put(`bar/products/${id}/`, updatedData);
      return data;
    },

    async postOmbor(ombor) {
      const data = await axios.post(`bar/products/`, ombor)

      return data
    },
}

export default omborService;