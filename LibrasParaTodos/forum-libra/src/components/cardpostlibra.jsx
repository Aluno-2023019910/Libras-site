import Image from "next/image";
import Link from "next/link";



export default function CardPostLibra({id, titulo, descricao, imagemMao}){
    return(
        <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2"> Palavra: {titulo}</h2> 

            <Image
                src={`/${imagemMao}`}
                alt={`Imagem de ${titulo}`}
                width={200}
                height={200}
                className="rounded mb-2 object-cover"
            />

            <p className="text-gray-600"> Descrição: {descricao}</p>
            <Link
        href={`/busca/postlibra/${id}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Ver Detalhes </Link>
        </div>
    )

}
