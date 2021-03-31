const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  const isLoggedIn = true;
  // console.log(isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.user,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("6044902a1ffdab3ab0d01cc0")
    .then((user) => {
      req.session.user = user;
      req.session.save(() => res.redirect("/"));
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  User.findById("6044902a1ffdab3ab0d01cc0")
    .then((user) => req.session.destroy(() => res.redirect("/")))
    .catch((err) => console.log(err));
};
