import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import Plant from "./Plant";

const StyledPlantPage = styled.section`
  min-height: fit-content;
  margin-bottom: 1rem;
  h2 {
    text-align: center;
    font-size: 4rem;
    background-color: ${(props) => props.theme.colors.amazon};
    color: whitesmoke;
    font-style: oblique;
  }
`;

const StyledPlantsContainer = styled.div`
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgba(169, 186, 157, 0.5);
`;

export default function PlantPage(props) {
  const [userData, setUserData] = useState({});

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

  return (
    <StyledPlantPage>
      <h2>{`${userData.username}'s Plants`}</h2>
      <StyledPlantsContainer>
        {plants.map((pl) => (
          <Plant
            plant={pl}
            plants={plants}
            setPlants={setPlants}
            key={pl.plant_id}
            id={pl.plant_id}
          />
        ))}
      </StyledPlantsContainer>
    </StyledPlantPage>
  );
}
