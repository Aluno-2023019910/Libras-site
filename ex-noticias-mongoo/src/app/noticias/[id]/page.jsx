import { use } from "react";
import Image from "next/image"
import Link from "next/link"
import { getNoticia } from "@/lib/noticiasDB";

export default function Noticia({params}){
    const {id} = use(params)
    
    
    // const noticia = noticias.filter( news => news.id == noticia)[0]
    const noticia = use(getNoticia(id))
    console.log("noticia = "+noticia);
    if (!noticia) {
        return <p>Noticia not found</p>;
      }
    return(
        <div>
            <h2>{noticia.titulo}</h2>
            <Image
                className="imgCardNoticia"
                src={"/"+noticia.imagem}
                alt="Imagem"
                width={300}
                height={300}

            />
            <p className="descricaoNoticia">{noticia.descricao}</p>
            <p><Link href={"/noticias"}>&#8592; voltar</Link></p>

        </div>


    )

}
