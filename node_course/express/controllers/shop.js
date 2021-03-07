const Product = require("../models/product");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        path: "/products",
        pageTitle: "Shop",
        prods: products,
      });
    })
    .catch((error) => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        path: "/product",
        pageTitle: "product",
        product,
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        prods: products,
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() //gives promise
    .then((user) =>
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: user.cart.items,
      })
    )
    .catch((error) => console.log(error));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => req.user.addToCart(product))
    .then((result) => res.redirect("/cart"));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(() => res.redirect("/orders"));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders", orders });
    })
    .catch((error) => console.log(error));
};
