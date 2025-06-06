import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button, colors, Modal, Box, Fade, Backdrop, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomSucces, postItemRoomFailure, postItemRoomStart, postItemRoomSuccess } from '../slice/room';
import roomService from '../service/room';
import { useNavigate } from 'react-router-dom';
import roomSessionService from '../service/session';
import plus from '../constants/img/plus.svg';
import band from '../constants/img/boshlash.svg';
import deleted from '../constants/img/delete.svg';
import tohtat from '../constants/img/pause.svg';
import { getRoomSesStart, getRoomSesSucces, postItemRoomSesFailure, postItemRoomSesStart, postItemRoomSesSuccess, putItemRoomSesStart, putItemRoomSesSuccess } from '../slice/session';
import SessionList from './sessionList';
import { toast } from 'react-toastify';
import YouTubeModal from './youtubecomponent';

const Honalar = () => {
  const {rooms, isLoading} = useSelector(state => state.room)
  const {sessions} = useSelector(state => state.session)
  const [showAlert, setShowAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(""); // yangi state

  const [showAlert2, setShowAlert2] = useState(false);
  const { hisobot } = useSelector(state => state.hisobot);


  
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoomSessions = async () => {
      dispatch(getRoomSesStart());
      try {
        const response = await roomSessionService.getRoomSes();
        dispatch(getRoomSesSucces(response.data));
        toast.success("Malumotlar muvaffaqiyatlik olindi")
      } catch (error) {
        console.log("Error fetching room sessions:", error);
      }
    };

    fetchRoomSessions();
  }, []);

  console.log(sessions);
  
  const [formData, setFormData] = useState({
    name: '',
    price_per_hour: '',
    category: localStorage.getItem("selectedBarId")
  });

  const [formSession, setFormSession] = useState({
    gaming_room: localStorage.getItem("selectedSesId"),
    session_type: "",  // Default qiymat: VIP
    fixed_duration_minutes: "",
  });

  const handleVaqtlikClick = () => {
    setFormSession((prevState) => ({
      ...prevState,
      session_type: "fixed",  // Vaqtlik tugma bosilganda session_type ni "fixed" qilib o'zgartiramiz
    }));
  };


  // "Vip" tugmasi bosilganda session_type ni "VIP" qilib qaytarish
  const handleVipClick = () => {
    setFormSession((prevState) => ({
      ...prevState,
      session_type: "vip",  // Vip tugma bosilganda session_type ni "VIP" qilib o'zgartiramiz
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // for room

  const [isLoadings, setIsLoading] = useState(false);


 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true); // Loading holatini yoqish

  const room = {
    name: formData.name,
    price_per_hour: formData.price_per_hour,
    category: formData.category
  };

  dispatch(postItemRoomStart());
  try {
    await roomService.PostRoom(room);
    dispatch(postItemRoomSuccess());
    const responses = await roomService.getRoom();
    dispatch(getRoomSucces(responses.data));
    toast.success("Muvaffaqiyatlik yaratildi");
  } catch (error) {
    toast.error("Nimadur hato ketti");
    dispatch(postItemRoomFailure());
    navigate("/");
  } finally {
    setIsLoading(false); // Tugagach, loading holatini o‘chirish
  }

  setFormData({
    name: '',
    price_per_hour: '',
    category: localStorage.getItem("selectedBarId")
  });
};


  // for session

  const handleChangeSes = (e) => {
    const { name, value } = e.target;
    if (name === "fixed_duration_minutes") {
      // Agar soat kiritilsa, uni minutga aylantirish
      const minutes = value * 60;
      setFormSession((prevState) => ({
        ...prevState,
        [name]: minutes,  // Soatni minutga aylantirib saqlaymiz
      }));
    } else {
      setFormSession((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

 
  const handleSessionSubmit = async (e) => {
    e.preventDefault();
  
    const session = {
      gaming_room_id: localStorage.getItem("selectedSesId"),
      session_type: formSession.session_type
    };
  
    // Faqat agar session_type "fixed" bo‘lsa, fixed_duration_minutes ni qo‘shamiz
    if (formSession.session_type === "fixed") {
      session.fixed_duration_minutes = formSession.fixed_duration_minutes;
    }
  
    dispatch(postItemRoomSesStart());
  
    try {
      const response = await roomSessionService.PostRomSes(session);
      dispatch(postItemRoomSesSuccess(response.data));
  
      const responses = await roomService.getRoom();
      dispatch(getRoomSucces(responses.data));

      const responseSession = await roomSessionService.getRoomSes();
      dispatch(getRoomSesSucces(responseSession.data))
  
      setShowAlert2(true); // alertni yoqamiz

      setTimeout(() => setShowAlert2(false), 5000);
      toast.success("Muvaffaqiyatlik bajarildi")
      navigate("/Honalar");
    } catch (error) {
      toast.error("Nimadur hato ketti");
      dispatch(postItemRoomSesFailure());
      navigate("/");
    }
  
    setFormSession({
      gaming_room_id: localStorage.getItem("selectedSesId"),
      session_type: '',
      fixed_duration_minutes: ''
    });
  
    setOpen(false);
  };
  


  const deleteHandler = async (id) => {
    try {
      await roomService.deleteRoom(id)
      const response = await roomService.getRoom(id)
      dispatch(getRoomSucces(response.data))
      toast.success("O'chirildi")
    } catch (error) {
      toast.error("Error deleting room:");
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

    const [activeButton, setActiveButton] = useState(""); // "vip" yoki "vaqt"

    // Vip handle
    const vipHandle = () => {
      setActiveButton("vip"); // Vipni faollashtiramiz
    };
  
    // Vaqt handle
    const vaqtHandle = () => {
      setActiveButton("vaqt"); // Vaqtni faollashtiramiz
    };

    const stopHandle = async (sessionId) => {
      const selectedSesId = sessionId;
      const sessionstop = { is_active: false };
    
      dispatch(putItemRoomSesStart());
    
      try {
        const response = await roomSessionService.putRoomSesId(selectedSesId, sessionstop);
        dispatch(putItemRoomSesSuccess(response.data));
    
        const responses = await roomService.getRoom();
        dispatch(getRoomSucces(responses.data));
    
        const responseSession = await roomSessionService.getRoomSes();
        dispatch(getRoomSesSucces(responseSession.data));
    
        // 👇 response.data yoki responseSession.data orqali total_price ni olish
        const updatedSession = response.data; // agar PUT'dan qaytsa shu bo'ladi
        setTotalPrice(updatedSession.total_price || "0.00");
        toast.success("Muvaffaqiyatlik bajarildi")
    
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    
      } catch (error) {
        toast.error("Hatolik yuz berdi");
        const responseSession = await roomSessionService.getRoomSes();
        dispatch(getRoomSesSucces(responseSession.data));
      }
    };
    

    useEffect(() => {
      const fetchRoomData = async () => {
        try {
          const responses = await roomService.getRoom();
          dispatch(getRoomSucces(responses.data));
          toast.success("Muvaffaqiyatlik bajarildi")
        } catch (error) {
          toast.error("Hatolik yuz berdi");
        }
      };
  
      console.log(sessions);
      
      // Dastlab chaqirish
      fetchRoomData();
  
      // Har 60 soniyada chaqirish
      const intervalId = setInterval(fetchRoomData, 60000);
  
      // Component unmount bo‘lganda intervalni tozalash
      return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
  const fetchRoomData = async () => {
    try {
      const responses = await roomService.getRoom();
      dispatch(getRoomSucces(responses.data));
      
      const responseSession = await roomSessionService.getRoomSes();
      dispatch(getRoomSesSucces(responseSession.data));
    } catch (error) {
      toast.error("Hatolik yuz berdi");
    }
  };

  fetchRoomData();
  const intervalId = setInterval(fetchRoomData, 60000);
  return () => clearInterval(intervalId);
}, [dispatch]);


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  return (
    <div className="maintool">
      <YouTubeModal videoId="5G6jO9a4RmY" buttonText="Foydalanish uchun qo'llanma" />
      <div className="honalar-header">
        <h2 className="honalar-title">O'yinlar</h2>
        <div className="room-list">
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="iconw" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" className='btnall'>O'yin qo'shish
              <img src={plus} alt="" />
            </Typography>
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
              className="add_input"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading} // Bosilganda disable bo‘ladi
            >
              {isLoadings ? "Iltimos, kuting..." : "Saqlash"}
            </Button>

          </AccordionDetails>
        </Accordion>
        <Accordion style={{marginTop: "24px"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold' }}>Joriy narhni ko‘rish</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {rooms?.map((room) => {
        const relatedSession = Array.isArray(sessions)
          ? sessions.find(
              (session) =>
                session.is_active != false &&             // faqat aktiv sessiyalar
                session.gaming_room &&      
                session.current_price > 0 &&                // gaming_room mavjudligi
                session.gaming_room.id === room.id       )
          : null;

        return (
          <Accordion key={room.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{room.name}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {room.price_per_hour} so'm/soat
              </Typography>
              {relatedSession && (
                <Typography sx={{ marginLeft: 'auto', fontWeight: 'bold', color: 'green' }}>
                  Joriy narx: {relatedSession.current_price} so'm
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {relatedSession ? (
                <>
                  <p>Session turi: {relatedSession.session_type}</p>
                  <p style={{ marginTop: '10px' }}>
                    Aktiv: {relatedSession.is_active ? 'Ha' : 'Yo‘q'}
                  </p>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginTop: '10px' }}
                    onClick={() => stopHandle(relatedSession.id)}
                  >
                    To‘xtatish
                  </Button>
                </>
              ) : (
                <p>Session mavjud emas</p>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}

        </AccordionDetails>
        </Accordion>

  
        </div>

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
                  <p class="room-price">hozirgi narhi:  {item.current_price}
                  </p>
                  <p class="room-status occupied">{item.is_occupied && "Band qilingan" || "Band qilinmagan"              }</p>
                  <div class="room-category">
                    <strong>Bo'lim:</strong> {item.category_detail.name}
                  </div>
                  
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" style={{marginBottom: "20px"}} component="h2">
                      O'yin band qilish
                      </Typography>
                        <form onSubmit={handleSessionSubmit}>
                        <Button onClick={handleVipClick} variant="outlined" disabled={formSession.session_type === "vip"}>
                          Vip Ochish
                        </Button>
                        <Button onClick={handleVaqtlikClick} variant="outlined" disabled={formSession.session_type === "fixed"}>
                          Vaqtlik Ochish
                        </Button>
                        {formSession.session_type === "fixed" && (
                          <Input
                            label="O'yin davomiyligi (soatda)"
                            name="fixed_duration_minutes"
                            type="number"
                            value={formSession.fixed_duration_minutes ? formSession.fixed_duration_minutes / 60 : ""}
                            onChange={handleChangeSes}
                          />
                        )}
                        <Button className="add_input" variant="contained" color="primary" type="submit">Band qilish</Button>
                        </form>
                    </Box>
                  </Fade>
                </Modal>

                      {showAlert2 && (
                        <Alert variant="filled" severity="success">
                          O'yin band qilindi!
                        </Alert>
                      )}

                      {showAlert && (
                        <Alert variant="filled" severity="success">
                          O'yin to'xtatildi! Umumiy narx: {totalPrice} so'm
                        </Alert>
                      )}


                  <button onClick={() => stopHandle(item.active_session.id)}  style={item.is_occupied ? { display: "auto" } : {display: "none"}} className="book-button del_btn btnall">To'xtatish
                    <img src={tohtat} alt="" />
                  </button>
                </div>
                <div className="room_btns">
                {!item.is_occupied && (
                    <> 
                      <button

                        onClick={() => {
                          localStorage.setItem('selectedSesId', item.id);
                          handleOpen();
                        }}
                        className="book-button btnall"
                      >
                        Band qilish
                        <img src={band} alt="" />
                      </button>

                      <button
                        onClick={() => deleteHandler(item.id)}
                        className="book-button del_btn btnall"
                      >
                        O'chirish
                        <img src={deleted} alt="" />

                      </button>
                    </>
                  )}
                </div>
              </div>
              </AccordionDetails>
              </Accordion>
              ))}
        </div>
      </div>
      <SessionList sessions={sessions}/>
    </div>
  );
};



export default Honalar;
