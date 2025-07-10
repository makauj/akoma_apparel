import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  rating: Number,
  reviews: Number,
});

export const Product = mongoose.model("Product", productSchema);
