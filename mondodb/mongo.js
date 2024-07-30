const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = "mongodb+srv://Ist6KBEM8eZAlMPf:Ist6KBEM8eZAlMPf@cluster0.w1e9azk.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to MongoDB
const connectDB = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Function to create a new product
const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };

  const client = await connectDB();

  try {
    const db = client.db();
    const result = await db.collection('products').insertOne(newProduct);
    res.json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Could not store data.' });
  } finally {
    client.close();
  }
};

// Function to get all products
const getProducts = async (req, res, next) => {
  const client = await connectDB();

  try {
    const db = client.db();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Could not retrieve products.' });
  } finally {
    client.close();
  }
};

module.exports = {
  createProduct,
  getProducts
};
