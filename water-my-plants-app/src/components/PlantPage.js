import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import imageGenerator from "../utils/imageGenerator";
import styled from "styled-components";

const StyledPlantsContainer = styled.div`
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgba(169, 186, 157, 0.5);
`;
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
const StyledPlantPage = styled.section`
  h2 {
    text-align: center;
    font-size: 4rem;
    background-color: ${(props) => props.theme.colors.amazon};
    color: whitesmoke;
  }
`;

export default function PlantPage(props) {
  const [userData, setUserData] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");

  const { plants, setPlants } = props;

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
      .then((res) => {
        setPlants(plants.filter((pl) => pl.plant_id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const handleChange = (e) => {

//   }

  return (
    <StyledPlantPage>
      <h2>{`${userData.username}'s Plants!`}</h2>
      <StyledPlantsContainer>
        {plants.map((pl) => {
          return (
            <StyledPlantContainer>
              {fieldToEdit === "nickname" ? (
                <input type="text" placeholder={pl.nickname} />
              ) : (
                <h3>{pl.nickname}</h3>
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
                <input type="text" placeholder={pl.species} />
              ) : (
                <p>{pl.species}</p>
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
              {fieldToEdit === 'days' ? <input type='number' placeholder={pl.days_between_watering}/> :<p>Days Between Watering: {pl.days_between_watering}</p>}
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
                <input type="text" placeholder={pl.notes} />
              ) :<p>{pl.notes}</p>}
              {isEditing && (
                <button
                  onClick={() => {
                    setFieldToEdit("notes");
                  }}
                >
                  Edit Notes
                </button>
              )}
              {(fieldToEdit === "notes" || fieldToEdit === "days" || fieldToEdit === "species" || fieldToEdit === "nickname") &&  <button>Submit Changes</button>}
              <img
                src={pl.img_url ? pl.img_url : imageGenerator()}
                alt="plant"
              ></img>
              <div className="button-container">
                <button
                  onClick={() => {
                    setEditing(!isEditing);
                    setFieldToEdit("")
                  }}
                >
                  Edit Plant
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    handleDelete(pl.plant_id);
                  }}
                >
                  Delete
                </button>
              </div>
            </StyledPlantContainer>
          );
        })}
      </StyledPlantsContainer>
    </StyledPlantPage>
  );
}
