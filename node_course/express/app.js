import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressHbs from "express-handlebars";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.engine("handlebars", expressHbs({ layoutsDir: "views/layouts", defaultLayout: "main-layout" })); //default is views/layouts
app.set("view engine", "handlebars");
// app.set("view engine", "pug"); //pug comes with auto registering for express (that's why it works)
app.set("views", "views"); //it's default, but show the folder

app.use(bodyParser.urlencoded({ extended: false }));
console.log(path.resolve("public", "css", "main.css"));
app.use(express.static(path.resolve("public")));
// app.use(express.static(path.resolve("publics"))); //it's possible, it will look in every dir for the file

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res) => {
  // res.status(404).sendFile(path.resolve("views", "404.html"));
  res.render("404");
});

app.listen(5000, () => console.log("App started"));
