import React, { useState } from 'react';

function Buscador({ onBuscar }) { //'onBuscar' propiedad que se espera sea una función.
  const [filtro, setFiltro] = useState(''); //hook que permite tener un estado en un componente funcional de React.
                                            //'filtro' es un string vacío y una variable. 'setFiltro' es una func para actualizar 'filtro'.

  const handleInputChange = (e) => { //Esta función se llama cada vez que el valor del input cambia(handleInputChange)(cada vez que el usuario escribe algo). Actualiza el estado filtro con el valor actual del input.
    setFiltro(e.target.value);
  };

  const handleSubmit = (e) => {  //Esta función se ejecuta cuando el formulario se envía. 
    e.preventDefault();          //e.preventDefault() evita que el formulario se envíe cada vez que se recargue pa pág.
    onBuscar(filtro);           //Luego, llama a onBuscar, pasándole el valor actual de filtro.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtro}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Buscador;
