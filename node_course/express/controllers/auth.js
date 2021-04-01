const User = require("../models/user");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error")?.[0],
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: req.flash("error")?.[0],
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/login");
      } else {
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
            console.log(err);
            return res.redirect("/");
          });
        } else {
          req.flash("error", "Invalid credentials");
          return res.redirect("/login");
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const hashedPassword = await bcrypt.hash(password, 12);
  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        req.flash("error", "Email already exists");
        return res.redirect("/signup");
      }
      const user = new User({ email, password: hashedPassword, cart: { items: [] } });
      return user.save();
    })
    .then((result) => res.redirect("/login"))
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
