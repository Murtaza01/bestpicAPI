import { collections } from "../database";
import { ObjectId } from "mongodb";

interface props {
  name: string;
  imageUrl: string;
  imageId: string;
}

class User {
  _id?: ObjectId;
  name: string;
  imageUrl: string;
  imageId: string;
  wins: number;

  constructor({ name, imageUrl, imageId }: props) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.imageId = imageId;
    this.wins = 0;
  }

  add() {
    collections.users?.insertOne(this);
  }

  static async get() {
    // only return users with imageId (onlineUsers)
    const query = { imageId: { $exists: true } };
    const result = await collections.users?.find(query).toArray();
    return result;
  }

  static async find(imageId: string) {
    const user = await collections.users?.findOne({ imageId });
    return user;
  }

  static async update(id: string, newData: {}) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.updateOne(query, { $set: newData });
    return result;
  }

  static async delete(imageId: string) {
    const result = await collections.users?.deleteOne({ imageId });

    // will throw error if its not ok and will be sent in result.
    return result;
  }

  static async increaseOnlineWins(id: string) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.updateOne(query, {
      $inc: { wins: 1 },
    });
    return result
  }

  static async increaseLocalWins(winner: string) {
    const query = { name: "localUsers" };
    const result = await collections.users?.updateOne(query, {
      $inc: { [`mohamedANDfatima.${winner}`]: 1 },
    });
    return result;
  }

  static async getLocal() {
    const query = { name: "localUsers" };
    const result = await collections.users?.find(query).toArray();
    return result;
  }
}

export default User;
