const db = require('../data/db');

async function getCategories(req, res) {
  try {
      const database = await db.getDB();
      const categories = await database
        .collection('categories')
        .find()
        .toArray();
      res.render('categories-list', { categories, title: 'Categories List' });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
}

// Знайти всі продукти в категорії “Smartphones”.
async function getCategoryByName(req, res) {
  const nameCategory = req.params.nameCategory;
  try {
    const database = await db.getDB();
    const category = await database
      .collection('categories')
      .findOne({ name: nameCategory });
    
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const products = await database
      .collection('products')
      .find({ categoryId: category._id })
      .toArray();

    res.render('category-details', { category, products, title: `Category: ${nameCategory}` });
  } catch (error) {
    console.error('Error fetching category details:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getCategories,
  getCategoryByName
};