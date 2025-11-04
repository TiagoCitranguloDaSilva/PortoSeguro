import "./App.css"
import React, { useState, useEffect } from 'react'

import EtiquetaForm from "./EtiquetaForm/EtiquetaForm"
import HistoriaForm from "./HistoriaForm/HistoriaForm"

function App() {

  const [etiquetas, setEtiquetas] = useState([])
  const [idEtiqueta, setIdEtiqueta] = useState(-1)

  const [carregou, setCarregou] = useState(false)

  const [historias, setHistorias] = useState([])
  const [historiaSelecionada, setHistoriaSelecionada] = useState(null);
  const [idHistoria, setIdHistoria] = useState(-1)
  const [idEscolhaOriginal, setIdEscolhaOriginal] = useState(-1)


  useEffect(() => {
    if (!carregou) {
      const etiquetasArmazenadas = JSON.parse(localStorage.getItem("etiquetas"));
      const historiasArmazenadas = JSON.parse(localStorage.getItem("historias"));
      if (etiquetasArmazenadas) {
        setEtiquetas(etiquetasArmazenadas);
        if(historiasArmazenadas){
          setHistorias(historiasArmazenadas);
        }
      }
      setCarregou(true);
    }
  }, [carregou])


  useEffect(() => {
    if (carregou) {
      localStorage.setItem("etiquetas", JSON.stringify(etiquetas))
    }
  }, [etiquetas, carregou])

  useEffect(() => {
    if (carregou) {
      localStorage.setItem("historias", JSON.stringify(historias))
    }
  }, [historias, carregou])

  const handleShowEtiquetaForm = (id = -1) => {
    setIdEtiqueta(-1)
    if (id != -1) {
      setIdEtiqueta(id)
    }
    document.querySelector("#formEtiqueta").style.display = "flex"
  }

  const handleShowHistoriaForm = (id = -1, idEtiqueta = -1) => {
    setHistoriaSelecionada(null)
    setIdHistoria(-1)
    if (id != -1) {
      console.log("AAAAAAAAAAAAAAAAAAA")
      setHistoriaSelecionada([historias[idEtiqueta][id], idEtiqueta])
      setIdHistoria(id)
      setIdEscolhaOriginal(idEtiqueta)
    }
    document.querySelector("#formHistoria").style.display = "flex"
  }

  const handleEtiqueta = (valor) => {
    if (idEtiqueta != -1) {
      let temp = [...etiquetas]
      temp[idEtiqueta] = valor
      setEtiquetas([...temp])
    } else {
      setEtiquetas([...etiquetas, valor])
      let tempHistorias = [...historias]
      tempHistorias.push([])
      setHistorias(tempHistorias)
    }

    setIdEtiqueta(-1)

  }

  const handleHistoria = (titulo, historia, escolha) => {
    let tempArrayHistoria = null
    if(historiaSelecionada != null){
      tempArrayHistoria = [...historias]
      if(escolha == idEscolhaOriginal && escolha != -1){
        tempArrayHistoria[escolha][idHistoria][0] = titulo
        tempArrayHistoria[escolha][idHistoria][1] = historia
      }else if(escolha != -1 && escolha != idEscolhaOriginal){
        tempArrayHistoria[escolha].push([titulo, historia])
        tempArrayHistoria[idEscolhaOriginal].splice(idHistoria, 1)
      }
    }else{
      tempArrayHistoria = [...historias]
      tempArrayHistoria[escolha].push([titulo, historia])
    }
    setHistorias(tempArrayHistoria)
    setIdHistoria(-1)
    setIdEscolhaOriginal(-1)
  }

  const handleApagarEtiqueta = () => {
    let etiquetasAtualizadas = etiquetas.filter((_, index) => index !== idEtiqueta);
    let historiasAtualizadas = historias.filter((_, index) => index != idEtiqueta)
    setEtiquetas(etiquetasAtualizadas)
    setHistorias(historiasAtualizadas)
    setIdEtiqueta(-1)

  }

  const handleApagarHistoria = () => {
    let historiaAtualizada = historias[idEscolhaOriginal].filter((_, index) => index !== idHistoria)
    setHistorias(historiaAtualizada)
    setIdHistoria(-1)
    setIdEscolhaOriginal(-1)

  }



  return (
    <>
      <h1>Um Pouco de Tudo</h1>
      <div id="etiquetas">
        <div className="headerContainer">
          <h2>Etiquetas</h2>
          <button onClick={() => handleShowEtiquetaForm()}>Nova etiqueta</button>
        </div>
        <div id="etiquetasHeader">
          <h2>Etiquetas</h2>
        </div>
        <div id="etiquetasContainer">

          {etiquetas.map((etiqueta, keyEtiqueta) => {
            return (
              <div className="etiqueta" key={keyEtiqueta} onClick={() => handleShowEtiquetaForm(keyEtiqueta)}>
                <p>{etiqueta}</p>
              </div>)
          })}

        </div>
      </div>
      <div id="historias">
        <div className="headerContainer">
          <h2>Histórias</h2>
          <button onClick={() => handleShowHistoriaForm(-1)}>Nova história</button>
        </div>
        <div className="historias">
          {etiquetas.map((etiqueta, key) => {
            return(
              
                <div className="historiaContainer" key={key}>
                  <div className="historiaHeader">
                    <h2>{etiqueta}</h2>
                  </div>
                  <div className="historiasList">
                    {historias[key]?.map((historia, keyHistoria) => {
                      return(
                        <div className="historia" onClick={() => handleShowHistoriaForm(keyHistoria, key)}>
                          <p key={keyHistoria}>{historia[0]}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
            )
          })}
          
          
        </div>
      </div>

      <EtiquetaForm aoEnviar={handleEtiqueta} editarEtiqueta={etiquetas[idEtiqueta] ? etiquetas[idEtiqueta] : null} aoClicar={handleApagarEtiqueta} />
      <HistoriaForm aoEnviar={handleHistoria} editarHistoria={historiaSelecionada} aoClicar={handleApagarHistoria} etiquetas={etiquetas} />

    </>
  )

}

export default App
