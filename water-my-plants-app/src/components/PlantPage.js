import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

export default function PlantPage(){

const [plants, setPlants] = useState([])    

useEffect(()=>{
   axiosWithAuth()
   .get('/user')
   .then(res => {
       setPlants(res.data.plants)
   })
   .catch(err => {
       console.log(err)
   })
 }, [])

    return(
        <div>
            <p>SUP</p>
        </div>
    )
}