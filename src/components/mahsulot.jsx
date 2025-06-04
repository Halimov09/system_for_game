import React, { useEffect, useState } from 'react';
import omborService from '../service/ombor';
import roomSessionService from '../service/session';
import { useDispatch, useSelector } from 'react-redux';
import { getOmborSucces } from '../slice/ombor';
import { getRoomSesSucces } from '../slice/session';
import { Input } from '../ui';
import prodSessionService from '../service/prodsession';
import { toast } from 'react-toastify';
import YouTubeModal from './youtubecomponent';

const Mahsulot = () => {
  const dispatch = useDispatch();
  const { ombor } = useSelector(state => state.ombor);
  const { sessions } = useSelector(state => state.session);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    session: '',
    product: '',
    quantity: ''
  });

  const [editData, setEditData] = useState({
    id: '',
    name: '',
    price: '',
    stock: ''
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
        toast.error('Xatolik: Ma’lumotlar yuklanmadi');
      }
    };

    getData();
  }, []);

  const handleOpen = (productId) => {
    setSelectedProduct(productId);
    setFormData({ session: '', product: productId, quantity: '' });
    setOpen(true);
  };

  const handleEditOpen = (product) => {
    setEditData({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ session: '', product: '', quantity: '' });
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditData({ id: '', name: '', price: '', stock: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (!formData.session || !formData.quantity)
    return toast.warning("Barcha maydonlar to‘ldirilsin");

  try {
    await prodSessionService.postOmborSession(formData);
    toast.success('Mahsulot sessionga qo‘shildi!');

    // YANGILIK: omborni yana get qilib olish
    const updatedOmbor = await omborService.getOmbor();
    dispatch(getOmborSucces(updatedOmbor.data));

    const sesRes = await roomSessionService.getRoomSes();
    dispatch(getRoomSesSucces(sesRes.data));
    handleClose();
  } catch (error) {
    toast.error('Xatolik yuz berdi!');
    handleClose();
  }
};


  const handleEditSubmit = async () => {
    try {
      const original = await omborService.getOmborId(editData.id);

      const updatedData = {
        name: editData.name,
        price: editData.price,
        stock: editData.stock,
        image: original.data.image,
        category: original.data.category
      };

      await omborService.putOmborId(editData.id, updatedData);
      toast.success('Mahsulot muvaffaqiyatli tahrirlandi!');

      const response = await omborService.getOmbor();
      dispatch(getOmborSucces(response.data));
      handleEditClose();
    } catch (error) {
      toast.error('Tahrirlashda xatolik yuz berdi!');
      handleEditClose();
    }
  };

  const handleDelete = async (productId) => {
  const isConfirmed = window.confirm("Rostdan ham ushbu mahsulotni o‘chirmoqchimisiz?");
  if (!isConfirmed) return;

  try {
    await omborService.deleteOmborId(productId);
    toast.success("Mahsulot muvaffaqiyatli o‘chirildi!");

    // O'chirgandan keyin yangilab olamiz
    const response = await omborService.getOmbor();
    dispatch(getOmborSucces(response.data));
  } catch (error) {
    toast.error("Mahsulotni o‘chirishda xatolik yuz berdi.");
  }
};


  const activeSessions = sessions ? sessions.filter(s => s.is_active) : [];

  return (
    <div className="maintool">
      <YouTubeModal videoId="MPPw6xPuZjY" buttonText="Foydalanish uchun qo'llanma" />
      <h2 className="title">Mahsulotlar ro‘yxati</h2>

      <div className="product-wrapper">
        {ombor && ombor.length > 0 ? (
          ombor.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.category_detail.image} alt={product.name} className="product-img" />
              <h3>{product.name}</h3>
              <p>Narxi: {product.price} so'm</p>
              <p>Soni: {product.stock} dona</p>
              <button onClick={() => handleOpen(product.id)} className="btn">mahsulotni sotish</button>
              <button onClick={() => handleEditOpen(product)} className="btn edit">Tahrirlash</button>
              <button onClick={() => handleDelete(product.id)} className="btn delete">O‘chirish</button>
            </div>
          ))
        ) : (
          <p>Mahsulotlar yuklanmoqda...</p>
        )}
      </div>

      {/* Sessionga qo‘shish modal */}
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Honalarga sotish</h3>

            <label className="dropdown-label">Session tanlang:</label>
            <select
              name="session"
              className="dropdown"
              value={formData.session}
              onChange={handleChange}
            >
              <option value="">-- Tanlang --</option>
              {activeSessions.map(s => (
                <option key={s.id} value={s.id}>
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

      {/* Tahrirlash modal */}
      {editOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Mahsulotni tahrirlash</h3>

            <Input
              label="Nomi"
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
            />
            <Input
              label="Narxi"
              type="text"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
            />
            <Input
              label="Soni"
              type="number"
              name="stock"
              value={editData.stock}
              onChange={handleEditChange}
            />

            <div className="modal-actions">
              <button className="btn" onClick={handleEditSubmit}>Saqlash</button>
              <button className="btn cancel" onClick={handleEditClose}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mahsulot;
