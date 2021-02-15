import express from "express";
import bodyParser from "body-parser";
import path from "path";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404 } from "./controllers/errorController.js";

const app = express();

app.set("view engine", "ejs");
// app.set("view engine", "handlebars");
// app.set("view engine", "pug"); //pug comes with auto registering for express (that's why it works)
app.set("views", "views"); //it's default, but show the folder

app.use(bodyParser.urlencoded({ extended: false }));
console.log(path.resolve("public", "css", "main.css"));
app.use(express.static(path.resolve("public")));
// app.use(express.static(path.resolve("publics"))); //it's possible, it will look in every dir for the file

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(get404);

app.listen(5000, () => console.log("App started"));
