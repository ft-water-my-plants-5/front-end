import React from "react";
import styled from "styled-components";
import NavBar from "./Navbar";
import heroPhoto from "../images/hero-photo.jpeg";

const StyledHeader = styled.header`
  background-image: url(${heroPhoto});
  background-size: cover;
  display: flex;
  height: 20vh;
  padding: 0 1em;
  justify-content: space-between;
  @media (max-width: 500px) {
    display: block;
  }
`;
const StyledTitle = styled.h1`
  color: whitesmoke;
  font-size: 5rem;
  text-shadow: 2px 2px ${(props) => props.theme.colors.amazon};
  margin: auto 0;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

export default function Header(props) {
  return (
    <StyledHeader>
      <StyledTitle>Water My Plants</StyledTitle>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
    </StyledHeader>
  );
}
