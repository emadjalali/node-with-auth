// import { db } from '../config/mongoConfig.js';
import { ObjectId } from 'mongodb';
import { connectToMongoDB } from '../config/mongoConfig.js';

class UserRepository {
  constructor() {
    (async () => {
      const db = await connectToMongoDB();
      this.collection = db.collection('users');
    })();
    // this.collection = db.collection('users');
  }
  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  findByUsername(username) {
    return this.collection.findOne({ username });
  }

  async addUser(user) {
    try {
      const objectId = new ObjectId();
      user._id = objectId;
      user.userId = objectId;

      const result = this.collection.insertOne(user);
      return result;
    } catch (err) {
      if (err?.code == 11000) throw new Error('User already exists');
      throw new Error(err);
    }
  }
  async updateEmailVerified(username, email, value) {
    try {
      const result = await this.collection.updateOne(
        { username, email },
        { $set: { emailVerified: value, updatedAt: new Date() } },
      );
      if (result.matchedCount === 0)
        throw new Error('User with this email does not exist');
    } catch (err) {
      throw new Error(err);
    }
  }
}
export { UserRepository };
