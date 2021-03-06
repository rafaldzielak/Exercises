const Product = require("../models/product");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;

//   // Product.findAll({ where: { id: prodId } }).then((products) =>
//   //   res
//   //     .render("shop/product-detail", {
//   //       product: products[0],
//   //       pageTitle: products[0].title,
//   //       path: "/products",
//   //     })
//   //     .catch((error) => console.log(error))
//   // );
//   // findByPk - alternative method:
//   Product.findByPk(prodId).then((product) =>
//     res
//       .render("shop/product-detail", {
//         product: product,
//         pageTitle: product.title,
//         path: "/products",
//       })
//       .catch((error) => console.log(error))
//   );
// };

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
    .getCart()
    .then((products) =>
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products,
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
    .deleteItemFromCart(prodId)
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
