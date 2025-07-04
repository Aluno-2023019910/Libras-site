'use client';
import Link from "next/link";
import { useSession, signOut} from 'next-auth/react';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function NavBar(){
    const path = usePathname()
    const router = useRouter();
    const { data: session, status } = useSession();
    const [busca, setBusca] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        if (busca.trim()) {
          router.push(`/busca?termo=${busca.trim()}`);
          setBusca(""); 
        }
      };

    return(
            <nav className="bg-gray-800 p-4 text-white">
                <ul className="flex space-x-4 items-center">
                    {(!session)?<li><Link href="/login" className={path.startsWith('/login')?'active': undefined }>Login</Link></li>:
                     <li><button onClick={() => signOut()} className="hover:text-red-400">Logout</button></li>
                    }
                    {(!session)?<li><Link href="/singup" className={path.startsWith('/singup')?'active': undefined }>SingUp</Link></li>:
                    <></>
                    }
                    <li><Link href="/cadapost" className={path =='/cadapost' ? 'active': undefined}>Postar</Link></li>
                    {/* <li><Link href="/sobre" className={path =='/sobre' ? 'active': undefined}>Sobre</Link></li> */}
                    <li>
                        <form onSubmit={handleSearch} className="flex space-x-2">
                            <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} className="bg-white text-black px-2 py-1 rounded"/>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"> Buscar </button>
                        </form>
                    </li>
                                </ul>


            </nav>


    )


}