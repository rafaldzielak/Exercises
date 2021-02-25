const products = [];
import fs from "fs";
import path from "path";

const p = path.resolve("data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      cb([]);
    } else {
      const products = JSON.parse(fileContent);
      cb(products);
    }
  });
};

export default class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => console.log(error));
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}
