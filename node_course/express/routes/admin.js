import express from "express";
import path from "path";

const router = express.Router();
export const products = [];

router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.resolve("views", "add-product.html"));
  res.render("add-product", { path: "/admin/add-product" });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title, productCSS: true, formsCSS: true, activeAddProduct: true });
  res.redirect("/");
});
export default router;
