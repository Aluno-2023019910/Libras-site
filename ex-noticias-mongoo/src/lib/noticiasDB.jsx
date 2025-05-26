'use server'
import  connectDB  from "@/lib/connectDB";
import Noticia from "@/models/noticia"
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

export async function getNoticias() {
    await connDB();
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return await Noticia.find({})
    
}

export async function getNoticia(id) {
    await connDB();
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return await Noticia.findById(id)
    
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

export async function gravaNoticia(noticia) {
    await connDB();
    const titulo = xss(noticia.titulo)
    const descricao = xss(noticia.descricao)
    const imagem = noticia.imagem
    const nomeImagem = geraNomeImagem(titulo, imagem.name)
    const novaNoticia = new Noticia({titulo, descricao, imagem: nomeImagem})
    gravaImagem(imagem, nomeImagem)
    await novaNoticia.save()
    redirect(`/adm/noticias`)
}

export async function editaNoticia(noticia) {
    await connDB();
    const id = noticia.id
    const titulo = xss(noticia.titulo)
    const descricao = xss(noticia.descricao)
    const imagem = noticia.imagem
    const imagemAntiga = noticia.imagemAntiga
    let noticiaEditada = {}
    if (imagem.name && (imagem.name != 'undefined')){
        const nomeImagem = geraNomeImagem(titulo, imagem.name)
        noticiaEditada = {titulo, descricao, imagem: nomeImagem}
        apagaImagem( imagemAntiga)
        gravaImagem(imagem, nomeImagem)
    }
    else{
        noticiaEditada = {titulo,descricao}

    }
    await Noticia.findByIdAndUpdate(id, noticiaEditada,{runValidators: true})
    redirect(`/adm/noticias`)
}

export async function apagaNoticia(id,imagem){
    await connDB();
    apagaImagem(imagem)
    await Noticia.findByIdAndDelete(id)
    revalidatePath(`/adm/noticias`);
}