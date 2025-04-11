import { useSelector } from 'react-redux';
import { Navbar } from './components';
import { Route, Routes } from 'react-router-dom';

function App() {
  const count = useSelector(state => state.value);

  console.log(count);
  return (
    <div className="App">
     <h1>count: {count}</h1>
     <Routes>
      <Route path="/" element={<Navbar />} />
     </Routes>
    </div>
  );
}

export default App;
