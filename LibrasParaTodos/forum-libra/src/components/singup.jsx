'use client'
import { gravaUsuario } from "@/lib/usuarioDB"


export default () =>{
    return(
        <form action={gravaUsuario}>
            <input type="text" required name="nome"/>
            <input type="text" required name="email"/>
            <input type="password" required name="senha"/>
        <button>Enviar</button>
        </form>
    )


}