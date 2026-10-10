import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

export const client = new MongoClient(uri);

export const db = client.db("bazar-dor");
