import { gravaNoticia } from "@/lib/noticiasDB"
import FormEditarNoticia from "@/app/components/formeditarnoticia"


export default  function NoticiasNew() {

  
  return(
    
    <FormEditarNoticia titulo={''} descricao={''} operacaoNoticia={gravaNoticia} editar={false} />

  )
}