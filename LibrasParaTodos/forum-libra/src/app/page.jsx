'use client'

import Login from "@/components/login";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    
    return <p>Carregando sessão...</p>;
  }


  if (session) {
     return (
     
      <div>
         <button onClick={() => signOut()}>Logout</button>
         <p>Logado como: {session.user?.email}</p>
        <p>Nome: {session.nome}</p>
        <p>Admin: {session.adm ? "Sim" : "Não"}</p>
        
        </div>
     )     
  }

  return (
   
      
      <div>
        
      
        <Login></Login>
        
        
      </div>
     
  );
}
