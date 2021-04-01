const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");

const errorController = require("./controllers/error");

const MONGODB_URI = "mongodb+srv://rafa:asdasd@cluster0.0mi3y.mongodb.net/shop?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });
const scrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "SomeSecreyKey", resave: false, saveUninitialized: false, store })); //resave: false - session will not be saved on every request (only if sth changes)
app.use(scrfProtection);
app.use(flash());

app.use((req, res, next) => {
  User.findById(req.session.user)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => app.listen(3000))
  .catch((error) => console.log(error));
