import React, { useState } from "react";
import { StyledDiv, Button } from "../components/PlantForm";
import axiosWithAuth from '../utils/axiosWithAuth'

const initialValues = { username: "", phone_number: "" };

export default function Profile() {
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .put('/user', formValues)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <h2>Change Account Info</h2>
        <label>
          New Username:
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </label>
        <label>
          New Phone Number:
          <input
            type="tel"
            name="phone_number"
            value={formValues.phone_number}
            onChange={handleChange}
          />
        </label>
        <Button type='submit'>Update Info</Button>
      </form>
    </StyledDiv>
  );
}
