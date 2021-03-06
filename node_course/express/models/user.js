const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }
  //   save() {
  //     const db = getDb();
  //     return db.collection("users").insertOne(this);
  //   }
  //   addToCart(product) {
  //     const cartProductIndex = this.cart.items.findIndex((prod) => {
  //       return prod.productId.toString() === product._id.toString();
  //     });
  //     let newQuantity = 1;
  //     const updatedCartItems = [...this.cart.items];
  //     if (cartProductIndex >= 0) {
  //       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
  //       updatedCartItems[cartProductIndex].quantity = newQuantity;
  //     } else {
  //       updatedCartItems.push({ productId: new mongodb.ObjectID(product._id), quantity: newQuantity });
  //     }

  //     const updatedCart = { items: updatedCartItems };
  //     const db = getDb();
  //     return db
  //       .collection("users")
  //       .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: { cart: updatedCart } });
  //   }

  //   addOrder() {
  //     const db = getDb();
  //     return this.getCart().then((products) => {
  //       const order = { items: products, user: { _id: new mongodb.ObjectID(this._id), name: this.name } };
  //       return db
  //         .collection("orders")
  //         .insertOne(order)
  //         .then((result) => {
  //           this.cart = { items: [] };
  //           return db
  //             .collection("users")
  //             .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: { cart: { items: [] } } });
  //         });
  //     });
  //   }

  //   getOrders() {
  //     const db = getDb();
  //     return db
  //       .collection("orders")
  //       .find({ "user._id": new mongodb.ObjectID(this._id) })
  //       .toArray();
  //   }

  //   static findById(id) {
  //     const db = getDb();
  //     return db.collection("users").findOne({ _id: new mongodb.ObjectID(id) });
  //   }

  //   getCart() {
  //     const db = getDb();
  //     const productIds = this.cart.items.map((prod) => prod.productId);
  //     return db
  //       .collection("products")
  //       .find({ _id: { $in: productIds } })
  //       .toArray()
  //       .then((products) => {
  //         return products.map((p) => {
  //           return {
  //             ...p,
  //             quantity: this.cart.items.find((item) => item.productId.toString() === p._id.toString()).quantity,
  //           };
  //         });
  //       });
  //   }
  //   deleteItemFromCart = (productId) => {
  //     const db = getDb();
  //     const updatedCartItems = this.cart.items.filter(
  //       (item) => item.productId.toString() !== productId.toString()
  //     );
  //     return db
  //       .collection("users")
  //       .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: { cart: { items: updatedCartItems } } });
  //   };
}

module.exports = User;
