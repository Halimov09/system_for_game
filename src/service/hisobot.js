import axios from "./api";

const hisobotService = {
    async getHisobot() {
      const data = await axios.get("gaming/categories/")
      return data;
    },

    
}

export default hisobotService;