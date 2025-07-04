import { use } from "react";
import { getPostLibra } from "@/lib/postlibraDB";
import EditPost from "@/components/editpost";


export default function PostDetalhe({params}) {
    const {id} = use(params)
    const post = use(getPostLibra(id)) 
    return(
        <EditPost id={id} titulo={post.titulo} emailDono={post.emailDono} descricao={post.descricao} imagemMao={post.imagemMao} 
        />
        
    )
}