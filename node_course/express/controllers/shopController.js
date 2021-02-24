import ProductModel from "../models/productModel.js";

const getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    // console.log(products);
    res.render("shop/product-list", {
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

export const getIndex = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      path: "/products",
    });
  });
};

export const getCart = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/cart", {
      prods: products,
      path: "/cart",
      pageTitle: "Cart",
    });
  });
};

export const getCheckout = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/checkout", {
      prods: products,
      path: "/checkout",
      pageTitle: "Checkout",
    });
  });
};

export { getProducts };
