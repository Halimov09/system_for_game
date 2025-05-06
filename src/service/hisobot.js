// service/hisobot.js
import axios from "./api";

const hisobotService = {
  async getHisobot(type = 'daily', category = '') {
    const response = await axios.get("gaming/stats/revenue/", {
      params: {
        type,
        ...(category && { category }) // agar category bo‘lsa qo‘shadi
      }
    });
    return response;
  }
};

export default hisobotService;
