'use server'
import  connectDB  from "@/lib/connectDB";
import PostLibra from "@/models/postlibra";
import { redirect } from "next/navigation";
import xss from "xss";
import fs from 'node:fs'
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

export async function getPostLibras() {
    await connDB();
   
    return await PostLibra.find({})
    
}

export async function getPostLibra(id) {
    await connDB();
    console.log(id)
    return await PostLibra.findById(id)
    
}

export async function searchPost(titulo) {
    await connDB();
  
   
    const posts = await PostLibra.find({
      titulo: { $regex: titulo, $options: "i" }
    });
  
    return posts;
  }

function geraNomeImagem(titulo, nomeImagem){
    return `${titulo.substring(0,15)}-${nomeImagem.substring(nomeImagem.length-15)}`
}

async function gravaImagem(imagem, nomeImagem){
    const stream = fs.createWriteStream(`public/${nomeImagem}`)
    const bufferedImage = await imagem.arrayBuffer()
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            console.log("Erro ao salvar a imagem...")
            console.log(error)    
        }


    })    
}

async function apagaImagem(imagem){
    fs.unlink(`public/${imagem}`, (error) =>{
        if(error){
            console.log('Erro ao apagar a imagem')
            console.log(error)
        }
    })
}

export async function gravaPostLibra(formData) {
    await connDB();
    const emailDono = xss(formData.get('emailDono').trim())
    const titulo = xss(formData.get('titulo').trim())
    const descricao = xss(formData.get('descricao').trim())
    const imagemMao = formData.get("imagemMao");
    
    const nomeImagem = geraNomeImagem(titulo, imagemMao.name)
    gravaImagem(imagemMao, nomeImagem)
    if(titulo){
        await PostLibra.insertOne(({titulo,descricao,emailDono,imagemMao: nomeImagem}))   
        redirect('/')
    }


}

export async function editaPostLibra(formData) {
    await connDB();


    const id = formData.get("id")
    const titulo = xss(formData.get('titulo').trim())
    const descricao = xss(formData.get('descricao').trim())
    const imagem = formData.get("imagemMao");
   

    const imagemAntiga = formData.get("imagemAntiga");
    let PostLibraEditada = {}
    if (imagem && imagem.name && imagem.name !== 'undefined'){
        const nomeImagem = geraNomeImagem(titulo, imagem.name)
        PostLibraEditada = {titulo, descricao, imagemMao: nomeImagem}
        apagaImagem( imagemAntiga)
        gravaImagem(imagem, nomeImagem)
    }
    else{
        PostLibraEditada = {titulo,descricao}

    }
    await PostLibra.findByIdAndUpdate(id, PostLibraEditada,{runValidators: true});
    
    redirect(`/busca/postlibra/edit/${id}`)
}

export async function apagaPostLibra(id,imagemMao){
    await connDB();
    apagaImagem(imagemMao)
    await PostLibra.findByIdAndDelete(id)
    revalidatePath(`/`);
}