const httpMocks = require('node-mocks-http');
const orderController = require('../../controllers/order');
const db = require('../../data/db');

jest.mock('../../data/db', () => ({
  getDB: jest.fn()
}));

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  res.render = jest.fn();
});

describe('Order Controller, getOrders', () => {
  it('should have a orderController.getOrders function', () => {
    expect(typeof orderController.getOrders).toBe('function');
  });
  it('should return 200 and call res.render', async () => {
    const fakeOrders = [
      { total: 30, items: [{ name: 'Espresso' }] },
      { total: 70, items: [{ name: 'Latte' }] }
    ];
    const fakeProducts = [
      { name: 'Espresso' },
      { name: 'Latte' }
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

    await orderController.getOrders(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.render).toHaveBeenCalled();
  });

  it('should render orders-list with correct data', async () => {
    const fakeOrders = [
      { total: 30, items: [{ name: 'Espresso' }] },
      { total: 70, items: [{ name: 'Latte' }] }
    ];
    const fakeProducts = [
      { name: 'Espresso' },
      { name: 'Latte' }
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

    await orderController.getOrders(req, res);

    expect(res.render).toHaveBeenCalledWith(
      'orders-list',
      expect.objectContaining({
        orders: expect.any(Array),
        products: expect.any(Array),
        totalProfit: 100,
        title: 'Orders List'
      })
    );
  });
});