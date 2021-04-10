export {};
const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const buttonElement = document.querySelector("button")!; //! means that this could be null, but we know it isn't

function add(num1: number | string, num2: number | string) {
  //Union types
  if (typeof num1 === "number" && typeof num2 === "number") return num1 + num2;
  else if (typeof num1 === "string" && typeof num2 === "string") return num1 + " " + num2;
  else return +num1 + +num2;
}

buttonElement.addEventListener("click", (e) => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  const stringResult = add(num1, num2);
  // const stringResult = add(true, false); // does not work
  console.log(stringResult);
});
