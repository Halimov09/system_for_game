import React, { useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import barService from '../service/bar';
import { useDispatch, useSelector } from 'react-redux';
import { getItemDetailFailure, getItemDetailStart, getItemDetailSuccess } from '../slice/bar';
import { Loader } from '../ui';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const Gaming = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading, itemDetail} = useSelector(state => state.bar)
    

    useEffect(() => {
      const getItemDetaile = async () =>{
        dispatch(getItemDetailStart())
        try {
          const response = await barService.getBarItem(id)
          dispatch(getItemDetailSuccess(response.data))   
                
        } catch (error) {
          dispatch(getItemDetailFailure())
        }
      }

      getItemDetaile()
    }, [id])
    
    const handleclose = () => {
      navigate("/Bo'limlar")
    }

  return (
    <div className='gaming'>
      {isLoading && <Loader />}
      {!itemDetail ? (
        <p>Loading...</p>
      ) : (
        <div className='gaming_item'>
          <button onClick={handleclose} className='user_btn btn_gaming'>orqaga</button>
          
          <Card className='card-gamer'>
            <CardMedia
              sx={{ height: 140 }}
              image={itemDetail.image}
              title="gaming categories"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" className='varianth5 gamer-text' component="div" style={{marginBottom: "20px"}}> 
              <span className='span'>Kategoriya nomi: </span>
              {itemDetail.name}
            </Typography>
            <Typography variant="body2" >
              <span className='span'>Yaratuvchi: </span>
              {itemDetail.created_by}
            </Typography>
            </CardContent>
            <CardActions>
            <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
            className='btn_gamer'
              onClick={() => {
                localStorage.setItem('selectedBarId', itemDetail.id);
                navigate("/Honalar");
              }}
            >
              O'yinlar qo'shish
            </Button>
            </ButtonGroup>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Gaming