import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHisobFailure, getHisobStart, getHisobSucces } from '../slice/hisobot';
import hisobotService from '../service/hisobot';
import IncomeChart from './incomeChart';

const Hisobotlar = () => {
  const dispatch = useDispatch();
  const {bars} = useSelector(state => state.bar)
  const { hisobot } = useSelector(state => state.hisobot);

  console.log(bars);
  

  const [type, setType] = useState("daily");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRoomData = async () => {
      dispatch(getHisobStart());
      try {
        const response = await hisobotService.getHisobot(type, category);
        dispatch(getHisobSucces(response.data));
      } catch (error) {
        dispatch(getHisobFailure(error));
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [type, category]); // type yoki category o‘zgarsa qaytadan chaqiradi

  return (
    <div className='maintool'>
      <div style={{ marginBottom: "20px" }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="hourly">Soatlik</option>
          <option value="daily">Kunlik</option>
          <option value="monthly">Oylik</option>
        </select>

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Hamma bo'limlar</option>
          {bars.map((bar) => (
            <option key={bar.id} value={bar.id}>
              {bar.name}
            </option>
          ))}
          {/* Shu yerga backend'dan categories kelsa dynamic qo‘shsa bo‘ladi */}
        </select>
      </div>

      <IncomeChart data={hisobot} type={type} />
    </div>
  );
};

export default Hisobotlar;
