import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getExpensesStart,
  getExpensesSucces,
  getExpensesFailure,
  deleteExpensesStart,
  deleteExpensesSuccess,
  deleteExpensesFailure,
  postExpensesStart,
  postExpensesSuccess,
  postExpensesFailure
} from "../slice/expenses";

import expensesService from '../service/expenses';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Input from '../ui/input'; // MUI asosida o'zingiz yaratgan input
import '../style.css'; // ⬅️ CSS faylni import qilamiz

const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading } = useSelector(state => state.expenses);
  const [form, setForm] = useState({ title: '', amount: '' });

  const fetchExpenses = async () => {
    dispatch(getExpensesStart());
    try {
      const res = await expensesService.getexpenses();
      dispatch(getExpensesSucces(res.data));
    } catch (err) {
      dispatch(getExpensesFailure(err.message));
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async id => {
    dispatch(deleteExpensesStart());
    try {
      await expensesService.getdeleteItem(id);
      const updated = expenses.filter(item => item.id !== id);
      dispatch(deleteExpensesSuccess(updated));
      toast.success("Chiqim o'chirildi");
    } catch (err) {
      dispatch(deleteExpensesFailure(err.message));
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.amount) return toast.warning("Barcha maydonlarni to'ldiring");

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("amount", form.amount);

    dispatch(postExpensesStart());
    try {
      await expensesService.PostExpenses(payload);
      dispatch(postExpensesSuccess());
      setForm({ title: '', amount: '' });
      fetchExpenses();
      toast.success("Chiqim yaratildi");
    } catch (err) {
      dispatch(postExpensesFailure());
      toast.error("Yaratishda xatolik yuz berdi");
    }
  };

  return (
    <Card className="card-wrapper">
      <CardContent>
        <h3 className="card-title">Chiqimlar</h3>
        <form onSubmit={handleSubmit} className="form-row">
          <Input
            label="Chiqim nomi"
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            name="title"
          />
          <Input
            label="Chiqim miqdori"
            type="number"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            name="amount"
          />
          <Button type="submit" variant="contained" disabled={isLoading}>Qo'shish</Button>
        </form>

        <div className="expenses-list">
          {expenses.length === 0 ? (
            <p className="no-expenses">Hozircha hech qanday chiqim mavjud emas</p>
          ) : (
            expenses.map(exp => (
              <div key={exp.id} className="expense-item">
                <div>
                  <p className="expense-title">{exp.title}</p>
                  <p className="expense-amount">{exp.amount} so'm</p>
                </div>
                <IconButton color="error" onClick={() => handleDelete(exp.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Expenses;
