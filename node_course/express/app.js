const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const MONGODB_URI = "mongodb+srv://rafa:asdasd@cluster0.0mi3y.mongodb.net/shop?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "SomeSecreyKey", resave: false, saveUninitialized: false, store })); //resave: false - session will not be saved on every request (only if sth changes)

app.use((req, res, next) => {
  User.findById(req.session.user)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({ name: "Rafa", email: "rafa@gmail.com", cart: { items: [] } });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((error) => console.log(error));
