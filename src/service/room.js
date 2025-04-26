import axios from "./api";

const roomService = {
    async getRoom() {
      const data = await axios.get("gaming/rooms/")
      return data;
    },

    async getRoomItem(id) {
      const data = await axios.get(`gaming/rooms/${id}/`)
      
      return data
    },

    async deleteRoom(id) {
      const data = await axios.delete(`gaming/rooms/${id}/`)

      return data
    },

    async PostRoom(bar) {
      const data = await axios.post(`gaming/rooms/`, bar)

      return data
    },
}

export default roomService;