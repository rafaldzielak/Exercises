import express from "express";
import path from "path";
import { products } from "./admin.js";
// import shop from "../views/shop.html";

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile(path.resolve("views", "shop.html"));
  res.render("shop", {
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout: false // if that is selected - the layout will not be used
  });
});

export default router;
