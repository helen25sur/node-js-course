const request = require('supertest');
const app = require('../../app');
const db = require('../../data/db');

jest.mock('../../data/db', () => ({
  getDB: jest.fn()
}));

describe('GET /orders', () => {
  it('should return 200 and render orders-list with correct data', async () => {
    const fakeProducts = [
      { _id: 'p1', name: 'Latte' },
      { _id: 'p2', name: 'Espresso' }
    ];

    const fakeOrders = [
      { total: 50, items: [{ productId: 'p1', quantity: 1 }], customer: 'Customer1', date: '2024-01-01' },
      { total: 25, items: [{ productId: 'p2', quantity: 1 }], customer: 'Customer2', date: '2024-01-02' }
    ];

    db.getDB.mockResolvedValue({
      collection: (name) => ({
        find: () => ({
          toArray: jest.fn().mockResolvedValue(
            name === 'orders' ? fakeOrders : fakeProducts
          )
        })
      })
    });

    const response = await request(app).get('/orders');

    // Оскільки res.render не віддає JSON — очікуємо 200 і перевіряємо html/text
    expect(response.status).toBe(200);
    expect(response.text).toContain('Latte'); // або якийсь інший вміст сторінки
    expect(response.text).toContain('Espresso'); // або якийсь інший вміст сторінки
  });

  it('should return 500 on db error', async () => {
    db.getDB.mockRejectedValue(new Error('DB connection failed'));

    const response = await request(app).get('/orders');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
  });
});
