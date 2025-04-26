import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button, colors } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomSucces, postItemRoomFailure, postItemRoomStart, postItemRoomSuccess } from '../slice/room';
import roomService from '../service/room';
import { useNavigate } from 'react-router-dom';

const Honalar = () => {
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

  const deleteHandler = async (id) => {
    try {
      await roomService.deleteRoom(id)
      const response = await roomService.getRoom(id)
      dispatch(getRoomSucces(response.data))
      alert("O'chirildi")
    } catch (error) {
      alert("Error deleting room:");
    }
  }

  useEffect(() => {
      const getAllRooms = async () => {
        try {
          const response = await roomService.getRoom()
          dispatch(getRoomSucces(response.data))          
        } catch (error) {
          console.log("Error fetching rooms:");
        }
      }
      getAllRooms()
    }, []) 

  return (
    <div className="maintool">
      <div className="honalar-header">
        <h2 className="honalar-title">O'yinlar</h2>
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="iconw" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">O'yin qo'shish</Typography>
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
            <Button className="add_input"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Saqlash
            </Button>
          </AccordionDetails>
        </Accordion>
        <div className="card_room">
          <h2>Mavjud o'yinlar</h2>
            {rooms.map(item => (
              <Accordion className="accordion">
              <AccordionSummary className='accordion-summary'
                expandIcon={<ExpandMoreIcon className="iconw" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">{item.name}</Typography>
                <Typography style={item.is_occupied && {color: "red"} || {color:"green"}} component="span" className='bandtext'>{item.is_occupied && "Band qilingan" || "Band qilinmagan"              }</Typography>

              </AccordionSummary>
              <AccordionDetails>
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
                  <button style={item.is_occupied ? { cursor: "not-allowed", opacity: "0.5" } : {}} class="book-button">Band qilish</button>
                  <button onClick={() => deleteHandler(item.id)} style={item.is_occupied ? { cursor: "not-allowed", opacity: "0.5" } : {}} class="book-button del_btn">O'chirish</button>
                  <button style={item.is_occupied ? { display: "auto" } : {display: "none"}} class="book-button del_btn">To'htatish</button>
                </div>
              </div>
              </AccordionDetails>
              </Accordion>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Honalar;
