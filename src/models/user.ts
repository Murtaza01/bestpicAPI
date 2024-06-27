import { collections } from "../database";
import { ObjectId } from "mongodb";

interface props {
  name: string;
  imageUrl: string;
}

class User {
  name: string;
  imageUrl: string;

  constructor({ name, imageUrl }: props) {
    this.name = name;
    this.imageUrl = imageUrl;
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
    return result;
  }
}

export default User;
