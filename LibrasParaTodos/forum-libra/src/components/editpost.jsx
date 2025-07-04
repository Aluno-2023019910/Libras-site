

'use client';

import { useState } from "react";
import Image from "next/image";
import { editaPostLibra } from "@/lib/postlibraDB";

export default function EditPost({ id, emailDono, titulo, descricao, imagemMao }) {

  const [inputTitulo, setInputTitulo] = useState(titulo);
  const [inputDescricao, setInputDescricao] = useState(descricao);
  const [imgPreview, setImgPreview] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);

  const handleInputTituloChange = (e) => setInputTitulo(e.target.value);
  const handleInputDescricaoChange = (e) => setInputDescricao(e.target.value);

  const handleInputImagemChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNovaImagem(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    
    const formData = new FormData();
    formData.append("id", id);
    formData.append("emailDono", emailDono);
    formData.append("titulo", inputTitulo);
    formData.append("descricao", inputDescricao);
    if (novaImagem) {
      formData.append("imagemMao", novaImagem);
      formData.append("imagemAntiga", imagemMao);
    }

    await editaPostLibra(formData);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Editar Postagem</h2>
      <label className="block mb-2">
        Título:
        <input
          type="text"
          value={inputTitulo}
          onChange={handleInputTituloChange}
          className="block w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        Descrição:
        <textarea
          value={inputDescricao}
          onChange={handleInputDescricaoChange}
          rows={6}
          className="w-full border p-2 rounded resize-y mt-1"
        />
      </label>

      {imagemMao && (
        <div className="mb-4">
          <p className="font-medium">Imagem atual:</p>
          <Image src={`/${imagemMao}`} alt="Imagem atual" width={200} height={200} className="rounded" />
        </div>
      )}

      <label className="block mb-2">
        Nova imagem (opcional):
        <input type="file" accept="image/*" onChange={handleInputImagemChange} />
      </label>

      {imgPreview && (
        <div className="mt-2">
          <p className="font-medium">Pré-visualização:</p>
          <img src={imgPreview} alt="Preview" className="max-w-xs border rounded mt-1" />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Salvar Alterações
      </button>
    </div>
  );
}