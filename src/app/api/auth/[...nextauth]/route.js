import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { connectMongoDB } from "../../../db/MongoDB"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/User"
import bcrypt from 'bcrypt'


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLINT_ID,
            clientSecret: process.env.GITHUB_SECRET_KEY
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                await connectMongoDB()
                const user = await User.findOne({ email: credentials.email })
                if (user) {
                    const HashPassword = await bcrypt.compare(credentials.password, user.password)
                    if (HashPassword) {
                        return user
                    }
                    return user
                } else {
                    return null
                }
            }
        })
    ],

    secret: process.env.SIGNING_PRIVATE_KEY
})

export { handler as GET, handler as POST }