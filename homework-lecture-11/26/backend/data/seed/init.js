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
        name: 'Samsung Galaxy S23',
        price: 899,
        stock: 45,
        categoryId: categories[0]._id
      },
      {
        name: 'Google Pixel 8',
        price: 799,
        stock: 60,
        categoryId: categories[0]._id
      },
      {
        name: 'OnePlus 11',
        price: 749,
        stock: 70,
        categoryId: categories[0]._id
      },
      {
        name: 'Xiaomi 13 Pro',
        price: 699,
        stock: 80,
        categoryId: categories[0]._id
      },
      {
        name: 'Sony Xperia 1 V',
        price: 1199,
        stock: 30,
        categoryId: categories[0]._id
      },
      {
        name: 'Motorola Edge 40 Pro',
        price: 649,
        stock: 55,
        categoryId: categories[0]._id
      },
      {
        name: 'MacBook Pro',
        price: 1999,
        stock: 30,
        categoryId: categories[1]._id
      },
      {
        name: 'Dell XPS 15',
        price: 1799,
        stock: 25,
        categoryId: categories[1]._id
      },
      {
        name: 'HP Spectre x360',
        price: 1599,
        stock: 20,
        categoryId: categories[1]._id
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 1699,
        stock: 35,
        categoryId: categories[1]._id
      },
      {
        name: 'Asus ROG Zephyrus G14',
        price: 1499,
        stock: 15,
        categoryId: categories[1]._id
      },
      {
        name: 'Wireless Mouse',
        price: 49,
        stock: 100,
        categoryId: categories[2]._id
      },
      {
        name: 'Mechanical Keyboard',
        price: 89,
        stock: 60,
        categoryId: categories[2]._id
      },
      {
        name: 'USB-C Hub',
        price: 39,
        stock: 80,
        categoryId: categories[2]._id
      },
      {
        name: 'Laptop Stand',
        price: 29,
        stock: 70,
        categoryId: categories[2]._id
      },
      {
        name: 'Noise Cancelling Headphones',
        price: 129,
        stock: 40,
        categoryId: categories[2]._id
      },
      {
        name: 'Webcam Full HD',
        price: 59,
        stock: 50,
        categoryId: categories[2]._id
      },
      {
        name: 'Portable SSD 1TB',
        price: 119,
        stock: 35,
        categoryId: categories[2]._id
      },
      {
        name: 'Bluetooth Speaker',
        price: 69,
        stock: 45,
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
      },
      {
        customer: 'Jane Smith',
        items: [
          { productId: products[5]._id, quantity: 1 },
          { productId: products[12]._id, quantity: 1 }
        ],
        total: products[5].price + products[12].price,
        date: new Date()
      },
      {
        customer: 'Alice Johnson',
        items: [
          { productId: products[8]._id, quantity: 3 }
        ],
        total: products[8].price * 3,
        date: new Date()
      },
      {
        customer: 'Bob Brown',
        items: [
          { productId: products[4]._id, quantity: 2 },
          { productId: products[14]._id, quantity: 1 }
        ],
        total: products[4].price * 2 + products[14].price,
        date: new Date()
      },
      {
        customer: 'Charlie Lee',
        items: [
          { productId: products[9]._id, quantity: 1 },
          { productId: products[1]._id, quantity: 1 }
        ],
        total: products[9].price + products[1].price,
        date: new Date()
      },
      {
        customer: 'Diana Moore',
        items: [
          { productId: products[16]._id, quantity: 2 },
          { productId: products[3]._id, quantity: 1 }
        ],
        total: products[16].price * 2 + products[3].price,
        date: new Date()
      },
      {
        customer: 'Ethan Wilson',
        items: [
          { productId: products[7]._id, quantity: 1 },
          { productId: products[11]._id, quantity: 3 }
        ],
        total: products[7].price + products[11].price * 3,
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
