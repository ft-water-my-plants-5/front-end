import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import imageGenerator from "../utils/imageGenerator";
import styled from 'styled-components'


const StyledPlantsContainer = styled.div`
width: 75%;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
text-align:center;
`
const StyledPlantContainer = styled.div`
 
 img{
     height: 30vh;
 }
 
`
const StyledPlantPage = styled.section`

h2{
    text-align: center;
    font-size: 4rem;
}
`

export default function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get("/user")
      .then((res) => {
        setUserData(res.data);
        setPlants(res.data.plants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledPlantPage>
      <h2>{`${userData.username}'s Plants!`}</h2>
      <StyledPlantsContainer>
      {plants.map((pl) => {
        return (
          <StyledPlantContainer>
            <p>{pl.nickname}</p>
            <p>{pl.species}</p>
            <p>{pl.days_between_watering}</p>
            <p>{pl.notes}</p>
            {/* <div className="image-container"></div> */}
            <img src={imageGenerator()} alt="plant"></img>
          </StyledPlantContainer>
          
        );
      })}
      </StyledPlantsContainer>
    </StyledPlantPage>
  );
}
