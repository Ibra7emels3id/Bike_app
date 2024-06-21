import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLINT_ID,
            clientSecret: process.env.GITHUB_SECRET_KEY
        })
    ],
    secret: process.env.SIGNING_PRIVATE_KEY
})

export { handler as GET, handler as POST }