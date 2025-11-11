import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => {
        if (!r.ok) {throw new Error("failed to get toys")}
        return r.json()
      })
      .then (setToys)
      .catch(error => console.log(error.message));
  }, []);


  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addToy = newToy => setToys(previousToys => [...previousToys, newToy])

  const updateToys = updatedToy =>
    setToys(previousToys => previousToys.map(toy => 
      toy.id === updatedToy.id ? updatedToy : toy))

  const deleteToy = deletedToyID => 
    setToys(previousToys => previousToys.filter(toy => toy.id !== deletedToyID))

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} updateToys={updateToys} deleteToy={deleteToy}/>
    </>
  );
}

export default App;
