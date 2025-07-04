'use client';

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { apagaPostLibra } from "@/lib/postlibraDB";
import { useRouter } from "next/navigation";
import Comentario from "./cometario";
import { getComentario } from "@/lib/comentario";
import CardComentario from "./cardcomentario";
import { use } from "react";

export default function CardPostLibraDetalhe({ id, emailDono, titulo, descricao, imagemMao }) {
  const { data: session } = useSession(); 
  const come = use(getComentario(id))
  const dono = session?.user?.email === emailDono || session?.adm === true;
  const router = useRouter();

  const handleDelete = async () => {
    await apagaPostLibra(id, imagemMao);
    router.back(); 
  };
  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-lg bg-white hover:shadow-xl transition text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Palavra: {titulo}</h2>

        <Image
            src={`/${imagemMao}`}
            alt={`Imagem de ${titulo}`}
            width={250}
            height={250}
            className="rounded mb-4 mx-auto"
        />

         <p className="text-gray-700 text-lg mb-4">Descrição: {descricao}</p>
        <p className="text-sm text-gray-500 mb-4">Postado por: {emailDono}</p>

        {dono && (
            <Link
                href={`/busca/postlibra/edit/${id}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg"
                >
                Editar Post
            </Link>
      )}
      {dono && (
            
            <button onClick={handleDelete} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg">
                deletar
            </button>
      )}
       {session && (
            <Comentario postalvo={id}/>

       )} 
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Comentarios:
                </h2>
                {come.length === 0 ? (
                <p className="text-gray-500">Nenhum comentario.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {come.map(c => <li key={c.id}><CardComentario id={c.id} conteudo={c.conteudo} autor={c.autor} /></li>)}
                    </ul>
                )}
    </div>
  );
}