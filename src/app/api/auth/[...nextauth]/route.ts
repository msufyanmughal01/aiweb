import NextAuth from "next-auth"
import { NextAuthOp } from "../../../../../lib/authoption"

 const authOptions = NextAuth(NextAuthOp)
export {authOptions as GET,authOptions as POST}


