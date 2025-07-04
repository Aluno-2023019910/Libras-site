'use client'

import { gravaPostLibra } from "@/lib/postlibraDB"
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function CadaPost(){
    const [img, setImg] = useState(null);

    const { data: session, status } = useSession();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result); 
        };
        reader.readAsDataURL(file);
      };

    return(
        <form action={gravaPostLibra} className="p-4 max-w-md mx-auto">
            <input name="emailDono" type="hidden" value={session.user.email} />
           
            <label className="block mb-2">Título:
                <input placeholder="Digite o título aqui..."type="text" name="titulo" required className="block w-full border p-2" />
            </label>

            <label className="block mb-2" >Descrição: 
            <textarea placeholder="Digite a descrição aqui..." name="descricao"required rows={6} className="w-full border p-2 rounded resize-y focus:outline-none focus:ring focus:border-blue-500"></textarea> 
            </label>
                  
            <label onChange={handleFileChange} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer ">Imagem da Mão: <input type="file" name="imagemMao" required accept="image/*" className="block w-full" /></label>
            {img && (
          <div className="mt-4">
            <p className="font-medium">Imagem escolhida:</p>
            <img src={img} alt="Imagem escolhida" className="max-w-xs mt-2 border rounded"/> </div>
        )}

            <button type="submit"className="content-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Enviar</button>

     
    </form>
    )


}