// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
// Em um projeto real, usaríamos bcrypt para comparar senhas.
// Para este portfólio, faremos uma comparação simples por segurança.
// import bcrypt from 'bcrypt'; 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credenciais inválidas');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error('Usuário não encontrado');
        }

        // Em produção, você compararia hashes de senha:
        // const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        const isPasswordCorrect = credentials.password === user.password;

        if (isPasswordCorrect) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Redireciona para nossa página de login customizada
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };