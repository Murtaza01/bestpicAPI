import { collections } from "../database";
import { ObjectId } from "mongodb";

interface props {
  name: string;
  imageUrl: string;
  imageId: string;
}

class User {
  name: string;
  imageUrl: string;
  imageId: string;

  constructor({ name, imageUrl, imageId }: props) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.imageId = imageId;
  }

  add() {
    collections.users?.insertOne(this);
  }

  static async get() {
    const result = await collections.users?.find().toArray();
    return result;
  }

  static async find(id: string) {
    const query = { _id: new ObjectId(id) };
    const user = await collections.users?.findOne(query);
    return user;
  }

  static async update(id: string, newData: {}) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.updateOne(query, { $set: newData });
    return result;
  }

  static async delete(id: string) {
    const result = await collections.users?.deleteOne({
      _id: new ObjectId(id),
    });

    // will throw error if its not ok and will be sent in result.
    return result;
  }
  static async incWins(winner: string) {
    const query = { name: winner };
    const result = await collections.users?.updateOne(query, {
      $inc: { wins: 1 },
    });
    return result;
  }

  static async getChallengers() {
    const query = { wins: { $exists: true } };
    const result = await collections.users?.find(query).toArray();
    return result;
  }
}

export default User;
