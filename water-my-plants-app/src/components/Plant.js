import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imageGenerator from "../utils/imageGenerator";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Link } from 'react-router-dom'

const StyledPlantContainer = styled.div`
  max-width: 60%;
  border: 1px solid whitesmoke;
  padding: 4em;
  display: flex;
  flex-direction: column;

  img {
    height: 30vh;
  }

  button.delete:hover {
    background-color: red;
  }
`;

export default function Plant(props) {
  const { id, plant, plants, setPlants } = props;

  const [plantToEdit, setPlantToEdit] = useState("");
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
        setPlants(plants.filter((pl) => pl.plant_id !== plantId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setChangedValue(e.target.value);
    setObjectToSend({ [e.target.name]: (e.target.type === 'text' ? e.target.value : parseInt(e.target.value))});
    console.log(changedValue);
    console.log(objectToSend);
  };

  const handleEditSubmit = (plantId) => {
    axiosWithAuth()
      .put(`/plants/${plantId}`, objectToSend)
      .then((res) => {
        const newPlant = res.data[0]
        const newPlants = (plants.map(pl => { return pl.plant_id === plantId ? newPlant : pl}))  
        setPlants(newPlants)
        console.log("IT WORKED", res);
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
    setPlantToEdit(plantId);
    setEditing(!isEditing);
    setFieldToEdit("");
    setObjectToSend({});
    setChangedValue("");
  };

  return (
    <StyledPlantContainer>
      {plantToEdit === plant.plant_id && fieldToEdit === "nickname" ? (
        <input
          type="text"
          placeholder={plant.nickname}
          name="nickname"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <h3>{plant.nickname}</h3>
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
          placeholder={plant.species}
          name="species"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>{plant.species}</p>
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
          placeholder={plant.days_between_watering}
          name="days_between_watering"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>Days Between Watering: {plant.days_between_watering}</p>
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
          placeholder={plant.notes}
          name="notes"
          value={changedValue}
          onChange={handleChange}
        />
      ) : (
        <p>{plant.notes}</p>
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
        <button
          onClick={() => {
            handleEditSubmit(plant.plant_id);
          }}
        >
          Submit Changes
        </button>
      )}
      <img
        src={plant.img_url ? plant.img_url : photo}
        alt="plant"
      ></img>
      <div className="button-container">
        <button
          onClick={() => {
            handleOpenEdit(plant.plant_id);
          }}
        >
          Edit Plant
        </button>
        <button
          className="delete"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </StyledPlantContainer>
  );
}
