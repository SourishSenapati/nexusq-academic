
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google,
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },
})
