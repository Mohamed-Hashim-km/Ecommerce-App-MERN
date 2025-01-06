import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
const createProducts =async (req, res) => {
  const { name, image, brand, category, description, rating, numReviews, price, countInStock, reviews } = req.body;
  const product =await Product.create({
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
    reviews,
  });
  res.json(product);
};

export { getProducts, createProducts };
