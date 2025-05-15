import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  getOmborCategorySucces,
  postOmborCategoryFailure,
  postOmborCategoryStart,
  postOmborCategorySuccess
} from '../slice/omborCategory';
import omborCategoryService from '../service/omborCategory';
import { Input } from '../ui';
import AddProduct from './addProduct';
import { toast } from 'react-toastify';

const OmborCategoryForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', image: null });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // <-- Bu yerda selector orqali state.category ichidagi category massivini olamiz
  const { category } = useSelector(state => state.omborCategory);

  // Sahifa yuklanganda mavjud kategoriyalarni Redux’ga yuklaymiz
  useEffect(() => {
    (async () => {
      try {
        const res = await omborCategoryService.getOmborCategory();
        dispatch(getOmborCategorySucces(res.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postOmborCategoryStart());
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('image', formData.image);

      const res = await omborCategoryService.postOmborCategory(data);
      dispatch(postOmborCategorySuccess(res.data));
      toast.success("Muvaffaqiyatlik bajarildi")
      setAlert({ type: 'success', message: 'Muvaffaqiyatli yaratildi!' });
      setFormData({ name: '', image: null });

      // yangilangan ro’yxatni olish
      const list = await omborCategoryService.getOmborCategory();
      dispatch(getOmborCategorySucces(list.data));
    } catch (error) {
      dispatch(postOmborCategoryFailure(error.message));
      setAlert({ type: 'error', message: 'Xatolik: ' + error.message });
      toast.error("Hatolik yuz berdi")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await omborCategoryService.getOmborCategory();
        dispatch(getOmborCategorySucces(response.data));
        toast.success("Muvaffaqiyatlik bajarildi")
        
      } catch (error) {
        toast.error("Kategoriya olishda xatolik:");
      }
    })();
  }, []);
  

  return (
    <div>
    {/* 1-Accordion: Kategoriya qo‘shish formasi */}
    <Accordion sx={{ backgroundColor: '#1f2937', border: '1px solid white', color: '#fff' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <Typography variant="h6">+ Yangi ombor yaratish</Typography>
      </AccordionSummary>
  
      <AccordionDetails>
        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}
  
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <Input
            label="Category Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
  
          <div>
            <label htmlFor="image">Image</label>
            <input
              className="add_input"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ color: 'white', marginTop: '8px' }}
            />
          </div>
  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ height: '45px' }}
          >
            {loading ? 'Kutip turing...' : 'Yuborish'}
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  
    <div style={{ marginTop: '24px' }}>
  <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
    Mavjud ro'yhatlar
  </Typography>

  {Array.isArray(category) && category.map(item => (
      <Accordion key={item.id} className="accordion" sx={{ backgroundColor: 'rgb(31 41 55)', border: '1px solid white', color: '#fff', marginBottom: '16px', width: '100%' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Typography>{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <AddProduct categoryId={item.id} />
          </div>
        </AccordionDetails>
      </Accordion>
    ))}
</div>

  </div>
  
  );
};

export default OmborCategoryForm;
