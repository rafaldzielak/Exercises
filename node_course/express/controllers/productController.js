const products = [];

const getAddProduct = (req, res, next) => {
  console.log("AAAA");
  res.render("add-product", { path: "/admin/add-product" });
};

const postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title, productCSS: true, formsCSS: true, activeAddProduct: true });
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  console.log("get products");
  // res.sendFile(path.resolve("views", "shop.html"));
  res.render("shop", {
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout: false // if that is selected - the layout will not be used
  });
};

export { getProducts, getAddProduct, postAddProduct };
