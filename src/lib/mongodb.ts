// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//     throw new Error("Please add MONGODB_URI to .env.local");
// }

// export const client = new MongoClient(uri);

// export const db = client.db("bazar-dor");





//for deploy
import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI সেট করা নেই");
}

const globalForMongo = globalThis as unknown as {
    _mongoClient?: MongoClient;
};

let client = globalForMongo._mongoClient;

// একটাই client তৈরি হবে, বারবার নয়
if (!client) {
    client = new MongoClient(uri);
    attachDatabasePool(client);
    globalForMongo._mongoClient = client;
}

export { client };
export const db = client.db("bazar-dor"); 
