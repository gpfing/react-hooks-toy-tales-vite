import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, updateToys, deleteToy}) {
  return (
    <div id="toy-collection">
      <ul>
        {toys.map(toy => <ToyCard 
        key={toy.id} 
        toy={toy}
        updateToys={updateToys}
        deleteToy={deleteToy}/>)}
      </ul>
    </div>
  );
}

export default ToyContainer;
