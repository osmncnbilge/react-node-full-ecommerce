import express from "express";
import Product from "../models/productModel";
import { isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not Found." });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    res.status(201).send({ msg: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in Creating Product." });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(200).send({ msg: "Product Updated.", data: updatedProduct });
    }
    return res.status(500).send({ msg: "Error in Updating Product." });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ msg: "Product Deleted." });
  } else {
    res.send({ msg: "Error in Deletion." });
  }
});

export default router;
