import React, {useState} from "react";

function ToyForm({addToy}) {
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  })

  const handleSubmit = e => {
    e.preventDefault()
    const newToy = {
      ...formData,
      likes: 0,
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newToy)
    })
      .then(r => {
        if (!r.ok) {throw new Error("failed to create new toy")}
        return r.json()
      })
      .then(newToy => {
        addToy(newToy)
        setFormData({
          name: "",
          image: "",
        })
      })
      .catch(error => console.log(error.message))
  }

  const handleChange = e => {
    setFormData(previousData => ({
      ...previousData, 
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
