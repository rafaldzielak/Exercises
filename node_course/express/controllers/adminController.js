import ProductModel from "../models/productModel.js";

const getAddProduct = (req, res, next) => {
  console.log("AAAA");
  res.render("admin/add-product", { path: "/admin/add-product" });
};

const postAddProduct = (req, res, next) => {
  const product = new ProductModel(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      path: "/admin/products",
    });
  });
};

export { getAddProduct, postAddProduct, getProducts };
