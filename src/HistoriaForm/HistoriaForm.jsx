import React, { useState, useEffect } from 'react'
import "./HistoriaForm.css"


function HistoriaForm({aoEnviar, editarHistoria, aoClicar, etiquetas}){

    const [nomeHistoria, setNomeHistoria] = useState("")
    const [historia, setHistoria] = useState("")
    const [escolha, setEscolha] = useState(0)


    useEffect(() => {
            if(editarHistoria != null){
                document.querySelector("#formHistoria .buttonApagar").style.display = 'block' 
                setNomeHistoria(editarHistoria[0][0])
                setHistoria(editarHistoria[0][1])
                setEscolha(editarHistoria[1])
            }else{
                document.querySelector("#formHistoria .buttonApagar").style.display = 'none' 
            }
        }, [editarHistoria])

    const handleSubmit = (e) => {
        e.preventDefault()
        aoEnviar(nomeHistoria, historia, escolha, )
        fecharFormulario()
    }

    const fecharFormulario = () => {
        document.querySelector("#formHistoria").style.display = "none"
        document.body.style.overflowY = "auto"
        setNomeHistoria("")
        setHistoria("")
        setEscolha(0)
    }

    return(
        <div id="formHistoria">
            <form onSubmit={handleSubmit} autoComplete='off'>
                <button onClick={fecharFormulario} id='fecharFormulario'>Voltar</button>
                <h2>Nova história</h2>
                <div>
                    <p><label htmlFor="tituloHistoria">Titulo: </label><input type="text" id="tituloHistoria" required placeholder="Nome da história" value={nomeHistoria} onChange={(e) => {setNomeHistoria(e.target.value)}} /></p>
                    <p>
                        <label htmlFor="escolhaEtiqueta">Etiqueta: </label>
                        <select id="escolhaEtiqueta" onChange={(e) => setEscolha(document.querySelector("#escolhaEtiqueta").value)}>
                            {etiquetas.map((etiqueta, index) => {
                                return(
                                    <option value={index} key={index} defaultValue={index == escolha}>{etiqueta}</option>
                                )
                            })}
                        </select>
                    </p>
                </div>
                <p><label htmlFor="historiaTextArea">História: </label><textarea id="historiaTextArea" onChange={(e) => setHistoria(e.target.value)} value={historia} placeholder='Conte sua história...'></textarea></p>
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

export default HistoriaForm