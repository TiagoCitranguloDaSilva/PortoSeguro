import "./App.css"
import React, { useState, useEffect } from 'react'

import EtiquetaForm from "./EtiquetaForm/EtiquetaForm"

function App() {

  const [etiquetas, setEtiquetas] = useState([])
  const [idEtiqueta, setIdEtiqueta] = useState(-1)

  const handleShowEtiquetaForm = (id = -1) => {
    setIdEtiqueta(-1)
    if(id != -1){
      setIdEtiqueta(id)
    }
    document.querySelector("#formEtiqueta").style.display = "flex"
  }

  const handleEtiqueta = (valor) => {
    if(idEtiqueta != -1){
      etiquetas[idEtiqueta] = valor
      setEtiquetas([...etiquetas])
    }else{
      setEtiquetas([...etiquetas, valor])
    }
  
    setIdEtiqueta(-1)

  }

  


  return (
    <>
      <h1>Porto Seguro</h1>
      <div id="etiquetas">
        <div className="headerContainer">
          <h2>Etiquetas</h2>
          <button onClick={() => handleShowEtiquetaForm()}>Nova etiqueta</button>
        </div>
        <div id="etiquetasHeader">
          <h2>Etiquetas</h2>
        </div>
        <div id="etiquetasContainer">

          {etiquetas.map((etiqueta, key) => {
            return(
            <div className="etiqueta" key={key} onClick={() => handleShowEtiquetaForm(key)}>
              <p>{etiqueta}</p>
            </div>)
          })}

        </div>
      </div>
      <div id="historias">
        <div className="headerContainer">
          <h2>Histórias</h2>
          <button>Nova história</button>
        </div>
        <div className="historias">
          <div className="historiaHeader">
            <h2>Etiqueta</h2>
          </div>
          <div className="historiasContainer">

            <div className="historia">
              <p>Titulo</p>
            </div>
            <div className="historia">
              <p>Titulo</p>
            </div>
            <div className="historia">
              <p>Titulo</p>
            </div>
            <div className="historia">
              <p>Titulo</p>
            </div>
            <div className="historia">
              <p>Titulo</p>
            </div>

          </div>
        </div>
      </div>
    
      <EtiquetaForm aoEnviar={handleEtiqueta} editarEtiqueta={etiquetas[idEtiqueta] ? etiquetas[idEtiqueta] : null} / >

    </>
  )

}

export default App
