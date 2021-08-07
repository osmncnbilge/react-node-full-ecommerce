import express from "express";
import data from "./data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((product) => product._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.send(404).status({ msg: "Product Not Found." });
  }
});

app.listen(5000, () => {
  console.log(`Server started at http://localhost:5000`);
});
