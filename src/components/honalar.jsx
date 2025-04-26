import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomSucces, postItemRoomFailure, postItemRoomStart, postItemRoomSuccess } from '../slice/room';
import roomService from '../service/room';
import { useNavigate } from 'react-router-dom';

const Honalar = () => {
  const {id} = useSelector(state => state.bar)
  const {rooms, isLoading} = useSelector(state => state.room)

  console.log(rooms);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const [formData, setFormData] = useState({
    name: '',
    price_per_hour: '',
    category: localStorage.getItem("selectedBarId")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const room = {
      name: formData.name,
      price_per_hour: formData.price_per_hour,
      category: formData.category
    };
    
    dispatch(postItemRoomStart())
    try {
      await roomService.PostRoom(room)
      dispatch(postItemRoomSuccess())
      const responses = await roomService.getRoom();
      dispatch(getRoomSucces(responses.data));
      alert("Muvaffaqiyatlik yaratildi")
      navigate("/Honalar")
    } catch (error) {
      alert("Nimadur hato ketti")
      dispatch(postItemRoomFailure())
      navigate("/")
      
    }
    setFormData({
      name: '',
      price_per_hour: '',
      category: localStorage.getItem("selectedBarId")
    })
    // bu yerda formani yuborish funksiyasi yozildi
  };

  useEffect(() => {
      const getAllRooms = async () => {
        try {
          const response = await roomService.getRoom()
          dispatch(getRoomSucces(response.data))
          console.log(response.data);
          
        } catch (error) {
          console.log("Xatolik:", error)
        }
      }
    
      getAllRooms()
    }, []) 

  return (
    <div className="maintool">
      <div className="honalar-header">
        <h2 className="honalar-title">Honalar</h2>
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="iconw" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Qo'shish</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <Input
              label="Hona nomi"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Narxi (soatiga)"
              name="price_per_hour"
              type="number"
              value={formData.price_per_hour}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Saqlash
            </Button>
          </AccordionDetails>
        </Accordion>
        <div className="card_room">
        {rooms.map(item => (
          <div>
          <div class="room-card">
            <div class="room-image">
              <img src={item.category_detail.image} alt="Category Image" />
            </div>
  
            <div class="room-content">
              <h2 class="room-name">Nomi: {item.name}</h2>
              <p class="room-price">Narxi soatiga:  {item.price_per_hour}
              </p>
              <p class="room-status occupied">{item.is_occupied && "Band qilingan" || "Band qilinmagan"              }</p>
              <div class="room-category">
                <strong>Bo'lim:</strong> {item.category_detail.name}
              </div>
              <button disabled={item.is_occupied} class="book-button">Band qilish</button>
              <button disabled={item.is_occupied} class="book-button del_btn">O'chirish</button>
            </div>
          </div>
  
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Honalar;
