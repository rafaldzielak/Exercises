"use strict";
var num1Element = document.getElementById("num1");
var num2Element = document.getElementById("num2");
var buttonElement = document.querySelector("button"); //! means that this could be null, but we know it isn't
// const numResults: Array<number> = []; //same as below
var numResults = [];
var stringResults = [];
function add(num1, num2) {
    //Union types
    if (typeof num1 === "number" && typeof num2 === "number")
        return num1 + num2;
    else if (typeof num1 === "string" && typeof num2 === "string")
        return num1 + " " + num2;
    else
        return +num1 + +num2;
}
buttonElement.addEventListener("click", function (e) {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    var stringResult = add(num1, num2);
    numResults.push(+result);
    stringResults.push(stringResult);
    // const stringResult = add(true, false); // does not work
    console.log(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, stringResults);
});
function printResult(resultObj) {
    console.log(resultObj.val);
}
var myPromise1 = new Promise(function (resolve, reject) {
    setTimeout(function () { return resolve("It worked"); }, 1000); //generic is string
});
var myPromise2 = new Promise(function (resolve, reject) {
    setTimeout(function () { return resolve("It worked"); }, 1000); //generic is string
});
// myPromise1.then((res) => console.log(res.split("w")));
myPromise2.then(function (res) { return console.log(res.split("w")); });
