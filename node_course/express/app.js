const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  //makes user available everywhere
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //User created product
User.hasMany(Product);

sequelize
  .sync() //has a look into defined models and creates tables / relationships
  .then((result) => User.findByPk(1))
  .then((user) => {
    if (!user) User.create({ name: "Rafa", email: "rafa@gmail.com" });
    return user;
    return Promise.resolve(user); //this is the same as above, because .then creates promise automatically
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((error) => console.log(error));
