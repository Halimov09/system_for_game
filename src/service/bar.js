import axios from "./api";

const barService = {
    async getBar() {
      const data = await axios.get("gaming/categories/")
      return data;
    }
}

export default barService;