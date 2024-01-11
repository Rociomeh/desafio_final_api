import React from 'react';
import './App.css';
import MiApi from './components/MiApi';
import Buscador from './components/Buscador';

function App() {
  return (
    <div className="App">
      {/* Utiliza el componente MiApi para mostrar los resultados de la API */}
      <MiApi />
      <Buscador/>
    </div>
  );
}

export default App;

