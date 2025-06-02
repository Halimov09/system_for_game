import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHisobFailure, getHisobStart, getHisobSucces } from '../slice/hisobot';
import hisobotService from '../service/hisobot';
import IncomeChart from './incomeChart';
import { toast } from 'react-toastify';
import Expenses from './expenses';
import YouTubeModal from './youtubecomponent';

const Hisobotlar = () => {
  const dispatch = useDispatch();
  const { bars } = useSelector(state => state.bar);
  const { hisobot } = useSelector(state => state.hisobot);

  const [type, setType] = useState("daily");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getHisobStart());
      try {
        const response = await hisobotService.getHisobot(type, category);
        dispatch(getHisobSucces(response.data));
        toast.success("Hisobot muvaffaqiyatli yuklandi");
      } catch (error) {
        dispatch(getHisobFailure(error));
        toast.error("Hisobotni olishda xatolik yuz berdi");
      }
    };

    fetchData();
  }, [type, category]);

  return (
    <div className='maintool'>
    <div className="yout">
      <YouTubeModal videoId="y4j7s_yDbpQ" buttonText="Videoni ko‘rish" />
    </div>
      <div className="hisobotlar-container">
        <h2 className="hisobotlar-title h2_toolbar">Hisobotlar</h2>

        <div className="filters">
          <select value={type} onChange={e => setType(e.target.value)} className="select">
            <option value="hourly">Soatlik</option>
            <option value="daily">Kunlik</option>
            <option value="monthly">Oylik</option>
          </select>

          <select value={category} onChange={e => setCategory(e.target.value)} className="select">
            <option value="">Hamma bo'limlar</option>
            {bars.map(bar => (
              <option key={bar.id} value={bar.id}>{bar.name}</option>
            ))}
          </select>
        </div>

        <IncomeChart data={hisobot} type={type} />
        <Expenses />
      </div>
    </div>
  );
};

export default Hisobotlar;
