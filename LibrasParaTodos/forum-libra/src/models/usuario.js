import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,

    videoExemplo: String,
    imagemMao: String,


})

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema)

export default Usuario
