'use client'
import { gravaUsuario, veriEmail } from "@/lib/usuarioDB"
import { useState } from "react";


export default function Singup() {
    const [emailVal, setEmailVal] = useState(true)

    
    const handleChange = async (e) => {
        
    
        const valido = await veriEmail(e.target.value);
        if (!valido) {
            setEmailVal(valido)
            return;
        } 
       
      };
      
    return(
        <form action={gravaUsuario}  className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <div className="mb-4">
                <input placeholder="Nome" className="border-1 border-solid border-black block mb-1 font-medium"type="text"  name="nome"/>
            </div>
            <div className="mb-4">
                <input placeholder="Email" className="border-1 border-solid border-black block mb-1 font-medium" type="text"  onChange={handleChange} name="email"/>
                {!emailVal && (
                    <p className="text-red-600 text-sm">Este e-mail já está cadastrado.</p>)}
            </div>
            <div className="mb-4">  
                <input placeholder="senha" className=" border-1 border-solid border-black block mb-1 font-medium " type="password"  name="senha"/>
            </div>
        
        <button disabled={!emailVal} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Cadastar</button>
        </form>
    )


}