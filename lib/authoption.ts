import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
export const NextAuthOp : NextAuthOptions =
    {
        // Configure one or more authentication providers
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          // ...add more providers here
        ],
      
}