import { db } from '../config/mongoConfig.js';
import { ObjectId } from 'mongodb';

class UserRepository {
  constructor() {
    this.collection = db.collection('users');
  }
  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async findById(userId) {
    return await this.collection.findOne({ _id: new ObjectId(userId) });
  }

  async addUser(user) {
    try {
      const objectId = new ObjectId();
      user._id = objectId;
      user.userId = objectId;

      const result = await this.collection.insertOne(user);
      return result;
    } catch (err) {
      if (err?.code == 11000) throw new Error('User already exists');
      throw new Error(err);
    }
  }
}
export { UserRepository };
