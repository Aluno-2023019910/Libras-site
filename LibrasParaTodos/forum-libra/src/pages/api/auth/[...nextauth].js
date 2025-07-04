import { login } from "@/lib/usuarioDB";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        senha: { label: "senha", type: "password" }
      },
      async authorize(credentials) {
        try {

          const usu = await login(credentials.email, credentials.senha);

          if (usu) {
            const usuario = usu;
            console.log(usuario);
            return usuario;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Erro no authorize:", error);
          throw new Error("Erro ao validar as credenciais");
        }
      },

    })
  ],callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.nome = user.nome;
        token.adm = user.adm;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.nome = token.email;
        session.nome = token.nome;
        session.adm = token.adm;
      }
      return session;
    },
  },
  secret: "jwttoken",
  pages: {
    signIn: "/login", 
    error: "/login", 
  },
  jwt: {
    secret: "jwttoken",
  }
}

export default NextAuth(authOptions)