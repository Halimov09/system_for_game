import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getOmborCategorySucces, postOmborCategoryFailure, postOmborCategoryStart, postOmborCategorySuccess } from '../slice/omborCategory';
import omborCategoryService from '../service/omborCategory';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { Input } from "../ui"
import { postItemOmborFailure, postItemOmborStart, postItemOmborSuccess } from '../slice/ombor';
import omborService from '../service/ombor';

// ✅ Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = ({ categoryId }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: categoryId
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(postItemOmborStart());

    try {
      await omborService.postOmbor({
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        category: categoryId
      });

      dispatch(postItemOmborSuccess());
      toast.success('Muvaffaqiyatli yaratildi!');
      setProduct({ name: '', price: '', stock: '', category: categoryId });
    } catch (error) {
      console.error(error);
      dispatch(postItemOmborFailure());
      toast.error("Mahsulot qo‘shishda xatolik yuz berdi.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Rostdan ham ushbu omborni o'chirmoqchimisiz?");
    if (!confirmDelete) return;

    dispatch(postOmborCategoryStart());
    try {
      await omborCategoryService.deleteOmborCategoryId(categoryId);
      dispatch(postOmborCategorySuccess());
      toast.success("Ombor muvaffaqiyatli o‘chirildi!");

      const responses = await omborCategoryService.getOmborCategory();
      dispatch(getOmborCategorySucces(responses));
    } catch (error) {
      console.error(error);
      dispatch(postOmborCategoryFailure());
      toast.error("Omborni o‘chirishda xatolik yuz berdi.");
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
        style={{background: "rgb(31 41 55)"}}
          expandIcon={<ExpandMoreIcon style={{color: "white"}} />}
          aria-controls="product-form-content"
          id="product-form-header"
        >
          <Typography>Mahsulot qo‘shish</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit} className="add_product_form">
            <Input
              label="Mahsulot nomi"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
            />
            <Input
              label="Mahsulot narxi"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
            <Input
              label="Mahsulot soni"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
            />
            <Button type="submit" className="add_btn" variant="contained">
              Mahsulot saqlash
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>

      <Button
        onClick={handleDelete}
        className="chiqish_btn"
        color="error"
        variant="contained"
        style={{ marginTop: '10px' }}
      >
        Ombor o'chirish
      </Button>

      {/* Toastlarni ko‘rsatish uchun kerak */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProduct;
