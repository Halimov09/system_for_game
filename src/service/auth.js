import axios from './api';

const authService = {
  async login(user) {
    // login qilish uchun kerakli kodlar
    const response = await axios.post('token/', user,{
      headers: {
        'Provider-Key': 'renessans3',
      }

    });

    return response;
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
    const data = await axios.get('auth/me/');

    return data;
  }
}

export default authService;
