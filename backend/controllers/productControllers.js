import asyncHandler from "../middleWares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductsById = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProducts = asyncHandler(async (req, res) => {
  // const { name, image, brand, category, description, rating, numReviews, price, countInStock, reviews } = req.body;
  const product = await Product.create({
    name: "samplename",
    image: "/uploads/sample.jpg",
    user: req.user._id,
    brand: "samplebrand",
    category: "sample category",
    description: "sample description",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProducts = await product.save();
  res.status(201).json(createdProducts);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, rating, numReviews, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.user = req.user._id;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const reviewProduct = asyncHandler(async (req, res) => {
  console.log("hdjsohdhahshahsfhasfhdsfdsnfdjsfndsflkjsdfnslk");

  const { rating, comment, name } = req.body;
  console.log("rr", rating);
  const product = await Product.findById(req.params.id);
  console.log(product);
  console.log("fndnfjnnsnsnf", req.user._id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() == req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      rating: Number(rating),
      comment,
      name,
      product,
      user: req.user._id,
    };
    console.log("ll", review);

    if (review) {
      const puhsed = await product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, value) => acc + value.rating, 0) / product.reviews.length;

      const reviewedProducts = await product.save();
      console.log("upsc", reviewedProducts);

      res.status(201).json(reviewedProducts);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, createProducts, getProductsById, updateProduct, deleteProduct, reviewProduct };
