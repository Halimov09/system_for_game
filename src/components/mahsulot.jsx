import React, { useEffect, useState } from 'react';
import omborService from '../service/ombor';
import roomSessionService from '../service/session';
import { useDispatch, useSelector } from 'react-redux';
import { getOmborSucces } from '../slice/ombor';
import { getRoomSesSucces } from '../slice/session';
import { Input } from '../ui';
import prodSessionService from '../service/prodsession';

const Mahsulot = () => {
  const dispatch = useDispatch();
  const { ombor } = useSelector(state => state.ombor);
  const { sessions } = useSelector(state => state.session);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    session: '',
    product: '',
    quantity: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await omborService.getOmbor();
        dispatch(getOmborSucces(response.data));

        const sesRes = await roomSessionService.getRoomSes();
        dispatch(getRoomSesSucces(sesRes.data));
        
      } catch (error) {
        alert('Xatolik: Ma’lumotlar yuklanmadi');
      }
    };

    console.log(sessions);
    
    getData();
  }, []);

  const handleOpen = (productId) => {
    setSelectedProduct(productId);
    setFormData({ session: '', product: productId, quantity: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ session: '', product: '', quantity: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.session || !formData.quantity) return alert("Barcha maydonlar to‘ldirilsin");

    try {
      await prodSessionService.postOmborSession(formData);
      alert('Mahsulot muvaffaqiyatli qo‘shildi!');
      const sesRes = await roomSessionService.getRoomSes();
      dispatch(getRoomSesSucces(sesRes.data));
      handleClose();
    } catch (error) {
      alert('Xatolik yuz berdi!');
      handleClose();
    }
  };

  const activeSessions = sessions ? sessions.filter(s => s.is_active) : [];

  console.log(activeSessions);
  
  return (
    <div className="maintool">
      <h2 className="title">Mahsulotlar ro‘yxati</h2>

      <div className="product-wrapper">
        {ombor.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.category_detail.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>Narxi: {product.price} so'm</p>
            <p>Soni: {product.stock} dona</p>
            <button onClick={() => handleOpen(product.id)} className="btn">Sessionga qo‘shish</button>
          </div>
        ))}
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>honalarga sotish</h3>

            <label className="dropdown-label">Session tanlang:</label>
            <select
              name="session"
              className="dropdown"
              value={formData.session}
              onChange={handleChange}
            >
              <option value="">-- Tanlang --</option>
              {activeSessions.map(s => (
                <option className='optionses' key={s.id} value={s.id}>
                {s.gaming_room ? s.gaming_room.name : 'Nomaʼlum xona'}
              </option>

              ))}
            </select>

            <Input
              label="Soni"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="btn" onClick={handleSubmit}>Qo‘shish</button>
              <button className="btn cancel" onClick={handleClose}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mahsulot;
