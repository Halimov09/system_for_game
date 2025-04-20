import axios from "./api";

const barService = {
    async getBar() {
      const data = await axios.get("bar/categories/")
      return data;
    }
}

export default barService;