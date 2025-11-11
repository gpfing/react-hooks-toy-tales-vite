import React from "react";

function ToyCard({toy, updateToys, deleteToy}) {
  const {id, name, image, likes} = toy;

  const handleLike = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: likes + 1})
    })
      .then(r => {
        if (!r.ok) {throw new Error("failed to like toy")}
        return r.json()
      })
      .then(updateToys)
      .catch(error => console.log(error.message))
  }

  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(r => {
        if (!r.ok) {throw new Error("failed to delete toy")}
        console.log("Item deleted")
      })
      .then(deleteToy(id))
      .catch(error => console.log(error.message))
  }
  

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
