const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
if (!url || !dbName) {
  throw new Error('MONGO_URI and MONGO_DB_NAME must be defined in .env');
}
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let dbInstance = null;

const connectToDB = async () => {
  if (dbInstance) return dbInstance;
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const closeDBConnection = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    dbInstance = null;
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectToDB, closeDBConnection };