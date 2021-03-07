const Product = require("../models/product");
const mongodb = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user; // mongoose will automaticall take _id, but it could also be req.user._id !!!
  const product = new Product({ title, price, description, imageUrl, userId });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user.getProducts({ where: { id: prodId } }); //look only for products created by user
  Product.findById(prodId)
    .then((product) => {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      product.save().then((result) => {
        console.log("Product updated!");
        res.redirect("/admin/products");
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
  // req.user.getProducts() //find products created only by this user
  Product.find()
    .select("title price description imageUrl -_id") //get title, price , ...,  but not _id
    .populate("userId", "name") //get name from user, _id will be fetched
    .then((products) => {
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Shop",
        prods: products,
      });
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => res.redirect("/admin/products"))
    .catch((error) => console.log(error));
};
