const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    if (id) this._id = new mongodb.ObjectID(id);
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Update product
      dbOperation = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this }); //!!!
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation.then((result) => console.log(result)).catch((error) => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((error) => console.log(error));
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => product)
      .catch((error) => console.log(error));
  }
  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then((product) => console.log("Product deleted!"))
      .catch((error) => console.log(error));
  }
}

module.exports = Product;
