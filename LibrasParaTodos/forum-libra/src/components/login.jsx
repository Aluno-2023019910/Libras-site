'use client'
import { Login } from "@/lib/usuarioDB"


export default () =>{
    return(
        <form action={Login}>
            <input type="text" required name="email"/>
            <input type="password" required name="senha"/>
        <button>Enviar</button>
        </form>
    )


}