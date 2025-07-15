import mongoose, { InferSchemaType } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    category: String,
    group: String,
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export type IProduct = InferSchemaType<typeof productSchema>;

const Product = mongoose.model('Product', productSchema);
export default Product;
