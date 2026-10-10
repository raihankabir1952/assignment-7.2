// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { client, db } from "@/lib/mongodb";

// export const auth = betterAuth({
//     database: mongodbAdapter(db, {
//         client,
//     }),

//     emailAndPassword: {
//         enabled: true,
//         requireEmailVerification: false,
//     },

//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         },

//         github: {
//             clientId: process.env.GITHUB_CLIENT_ID!,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//         },
//     },

//     trustedOrigins: [
//         "http://localhost:3000",
//         "https://assignment-7-ivory-two.vercel.app", //new add for deploy
//     ],
// });











//for deploy

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "@/lib/mongodb";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    database: mongodbAdapter(db),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },

    trustedOrigins: [
        "http://localhost:3000",
        "https://assignment-7-ivory-two.vercel.app",
    ],
});