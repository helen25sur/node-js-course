const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
if (!url || !dbName) {
  throw new Error('MONGO_URI and MONGO_DB_NAME must be defined in .env');
}
const client = new MongoClient(url);
let database = null;

const connectToDB = async () => {
  if (database) return database;
  try {
    const client = await MongoClient.connect(url);
    database = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

async function getDB() {
  if (!database) {
    throw new Error('Database not connected. Please call connectToDB first.');
  }
  return database;
} 

const closeDBConnection = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    database = null;
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectToDB, getDB, closeDBConnection };