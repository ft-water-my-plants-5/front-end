import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import imageGenerator from "../utils/imageGenerator";
import styled from 'styled-components'


const StyledPlantsContainer = styled.div`
width: 65%;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
text-align:center;
background-color: rgba(169.0, 186.0, 157.0, 0.5);
`
const StyledPlantContainer = styled.div`
max-width: 60%;
border: 1px solid whitesmoke;
padding: 4em;
display: flex;
flex-direction: column;

 
 img{
     height: 30vh;
 }

 button.delete:hover{
     background-color: red;
 }
 
`
const StyledPlantPage = styled.section`

h2{
    text-align: center;
    font-size: 4rem;
    background-color:${(props) => props.theme.colors.amazon};
    color: whitesmoke;
}
`
 
export default function PlantPage(props) {
  const [userData, setUserData] = useState({});
  const [isEditing, setEditing] = useState(false)
    
  const { plants, setPlants } = props
 
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
  }, [setPlants]);

  const handleDelete = (id) => {
      axiosWithAuth()
      .delete(`/plants/${id}`)
      .then(res => {
          setPlants(plants.filter((pl) => pl.plant_id !== id))
      })
      .catch(err => {
          console.log(err)
      })
  }

  return (
    <StyledPlantPage>
      <h2>{`${userData.username}'s Plants!`}</h2>
      <StyledPlantsContainer>
      {plants.map((pl) => {
        return (
          <StyledPlantContainer>
            <h3>{pl.nickname}</h3>
            {isEditing && <button>Edit Nickname</button>}
            <p>{pl.species}</p>
            {isEditing && <button>Edit Species</button>}
            <p>Days Between Watering: {pl.days_between_watering}</p>
            {isEditing && <button>Edit Days</button>}
            <p>{pl.notes}</p>
            {isEditing && <button>Edit Notes</button>}
            {/* <div className="image-container"></div> */}
            <img src={pl.img_url} alt="plant"></img>
            <div className='button-container'>
                <button onClick={()=> {setEditing(true)}}>Edit Plant</button>
                <button className='delete' onClick={() => {handleDelete(pl.plant_id)}}>Delete</button>
            </div>
          </StyledPlantContainer>
          
        );
      })}
      </StyledPlantsContainer>
    </StyledPlantPage>
  );
}
