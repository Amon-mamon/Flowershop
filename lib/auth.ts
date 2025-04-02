import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt"
import { JWTCallbackParams, SessionCallbackParams } from "@/types/types";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:'auth/login',
    },
    providers: [
        CredentialsProvider({ 
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "email",},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null;
            }
            
            const existingUser = await prisma.user.findUnique({
                where:{
                    email: credentials.email
                }
            });
            if(!existingUser){
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)
            if(!passwordMatch){
                return null;
            }
            return {
                id:existingUser.id,
                email:existingUser.email,
                username:existingUser.username ?? null,
            }
          }
        })
      ],
    callbacks:{
        async jwt({ token, user} : JWTCallbackParams){
            if(user){
                  token.username = user.username
            }
            return token;
        },
        async session ({session,token} : SessionCallbackParams){
            if (session.user) {
                session.user.username = token.username as string; // Add username to session
            }
            return session;
            }
        }
    }      