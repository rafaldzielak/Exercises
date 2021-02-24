import express from "express";
import { getAddProduct, postAddProduct, getProducts } from "../controllers/adminController.js";
import path from "path";

const router = express.Router();

router.get("/add-product", getAddProduct);
router.get("/products", getProducts);

router.post("/add-product", postAddProduct);
export default router;
