import mongoose from "mongoose";

const postlibraSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,

    videoExemplo: String,
    imagemMao: String,


})

const PostLibra = mongoose.models.PostLibra || mongoose.model('PostLibra', postlibraSchema)

export default PostLibra
