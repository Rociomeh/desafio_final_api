import React, { useState } from 'react';
import './App.css';
import MiApi from './components/MiApi';
import Buscador from './components/Buscador';

function App() {
  const [filtro, setFiltro] = useState('');

  return (
    <div className="App">
      <h1>Personajes de Los Simpsons</h1>
      <Buscador onBuscar={setFiltro} />
      <MiApi filtro={filtro} />
    </div>
  );
}

export default App;
