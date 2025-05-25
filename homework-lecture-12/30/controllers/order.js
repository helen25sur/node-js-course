const db = require('../data/db');

async function getOrders(req, res) {
  try {
    const database = await db.getDB();
    const orders = await database
      .collection('orders')
      .find()
      .toArray();
    console.log(orders[0].items);
    // Порахувати загальний прибуток із усіх замовлень.
    const totalProfit = orders.reduce((sum, order) => sum + order.total, 0);
    const products = await database
      .collection('products')
      .find()
      .toArray();
    res.render('orders-list', { orders, products, totalProfit, title: 'Orders List' });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getOrders
};