import { useDispatch, useSelector } from 'react-redux';
import { Bolimlar, Hisobotlar, Honalar, Login, Mahsulot, Main, Navbar, Ombor, Register } from './components';
import { Route, Routes } from 'react-router-dom';
import authService from './service/auth';
import { useEffect } from 'react';
import { signUserSuccess } from './slice/auth';
import { getItem } from './helpers/persistance-storage';
import barService from './service/bar';
import { getBarStart, getBarSucces } from './slice/bar';
import Gaming from './components/gaming';
import CreateGamingCategories from './components/creategamingcategories';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await authService.getUser("user");
      dispatch(signUserSuccess(response))
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const getBar = async () => {
    dispatch(getBarStart())
    try {
      const response = await barService.getBar()
      dispatch(getBarSucces(response.data))
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = getItem("user")
    if (token) {
      getUser();
    }
    getBar();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Main />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Bo'limlar" element={<Bolimlar />} />
        <Route path="/Honalar" element={<Honalar />} />
        <Route path="/Ombor" element={<Ombor />} />
        <Route path="/Hisobotlar" element={<Hisobotlar />} />
        <Route path="/Registironlyfordeveloper" element={<Register />} />
        <Route path="/Gaming/:id" element={<Gaming />} />
        <Route path="/Savdo" element={<Mahsulot />} />
        <Route path="/CreateGame" element={<CreateGamingCategories />} />
      </Routes>

      {/* ToastContainer umumiy joyga qo‘shildi */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
