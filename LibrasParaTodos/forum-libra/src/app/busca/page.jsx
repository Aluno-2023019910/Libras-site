
import CardPostLibra from "@/components/cardpostlibra"
import { searchPost } from "@/lib/postlibraDB";
import { use } from "react";

export default function PaginaBusca({ searchParams }) {
    
    const {termo} = use(searchParams);
    const posts =  use(searchPost(termo));
   
    

   
    return (
       
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Resultados para: <span className="text-blue-600">"{termo}"</span>
                </h2>
                {posts.length === 0 ? (
                <p className="text-gray-500">Nenhum resultado encontrado.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {posts.map(post => <li key={post.id}><CardPostLibra id={post.id} titulo={post.titulo} descricao={post.descricao} imagemMao={post.imagemMao}/></li>)}
                    </ul>
                )}

            
              
            </div>
          
    );
}
