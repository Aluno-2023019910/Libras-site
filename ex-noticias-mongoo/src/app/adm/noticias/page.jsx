
import CardAdmNoticia from "@/app/components/cardadmnoticia";
import { getNoticias } from "@/lib/noticiasDB"
import Link from "next/link";

export default async function NoticiasAdm() {
  const noticias = await getNoticias();
  
  
  return(
    <div>
      <h2> Administrar noticias</h2>
      <ul className="lista">
          {noticias.map(noticia => <li key={noticia.id}><CardAdmNoticia id={noticia.id} titulo={noticia.titulo} descricao={noticia.descricao} imagem={noticia.imagem}/></li>)}
      </ul>
      <h3 className="buttonLink"><Link href='/adm/noticias/new'> Adicionar notícia</Link></h3>
      <p className="voltar"><Link href='/adm'> &#8592; Voltar</Link></p>
      
    </div>
  )
}