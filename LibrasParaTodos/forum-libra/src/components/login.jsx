'use client';

import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function Login() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    getCsrfToken().then(token => setCsrfToken(token));
  }, []);
  

  return (
    <form method="post" action="/api/auth/callback/credentials" className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <input name="csrfToken" type="hidden" value={csrfToken} />

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="email">Email</label>
        <input type="text" name="email" required className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"/>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="senha">Senha</label>
        <input
          type="password" name="senha" required className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"/>
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Entrar
      </button>
    </form>
  );
}