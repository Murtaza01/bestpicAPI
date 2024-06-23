import * as mongodb from "mongodb";

export const collections: { users?: mongodb.Collection } = {};

export async function ConnectToDB(callback: () => void) {
  const client = new mongodb.MongoClient(
    "mongodb+srv://Birdman:Birdman99@cluster0.lmgfftx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  await client.connect();

  const db = client.db("bestpic");

  const usersCollection: mongodb.Collection = db.collection("users");

  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
  callback();
}
