import React, { useState } from 'react';

const initialFormValues = {
        plant_id: 0,
        nickname: "",
        species: "",
        days_between_watering: 0,
        notes: "",
}

export default function PlantForm(){
    const [formValues, setFormValues] = useState(initialFormValues)

    const handleChange = (e) => {
        setFormValues({
        ...formValues,    
        [e.target.name]: e.target.value
    })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPlant = {
            plant_id: Date.now(),
            nickname: formValues.nickname,
            species: formValues.species,
            days_between_watering: formValues.days_between_watering,
            notes: formValues.notes
        }
        console.log(newPlant)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Nickname:
                    <input
                        id="nickname"
                        name="nickname"
                        type="text"
                        value= {formValues.nickname}
                        onChange={handleChange}
                    />
                </label>
                <label>Species:
                    <input
                        id="species"
                        name="species"
                        type="text"
                        value= {formValues.species}
                        onChange={handleChange}
                    />
                </label>
                <label>Days Between Watering:
                    <input
                        id="days"
                        name="days"
                        type="number"
                        value= {formValues.days_between_watering}
                        onChange={handleChange}
                    />
                </label>
                <label>Notes:
                    <input
                        id="notes"
                        name="notes"
                        type="text"
                        value= {formValues.notes}
                        onChange={handleChange}
                    />
                </label> 
                <button>Add Plant!</button>       
            </form>
        </div>
    )

}