import express from "express";
import bodyParser from "body-parser";
import path from "path";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
console.log(path.resolve("public", "css", "main.css"));
app.use(express.static(path.resolve("public")));
app.use(express.static(path.resolve("publics"))); //it's possible, it will look in every dir for the file

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res) => res.status(404).sendFile(path.resolve("views", "404.html")));

app.listen(5000, () => console.log("App started"));
