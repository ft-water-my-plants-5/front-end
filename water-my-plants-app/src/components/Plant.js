import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imageGenerator from "../utils/imageGenerator";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useParams } from 'react-router-dom';



const StyledPlantContainer = styled.div`
  width: max-content;
  margin: 0 auto;
  border: 1px solid whitesmoke;
  padding: 4em;
  display: flex;
  flex-direction: column;
  background-color: rgba(240, 234, 214, 0.5);

  h3, p{
    color: ${(props) => props.theme.colors.amazon};
    text-shadow: 2px 2px ${(props) => props.theme.colors.eggshell}; 
  }

  h3{
      font-size:4rem;
  }

  p{
      font-size: 2rem;
  }

  img {
    height: 30vh;
  }

  button {
      background-color: ${(props) => props.theme.colors.amazon};
      color: ${(props) => props.theme.colors.eggshell};
      padding: 0.4em 0;
      border-radius: 10px;
  }
  button.delete:hover {
    background-color: red;
  }
  input{
      padding: 0.5em 0;
      font-size: 2rem;
  }

  .edit, .delete{
      padding: 1em;
      margin: 1em;
  }

  .submit{
      background-color: ${(props) => props.theme.colors.cambridgeBlue};
      margin: 1em 0;
      padding: 1em 0;
      font-size: 2rem;
  }
`;

export default function Plant(props) {
  const { plant, plants, setPlants } = props;
  const { id } = useParams()
  const paramPlant = plants.find(pl => parseInt(id) === pl.plant_id)
  
  

//   const [plantToEdit, setPlantToEdit] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [changedValue, setChangedValue] = useState("");
  const [objectToSend, setObjectToSend] = useState({});
  const [photo, setPhoto] = useState('')

  useEffect(() => {setPhoto(imageGenerator())}, [])

  const handleDelete = (plantId) => {
    axiosWithAuth()
      .delete(`/plants/${plantId}`)
      .then((res) => {
        props.history.push('/plant-page')
        setPlants(plants.filter((pl) => pl.plant_id !== plantId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setChangedValue(e.target.value);
    setObjectToSend({ [e.target.name]: (e.target.type === 'text' ? e.target.value : parseInt(e.target.value))});
  };

  const handleEditSubmit = (plantId) => {
    axiosWithAuth()
      .put(`/plants/${plantId}`, objectToSend)
      .then((res) => {
        const newPlant = res.data[0]
        const newPlants = (plants.map(pl => { return pl.plant_id === plantId ? newPlant : pl}))  
        setPlants(newPlants);
        setEditing(false);
        setFieldToEdit("");
        setObjectToSend({});
        setChangedValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenEdit = (plantId) => {
    // setPlantToEdit(plantId);
    setEditing(!isEditing);
    setFieldToEdit("");
    setObjectToSend({});
    setChangedValue("");
  };

  return (
    
    <StyledPlantContainer>
      {fieldToEdit === "nickname" ? (
        <input
          type="text"
          placeholder={plant ? plant.nickname : paramPlant.nickname}
          name="nickname"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <h3>{plant ? plant.nickname : paramPlant.nickname}</h3>
      )}
      {isEditing && (
        <button
          onClick={() => {
            setFieldToEdit("nickname");
          }}
        >
          Edit Nickname
        </button>
      )}
      {fieldToEdit === "species" ? (
        <input
          type="text"
          placeholder={plant ? plant.species : paramPlant.species}
          name="species"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>Species: {plant ? plant.species : paramPlant.species}</p>
      )}
      {isEditing && (
        <button
          onClick={() => {
            setFieldToEdit("species");
          }}
        >
          Edit Species
        </button>
      )}
      {fieldToEdit === "days" ? (
        <input
          type="number"
          placeholder={plant? plant.days_between_watering : paramPlant.days_between_watering}
          name="days_between_watering"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>Days Between Watering: {plant? plant.days_between_watering : paramPlant.days_between_watering}</p>
      )}
      {isEditing && (
        <button
          onClick={() => {
            setFieldToEdit("days");
          }}
        >
          Edit Days
        </button>
      )}
      {fieldToEdit === "notes" ? (
        <input
          type="text"
          placeholder={plant ? plant.notes : paramPlant.notes}
          name="notes"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>Notes: {plant ? plant.notes : paramPlant.notes}</p>
      )}
      {isEditing && (
        <button
          onClick={() => {
            setFieldToEdit("notes");
          }}
        >
          Edit Notes
        </button>
      )}
      {(fieldToEdit === "notes" ||
        fieldToEdit === "days" ||
        fieldToEdit === "species" ||
        fieldToEdit === "nickname") && (
        <button className='submit'
          onClick={() => {
            handleEditSubmit(plant ? plant.plant_id : paramPlant.plant_id);
          }}
        >
          Submit Changes
        </button>
      )}
      <img
        src={plant ? (plant.img_url ? plant.img_url : photo): photo}
        alt="plant"
      ></img>
      {paramPlant && <div className="button-container">
        <button className='edit'
          onClick={() => {
            handleOpenEdit(plant ? plant.plant_id : paramPlant.plant_id);
          }}
        >
          Edit Plant
        </button>
        <button
          className="delete"
          onClick={() => {
            handleDelete(plant ? plant.plant_id : paramPlant.plant_id);
          }}
        >
          Delete
        </button>
      </div>}
    </StyledPlantContainer>
  );
}
