'use server'
import  connectDB  from "@/lib/connectDB";
import Usuario from "@/models/usuario";
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

export async function getUsuarios() {
    await connDB();
   
    return await Usuario.find({})
    
}

export async function getUsuario(id) {
    await connDB();
    return await Usuario.findById(id)
    
}

export async function gravaUsuario(formData) {
    await connDB();
    const nome = xss(formData.get('nome').trim())
    const email = xss(formData.get('email').trim())
    const senha = xss(formData.get('senha').trim())
    const adm = false;
    console.log(nome + email + senha + adm)

    if(nome){

        await Usuario.insertOne(({nome,email,senha,adm}))   
        redirect('/')
    }


}

export async function Login(formData) {
    await connDB();
    const email = xss(formData.get('email').trim())
    const senha = xss(formData.get('senha').trim())
    getUsuarios.forEach(usua => {
        if(usua.email.equals(email) && usua.senha.equals(senha)) {
            console.log("faz alog");
        }
    }); 

    
    
    
}

export async function apagaUsuario(id,imagem,video){
    await connDB();
    await Usuario.findByIdAndDelete(id)
    revalidatePath(`/`);
}