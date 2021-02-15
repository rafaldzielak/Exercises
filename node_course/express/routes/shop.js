import express from "express";
import { getProducts } from "../controllers/productController.js";
// import shop from "../views/shop.html";

const router = express.Router();

router.get("/", getProducts);

export default router;
