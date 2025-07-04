'use server'
import  connectDB  from "@/lib/connectDB";
import  Comentario from "@/models/comentario";
import { redirect } from "next/navigation";
import xss from "xss";
import { revalidatePath } from "next/cache";

async function connDB() {
     await connectDB()
            .then(() => {
                console.log("Conexão estabelecida com o banco")
            })
            .catch(err =>{
                console.log("Erro ao conenctar ao banco")
                console.log(err)
            })
            
}

export async function getComentario(postalvo) {
    await connDB();
    
    // id
    const usu = await Comentario.find({ postalvo: postalvo });

    return usu;
    
    
}

export async function gravaComentario(formData) {
    await connDB();
    const postalvo = xss(formData.get('postalvo').trim())
    const autor = xss(formData.get('autor').trim())
    const conteudo = xss(formData.get('conteudo').trim())
    console.log(postalvo + autor + conteudo)

    if(conteudo){

        await Comentario.insertOne(({postalvo,autor,conteudo}))   
        redirect(`/busca/postlibra/${postalvo}`)
    }


}

export async function apagaComentario(id){
    await connDB();
    await Comentario.findByIdAndDelete(id)
    revalidatePath(`/`);
}