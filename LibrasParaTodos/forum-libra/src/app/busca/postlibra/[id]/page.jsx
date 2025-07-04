import { use } from "react";
import { getPostLibra } from "@/lib/postlibraDB";
import CardPostLibraDetalhe from "@/components/cardpostlibradetalhe";


export default function PostDetalhe({params}) {
    const {id} = use(params)
    const post = use(getPostLibra(id)) 
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa "+id)
    return(
        <CardPostLibraDetalhe id={id} titulo={post.titulo} emailDono={post.emailDono} descricao={post.descricao} imagemMao={post.imagemMao} 
        />
        
    )
}