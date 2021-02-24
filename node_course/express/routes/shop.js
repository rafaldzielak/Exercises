import express from "express";
import { getProducts, getIndex, getCart, getCheckout } from "../controllers/shopController.js";
// import shop from "../views/shop.html";

const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);

export default router;
