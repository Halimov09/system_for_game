import axios from "./api";

const prodSessionService = {
    async getOmborSession() {
      const data = await axios.get("bar/session-products/")
      return data;
    },

    async getOmborSessionId(id) {
      const data = await axios.get(`bar/session-products/${id}/`)
      
      return data
    },

    async deleteOmborSessionId(id) {
      const data = await axios.delete(`bar/session-products/${id}/`)

      return data
    },

    async postOmborSession(prodSession) {
      const data = await axios.post(`bar/session-products/`, prodSession)

      return data
    },
}

export default prodSessionService;