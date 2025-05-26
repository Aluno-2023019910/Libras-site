'use client'
import { useState } from "react"
import { gravaSugestao } from "@/lib/sugestaosDB"
import xss from "xss"

export default function Contato(){
    const [enviado, setEnviado] = useState(false)
    const [inputNome, setInputNome] = useState()
    const [inputTelefone, setInputTelefone] = useState()
    const [inputEmail, setInputEmail] = useState()
    const [inputSugestao, setInputsugestao] = useState()


    
    const handleInputNomeChange = e => {
        setInputNome(e.target.value)
    }
    const handleInputTelefoneChange = e => {
        setInputTelefone(e.target.value)
    }
    const handleInputEmailChange = e => {
        setInputEmail(e.target.value)
    }
    const handleInputSugestaoChange = e => {
        setInputsugestao(e.target.value)
    }
    const enviar = () =>{
        if(inputNome){
            gravaSugestao({
                nome: xss(inputNome) || 'Anônimo',
                telefone: xss(inputTelefone),
                email: xss(inputEmail),
                sugestao: xss(inputSugestao)
            })
            setEnviado(true)
        }
        else{
            alert('Digite a sugestao.')
        }
    }

    const resetar = () =>{
        setEnviado(false)
        setInputNome('')
        setInputTelefone('')
        setInputEmail('')
        setInputsugestao('')
    }

    return(
        <div>
            <h2>Contato</h2>
            {enviado ? 
            <div>
                <p>{inputNome || 'Anônimo'}, obrigado pela sugestão</p>
                <button onClick={resetar}> Enviar outra sugestão</button>

            </div>
            :
            <div>
                <p>Entre em contato para enviar sugestão, reclamações ou oferecer patrocínio</p>
                <form>
                    <p><label >Nome: </label> <input type="text" size="35" value={inputNome} onChange={handleInputNomeChange}/></p>
                    <p><label >Telefone: </label> <input type="text" size="33" value={inputTelefone} onChange={handleInputTelefoneChange}/></p>
                    <p><label >Email: </label> <input type="text" size="35" value={inputEmail} onChange={handleInputEmailChange}/></p>
                    <p><textarea cols="35" rows="5" placeholder="Abra seu coração" value={inputSugestao} onChange={handleInputSugestaoChange}></textarea></p>
                    <button onClick={enviar}>Enviar</button>
                </form>
            </div>    
            }
        </div>


    )

}