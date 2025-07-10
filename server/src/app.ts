import express from "express";
import productRoutes from "./routes/product.routes";
import cors from "cors";

const app = express();

app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON bodies

app.use("/api", productRoutes);

export default app;
