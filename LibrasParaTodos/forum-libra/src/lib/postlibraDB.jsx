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
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return await PostLibra.findById(id)
    
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
    const titulo = xss(formData.get('titulo').trim())
    const descricao = xss(formData.get('descricao').trim())
    const imagemMao = formData.get('imagemMao')
    
    const nomeImagem = geraNomeImagem(titulo, imagemMao.name)
    gravaImagem(imagemMao, nomeImagem)
    if(titulo){
        await PostLibra.insertOne(({titulo,descricao,imagem: nomeImagem}))   
        redirect('/')
    }


}

// export async function editaPostLibra(PostLibra) {
//     await connDB();
//     const id = PostLibra.id
//     const titulo = xss(PostLibra.titulo)
//     const descricao = xss(PostLibra.descricao)
//     const imagem = PostLibra.imagem
//     const imagemAntiga = PostLibra.imagemAntiga
//     let PostLibraEditada = {}
//     if (imagem.name && (imagem.name != 'undefined')){
//         const nomeImagem = geraNomeImagem(titulo, imagem.name)
//         PostLibraEditada = {titulo, descricao, imagem: nomeImagem}
//         apagaImagem( imagemAntiga)
//         gravaImagem(imagem, nomeImagem)
//     }
//     else{
//         PostLibraEditada = {titulo,descricao}

//     }
//     await PostLibra.findByIdAndUpdate(id, PostLibraEditada,{runValidators: true})
//     redirect(`/adm/PostLibras`)
// }

export async function apagaPostLibra(id,imagem,video){
    await connDB();
    apagaImagem(imagem)
    apagaVideo(video)
    await PostLibra.findByIdAndDelete(id)
    revalidatePath(`/`);
}