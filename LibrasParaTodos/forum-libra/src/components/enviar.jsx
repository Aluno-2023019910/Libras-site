'use client'
import { gravaPostLibra } from "@/lib/postlibraDB"


export default () =>{
    return(
        <form action={gravaPostLibra}>
            <input type="text" required name="titulo"/>
            <input type="text" required name="descricao"/>
            <input type="file" required name="imagemMao" accept="image/*"/>
        <button>Enviar</button>
        </form>
    )


}