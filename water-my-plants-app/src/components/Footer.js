import React from "react";
import styled from "styled-components";
import heroPhoto from "../images/hero-photo.jpeg";
import NavBar from "./Navbar";

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.laurelGreen};
  background-image: url(${heroPhoto});
  height: 10%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;

  h4 {
    color: ${(props) => props.theme.colors.eggshell};
    text-align: center;
    margin-top: 4em;
    margin-bottom: 1em;
  }
`;
export default function Footer(props) {
  return (
    <StyledFooter>
      <h4>
        By: Jesse Leegwater, Jabari Finney, Kat Yevsukov, Joe Escobedo, Sharon
        Sanchez, & Mark Trepanier{" "}
      </h4>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
    </StyledFooter>
  );
}
