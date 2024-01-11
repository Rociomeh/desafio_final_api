import React, { useState, useEffect } from 'react';

function MiApi() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    consultarApi();
}, []); //Importante el uso de dependencias "[]"

    const consultarApi = async () => {
    const url = "https://apisimpsons.fly.dev/api/personajes"
    const response = await fetch(url);
    const data = await response.json();
    setPersonajes(`${data.sentence} - ${data.character.name}`);
    };
    
  return (
    <div>
      <h1>Personajes de Los Simpsons</h1>
      <ul>
        {personajes.map((personaje) => (
          <li key={personaje.id}>
            <img src={personaje.image} alt={personaje.character} />
            <p>{personaje.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MiApi;
