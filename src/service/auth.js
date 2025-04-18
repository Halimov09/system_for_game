import axios from './api';

const authService = {
  async login() {
    // login qilish uchun kerakli kodlar
    // const response = await axios.post('/token', {username, password});

    // return response;
  },
  async register(user) {
    // register qilish uchun kerakli kodlar
    const response = await axios.post('auth/register/', user,{
            headers: {
              'Provider-Key': 'renessans3',
            }
        }
    );

    return response;
  },
  async getUser() {
    // userni olish uchun kerakli kodlar
    // const response = await axios.get('/token');
  }
}

export default authService;