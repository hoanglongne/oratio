import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

// Extend the default session type to include a user ID
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

// Configure authentication options
export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise, { databaseName: 'oratio' }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const client = await clientPromise;
                    const db = client.db('oratio');
                    const user = await db.collection("users").findOne({ email: credentials.email });

                    if (!user || !user.password) {
                        return null;
                    }

                    // Verify password (using bcryptjs)
                    const isPasswordMatch = await compare(credentials.password, user.password);

                    if (!isPasswordMatch) {
                        return null;
                    }

                    // Return user data in the format expected by NextAuth
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.image
                    };
                } catch (error) {
                    console.error("Error verifying credentials:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 