import { useNavigate } from "react-router-dom"
import { Input } from "../ui"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import barService from "../service/bar";
import { getBarSucces, postItemDetailFailure, postItemDetailStart, postItemDetailSuccess } from "../slice/bar";

const CreateGamingCategories = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.bar)
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
      
        if (type === "file") {
          setFormData(prev => ({
            ...prev,
            [name]: files[0] // faqat bitta fayl tanlansa
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        }
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const game = {
          name: formData.name,
          image: formData.image
        };
        console.log(game);
        
        dispatch(postItemDetailStart())
        try {
          await barService.Postgame(game)
          dispatch(postItemDetailSuccess())
          const responses = await barService.getBar();
          dispatch(getBarSucces(responses.data));
          alert("Muvaffaqiyatlik yaratildi")
          navigate("/Bo'limlar")
        } catch (error) {
          alert("Nimadur hato ketti")
          dispatch(postItemDetailFailure())
          navigate("/")
        }
        setFormData({
          name: '',
          image: ''
        })
        // bu yerda formani yuborish funksiyasi yozildi
      };

    const handleclose = () => {
        navigate("/Bo'limlar")
    }



  return (
    <div className="gaming">
        <div className="creategame_container container">
          <div className="gaming_det">
          <h1>Create Game</h1>
           <form onSubmit={handleSubmit}>
               <Input 
               onChange={handleChange} 
               label={"name"} 
               value={formData.name} 
               type={"text"}
               name={"name"}/>

               <Input 
               onChange={handleChange} 
               label={"img"} 
               type={"file"} 
               name={"image"} />

                <button style={
                {pointerEvents: isLoading ? 'none' : 'auto',
                opacity: isLoading ? 0.5 : 1,}} className='kirish_btn'>
                    {isLoading ? "ILTIMOS KUTING..." : "Kiritish"}
                </button>
           </form>
          </div>
        </div>
        <button onClick={handleclose} className='user_btn btn_gaming'>orqaga</button>
    </div>
  )
}

export default CreateGamingCategories