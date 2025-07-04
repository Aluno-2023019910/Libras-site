'use client'

import { gravaComentario } from "@/lib/comentario";
import { useSession } from "next-auth/react";

export default function Comentario({ postalvo }){
   

    const { data: session, status } = useSession();


    return(
        <form action={gravaComentario} className="p-4 max-w-md mx-auto">
            <input name="autor" type="hidden" value={session.user.email} />
            <input name="postalvo" type="hidden" value={postalvo} />

            <label className="block mb-2" >Descrição: 
            <textarea placeholder="Informe sua opiniao" name="conteudo"required rows={6} className="w-full border p-2 rounded resize-y focus:outline-none focus:ring focus:border-blue-500"></textarea> 
            </label>

            <button type="submit"className="content-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Enviar</button>

     
    </form>
    )


}