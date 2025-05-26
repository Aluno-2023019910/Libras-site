'use server'
import  connectDB  from "@/lib/connectDB";
import Sugestao from "@/models/sugestao"
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

export async function gravaSugestao(sugestao) {
    await connDB()
    const novaSugestao = new Sugestao(sugestao)
    await novaSugestao.save();
    
}

export async function getSugestoes() {
    await connDB()
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return await Sugestao.find({})
    
}

export async function apagaSugestao(id) {
    await connDB()
    await Sugestao.findByIdAndDelete(id)
    revalidatePath('adm/sugestao')
    
}
// export async function getSugestao(id) {
//     await connDB()
//     // await new Promise(resolve => setTimeout(resolve, 2000))
//     return await Sugestao.findById({id})
    
// }

