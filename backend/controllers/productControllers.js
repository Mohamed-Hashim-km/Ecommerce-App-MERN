import asyncHandler from "../middleWares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductsById = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    
    const products = await Product.findById(req.params.id);
    if(products){
      res.json(products);
    }
    else{
      res.status(404)
      throw new Error("Product not found");
    }
 
 
  
})


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

export { getProducts, createProducts,getProductsById };
