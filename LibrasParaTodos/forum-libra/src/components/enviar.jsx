'use client'
import { gravaPostLibra } from "@/lib/postlibraDB"


export default () =>{
    return(
        <form action={gravaPostLibra}>
            <input type="text" name="titulo"/>
            <input type="text" name="descricao"/>
            <input type="file" name="imagemMao" accept="image/*"/>
        <button>Enviar</button>
        </form>
    )


}