"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var buttonElement = document.querySelector("button"); //! means that this could be null, but we know it isn't
function add(num1, num2) {
  //Union types
  if (typeof num1 === "number" && typeof num2 === "number") return num1 + num2;
  else if (typeof num1 === "string" && typeof num2 === "string") return num1 + " " + num2;
  else return +num1 + +num2;
}
buttonElement.addEventListener("click", function (e) {
  var num1 = num1Element.value;
  var num2 = num2Element.value;
  var result = add(+num1, +num2);
  var stringResult = add(num1, num2);
  // const stringResult = add(true, false); // does not work
  console.log(stringResult);
});
