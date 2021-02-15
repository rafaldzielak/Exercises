import express from "express";
import { getAddProduct, postAddProduct } from "../controllers/productController.js";
import path from "path";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);
export default router;
