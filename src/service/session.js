import axios from "./api";

const roomSessionService = {
    async getRoomSes() {
      const data = await axios.get("gaming/sessions/")
      return data;
    },

    async getRoomSesId(id) {
      const data = await axios.get(`gaming/sessions/${id}/`)
      
      return data
    },

    async deleteRoomSesId(id) {
      const data = await axios.delete(`gaming/sessions/${id}/`)

      return data
    },

    async putRoomSesId(id) {
        const data = await axios.put(`gaming/sessions/${id}/`)
  
        return data
      },

    async PostRomSes(session) {
      const data = await axios.post(`gaming/sessions/`, session)

      return data
    },
}

export default roomSessionService;