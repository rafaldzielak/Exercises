"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
axios_1["default"].get("https://jsonplaceholder.typicode.com/todos/1").then(function (res) {
    console.log(res.data);
});
