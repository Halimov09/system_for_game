import { useSelector } from 'react-redux';
import { Bolimlar, Hisobotlar, Honalar, Login, Main, Navbar, Ombor, Register } from './components';
import { Route, Routes } from 'react-router-dom';

function App() {
  const count = useSelector(state => state.value);

  console.log(count);
  return (
    <div className="App">
     <Navbar />
     <Main/>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Bo'limlar" element={<Bolimlar />} />
      <Route path="/Honalar" element={<Honalar />} />
      <Route path="/Ombor" element={<Ombor />} />
      <Route path="/Hisobotlar" element={<Hisobotlar />} />
      <Route path="/Registironlyfordeveloper" element={<Register />} />
     </Routes>
    </div>
  );
}

export default App;
