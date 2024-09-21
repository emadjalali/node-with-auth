import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'nodeWithAuthDB';

let db;

const connectToMongoDB = async () => {
  // Return the existing connection if it already exists
  if (db) return db;

  try {
    const client = new MongoClient(uri, { serverApi: { version: '1' } });

    await client.connect();

    console.log('Connected successfully to MongoDB');

    // Select the database
    db = client.db(dbName);
    await db.collection('users').createIndex({ username: 1 }, { unique: true });

    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectToMongoDB, db };
