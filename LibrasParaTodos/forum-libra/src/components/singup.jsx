'use client'
import { gravaUsuario } from "@/lib/usuarioDB"


export default () =>{
    return(
        <form action={gravaUsuario}>
            <input type="text"  name="nome"/>
            <input type="text"  name="email"/>
            <input type="password"  name="senha"/>
        <button>Enviar</button>
        </form>
    )


}