import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    background-image: url('https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1746&q=80');
    background-size: cover;
    display: flex;
    height: 20vh;
    padding: 0 1em;
`
const StyledTitle = styled.h1`
color: whitesmoke;
font-size: 5rem;
text-shadow: 2px 2px ${props => props.theme.colors.amazon};
margin: auto 0;
`
 const StyledNavigation = styled.nav`

`

export default function Header(){
    return(
        <StyledHeader>
            <StyledTitle>Water My Plants</StyledTitle>
            <StyledNavigation>
            </StyledNavigation>
        </StyledHeader>
    )
}