import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const StyledNavBar = styled.nav`
  margin: auto 3em;
  display: flex;
  justify-content: space-evenly;
  width: 30%;
`;

const StyledNavLink = styled(NavLink)`
  color: whitesmoke;
  background-color: ${(props) => props.theme.colors.amazon};
  text-decoration: none;
  text-align: center;
  border: 1px solid white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  white-space: nowrap;

  &.active {
    background-color: ${(props) => props.theme.colors.cambridgeBlue};
  }
`;




export default function NavBar(props) {
    
    const logout = () => {
        localStorage.removeItem("token")
        props.setIsLoggedIn(false)
    }

  return (
    <StyledNavBar>
      <StyledNavLink activeClassName="active" to="/plant-page">
        Home
      </StyledNavLink>
      {props.isLoggedIn && (
          <>
          <StyledNavLink activeClassName="active" to="/plant-form">
            Add A Plant
          </StyledNavLink>
          <StyledNavLink activeClassName="active" onClick={logout} to="/">
            Logout
          </StyledNavLink>
          </>
      )} 
    </StyledNavBar>
  );
}
