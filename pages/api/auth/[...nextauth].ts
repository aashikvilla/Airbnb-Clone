import prisma from "@/app/libs/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth,{ AuthOptions, Awaitable, RequestInternal, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions ={
    adapter: PrismaAdapter(prisma),
    providers :[ 
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials){
                console.warn("cred",credentials)
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if(!user || user?.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = bcrypt.compare(
                    credentials.password,
                    user.hashedPassword??""
                )

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }
                return user;
            }
          
        })
    ],

    pages:{
        signIn:'/'
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_URL    
};

export default NextAuth(authOptions)