import axios from "./api";

const gameService = {
    async getGame() {
      const data = await axios.get("bar/categories/")
      return data;
    }
}

export default gameService;