import { useSelector } from 'react-redux';
import { Login, Main, Navbar, Register } from './components';
import { Route, Routes } from 'react-router-dom';

function App() {
  const count = useSelector(state => state.value);

  console.log(count);
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
     </Routes>
    </div>
  );
}

export default App;
