import mongoose from "mongoose";
import Usuario from "./usuario";

const comentarioSchema = new mongoose.Schema({
    postalvo: String,
    autor: Usuario,

    conteudo: String

})

const Comentario = mongoose.models.Comentario || mongoose.model('Comentario', comentarioSchema)

export default Comentario