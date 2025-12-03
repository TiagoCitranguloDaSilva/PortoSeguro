import React, { useState, useEffect } from 'react'
import "./EtiquetaForm.css"

function NovaEtiquetaForm({aoEnviar, editarEtiqueta, aoClicar}){

    const [nomeEtiqueta, setNomeEtiqueta] = useState("")
    const [editBool, setEditBool] = useState(false)

    useEffect(() => {
        if(editarEtiqueta != null){
            setEditBool(true)
            document.querySelector(".buttonApagar").style.display = 'block' 
            setNomeEtiqueta(editarEtiqueta[0])
        }else{
            setEditBool(false)
            document.querySelector(".buttonApagar").style.display = 'none' 
        }
    }, [editarEtiqueta])

    const handleSubmit = (e) => {
        e.preventDefault()
        aoEnviar(nomeEtiqueta)
        fecharFormulario()
    }

    const fecharFormulario = () => {
        document.querySelector("#formEtiqueta").style.display = "none"
        document.body.style.overflowY = "auto"
        setNomeEtiqueta("")
    }

    

    return(
        <div id="formEtiqueta">
            <form onSubmit={handleSubmit} autoComplete='off'>
                <button onClick={fecharFormulario} id='fecharFormulario'>Fechar</button>
                <h2>Nova etiqueta</h2>
                <p><label htmlFor="nomeEtiqueta">Nome: </label><input type="text" id="nomeEtiqueta" required placeholder="Nome da etiqueta" value={nomeEtiqueta} maxLength={50} onChange={(e) => {setNomeEtiqueta(e.target.value)}} /></p>

                <div className='botoes'>
                    <input type="submit" value="Salvar" />
                    <button className='buttonApagar' onClick={
                        (e) => {
                            e.preventDefault()
                            aoClicar()
                            fecharFormulario()
                        }
                        }>Apagar</button>

                </div>
            </form>
        </div>
    )

}

export default NovaEtiquetaForm