import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosWithAuth from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom';


const Button = styled.button`
  color: whitesmoke;
  background-color: ${(props) => props.theme.colors.amazon};
  font-size: 2rem;
  border-radius: 0.15em;
  text-align: center;
`;

const StyledDiv = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.amazon};
  border: 2px solid ${(props) => props.theme.colors.amazon};
  margin: 10% auto;
  width: 40%;
  background-color: ${(props) => props.theme.colors.laurelGreen};
  
  
  

 form{
     display: flex;
     flex-direction: column;
     align-items: left;
     width: fit-content ;
     margin: 2em auto;
 } 

 input, label{
     display: list-item;
     list-style-type: none;
     padding: 0.5em;
 }

`;

const initialFormValues = {
  plant_id: 0,
  nickname: "",
  species: "",
  days_between_watering: 0,
  notes: "",
};

export default function PlantForm(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [userId, setUserId] = useState('')

  const history = useHistory()

  useEffect(() => {
      axiosWithAuth()
      .get('/user')
      .then(res => {
          setUserId(res.data.user_id)
      })
      .catch(err => {
          console.err(err)
      })
  }, [])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      nickname: formValues.nickname,
      species: formValues.species,
      days_between_watering: parseInt(formValues.days_between_watering),
      notes: formValues.notes,
      user_id: userId
    };
 

    axiosWithAuth()
    .post('/plants', newPlant)
    .then(res => {
        props.setPlants([...props.plants, newPlant])
        history.push('/plant-page')
    })
    .catch(err => {
        console.log(err)
    })

};

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <label>
          Nickname:
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={formValues.nickname}
            onChange={handleChange}
          />
        </label>
        <label>
          Species:
          <input
            id="species"
            name="species"
            type="text"
            value={formValues.species}
            onChange={handleChange}
          />
        </label>
        <label>
          Days Between Watering:
          <input
            id="days_between_watering"
            name="days_between_watering"
            type="number"
            value={(formValues.days_between_watering)}
            onChange={handleChange}
          />
        </label>
        <label>
          Notes:
          <input
            id="notes"
            name="notes"
            type="text"
            value={formValues.notes}
            onChange={handleChange}
          />
        </label>
        <Button type='submit'> Add Your Plant </Button>
      </form>
    </StyledDiv>
  );
}

export { StyledDiv, Button }