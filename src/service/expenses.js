import axios from "./api";

const expensesService = {
    async getexpenses() {
      const data = await axios.get("gaming/expenses/")
      return data;
    },

    async getdeleteItem(id) {
      const data = await axios.delete(`gaming/expenses/${id}/`)

      return data
    },

    async PostExpenses(expenses) {
      const data = await axios.post(`gaming/expenses/`, expenses, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      return data
    },
}

export default expensesService;