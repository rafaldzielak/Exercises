// Builder pattern
class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}
class User {
  constructor(name, { age, phone = "3987243", address } = {}) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User("Rafa", { age: 10 });
