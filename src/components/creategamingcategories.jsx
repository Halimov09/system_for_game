import { useNavigate } from "react-router-dom"
import { Input } from "../ui"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import barService from "../service/bar"
import {
  getBarSucces,
  postItemDetailFailure,
  postItemDetailStart,
  postItemDetailSuccess
} from "../slice/bar"
import orqaga from "../constants/img/orqaga.svg"
import plus from "../constants/img/plus.svg"
import { toast } from "react-toastify"

const CreateGamingCategories = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.bar)
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })

  const handleChange = (e) => {
    const { name, value, files, type } = e.target

    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const game = {
      name: formData.name,
      image: formData.image
    }

    dispatch(postItemDetailStart())

    try {
      await barService.Postgame(game)
      dispatch(postItemDetailSuccess())

      const responses = await barService.getBar()
      dispatch(getBarSucces(responses.data))

      toast.success("Bo‘lim muvaffaqiyatli yaratildi!")
      navigate("/Bo'limlar")
    } catch (error) {
      toast.error("Bo‘lim yaratishda xatolik yuz berdi!")
      dispatch(postItemDetailFailure())
      navigate("/")
    }

    setFormData({
      name: '',
      image: ''
    })
  }

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
              name={"name"}
            />

            <Input
              onChange={handleChange}
              label={"img"}
              type={"file"}
              name={"image"}
            />

            <button
              style={{
                pointerEvents: isLoading ? 'none' : 'auto',
                opacity: isLoading ? 0.5 : 1,
              }}
              className='kirish_btn'
            >
              <img src={plus} alt="" />
              {isLoading ? "ILTIMOS KUTING..." : "Kiritish"}
            </button>
          </form>
        </div>
      </div>

      <button onClick={handleclose} className='user_btn btnall btn_gaming'>
        <img src={orqaga} alt="" />
        orqaga
      </button>
    </div>
  )
}

export default CreateGamingCategories
