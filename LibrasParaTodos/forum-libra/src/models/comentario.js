import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
    postalvo: String,
    autor: String,
    conteudo: String

})

const Comentario = mongoose.models.Comentario || mongoose.model('Comentario', comentarioSchema)

export default Comentario