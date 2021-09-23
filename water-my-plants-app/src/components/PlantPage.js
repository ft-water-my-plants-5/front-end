import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

export default function PlantPage(){

const [plants, setPlants] = useState([])  
const [userData, setUserData] = useState({})  

useEffect(()=>{
   axiosWithAuth()
   .get('/user')
   .then(res => {
       setUserData(res.data)
       setPlants(res.data.plants)
   })
   .catch(err => {
       console.log(err)
   })
 }, [])

    return(
        <div>
            <h2>{`${userData.username}'s Plants!`}</h2>
            {plants.map(pl => {
                return (
                    <div>
                    <p>{pl.nickname}</p>
                    <p>{pl.species}</p>
                    <img src={
          pl.img_url !== null
            ? pl.img_url
            : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/houseplants-asplenium-nidus-peperomia-and-fittonia-royalty-free-image-946085220-1557179507.jpg?crop=1.00xw:0.668xh;0,0.332xh&resize=640:*"
        } alt='plant'></img>
                    </div>
                )
            })}
        </div>
    )
}