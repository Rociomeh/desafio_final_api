import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MiApi({ filtro }) {

  const [personajes, setPersonajes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null); 
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    consultarApi();
  }, []);

  const consultarApi = async () => {
    const url = "https://apisimpsons.fly.dev/api/personajes?limit=635"
    const response = await fetch(url);
    const data = await response.json();
    setPersonajes(data.docs);
  };

  const ordenarPersonajes = () => {
    const personajesOrdenados = [...personajesFiltrados].sort((a, b) => {
      const nombreA = a.Nombre.toUpperCase(); 
      const nombreB = b.Nombre.toUpperCase(); 
      if (nombreA < nombreB) {
        return ordenAscendente ? -1 : 1;
      }
      if (nombreA > nombreB) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });
    setPersonajes(personajesOrdenados);
    setOrdenAscendente(!ordenAscendente); 
  };

  const personajesFiltrados = filtro
  ? personajes.filter(personaje =>
      personaje.Nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      personaje.Genero.toLowerCase().includes(filtro.toLowerCase())
    )
  : personajes;

  const ocultarModal = () => setModalShow(false);

  const mostrarDetallesPersonaje = (personaje) => {
    setPersonajeSeleccionado(personaje);
    setModalShow(true);
  };

  return (
  <>
   <Table striped="columns">
    <thead>
      <tr>
         <th>Nombre
          <button onClick={ordenarPersonajes}>▲</button>
         </th>
         <th>Estado</th>
         <th>Genero</th>
         <th>Ocupacion</th>
     </tr>
    </thead>
      <tbody>
        {personajesFiltrados.map((personaje) => (
        <tr>
          <td style={{textDecoration: 'underline', color: 'black'}} onClick={() => mostrarDetallesPersonaje(personaje)}>{personaje.Nombre}</td>
          <td>{personaje.Estado}</td>
          <td>{personaje.Genero}</td>
          <td>{personaje.Ocupacion}</td>
        </tr>
      ))}
      </tbody>
    </Table>
      <Modal show={modalShow} onHide={ocultarModal} size="sm" style={{ textAlign:'center',backgroundColor: '#FFD90F' ,position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <Modal.Header>
          <Modal.Title style={{color: 'black' }}><strong>Detalles del Personaje</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {personajeSeleccionado && (
            <>
            <img src={personajeSeleccionado.Imagen} alt={personajeSeleccionado.Nombre} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', height: '200px' }}  />
            <p style={{ textAlign: 'center', wordWrap: 'break-word' ,color: 'black' }}><strong>Nombre:</strong> {personajeSeleccionado.Nombre}</p>
            <p style={{ textAlign: 'center', wordWrap: 'break-word' ,color: 'black' }}><strong>Género:</strong> {personajeSeleccionado.Genero}</p>
            <p style={{ textAlign: 'center', wordWrap: 'break-word' ,color: 'black' }}><strong>Ocupación:</strong> {personajeSeleccionado.Ocupacion}</p>
            <p style={{ textAlign: 'center', wordWrap: 'break-word' ,color: 'black'  }}><strong>Historia:</strong>{personajeSeleccionado.Historia}</p>
            </>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{borderColor : "danger" , color: 'black'}} onClick={ocultarModal}>
          Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MiApi;