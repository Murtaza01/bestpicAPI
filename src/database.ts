import * as mongodb from "mongodb";
import { config } from "dotenv";

config();

export const collections: { users?: mongodb.Collection } = {};

export async function ConnectToDB(callback: () => void) {
  const client = new mongodb.MongoClient(process.env.MONGO_URL as string);
  await client.connect();

  const db = client.db("bestpic");

  const usersCollection: mongodb.Collection = db.collection("users");

  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
  callback();
}
