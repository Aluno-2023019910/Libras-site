import { use } from "react";
import { getNoticia,editaNoticia } from "@/lib/noticiasDB";
import FormEditarNoticia from "@/app/components/formeditarnoticia";

export default function NoticiasEdit({params}) {
    const {id} = use(params)
    const noticia = use(getNoticia(id)) 
    return(
        <FormEditarNoticia id={id} titulo={noticia.titulo} descricao={noticia.descricao} imagem={noticia.imagem} operacaoNoticia={editaNoticia} editar={true}/>
        
    )
}