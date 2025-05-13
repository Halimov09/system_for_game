import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postItemOmborFailure, postItemOmborStart, postItemOmborSuccess } from '../slice/ombor';
import omborService from '../service/ombor';
import { Input } from '../ui';
import { Button } from '@mui/material';
 // slice to‘g‘ri yo‘l bo‘lishi kerak

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
      alert('Muvaffaqiyatlik yaratildi!');

      setProduct({ name: '', price: '', stock: '', category: categoryId });

    } catch (error) {
      console.error(error);
      dispatch(postItemOmborFailure());
      alert('Failed to add product.');
      setProduct({ name: '', price: '', stock: '', category: categoryId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add_product_form">
      <Input
        label="Mahsulot nomi"
        name="name"
        type="text"
        value={product.name}
        onChange={handleChange}
      />
      <Input
        label="Mahsulot narhi"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
      />
      <Input
        label="Mahsulot narhi"
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
      />
      <Button type="submit" className="add_btn">Saqlash</Button>
    </form>
  );
};

export default AddProduct;
