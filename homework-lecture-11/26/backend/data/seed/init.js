const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db(dbName);

    // Drop existing collections (optional, for a clean start)
    await db.collection('products').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('orders').deleteMany({});

    // Seed categories
    const categories = [
      { _id: new ObjectId(), name: 'Smartphones' },
      { _id: new ObjectId(), name: 'Laptops' },
      { _id: new ObjectId(), name: 'Accessories' }
    ];
    await db.collection('categories').insertMany(categories);

    // Seed products
    const products = [
      {
        name: 'iPhone 14',
        price: 999,
        stock: 50,
        categoryId: categories[0]._id
      },
      {
        name: 'MacBook Pro',
        price: 1999,
        stock: 30,
        categoryId: categories[1]._id
      },
      {
        name: 'Wireless Mouse',
        price: 49,
        stock: 100,
        categoryId: categories[2]._id
      }
    ];
    await db.collection('products').insertMany(products);

    // Seed orders
    const orders = [
      {
        customer: 'John Doe',
        items: [
          { productId: products[0]._id, quantity: 1 },
          { productId: products[2]._id, quantity: 2 }
        ],
        total: products[0].price * 1 + products[2].price * 2,
        date: new Date()
      }
    ];
    await db.collection('orders').insertMany(orders);

    console.log('✅ Seeding completed');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await client.close();
  }
}

seed();
