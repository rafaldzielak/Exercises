const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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

  // Product.findAll({ where: { id: prodId } }).then((products) =>
  //   res
  //     .render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: "/products",
  //     })
  //     .catch((error) => console.log(error))
  // );
  // findByPk - alternative method:
  Product.findByPk(prodId).then((product) =>
    res
      .render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      })
      .catch((error) => console.log(error))
  );
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
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
    .then((cart) =>
      cart.getProducts().then((products) =>
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products,
        })
      )
    )
    .catch((error) => console.log(error));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products && products.length > 0) product = products[0];
      let newQuantity = 1;
      if (product) {
        newQuantity += product.cartItem.quantity; //we have access to in-between table's product in product!!!
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
      }
      return Product.findByPk(prodId)
        .then((product) => fetchedCart.addProduct(product, { through: { quantity: newQuantity } }))
        .catch((error) => console.log(error));
    })
    .then(() => res.redirect("/cart"))
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id: prodId } }))
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart = req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) =>
      req.user.createOrder().then((order) =>
        order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          })
        )
      )
    )
    .then((result) => fetchedCart.setProducts(null))
    .then((result) => res.redirect("/orders"))
    .catch((error) => console.log(error));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] }) //eager loading
    .then((orders) => res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders", orders }))
    .catch((error) => console.log(error));
};
