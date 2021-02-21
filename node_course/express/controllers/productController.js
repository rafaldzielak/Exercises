import ProductModel from "../models/productModel.js";

const getAddProduct = (req, res, next) => {
  console.log("AAAA");
  res.render("add-product", { path: "/admin/add-product" });
};

const postAddProduct = (req, res, next) => {
  const product = new ProductModel(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    // console.log(products);
    res.render("shop", {
      prods: products,
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
      // layout: false // if that is selected - the layout will not be used
    });
  });
  // res.sendFile(path.resolve("views", "shop.html"));
};

export { getProducts, getAddProduct, postAddProduct };
