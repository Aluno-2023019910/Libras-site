'use client'

import Login from "@/components/login";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    
    return <p>Carregando sessão...</p>;
  }


 
     return (
     
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
          <div className="max-w-xl text-center p-8 bg-white shadow-2xl rounded-2xl">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Bem-vindo ao Libras para Todos</h1>
            <p className="text-gray-700 text-lg mb-6">
              Projeto para a materia de 
            </p>
           </div>
        </div>
     )     
  

  
}
