import { collections } from "../database";
import { ObjectId } from "mongodb";
interface props {
  name: string;
  age: number;
  imageUrl: string;
}

class User {
  name: string;
  age: number;
  imageUrl: string;

  constructor({ name, age, imageUrl }: props) {
    this.name = name;
    this.age = age;
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

  static async delete(id: string) {
    try {
      await collections.users?.deleteOne({ _id: new ObjectId(id) });
      return "success";
    } catch (e: any) {
      return e;
    }
  }
}

export default User;
